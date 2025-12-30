FROM php:8.4-cli-alpine AS vendor

RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS icu-dev libzip-dev oniguruma-dev \
    && docker-php-ext-install -j$(nproc) bcmath intl opcache zip \
    && apk del .build-deps

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader --no-scripts

FROM node:22-alpine AS assets

WORKDIR /app
ENV SKIP_WAYFINDER=1
COPY package.json package-lock.json vite.config.ts tsconfig.json ./
COPY resources ./resources
COPY public ./public
RUN npm ci
RUN npm run build

FROM php:8.4-fpm-alpine AS runtime

ENV APP_ENV=production \
    APP_DEBUG=false

RUN apk add --no-cache nginx supervisor icu-libs libzip oniguruma \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS icu-dev libzip-dev oniguruma-dev \
    && docker-php-ext-install -j$(nproc) bcmath intl opcache zip \
    && apk del .build-deps

RUN printf "%s\n" \
    "opcache.enable=1" \
    "opcache.enable_cli=0" \
    "opcache.jit=0" \
    "opcache.memory_consumption=128" \
    "opcache.interned_strings_buffer=16" \
    "opcache.max_accelerated_files=20000" \
    "opcache.validate_timestamps=0" \
    > /usr/local/etc/php/conf.d/99-opcache.ini

RUN sed -i 's~^;*clear_env\\s*=\\s*yes~clear_env = no~' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's~^listen\\s*=.*~listen = 127.0.0.1:9000~' /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache
RUN rm -f bootstrap/cache/services.php bootstrap/cache/packages.php \
    && php artisan package:discover --ansi || true

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
