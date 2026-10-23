# Red de Apoyo Oncológico — Backend API RESTful

---

## 1. Identificación del Equipo y Distribución de Responsabilidades (Backend)

* **Javier Poblete:** Configuración del servidor Express, arquitectura de rutas routes, controladores principales controllers y manejo unificado de respuestas y errores HTTP.
* **Joaquin Perez:** Configuración de la base de datos PostgreSQL config/db.js, diseño del esquema relacional schema.sql, modelos de datos models y consultas parametrizadas para la prevención de SQL Injection.
* **Camilo Alvarez:** Desarrollo del script de datos semilla seed.sql, implementación de pruebas unitarias/funcionales (node --test), documentación técnica y elaboración de la colección de endpoints para pruebas.
* **Vicente Bravo:** Middlewares de seguridad y autenticación authMiddleware.js, implementación de JSON Web Tokens (JWT), cifrado de contraseñas con bcryptjs y configuración de políticas CORS.

---

## 2. Descripción General del Sistema

El backend de la **Red de Apoyo Oncológico** es una **API RESTful** construida en Node.js y Express, conectada a una base de datos relacional PostgreSQL. Está diseñada para dar soporte a la aplicación móvil y web, permitiendo gestionar el acompañamiento integral, contención emocional e información centralizada para familiares, parejas, hijos y cuidadores de pacientes con cáncer.

### Problema que Aborda
Durante el proceso oncológico, los cuidadores informales enfrentan una alta sobrecarga mental y desorientación práctica. Esta API centraliza y expone recursos educativos filtrados por perfil de acompañante, la gestión de una bitácora emocional personal, un directorio de especialistas y el control de favoritos.

---

## 3. Funcionalidades Principales

* **Autenticación y Seguridad:** Registro e inicio de sesión seguro con encriptación de contraseñas mediante bcryptjs y firmas digitales JWT.
* **Control de Acceso Basado en Roles (RBAC):** Middlewares para restringir accesos según rol usuario o administrador.
* **CRUD de Recursos e Información:** Creación, edición, consulta y eliminación de recursos con filtrado por categoría y perfil (pareja, hijo_a, cuidador_a, etc.).
* **Bitácora Emocional:** Almacenamiento e historial cronológico de estados anímicos y notas personales.
* **Directorio y Favoritos:** Búsqueda de especialistas/grupos de apoyo y guardado de recursos.
* **Métricas para Administradores:** Indicadores de consumo, recursos más visualizados y guardados.

---

## 4. Tecnologías y Herramientas Utilizadas

* **Entorno de Ejecución:** Node.js (v20)
* **Framework Backend:** Express.js (v4.21.2)
* **Base de Datos Relacional:** PostgreSQL (v14)
* **Autenticación y Cifrado:** JSON Web Token (jsonwebtoken), bcryptjs
* **Conector BD:** Driver nativo pg (Pool de conexiones y consultas parametrizadas)
* **Seguridad y CORS:** Middleware cors configurado para orígenes explícitos
* **Pruebas:** Test runner nativo de Node.js (node --test)

---

## 5. Estructura del Proyecto

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

## 6. Bibliografía

[![Node.js Version](https://img.shields.io/badge/Node.js->=20.0.0-green.svg)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/Express-4.21.2-blue.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

---
