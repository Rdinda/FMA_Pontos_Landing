#!/bin/sh
set -e
mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
if [ ! -e public/storage ]; then
    php artisan storage:link || true
fi
FPM_PORT=${FPM_PORT:-9000}
echo "Porta exposta: ${FPM_PORT}"
sed -i "s~^listen\\s*=.*~listen = 0.0.0.0:${FPM_PORT}~" /usr/local/etc/php-fpm.d/www.conf
exec php-fpm -F
