# Red de Apoyo Oncológico — Entrega Final

Aplicación web para personas que acompañan a alguien durante un tratamiento oncológico. Integra un frontend **Ionic React**, una API **Express** y una base de datos **PostgreSQL**. Este documento explica la instalación, el uso y las evidencias de los criterios EF1–EF6.

> **Alcance:** los recursos y las entradas iniciales del directorio son datos ficticios para la demostración. La ubicación mostrada corresponde al centro aproximado de una ciudad, no a la dirección de un profesional.

## Índice

1. [Qué incluye la entrega](#1-qué-incluye-la-entrega)
2. [Requisitos previos](#2-requisitos-previos)
3. [Instalación recomendada con Docker](#3-instalación-recomendada-con-docker)
4. [Instalación para desarrollo sin Docker](#4-instalación-para-desarrollo-sin-docker)
5. [Uso de la aplicación](#5-uso-de-la-aplicación)
6. [Arquitectura y API](#6-arquitectura-y-api)
7. [Cumplimiento de la evaluación final](#7-cumplimiento-de-la-evaluación-final)
8. [Pruebas y evidencias](#8-pruebas-y-evidencias)
9. [Seguridad, límites y despliegue público](#9-seguridad-límites-y-despliegue-público)
10. [Solución de problemas](#10-solución-de-problemas)

## 1. Qué incluye la entrega

Al descomprimir `red-apoyo-oncologico-entrega-final.zip` se obtiene esta estructura:

```text
red-apoyo-oncologico-entrega-final/
├── compose.yaml                         # Orquesta frontend, API y PostgreSQL
├── .env.example                         # Plantilla de configuración; copiar a .env
├── README_ENTREGA_FINAL.md              # Esta guía
├── red-apoyo-oncologico-app-frontend/
│   ├── README.md                         # Documentación de la interfaz
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── red-apoyo-oncologico-app-backend/
│   ├── README.md                         # Documentación de la API y la base
│   ├── Dockerfile
│   ├── sql/schema.sql
│   └── sql/seed.sql
└── docs/evidencias-ef/
    ├── PRUEBAS_DOCKER.md
    ├── PRUEBAS_ADICIONALES.md
    └── capturas PNG
```

Los README de [frontend](red-apoyo-oncologico-app-frontend/README.md) y [backend](red-apoyo-oncologico-app-backend/README.md) contienen el detalle de cada componente. El archivo `.env` con contraseñas **no está incluido** en la entrega y debe crearse en el equipo donde se ejecute.

## 2. Requisitos previos

### Para la instalación recomendada

- Windows 10/11 con **Docker Desktop**, motor Linux iniciado y `docker compose` disponible. No se necesita instalar Node.js ni PostgreSQL por separado.
- Virtualización de CPU y **Virtual Machine Platform/WSL 2** habilitados para Docker Desktop.
- Puerto **8080** libre en el equipo.
- Conexión a Internet durante la primera construcción de las imágenes y para consultar la geocodificación externa.

Verificar en PowerShell:

```powershell
docker version
docker compose version
```

Si Docker Desktop todavía informa que falta *Virtual Machine Platform*, consultar [Solución de problemas](#10-solución-de-problemas) antes de continuar.

### Para desarrollo sin Docker

Se requieren **Node.js 20 o superior**, npm, PostgreSQL (el entorno Docker usa la versión 16), `psql` disponible en la terminal y los puertos **3000** y **5173** libres.

## 3. Instalación recomendada con Docker

Ejecutar los comandos en **PowerShell**. Docker Desktop debe estar abierto y mostrar el motor en funcionamiento.

### 3.1. Descomprimir y entrar al proyecto

Si el ZIP está en la carpeta actual:

```powershell
Expand-Archive .\red-apoyo-oncologico-entrega-final.zip -DestinationPath .\entrega-final
Set-Location .\entrega-final\red-apoyo-oncologico-entrega-final
```

También se puede descomprimir desde el Explorador de archivos. En ese caso, abrir PowerShell **dentro de la carpeta que contiene `compose.yaml`**. Todos los comandos siguientes se ejecutan desde allí.

### 3.2. Crear la configuración

```powershell
Copy-Item .env.example .env
notepad .env
```

Reemplazar los valores de ejemplo; no dejar textos que comiencen por `REEMPLAZAR_`:

| Variable | Qué configurar | Uso |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | Contraseña nueva y fuerte para PostgreSQL | Obligatoria |
| `JWT_SECRET` | Secreto aleatorio de **32 caracteres o más** | Obligatoria |
| `ADMIN_EMAIL` | Correo para la cuenta administradora de demostración | Necesaria si se creará el administrador |
| `ADMIN_PASSWORD` | Contraseña nueva de **8 caracteres o más** y hasta 72 bytes UTF-8 | Necesaria si se creará el administrador |
| `ADMIN_NAME` | Nombre visible del administrador | Opcional |
| `WEB_PORT` | Puerto local del frontend y de los orígenes CORS permitidos | Opcional, predeterminado `8080` |

Guardar `.env` en la **raíz del proyecto**, junto a `compose.yaml`. No compartirlo ni incluirlo en el ZIP. La cuenta administradora **no se crea automáticamente** al iniciar los contenedores; se crea en el paso 3.5.

### 3.3. Construir e iniciar los servicios

```powershell
docker compose config -q
docker compose up --build -d
docker compose ps
```

`config -q` valida la configuración. El primer `up` descarga las imágenes base, construye frontend y backend, crea la base `red_apoyo` y ejecuta `schema.sql` y `seed.sql`. Esperar hasta que `db`, `backend` y `frontend` aparezcan como **healthy**; el primer arranque puede tardar varios minutos.

### 3.4. Comprobar la instalación

```powershell
Invoke-RestMethod http://localhost:8080/api/health
```

La respuesta debe indicar `status: ok` y `database: connected`. Abrir [http://localhost:8080](http://localhost:8080) en el navegador. La API y PostgreSQL solo son accesibles dentro de la red de Compose; el frontend se publica en `127.0.0.1:8080`.

### 3.5. Crear la cuenta administradora

Con `ADMIN_EMAIL` y `ADMIN_PASSWORD` ya definidos en `.env` y los servicios activos:

```powershell
docker compose exec backend npm run seed:admin
```

El comando indica si creó la cuenta o si ese correo ya existe. **No cambia la contraseña de una cuenta existente.** Para acceder como usuario normal, seleccionar **Crear cuenta** en la pantalla de inicio de sesión y registrar un correo diferente.

### 3.6. Detener, reiniciar y conservar datos

```powershell
docker compose down          # Detiene y elimina contenedores; conserva PostgreSQL
docker compose up -d         # Vuelve a iniciarlos
```

El volumen `postgres_data` conserva usuarios y contenido entre reinicios. Si se necesita **borrar toda la base de datos de esta instalación**, ejecutar `docker compose down -v`; este comando elimina el volumen y sus datos. La semilla inicial se ejecuta de nuevo solo cuando se crea un volumen nuevo.

## 4. Instalación para desarrollo sin Docker

Este método permite modificar el código y ejecutar frontend y backend por separado. Partir de la carpeta raíz que contiene ambas aplicaciones.

### 4.1. Crear el esquema y los datos iniciales

Con PostgreSQL iniciado y `psql` en el `PATH`:

```powershell
psql -U postgres -h localhost -c "CREATE DATABASE red_apoyo;"
psql -U postgres -h localhost -d red_apoyo -f .\red-apoyo-oncologico-app-backend\sql\schema.sql
psql -U postgres -h localhost -d red_apoyo -f .\red-apoyo-oncologico-app-backend\sql\seed.sql
```

Si la base `red_apoyo` ya existe, omitir solamente el primer comando. PostgreSQL puede pedir la contraseña del usuario `postgres`.

### 4.2. Configurar y ejecutar el backend

En una primera terminal:

```powershell
Set-Location .\red-apoyo-oncologico-app-backend
Copy-Item .env.example .env
notepad .env
npm ci
npm run dev
```

En el `.env` del backend, configurar un `JWT_SECRET` propio y la conexión. Para evitar codificar caracteres especiales dentro de una URL, se puede dejar `DATABASE_URL=` vacío y usar estas variables:

```dotenv
PORT=3000
DATABASE_URL=
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=TU_CLAVE_DE_POSTGRES
DB_NAME=red_apoyo
JWT_SECRET=TU_SECRETO_ALEATORIO_DE_AL_MENOS_32_CARACTERES
JWT_EXPIRES_IN=2h
FRONTEND_ORIGIN=http://localhost:5173
```

Reemplazar los valores de ejemplo. Si se desea crear un administrador en este entorno, añadir `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `ADMIN_NAME`; después ejecutar `npm run seed:admin` en otra terminal dentro del backend.

### 4.3. Ejecutar el frontend

En una segunda terminal, desde la carpeta raíz del proyecto:

```powershell
Set-Location .\red-apoyo-oncologico-app-frontend
npm ci
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173). Vite reenvía `/api` a `http://localhost:3000`; el frontend usa `VITE_API_URL=/api` por defecto. Comprobar la API con `Invoke-RestMethod http://localhost:3000/api/health`.

## 5. Uso de la aplicación

| Rol | Funciones principales |
| --- | --- |
| Usuario | Registrarse e iniciar sesión; explorar y filtrar recursos; guardar favoritos; crear, consultar, editar y borrar entradas propias de bitácora; explorar el directorio y ubicar una ciudad. |
| Administrador | Iniciar sesión con la cuenta creada por `seed:admin`; crear, consultar, editar y eliminar recursos y entradas del directorio; consultar métricas. |

Los filtros de recursos y directorio se conservan en `localStorage`. El JWT de sesión se guarda en `sessionStorage`; las contraseñas y notas de bitácora no se guardan en el almacenamiento local del navegador. Las operaciones muestran avisos de confirmación o error mediante `IonToast`.

## 6. Arquitectura y API

```text
Navegador → Nginx / Ionic React (:8080)
                 └── /api → Express (:3000, red interna)
                                  ├── PostgreSQL (:5432, red interna)
                                  └── HTTPS → Open-Meteo Geocoding API
```

Las respuestas exitosas usan `{ "data": ... }`; los errores usan `{ "error": { "codigo": "...", "mensaje": "..." } }`. Las eliminaciones correctas devuelven HTTP 204.

| Área | Rutas principales | Acceso |
| --- | --- | --- |
| Salud | `GET /api/health` | Público |
| Autenticación y perfil | `POST /api/auth/register`, `POST /api/auth/login`, `GET/PATCH /api/auth/me` | Público / autenticado |
| Recursos | `GET /api/recursos`, `GET /api/recursos/:id`, `POST/PUT/DELETE /api/recursos` | Lectura autenticada; cambios de administrador |
| Bitácora | `GET/POST /api/bitacora`, `PATCH/DELETE /api/bitacora/:id` | Propietario |
| Favoritos | `GET /api/favoritos`, `POST/DELETE /api/favoritos/:id` | Usuario autenticado |
| Directorio | `GET/POST /api/directorio`, `PUT/DELETE /api/directorio/:id`, `GET /api/directorio/:id/ubicacion` | Lectura autenticada; cambios de administrador |
| Métricas | `GET /api/metricas` | Administrador |

La bitácora entrega hasta 100 entradas recientes. El servicio de ubicación envía a Open-Meteo solamente el nombre de la ciudad de una entrada presencial o mixta. La interfaz atribuye los datos a Open-Meteo/GeoNames y presenta el punto como aproximado.

## 7. Cumplimiento de la evaluación final

La [matriz RF01–RF18](docs/TRAZABILIDAD.md) identifica la pantalla, la implementación y el resultado esperado de cada prueba funcional. Incluye el progreso desde EP1 y EP2 con referencias al historial del equipo.

| Criterio | Implementación | Evidencia |
| --- | --- | --- |
| **EF1: CRUD, avisos y almacenamiento local** | CRUD de recursos, directorio y bitácora; favoritos; avisos `IonToast`; filtros persistentes. | Pruebas HTTP de CRUD y aislamiento; prueba en navegador de avisos y persistencia. |
| **EF2: UI/UX y rendimiento** | Estados de carga, vacío y error; interfaz adaptable; rutas con carga diferida; compresión y caché de archivos con hash. | Auditoría axe de 42 combinaciones de ruta/ancho sin hallazgos automáticos; sin desbordamiento horizontal. |
| **EF3: seguridad** | Consultas SQL parametrizadas, validaciones, escape de texto en React, CSP, CORS con orígenes explícitos, JWT/roles y hashes bcrypt de coste 12. | Pruebas de entrada SQL maliciosa, XSS, CORS, permisos y hashes. |
| **EF4: consultas eficientes** | Índices y agregaciones en PostgreSQL; listados de recursos sin contenido completo. | Con 1000 registros por tabla y 20 solicitudes simultáneas: p95 de 160,5 ms para recursos y 136,8 ms para directorio en Docker local. |
| **EF5: servicio externo** | Open-Meteo Geocoding API con caché de 24 h, límite de espera y manejo de errores. | Prueba simulada y consulta real de Santiago. |
| **EF6: Docker** | Dockerfile de backend y frontend, `compose.yaml` con API, base y frontend, healthchecks y volumen. | Construcción local y tres contenedores saludables; pruebas HTTP y de navegador en `localhost:8080`. |

## 8. Pruebas y evidencias

Para verificar la instalación completa, seguir los [escenarios de aceptación](docs/TRAZABILIDAD.md). La ejecución del 13 de noviembre de 2026 partió de un ZIP extraído y un volumen PostgreSQL nuevo. Pasaron 18 de 18 requerimientos y el directorio obtuvo coordenadas de Viña del Mar desde Open-Meteo.

Para repetir las pruebas unitarias desde cada carpeta:

```powershell
# En red-apoyo-oncologico-app-backend
npm ci
npm test

# En red-apoyo-oncologico-app-frontend
npm ci
npm test
npm run build
```

Resultados registrados: **14/14** pruebas backend, **4/4** frontend y compilación TypeScript/Vite correcta. La prueba de carga insertó 1000 recursos y 1000 entradas temporales de directorio y los eliminó al finalizar. La auditoría automática evaluó 14 rutas a 360, 768 y 1280 px (42 combinaciones), sin infracciones detectadas por axe ni errores de página.

- [Evidencia de despliegue Docker](docs/evidencias-ef/PRUEBAS_DOCKER.md)
- [Pruebas adicionales, resultados y alcance pendiente](docs/evidencias-ef/PRUEBAS_ADICIONALES.md)
- Capturas de la interfaz en `docs/evidencias-ef/`

## 9. Seguridad, límites y despliegue público

Las contraseñas se almacenan como **hash bcrypt**, no como texto ni como cifrado reversible. El backend valida los datos, limita los intentos fallidos de inicio de sesión y protege los registros privados mediante JWT y controles de rol. Nginx define cabeceras de seguridad y reenvía `/api` sin exponer el puerto del backend. El archivo `.env` debe permanecer fuera del control de versiones.

Esta configuración publica la aplicación **solo en el equipo local**. Para un servidor público se necesitan HTTPS, secretos nuevos, copias de seguridad de PostgreSQL, monitoreo y un origen CORS exacto para el dominio. Compose usa `WEB_PORT` para el puerto publicado y los dos orígenes locales. El limitador de login está en memoria y varias réplicas de la API requieren un almacén compartido.

La auditoría axe **no certifica WCAG 2.2 AA**: falta revisión manual completa con teclado, lector de pantalla y estados de contraste. También queda pendiente la matriz RNF07 de las dos últimas versiones de Chrome, Firefox, Edge y Safari en móvil y escritorio. Vite advierte que el paquete compartido de Ionic pesa cerca de 1,29 MB sin comprimir (287 kB gzip), aunque las pantallas propias se cargan por demanda.

## 10. Solución de problemas

| Síntoma | Comprobación y acción |
| --- | --- |
| Docker indica que falta **Virtual Machine Platform** | Abrir PowerShell como administrador, ejecutar `wsl --install`, reiniciar Windows y abrir Docker Desktop; también se puede instalar Docker Desktop para todos los usuarios siguiendo las instrucciones de su instalador. |
| Docker indica que la virtualización está deshabilitada | Habilitar la virtualización de CPU en BIOS/UEFI y reiniciar. En la placa GIGABYTE B550 GAMING X V2 usada durante la prueba, la opción se llama **SVM Mode**. |
| `docker compose` no encuentra variables | Confirmar que `.env` está junto a `compose.yaml`, que se reemplazaron los valores de ejemplo y ejecutar `docker compose config -q`. |
| El puerto 8080 está ocupado | Asignar un puerto libre a `WEB_PORT` en `.env`, ejecutar `docker compose up -d` y usar ese puerto en la URL de la aplicación y de salud. |
| Un servicio no llega a **healthy** | Ejecutar `docker compose ps` y `docker compose logs --tail=100 db backend frontend`. Revisar la configuración y esperar el primer arranque de PostgreSQL. |
| La API responde, pero no aparecen los datos iniciales | La semilla SQL solo se ejecuta cuando se crea el volumen de PostgreSQL por primera vez. Revisar los logs de `db`; no borrar el volumen si contiene datos que se deban conservar. |
| El administrador no puede iniciar sesión | Confirmar que se ejecutó `docker compose exec backend npm run seed:admin` con las credenciales configuradas **antes** de iniciar los contenedores. El comando no reemplaza la contraseña de un correo existente. |

Para el detalle de componentes y decisiones técnicas, consultar los README de [frontend](red-apoyo-oncologico-app-frontend/README.md) y [backend](red-apoyo-oncologico-app-backend/README.md).
