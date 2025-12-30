#!/bin/sh
set -e

mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

if [ ! -e public/storage ]; then
    php artisan storage:link || true
fi

exec /usr/bin/supervisord -c /etc/supervisord.conf
