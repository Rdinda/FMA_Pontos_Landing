#!/bin/sh
set -e
echo "Porta exposta: nenhuma"
exec /usr/bin/supervisord -c /etc/supervisord.conf
