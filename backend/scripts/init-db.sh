#!/usr/bin/env bash
set -euo pipefail
DB_NAME="${1:-red_apoyo}"
DB_USER="${2:-postgres}"
if ! psql -U "$DB_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -qx 1; then
  createdb -U "$DB_USER" "$DB_NAME"
fi
psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" -f sql/schema.sql
psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" -f sql/seed.sql
printf 'Base de datos preparada.\n'
