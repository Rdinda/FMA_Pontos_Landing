#!/bin/sh
set -e
NGINX_PORT=${NGINX_PORT:-8000}
PHP_FPM_HOST=${PHP_FPM_HOST:-app}
echo "Porta exposta: ${NGINX_PORT}"
sed -i "s~listen 8000;~listen ${NGINX_PORT};~" /etc/nginx/nginx.conf
sed -i "s~fastcgi_pass .*:9000;~fastcgi_pass ${PHP_FPM_HOST}:9000;~" /etc/nginx/nginx.conf
CERT_DIR=/etc/nginx/certs
CERT=${NGINX_SSL_CERT:-$CERT_DIR/fullchain.pem}
KEY=${NGINX_SSL_KEY:-$CERT_DIR/privkey.pem}

if [ -f "$CERT" ] && [ -f "$KEY" ]; then
    cat > /etc/nginx/conf.d/ssl_server.conf <<EOF
server {
    listen 443 ssl http2;
    server_name _;
    root /var/www/html/public;
    index index.php;

    ssl_certificate $CERT;
    ssl_certificate_key $KEY;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location ~ \.php\$ {
        try_files \$uri =404;
        include /etc/nginx/fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        fastcgi_pass ${PHP_FPM_HOST}:9000;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
EOF

    if [ "$NGINX_PORT" = "80" ]; then
        sed -i 's~try_files \\$uri \\$uri/ /index.php\\?\\$query_string;~return 301 https://$host$request_uri;~' /etc/nginx/nginx.conf
    fi
fi
exec nginx -g "daemon off;"
