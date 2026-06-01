#!/bin/sh

echo "Waiting For MySQL To Be Ready..."

while ! nc -z mysql_db 3306; do
    sleep 1
done
echo "✅ MySQL is ready!"

echo "Running Migrations..."
npx sequelize-cli db:migrate || exit 1
echo "✅ Migrations Add Successfully!"

echo "Running Seeders..."
npx sequelize-cli db:seed:all || exit 1
echo "✅ Seeders Add Successfully!"

echo "Starting Server..."
exec "$@"