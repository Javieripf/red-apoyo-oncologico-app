# PowerShell + PostgreSQL en PATH. Crear base si no existe y cargar el modelo/semilla.
param([string]$DbName = 'red_apoyo', [string]$DbUser = 'postgres')
$ErrorActionPreference = 'Stop'
$existing = & psql -U $DbUser -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DbName'"
if ($LASTEXITCODE -ne 0) { throw 'No se pudo comprobar si existe la base de datos.' }
if ("$existing".Trim() -ne '1') {
  & createdb -U $DbUser $DbName
  if ($LASTEXITCODE -ne 0) { throw 'No se pudo crear la base de datos.' }
}
& psql -v ON_ERROR_STOP=1 -U $DbUser -d $DbName -f sql/schema.sql
if ($LASTEXITCODE -ne 0) { throw 'Falló la creación de tablas.' }
& psql -v ON_ERROR_STOP=1 -U $DbUser -d $DbName -f sql/seed.sql
if ($LASTEXITCODE -ne 0) { throw 'Falló la inserción de semilla.' }
Write-Output 'Base de datos preparada.'
