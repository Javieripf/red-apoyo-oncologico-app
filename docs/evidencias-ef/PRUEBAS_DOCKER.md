# Evidencia de despliegue local con Docker

Fecha: 12 de noviembre de 2026 (America/Santiago).

## Entorno

- Docker Desktop 4.99.0; Docker Engine 29.9.3 para Linux; Docker Compose 5.7.0.
- Virtualización de firmware habilitada (`VirtualizationFirmwareEnabled=true`).
- Proyecto Compose: `red-apoyo-ef`.
- Frontend publicado solo en `127.0.0.1:8080`; API y PostgreSQL permanecen en la red interna.

## Comprobaciones realizadas

| Comprobación | Resultado |
| --- | --- |
| `docker compose config -q` | Correcto |
| `docker compose up --build -d` | Imágenes frontend/backend construidas y servicios iniciados |
| `docker inspect` de los servicios | `db`, `backend`, `frontend`: `running healthy` |
| `GET http://127.0.0.1:8080/api/health` | `ok`, base de datos `connected` |
| `GET http://127.0.0.1:8080/login` | HTTP 200, CSP presente |
| Prueba integrada HTTP | Registro, consulta de recursos, CRUD de bitácora, favoritos, CRUD admin de recursos y directorio, CORS y cabeceras: correcto |
| Integración externa | Geocodificación real de Santiago: correcta |
| Flujo visual en Edge aislado | Login de usuario y consulta de ciudad desde directorio: correcto |

## Repetir la prueba

Desde la raíz del proyecto, preparar `.env` a partir de `.env.example` y ejecutar:

```powershell
docker compose up --build -d
docker compose ps
Invoke-RestMethod http://localhost:8080/api/health
```

Para el rol administrador, definir `ADMIN_EMAIL` y `ADMIN_PASSWORD` en `.env` y ejecutar `docker compose exec backend npm run seed:admin`. No se incluyen contraseñas de prueba en esta evidencia.
