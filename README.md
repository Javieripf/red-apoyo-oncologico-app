# Red de Apoyo Oncológico — Backend API RESTful

## Índice

1. [Descripción y alcance](#1-descripción-y-alcance)
2. [Identificación del Equipo y Distribución de Responsabilidades (Backend)](#2-identificación-del-equipo-y-distribución-de-responsabilidades-backend)
3. [Tecnologías utilizadas](#3-tecnologías-utilizadas)
4. [Arquitectura y estructura de carpetas](#4-arquitectura-y-estructura-de-carpetas)
5. [Preparación y ejecución local](#5-preparación-y-ejecución-local)
6. [Documentación de la API REST](#6-documentación-de-la-api-rest)
7. [Seguridad y autenticación JWT](#7-seguridad-y-autenticación-jwt)
8. [Integración frontend–backend](#8-integración-frontendbackend)
9. [Pruebas funcionales y evidencias EP2](#9-pruebas-funcionales-y-evidencias-ep2)
10. [Modelo relacional PostgreSQL](#10-modelo-relacional-postgresql)


---
## 1. Descripción y alcance

La **API de Recursos para Redes de Apoyo Oncológico** busca facilitar el acceso a recursos de apoyo organizados según la relación que tiene cada persona con alguien en tratamiento oncológico. Durante **EP1** se construyó la interfaz de usuario, navegación y prototipos. En **EP2** se incorporó un servidor real, persistencia en PostgreSQL y autenticación con JWT para reemplazar los datos simulados en los flujos principales.

### Funcionalidades implementadas y comprobadas

| Funcionalidad | Componente | Estado de la comprobación |
|---|---|---|
| Registro de usuario | `POST /api/auth/register` | Probado desde Ionic y Postman |
| Inicio de sesión y JWT | `POST /api/auth/login` | Probado para usuario y administrador |
| Perfil de apoyo | `GET/PATCH /api/auth/me` | Actualizado desde Ionic y corroborado en Postman |
| Consulta de recursos | `GET /api/recursos` y `GET /api/recursos/:id` | Probada con datos de PostgreSQL |
| CRUD administrativo | `POST/PUT/DELETE /api/recursos` | Creación, edición y eliminación probadas desde Ionic |
| Bitácora emocional | `GET/POST /api/bitacora` | Registro visible en Ionic y Postman |
| Favoritos | `GET/POST/DELETE /api/favoritos` | Alta, baja y persistencia tras cerrar sesión probadas |
| Directorio de apoyo | `GET /api/directorio` | Listado y filtros probados desde Ionic|
| Métricas administrativas | `GET /api/metricas` | Endpoint probado en Postman |
| Permisos de acceso | Middleware de JWT y roles | Comprobados los errores|

El sistema diferencia dos roles: **usuario**, que utiliza los recursos y registra su propia información, y **administrador**, que gestiona el catálogo y consulta métricas. Un administrador no dispone de una ruta para leer la bitácora privada de otra persona.


## 2. Identificación del Equipo y Distribución de Responsabilidades (Backend)

* **Javier Poblete:** Configuración del servidor Express, arquitectura de rutas routes, controladores principales controllers y manejo unificado de respuestas y errores HTTP.
* **Joaquin Perez:** Configuración de la base de datos PostgreSQL config/db.js, diseño del esquema relacional schema.sql, modelos de datos models y consultas parametrizadas para la prevención de SQL Injection.
* **Camilo Alvarez:** Desarrollo del script de datos semilla seed.sql, implementación de pruebas unitarias/funcionales (node --test), documentación técnica y elaboración de la colección de endpoints para pruebas.
* **Vicente Bravo:** Middlewares de seguridad y autenticación authMiddleware.js, implementación de JSON Web Tokens (JWT), cifrado de contraseñas con bcryptjs y configuración de políticas CORS.

---

## 3. Tecnologías utilizadas


| Capa | Tecnología | Uso en el proyecto |
|---|---|---|
| Frontend | Ionic 8, React 18 y TypeScript | Interfaz web y móvil |
| Compilación frontend | Vite 5 | Desarrollo y compilación de producción |
| Backend | Node.js 20+ y Express 4 | Servidor y rutas REST |
| Base de datos | PostgreSQL 14+ y paquete `pg` | Persistencia relacional |
| Autenticación | `jsonwebtoken` 9 | Creación y verificación de JWT |
| Contraseñas | `bcryptjs` 2 | Hash con factor de coste 12 |
| Configuración | `dotenv` | Variables privadas en `.env` |
| Seguridad HTTP | `cors`, JSON y middlewares propios | Origen permitido, autenticación y errores |
| Integración | `fetch`, JSON y Bearer JWT | Peticiones desde Ionic |
| Pruebas | Postman y `node --test` | Solicitudes REST y validaciones automáticas |
| Prototipado | Figma | Diseño de las vistas móvil y web |

---

## 4. Arquitectura y estructura de carpetas


```text
backend/
├── config/
│   ├── db.js             # Configuración de pg.Pool y transacciones SQL
│   └── env.js            # Validación de variables de entorno (.env)
├── controllers/
│   ├── authController.js     # Lógica de Autenticación, Login y Perfil
│   ├── domainController.js   # Lógica de Bitácora, Directorio y Favoritos
│   └── resourceController.js # Lógica CRUD de Recursos
├── middlewares/
│   └── authMiddleware.js     # Validación de JWT y control de roles (requireAuth, requireRole)
├── models/
│   ├── domainModel.js    # Consultas SQL para Bitácora y Directorio
│   ├── resourceModel.js  # Consultas SQL para Recursos y Filtros
│   └── userModel.js      # Consultas SQL para Usuarios y Administradores
├── routes/
│   ├── authRoutes.js     # Endpoints de autenticación (/api/auth)
│   ├── domainRoutes.js   # Endpoints de bitácora, directorio y métricas (/api)
│   └── resourceRoutes.js # Endpoints CRUD de recursos (/api/recursos)
├── sql/
│   ├── schema.sql        # Creación de tablas, PK, FK, restricciones e índices
│   └── seed.sql          # Datos iniciales para pruebas del sistema
├── tests/
│   └── validation.test.js # Pruebas unitarias con node --test
├── utils/
│   ├── http.js           # Manejo centralizado de respuestas HTTP y HttpError
│   └── validation.js     # Validaciones de datos de entrada
├── .env.example          # Ejemplo de variables de entorno
├── app.js                # Configuración principal de Express y CORS
├── package.json          # Dependencias y scripts de Node.js
├── seed-admin.js         # Script para seeding de usuario Administrador inicial
└── server.js             # Entry point del servidor;
```

---

## 5. Preparación y ejecución local

### Requisitos

- Node.js **20 o superior** y npm.
- PostgreSQL instalado y funcionando.
- `psql` o pgAdmin para crear e importar la base de datos.
- Dos carpetas locales: una con la rama `frontend` y otra con la rama `backend`.

### 5.1. Configuración de la base de datos

Crear la base de datos denominada `red_apoyo` y, desde la carpeta raíz del backend, ejecutar:

```powershell
createdb -U postgres red_apoyo
psql -U postgres -d red_apoyo -f sql/schema.sql
psql -U postgres -d red_apoyo -f sql/seed.sql
```

Si `createdb` o `psql` no está disponible en la terminal, realizar los mismos pasos en **pgAdmin**: crear la base de datos, ejecutar primero `schema.sql` y luego `seed.sql` desde el Query Tool.

`seed.sql` incorpora **ocho recursos** (`r1`–`r8`) y **tres entradas ficticias de directorio**, suficientes para probar la aplicación. Las entradas no corresponden a servicios reales.

### 5.2. Variables de entorno del backend

Copiar `.env.example` a `.env`:

```powershell
Copy-Item .env.example .env
```

Editar únicamente el archivo **local** `.env` con las credenciales de la instalación propia:

```dotenv
PORT=3000
DATABASE_URL=postgresql://USUARIO:CLAVE_LOCAL@localhost:5432/red_apoyo
JWT_SECRET=CLAVE_ALEATORIA_DE_AL_MENOS_32_CARACTERES
JWT_EXPIRES_IN=2h
FRONTEND_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin.ejemplo@example.com
ADMIN_PASSWORD=CLAVE_ADMINISTRADOR_LOCAL
ADMIN_NAME=Administrador
```

Los valores anteriores son marcadores de ejemplo, **no claves utilizables**. No publicar `.env`, tokens JWT ni contraseñas. Usar `.env.example` solo con valores ficticios.

### 5.3. Iniciar el backend

```powershell
npm install
npm run seed:admin
npm run dev
```

`npm run seed:admin` crea el administrador **solo si no existe** el correo indicado en `ADMIN_EMAIL`; no cambia automáticamente su contraseña cuando ya existe. Para iniciar sin observación de cambios, usar `npm start`.

La API queda disponible en:

```text
http://127.0.0.1:3000/api
```

Verificar el funcionamiento del servidor y de PostgreSQL con `GET /api/health`:

```json
{
  "data": {
    "status": "ok",
    "database": "connected"
  }
}
```

### 5.4. Iniciar el frontend

En **otra terminal**, dentro de la carpeta de la rama `frontend`:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

La configuración de ejemplo debe indicar:

```dotenv
VITE_API_URL=http://127.0.0.1:3000/api
```

Abrir `http://localhost:5173` o la dirección indicada por Vite. En caso de utilizar `http://127.0.0.1:5173` para el frontend, añadir ese origen al `FRONTEND_ORIGIN` del backend y reiniciar el servidor.

### 5.5. Problemas frecuentes

| Síntoma | Posible causa y solución |
|---|---|
| `database connection failed` | Revisar servicio PostgreSQL, puerto 5432, base y `DATABASE_URL` |
| `NO_AUTENTICADO` / HTTP 401 | Enviar `Authorization: Bearer <token>`; Postman no comparte la sesión de Ionic |
| HTTP 403 | El JWT corresponde a un rol sin autorización para esa ruta |
| HTTP 404 | Revisar ruta, método HTTP o identificador del recurso |
| Error CORS | Comprobar `FRONTEND_ORIGIN` y el origen del navegador |
| Login administrativo incorrecto | Revisar `ADMIN_EMAIL` y recordar que `seed:admin` no actualiza cuentas existentes |
| `Missing script: test` | Ejecutar `npm test` dentro de la carpeta **backend**, no frontend |

## 6. Documentación de la API REST

**Base URL:** `http://127.0.0.1:3000/api`  
**Formato:** `application/json`  
**Autenticación:** cabecera `Authorization: Bearer <JWT>` en rutas protegidas.

Las respuestas exitosas tienen la forma `{ "data": ... }`; los errores se entregan como `{ "error": { "codigo": "...", "mensaje": "..." } }`. Las eliminaciones exitosas devuelven **204 sin contenido**.

| Método | Endpoint | Función | Autorización | HTTP esperado |
|---|---|---|---|---|
| GET | `/health` | Estado del servidor y BD | Pública | 200 |
| POST | `/auth/register` | Registrar cuenta normal | Pública | 201 |
| POST | `/auth/login` | Iniciar sesión | Pública | 200 |
| GET | `/auth/me` | Consultar perfil autenticado | Autenticado | 200 |
| PATCH | `/auth/me` | Actualizar relación de apoyo | Usuario | 200 |
| GET | `/recursos` | Listar recursos; filtrar `perfil` o `categoria` | Autenticado | 200 |
| GET | `/recursos/:id` | Consultar detalle | Autenticado | 200 / 404 |
| POST | `/recursos` | Crear recurso | Administrador | 201 |
| PUT | `/recursos/:id` | Actualizar recurso | Administrador | 200 |
| DELETE | `/recursos/:id` | Eliminar recurso | Administrador | 204 |
| GET | `/bitacora` | Consultar bitácora propia | Usuario | 200 |
| POST | `/bitacora` | Registrar estado emocional | Usuario | 201 |
| GET | `/favoritos` | Listar favoritos propios | Usuario | 200 |
| POST | `/favoritos/:id` | Agregar favorito | Usuario | 201 |
| DELETE | `/favoritos/:id` | Quitar favorito | Usuario | 204 |
| GET | `/directorio` | Obtener directorio demostrativo | Usuario | 200 |
| GET | `/metricas` | Consultar métricas por recurso y perfil | Administrador | 200 |

### 6.1. Registro de usuario — `POST /api/auth/register`

```json
{
  "nombre": "Usuario de Prueba",
  "correo": "usuario.prueba@example.com",
  "password": "ClaveEjemplo123!",
  "tipoRelacion": "familiar"
}
```

**Respuesta de éxito (estructura simplificada, HTTP 201):**

```json
{
  "data": {
    "usuario": {
      "id": "ID_GENERADO",
      "nombre": "Usuario de Prueba",
      "correo": "usuario.prueba@example.com",
      "rol": "usuario",
      "tipoRelacion": "familiar",
      "perfilConfigurado": true
    },
    "token": "JWT_GENERADO"
  }
}
```

El registro abierto **nunca crea un administrador**. La contraseña se almacena como hash bcrypt.

### 6.2. Inicio de sesión — `POST /api/auth/login`

```json
{
  "correo": "usuario.prueba@example.com",
  "password": "ClaveEjemplo123!"
}
```

En caso de éxito, responde HTTP **200** con `data.usuario` y `data.token`. Si las credenciales son incorrectas, responde **401** con código `CREDENCIALES_INVALIDAS`.

### 6.3. Consultar y actualizar perfil

```http
GET /api/auth/me
Authorization: Bearer <JWT>
```

Para modificar la relación de apoyo:

```http
PATCH /api/auth/me
Authorization: Bearer <JWT>
Content-Type: application/json
```

```json
{ "tipoRelacion": "cuidador_a" }
```

La consulta posterior `GET /api/auth/me` permite comprobar que el cambio quedó guardado en PostgreSQL.

### 6.4. Crear y editar recurso — administrador

Utilizar el siguiente JSON tanto en `POST /api/recursos` como en `PUT /api/recursos/:id`:

```json
{
  "titulo": "Orientaciones para acompañar a un familiar",
  "resumen": "Consejos de apoyo cotidiano para familiares.",
  "contenido": "Este contenido educativo sirve para probar el registro de recursos y su posterior actualización desde el panel administrativo.",
  "categoria": "comunicacion",
  "perfiles": ["familiar", "cuidador_a"],
  "tiempoLecturaMin": 5,
  "destacado": false
}
```

Solo el rol **administrador** puede crear, editar o eliminar recursos. Los métodos devuelven **201** (crear), **200** (consultar/editar) y **204** (eliminar). El recurso eliminado devuelve **404** al volver a consultarlo por su ID.

### 6.5. Bitácora, favoritos, directorio y métricas

Registro emocional con `POST /api/bitacora`:

```json
{ "estado": "tranquilo_a", "nota": "Registro académico de prueba." }
```

Para guardar o quitar un recurso: `POST /api/favoritos/r1` y `DELETE /api/favoritos/r1`, respectivamente. El listado se obtiene con `GET /api/favoritos`; **no** se utiliza `POST /api/favoritos` sin ID.

El directorio se consulta con `GET /api/directorio`; la interfaz permite filtrar sus resultados. Las métricas se consultan con `GET /api/metricas` como administrador y contienen `porRecurso` y `porPerfil`.

## 7. Seguridad y autenticación JWT

| Control de seguridad | Implementación en G10 | Comprobación / alcance |
|---|---|---|
| JWT con expiración | `jsonwebtoken`, HS256, `JWT_EXPIRES_IN=2h` por defecto | Login y acceso autenticado probados |
| Roles diferenciados | `usuario` y `administrador` mediante `requireRole` | 403 probado para operación administrativa con usuario |
| Token obligatorio | Middleware `requireAuth` | HTTP 401 sin Bearer comprobado |
| Hash de contraseñas | `bcryptjs` con coste 12 | Implementado en registro y creación de administrador |
| Consultas parametrizadas | PostgreSQL `pg` con `$1`, `$2`, etc. | Verificable en los modelos del backend |
| Validaciones | Email, longitud de contraseña, categorías, perfiles y tiempos | **8 tests automáticos superados** |
| CORS | Lista configurada mediante `FRONTEND_ORIGIN` | Configurado en `app.js` |
| Manejo de errores | Códigos HTTP y mensajes JSON controlados | Casos 401/403/404 comprobados |
| Minimización de datos | La API no devuelve `password_hash` en las respuestas de perfil y login | Implementado en consultas/controlador |
| Separación de bitácoras | Consultas por `req.user.id` | Revisado en el código |

## 8. Integración frontend–backend

En **EP1**, parte de la interfaz utilizaba información simulada. En **EP2**, `src/services/api.ts` utiliza `fetch` para consumir los endpoints reales de Express y `src/context/AuthContext.tsx` gestiona el estado de la sesión autenticada.

| Pantalla Ionic React | Endpoint utilizado | Integración comprobada |
|---|---|---|
| Registro e inicio de sesión | `/auth/register`, `/auth/login` | Sí, usuario y administrador |
| Perfil de usuario | `/auth/me` | Sí, actualización persistente |
| Listado y detalle de recursos | `/recursos`, `/recursos/:id` | Sí |
| Gestión administrativa | `POST`, `PUT` y `DELETE /recursos` | Sí, CRUD completo |
| Bitácora emocional | `/bitacora` | Sí, registro y lectura |
| Favoritos | `/favoritos`, `/favoritos/:id` | Sí, agregar, consultar, persistir y eliminar |
| Directorio | `/directorio` | Sí, listado y filtros |
| Métricas administrativas | `/metricas` | Confirmado en Postman |

### Flujo de prueba realizado

1. Iniciar PostgreSQL y la API Express.
2. Autenticar administrador en Ionic y crear un recurso.
3. Consultar el mismo recurso desde Postman y confirmar su existencia.
4. Editarlo y eliminarlo desde Ionic; corroborar el resultado en Postman.
5. Registrar un usuario normal desde Ionic y autenticarlo también desde Postman.
6. Actualizar su relación de apoyo y consultarla en `/auth/me`.
7. Crear una entrada de bitácora y verificarla en `/bitacora`.
8. Agregar un favorito, cerrar sesión, volver a entrar y eliminarlo; comprobar la persistencia.
9. Consultar el directorio desde Ionic y desde Postman.

## 9. Pruebas funcionales y evidencias EP2

### 9.1. Pruebas manuales de API

| ID | Prueba realizada | HTTP / resultado |
|---|---|---|
| P01 | Salud del servidor y PostgreSQL | `200 OK` |
| P02 | Registro de usuario normal | `201 Created` |
| P03 | Login de usuario y administrador | `200 OK` |
| P04 | Consulta de recursos autenticada | `200 OK` |
| P05 | Crear recurso como administrador | `201 Created` |
| P06 | Editar recurso como administrador | `200 OK` |
| P07 | Eliminar recurso como administrador | `204 No Content` |
| P08 | Consultar recurso eliminado | `404 Not Found` |
| P09 | Acceder sin JWT | `401 Unauthorized` |
| P10 | Crear recurso con rol usuario | `403 Forbidden` |
| P11 | Actualizar relación de perfil | `200 OK` |
| P12 | Registrar y consultar bitácora | `201 / 200` |
| P13 | Guardar, listar y quitar favorito | `201 / 200 / 204` |
| P14 | Listar directorio | `200 OK` |
| P15 | Consultar métricas administrativas | `200 OK` en Postman |

### 9.2. Pruebas automatizadas del backend

Ejecutadas desde la raíz de la rama `backend`:

```powershell
npm test
```

**Resultado reportado:**

```text
ℹ tests 8
ℹ pass 8
ℹ fail 0
ℹ skipped 0
```

Estas ocho pruebas revisan: normalización y validación de correos, longitud mínima de contraseña, recurso válido, perfiles duplicados, categoría inválida, tiempo de lectura negativo y relación no reconocida. **Son pruebas de validación**, no una batería exhaustiva de seguridad o integración de la base de datos.

### 9.3. Compilación del frontend

Ejecutada desde la carpeta de la rama `frontend`:

```powershell
npm run build
```

**Resultado reportado:** `tsc && vite build`, **253 módulos transformados** y compilación completada en **2,72 segundos**. Vite emitió una advertencia de un chunk JavaScript superior a **500 kB**, que no impidió la compilación.

### 9.4. Evidencias

Las capturas reales se organizan en [`docs/evidencias/`](docs/evidencias/)

## 10. Modelo relacional PostgreSQL

El modelo se encuentra en [`sql/schema.sql`](sql/schema.sql) y sus datos de demostración en [`sql/seed.sql`](sql/seed.sql). Contiene **siete tablas**:

| Tabla | Propósito |
|---|---|
| `usuarios` | Cuentas, rol y tipo de relación de apoyo |
| `recursos` | Material educativo y metadatos |
| `recurso_perfiles` | Relación de muchos a muchos entre recursos y perfiles |
| `favoritos` | Recursos guardados por cada usuario |
| `bitacora` | Registros emocionales privados por usuario |
| `directorio` | Especialistas/grupos de demostración |
| `visualizaciones` | Visitas a recursos utilizadas para métricas |

### Relaciones principales

```mermaid
erDiagram
    USUARIOS ||--o{ BITACORA : registra
    USUARIOS ||--o{ FAVORITOS : guarda
    RECURSOS ||--o{ FAVORITOS : recibe
    RECURSOS ||--o{ RECURSO_PERFILES : corresponde
    USUARIOS ||--o{ VISUALIZACIONES : realiza
    RECURSOS ||--o{ VISUALIZACIONES : recibe
```

Se utilizan claves primarias, claves foráneas, restricciones `CHECK`, índices y eliminaciones en cascada para información dependiente. `recursos` y `usuarios` utilizan identificadores de tipo texto; los recursos iniciales están identificados como `r1`–`r8` y los nuevos usuarios/recursos reciben UUID generados en la aplicación. La tabla `directorio` contiene **solo entradas ficticias** de prueba.


## Evidencias de Pruebas y Funcionamiento (API REST Backend)

### 1. Autenticación y Control de Acceso (`/api/auth`)
* **Registro de nuevo usuario (`POST /api/auth/register` - `201 Created`):**
  ![Registro de Usuario](Activos/Imágenes/Postman_registrar_usuario.png)

* **Denegación de acceso sin Token JWT (`401 Unauthorized`):**
  ![Error 401 Sin Token](Activos/Imágenes/Postman_acceso_sin_token.png)

* **Denegación por falta de Permisos / Rol Insuficiente (`403 Forbidden`):**
  ![Error 403 Sin Permisos](Activos/Imágenes/Postman_usuario_sin_permisos.png)

---

### 2. Operaciones CRUD en Recursos (`/api/recursos`)
* **Crear Recurso (`POST /api/recursos` - `201 Created` - Exclusivo Admin):**
  ![Crear Recurso](Activos/Imágenes/Postman_crear_recurso.png)

* **Consultar Recurso por ID (`GET /api/recursos/:id` - `200 OK`):**
  ![Consultar Recurso](Activos/Imágenes/Postman_consultar_recurso.png)

* **Editar Recurso (`PUT /api/recursos/:id` - `200 OK` - Exclusivo Admin):**
  ![Editar Recurso](Activos/Imágenes/Postman_editar_recurso.png)

* **Eliminar Recurso (`DELETE /api/recursos/:id` - `204 No Content` - Exclusivo Admin):**
  ![Eliminar Recurso](Activos/Imágenes/Postman_eliminar_recurso.png)

---

### 3. Módulos del Dominio (`/api/bitacora`, `/api/directorio`, `/api/favoritos`, `/api/metricas`)
* **Registrar y Consultar Bitácora Emocional (`/api/bitacora`):**
  ![Registrar Bitácora](Activos/Imágenes/Probar_la_bitácora_emocional_Registrar_un_estado_emocional.png)
  ![Consultar Bitácora](Activos/Imágenes/Probar_la_bitácora_emocional_Consultar_el_historial_de_la_bitácora.png)

* **Consultar Directorio de Apoyo (`GET /api/directorio`):**
  ![Consultar Directorio](Activos/Imágenes/Comprobar_el_directorio.png)

* **Gestión de Recursos Favoritos (`/api/favoritos`):**
  ![Agregar Favorito](Activos/Imágenes/Probar_los_favoritos_Agregar_un_recurso_a_favoritos.png)
  ![Consultar Favoritos](Activos/Imágenes/Probar_los_favoritos_Consultar_los_favoritos.png)
  ![Eliminar Favorito](Activos/Imágenes/Probar_los_favoritos_Elimina_el_favorito.png)

* **Consultar Métricas del Sistema (`GET /api/metricas` - Exclusivo Admin):**
  ![Consultar Métricas](Activos/Imágenes/Consultar_las_métricas.png)
