#!/bin/sh
set -e
NGINX_PORT=${NGINX_PORT:-8000}
PHP_FPM_HOST=${PHP_FPM_HOST:-app}
echo "Porta exposta: ${NGINX_PORT}"
sed -i "s~listen 8000;~listen ${NGINX_PORT};~" /etc/nginx/nginx.conf
sed -i "s~fastcgi_pass .*:9000;~fastcgi_pass ${PHP_FPM_HOST}:9000;~" /etc/nginx/nginx.conf
exec nginx -g "daemon off;"
