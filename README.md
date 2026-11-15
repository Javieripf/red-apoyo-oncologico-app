# Red de Apoyo Oncológico — Entrega Final

Aplicación Full-Stack (Ionic/React + Node.js/Express + PostgreSQL) contenerizada con Docker.

## Cómo ejecutar el proyecto localmente con Docker

### Requisitos previos
- Tener instalado **Docker Desktop** y **Docker Compose**.

### Pasos de ejecución
1. Clonar el repositorio y ubicarse en la raíz del proyecto.
2. (Opcional) Copiar `.env.example` a `.env` para personalizar credenciales.
3. Construir y levantar los contenedores (`frontend`, `backend` y `db`):
   ```bash
   docker compose up --build -d