# API de Recursos para Redes de Apoyo Oncológico

Frontend de una aplicación web y móvil desarrollada con **Ionic + React + TypeScript**, orientada a familiares, parejas, hijos, amigos y cuidadores de personas con cáncer.


--- 

## Índice 

1. [Identificación del Equipo](#1-identificación-del-equipo) 
2. [Distribución de Responsabilidades](#2-distribución-de-responsabilidades)
3. [Justificación del Problema](#3-justificación-del-problema)
4. [Objetivos del Proyecto](#4-objetivos-del-proyecto)
5. [Usuarios Objetivo](#5-usuarios-objetivo) - [Roles del Sistema](#roles-del-sistema) - [Proto-personas](#proto-personas) - [Supuestos utilizados](#supuestos-utilizados-para-las-proto-personas)
6. [Requerimientos](#6-requerimientos) - [Requerimientos Funcionales](#requerimientos-funcionales) - [Funcionalidades Transversales](#funcionalidades-transversales) - [Requerimientos No Funcionales](#requerimientos-no-funcionales)
7. [Arquitectura de Navegación y UX](#7-arquitectura-de-navegación-y-ux) - [Rutas principales y secundarias](#rutas-principales-y-secundarias) - [Relaciones jerárquicas](#relaciones-jerárquicas-entre-vistas) - [Diferenciación por roles](#diferenciación-de-acceso-según-roles) - [Flujos principales](#flujos-de-tareas) - [Puntos críticos](#puntos-críticos-de-interacción) - [Justificación técnica](#justificación-técnica)
8. [Bocetos UI/UX y Figma](#8-bocetos-uiux-y-figma)
9. [Frontend con Ionic React](#9-frontend-con-ionic-react) - [Pantallas implementadas](#pantallas-implementadas) - [Estructura del proyecto](#estructura-del-proyecto) 
10. [Instalación y ejecución](#10-instalación-y-ejecución)


---

## 1. Identificación del Equipo

- **Javier Poblete** - Desarrollo frontend y diseño UI/UX
- **Joaquin Perez** - Desarrollo de vistas y componentes frontend
- **Camilo Alvarez** - Documentación frontend y apoyo en diseño/prototipado
- **Vicente Bravo** - Arquitectura de navegación y configuración de rutas frontend

## 2. Distribución de Responsabilidades

- **Javier:** Configuración inicial del proyecto Ionic + React, desarrollo de vistas frontend, diseño UI/UX y creación de estilos compartidos.
- **Joaquin:** Desarrollo de componentes y vistas frontend, implementación de funcionalidades de la interfaz y apoyo en la organización de la estructura del proyecto.
- **Camilo:** Documentación del frontend, apoyo en el prototipado de Figma y revisión de la experiencia de usuario y consistencia visual.
- **Vicente:** Arquitectura de navegación frontend, configuración de rutas, protección de vistas y organización de la estructura de navegación según los distintos roles.

## 3. Justificación del Problema 

El diagnóstico de cáncer no afecta únicamente a la persona diagnosticada. Las personas que forman parte de su red de apoyo pueden enfrentar cambios en sus rutinas, responsabilidades, preocupaciones y necesidades emocionales durante el proceso de acompañamiento. Una dificultad relevante corresponde al acceso a información adecuada para cada tipo de acompañante. La información disponible en Internet puede ser extensa, técnica o estar enfocada principalmente en el paciente, sin considerar las necesidades de familiares, parejas, hijos, amigos o cuidadores. Por ejemplo, una persona que cumple el rol de cuidador puede necesitar información relacionada con autocuidado y apoyo diario, mientras que un hijo puede buscar orientación para comprender cómo acompañar emocionalmente a su familiar. Esta diferencia hace necesario organizar la información de acuerdo con el contexto del usuario. En este contexto, el proyecto propone una aplicación web y móvil que centralice recursos de apoyo y los organice según el perfil del usuario. La plataforma considera recursos educativos, herramientas de autocuidado, una bitácora emocional, favoritos y un directorio de especialistas y grupos de apoyo. La aplicación no busca reemplazar la atención médica o psicológica profesional. Su propósito es facilitar el acceso a información organizada y recursos de apoyo complementarios.

## 4. Objetivos del Proyecto 

### Objetivo General 

Desarrollar una plataforma web y móvil que facilite el acceso a recursos educativos, herramientas de autocuidado y redes de apoyo para familiares, parejas, hijos, amigos y cuidadores de personas con cáncer. 

### Objetivos Específicos 

- Personalizar la presentación de recursos de acuerdo con el tipo de relación del usuario con la persona en tratamiento.
- Facilitar el acceso a contenidos de apoyo organizados por categorías. - Permitir registrar el estado emocional mediante una bitácora personal.
- Proporcionar un directorio de especialistas y grupos de apoyo.
- Permitir guardar recursos de interés para consultarlos posteriormente.
- Permitir al administrador gestionar los recursos disponibles.
- Proporcionar métricas básicas de uso para el administrador.

## 5. Usuarios Objetivo 

La aplicación considera principalmente dos roles: **Usuario** y **Administrador**. 

### Usuario 

Corresponde a una persona que forma parte de la red de apoyo de alguien con cáncer. 

Puede corresponder a: 
- Pareja.
- Hijo/a.
- Padre o madre.
- Familiar.
- Amigo/a.
- Cuidador/a. 

### Características generales 

Los usuarios pueden presentar diferentes niveles de experiencia tecnológica y diferentes necesidades de información. Se considera que pueden: 

- utilizar principalmente dispositivos móviles;
- consultar información durante períodos breves;
- buscar contenido fácil de comprender;
- necesitar recursos relacionados con su rol específico;
- acceder desde el hogar, trabajo, centros de salud o durante desplazamientos;
- requerir una navegación clara y predecible.

### Necesidades principales 

- Encontrar información confiable y organizada.
- Acceder a recursos relacionados con su rol.
- Encontrar herramientas de autocuidado.
- Consultar recursos de apoyo emocional.
- Encontrar especialistas y grupos de apoyo.
- Guardar recursos importantes.
- Acceder desde teléfonos y computadores.

### Posibles dificultades 

- Exceso de información disponible en Internet.
- Información demasiado técnica.
- Dificultad para identificar contenido pertinente.
- Falta de tiempo para búsquedas extensas.
- Dificultad para encontrar recursos dirigidos a familiares o cuidadores.
- Diferentes niveles de experiencia tecnológica.

### Administrador 

El administrador corresponde a la persona responsable de gestionar los contenidos disponibles en la plataforma. 

Podrá: 

- crear recursos;
- editar recursos;
- eliminar recursos;
- categorizar recursos;
- asociar recursos con perfiles de usuario;
- consultar métricas básicas de utilización.

## Roles del Sistema 
- **Usuario:** consulta recursos, configura su perfil de apoyo, registra estados emocionales, consulta el directorio y administra sus favoritos.
- **Administrador:** gestiona recursos y consulta métricas del sistema.

## Proto-personas 

Las siguientes proto-personas corresponden a **perfiles hipotéticos** construidos a partir del análisis preliminar del problema. No representan resultados obtenidos directamente de usuarios reales. 

### Proto-persona 1: Familiar y cuidadora 

- **Nombre ficticio:** Carolina
- **Edad:** 42 años
- **Rol:** Familiar / cuidadora

#### Características generales 

Carolina acompaña frecuentemente a un familiar durante su tratamiento. Utiliza principalmente su teléfono móvil para buscar información y dispone de poco tiempo continuo durante el día. 

#### Necesidades principales 

- Encontrar información organizada y fácil de comprender.
- Saber cómo apoyar a su familiar.
- Acceder a herramientas de autocuidado.
- Encontrar especialistas o grupos de apoyo.

#### Objetivos de uso 

Utilizar la aplicación para consultar recursos relacionados con su rol de cuidadora, registrar cómo se siente y acceder rápidamente a redes de apoyo. 

#### Dificultades o puntos de frustración 

- Información demasiado técnica.
- Exceso de información en Internet.
- Poco tiempo disponible.
- Dificultad para distinguir recursos relevantes.

#### Funcionalidades que utilizaría 

- Configuración de perfil.
- Recursos personalizados.
- Bitácora emocional.
- Directorio. - Favoritos.

#### Dispositivo y contexto probable de acceso 

Principalmente teléfono móvil, desde el hogar, trabajo o durante desplazamientos. 

### Proto-persona 2: Hijo/a 

- **Nombre ficticio:** Matías
- **Edad:** 20 años
- **Rol:** Hijo

#### Características generales 

Matías es estudiante universitario y busca información que le permita comprender mejor cómo acompañar a un familiar durante el tratamiento. 

#### Necesidades principales 

- Contenidos claros y breves.
- Recursos relacionados con su situación familiar.
- Herramientas de apoyo emocional.
- Información sobre redes de ayuda.

#### Objetivos de uso 

Encontrar recursos pertinentes, guardarlos para consultarlos posteriormente y utilizar la bitácora como herramienta de autocuidado. 

#### Dificultades o puntos de frustración 

- Información médica compleja.
- Contenidos dirigidos principalmente al paciente.
- Dificultad para encontrar información específica para hijos.

#### Funcionalidades que utilizaría 

- Recursos personalizados.
- Detalle de recursos.
- Bitácora emocional.
- Favoritos. - Directorio.

#### Dispositivo y contexto probable de acceso 

Principalmente teléfono móvil y secundariamente computador portátil.  

## Supuestos utilizados para las proto-personas 

Los perfiles anteriores se construyen a partir de los siguientes supuestos preliminares: 

- Las personas de la red de apoyo pueden buscar información sobre cómo acompañar a una persona con cáncer.
- Las necesidades de información pueden variar según el tipo de relación.
- El teléfono móvil constituye un dispositivo relevante para consultas rápidas.
- Algunos usuarios pueden disponer de poco tiempo para realizar búsquedas extensas.
- Los usuarios pueden preferir información clara, breve y organizada.
- Las proto-personas no representan resultados de entrevistas, diagnósticos ni mediciones psicológicas reales.

# 6. Requerimientos 

## Requerimientos Funcionales 

Un requerimiento funcional describe una acción o comportamiento que el sistema deberá proporcionar. 

| ID | Requerimiento funcional | Rol |
|---|---|---|
| **RF01** | El sistema deberá permitir al usuario configurar su perfil indicando la relación que mantiene con la persona en tratamiento. | Usuario | 
| **RF02** | El sistema deberá presentar recursos personalizados de acuerdo con el tipo de relación configurado por el usuario. | Usuario |
| **RF03** | El sistema deberá permitir al usuario registrar su estado emocional mediante una bitácora y asociar una nota opcional al registro. | Usuario | 
| **RF04** | El sistema deberá permitir buscar y filtrar un directorio de especialistas y grupos de apoyo. | Usuario | 
| **RF05** | El sistema deberá permitir guardar y quitar recursos de una lista de favoritos. | Usuario |
| **RF06** | El sistema deberá permitir al administrador crear, consultar, modificar y eliminar recursos, además de asociarlos a categorías y perfiles. | Administrador |
| **RF07** | El sistema deberá permitir al administrador consultar métricas relacionadas con vistas y guardados de recursos y su distribución por perfil. | Administrador | 

Los siete requerimientos funcionales corresponden a funcionalidades de dominio y no consideran registro ni autenticación como parte del conjunto principal, de acuerdo con la definición de la EP1. 

## Funcionalidades Transversales 

Estas funciones apoyan el funcionamiento general del sistema y se documentan separadamente de los siete requerimientos funcionales principales: 

- **FT01:** Registro de usuario.
- **FT02:** Inicio de sesión.
- **FT03:** Cierre de sesión.
- **FT04:** Protección de rutas.
- **FT05:** Control de acceso según rol.

## Requerimientos No Funcionales 

### RNF01 - Usabilidad y accesibilidad La interfaz deberá utilizar lenguaje claro, tamaños de texto legibles, contraste adecuado, controles identificables y una jerarquía visual consistente. 

### RNF02 - Diseño adaptable La interfaz deberá funcionar en dispositivos móviles y navegadores web, manteniendo accesibles las funciones principales y evitando pérdida de información. 

### RNF03 - Tolerancia a errores Ante errores de conexión o solicitudes fallidas, la aplicación deberá mostrar mensajes comprensibles para el usuario y evitar exponer detalles técnicos del sistema. 

### RNF04 - Seguridad y privacidad Las funcionalidades protegidas deberán requerir autenticación y el acceso deberá diferenciarse según el rol. Las credenciales y datos sensibles deberán manejarse de forma segura en la integración con el backend. 

### RNF05 - Escalabilidad y modularidad El frontend deberá mantener una organización basada en páginas, componentes, rutas, servicios, contexto, tipos y estilos compartidos para facilitar futuras ampliaciones. 

### RNF06 - Compatibilidad La aplicación deberá ser compatible con navegadores web modernos y mantener una experiencia coherente entre computador y dispositivo móvil. 

### RNF07 - Rendimiento Las operaciones habituales de consulta deberán ejecutarse de forma fluida, evitando bloqueos de la interfaz y demoras innecesarias.

# 7. Arquitectura de Navegación y UX 

## Rutas principales y secundarias 

### Rutas públicas 
| Ruta | Vista | Descripción |
|---|---|---|
| `/login` | Inicio de sesión | Permite ingresar al sistema. | 
| `/registro` | Registro | Permite crear una cuenta. | 

### Rutas protegidas del Usuario

| Ruta | Vista | Descripción |
|---|---|---|
| `/inicio` | Inicio | Presenta recursos priorizados y acceso al directorio. | 
| `/recursos` | Recursos | Permite explorar y filtrar recursos por categoría. | 
| `/recursos/:id` | Detalle de recurso | Permite consultar el contenido de un recurso específico. | 
| `/directorio` | Directorio | Permite buscar y filtrar especialistas y grupos de apoyo. |
| `/bitacora` | Bitácora emocional | Permite registrar estados emocionales y notas. | 
| `/favoritos` | Favoritos | Presenta los recursos guardados por el usuario. |
| `/perfil` | Perfil | Permite consultar y actualizar la relación con la persona en tratamiento. | 

### Rutas protegidas del Administrador 

| Ruta | Vista | Descripción |
|---|---|---| 
| `/admin/inicio` | Inicio administrador | Presenta el acceso general a la administración. |
| `/admin/recursos` | Gestión de recursos | Lista los recursos y permite administrarlos. | 
| `/admin/recursos/nuevo` | Crear recurso | Permite registrar un nuevo recurso. |
| `/admin/recursos/:id/editar` | Editar recurso | Permite modificar un recurso existente. | 
| `/admin/metricas` | Métricas | Presenta métricas de uso de recursos y perfiles. |

## Relaciones jerárquicas entre vistas 

```text 

Aplicación
│
├── Rutas públicas
│ ├── Login
│ └── Registro
│
└── Rutas protegidas
    │
    ├── Usuario
    │ ├── Inicio
    │ ├── Recursos
    │ │ └── Detalle de recurso
    │ ├── Directorio
    │ ├── Bitácora
    │ ├── Favoritos
    │ └── Perfil
    │
    └── Administrador
        ├── Inicio
        ├── Gestión de recursos
        │ ├── Crear recurso
        │ └── Editar recurso
        └── Métricas
```

## Diferenciación de acceso según roles 

El acceso a las vistas protegidas depende del estado de sesión y del rol del usuario. 

### Matriz de acceso por 

rol | Funcionalidad | Usuario | Administrador | 
|---|:---:|:---:| 
| Configurar perfil de apoyo | ✓ | — | 
| Consultar recursos personalizados | ✓ | — | 
| Consultar detalle de recurso | ✓ | ✓ | 
| Registrar estado emocional | ✓ | — | 
| Consultar directorio | ✓ | — | 
| Gestionar favoritos | ✓ | — | 
| Crear recursos | — | ✓ |
| Editar recursos | — | ✓ | 
| Eliminar recursos | — | ✓ | 
| Consultar métricas | — | ✓ | 

### Control de acceso a rutas Las rutas públicas permiten el acceso sin sesión. 

Las rutas protegidas redirigen a `/login` cuando no existe una sesión válida. Un usuario con rol de administrador es enviado al área administrativa y un usuario normal al área principal de usuario. 

## Flujos de Tareas 

### Flujo de Tarea 1: Configuración del perfil y consulta de recursos 

**Rol:** Usuario 
**Objetivo:** configurar su relación con la persona en tratamiento y consultar recursos personalizados. 

```text 
Inicio
  ↓
Login
  ↓
Inicio de usuario
  ↓
¿Perfil configurado?
  ├── No → Seleccionar relación → Guardar perfil
  │                              ↓
  └──────────────────────────────┘
                ↓
  Cargar recursos por perfil
                ↓
        Consultar recurso
                ↓
    Ver detalle del recurso
                ↓
        Guardar favorito
```

### Flujo de Tarea 2: Registro en la bitácora emocional 

**Rol:** Usuario 
**Objetivo:** registrar el estado emocional y consultar recursos sugeridos. 
```text 
Inicio
  ↓
Bitácora
  ↓
Seleccionar estado emocional
  ↓
Escribir nota opcional
  ↓
Guardar registro
  ↓
Mostrar confirmación
  ↓
Consultar recursos sugeridos
```

### Flujo de Tarea 3: Gestión de recursos 

**Rol:** Administrador 

**Objetivo:** crear, modificar o eliminar un recurso. 
```text 
Inicio administrador
        ↓
Gestión de recursos
        ↓
Seleccionar acción
    ┌────┼───────────┐
    ↓    ↓           ↓
Crear  Editar     Eliminar
    ↓    ↓           ↓
  Completar formulario
         ↓
    Validar datos
         ↓
  Guardar / confirmar
         ↓
  Volver al listado
```

## Puntos críticos de interacción 

1. **Inicio de sesión y acceso según rol:** los errores deben comunicarse claramente y las rutas no autorizadas deben redirigirse correctamente.
2. **Configuración del perfil:** el usuario debe entender que la relación elegida se utiliza para organizar los recursos que verá primero.
3. **Consulta de recursos:** las categorías y tarjetas deben facilitar la identificación del contenido y evitar una presentación excesivamente densa.
4. **Bitácora emocional:** el registro debe entregar retroalimentación clara al guardar el estado y no perder el contenido ingresado accidentalmente.
5. **Directorio:** la búsqueda y los filtros deben ser visibles y fáciles de utilizar.
6. **Favoritos:** el cambio de estado debe entregar una confirmación clara y permitir consultar posteriormente los recursos guardados.
7. **Cambio entre móvil y web:** la ubicación visual puede adaptarse al dispositivo, pero las etiquetas y comportamientos principales deben mantenerse consistentes. La navegación principal del usuario utiliza una **barra inferior tanto en móvil como en web**.

## Justificación Técnica 

### Usabilidad 

Se utiliza una estructura de navegación simple y consistente, con acceso directo a las funciones principales del usuario. La barra inferior permite reconocer rápidamente Inicio, Recursos, Bitácora, Favoritos y Perfil. 

### Eficiencia de interacción 

Las acciones frecuentes se encuentran a pocos pasos de distancia. El detalle de los recursos utiliza rutas específicas y la gestión de favoritos puede realizarse desde el listado o desde el detalle. 

### Claridad estructural 

La aplicación separa las rutas públicas, las rutas de usuario y las rutas de administrador. 

Esto facilita comprender qué funcionalidades corresponden a cada rol. 



### Escalabilidad 

La implementación mantiene una separación entre `pages`, `components`, `routes`, `services`, `context`, `types` y `theme`, permitiendo incorporar nuevas funcionalidades sin concentrar toda la lógica en una sola vista.

# 8. Bocetos UI/UX y Figma

**Figma:**

# 9. Frontend con Ionic React

## Pantallas implementadas 

El frontend actual contiene más de cuatro vistas funcionales y utiliza componentes propios de Ionic. 

### Usuario 
- Login.
- Registro.
- Inicio.
- Recursos.
- Detalle de recurso.
- Directorio.
- Bitácora emocional.
- Favoritos.
- Perfil.

### Administrador 

- Inicio administrador.
- Gestión de recursos.
- Crear recurso.
- Editar recurso.
- Métricas.

### Componentes Ionic utilizados 

Entre los componentes utilizados se encuentran: 

- `IonPage`
- `IonHeader`
- `IonContent`
- `IonTabs`
- `IonTabBar`
- `IonTabButton`
- `IonRouterOutlet`
- `IonInput`
- `IonTextarea`
- `IonSelect`
- `IonSelectOption`
- `IonButton`
- `IonCard`
- `IonSearchbar`
- `IonSegment`
- `IonSegmentButton`
- `IonCheckbox`
- `IonToast`
- `IonSpinner`
- `IonLoading`

## Estructura del proyecto 
```text 
src/
├── components/
│     ├── BottomNavigation
│     ├── Header
│     ├── ProtectedRoute
│     └── ResourceCard
│
├── context/
│     └── AuthContext.tsx
│
├── data/
│     └── mockData.ts
│
├── pages/
│     ├── Login/
│     ├── Registro/
│     ├── Inicio/
│     ├── Recursos/
│     ├── Bitacora/
│     ├── Directorio/
│     ├── Favoritos/
│     ├── Perfil/
│     └── Admin/
│
├── routes/
│     └── AppRoutes.tsx
│
├── services/
│     └── api.ts
│
├── theme/
│     ├── variables.css
│     └── app.css
│
└── types/
       └── index.ts
```

# 10. Instalación y ejecución 

## Requisitos 

- Node.js instalado.
- npm instalado.
- Navegador web moderno.

## Instalación 

```bash 
npm install
```
## Ejecución en desarrollo 

```bash 
npm run dev
```
La aplicación estará disponible abriendo el link se salga en la terminal


## Datos de demostración 

La EP1 utiliza datos simulados y `localStorage` para demostrar la navegación y las funcionalidades del frontend mientras se implementa el backend. 

Para demostración: 

- Un correo que no comience con `admin` entra como **usuario**.
- Un correo que comience con `admin` entra como **administrador**, por ejemplo `admin@redapoyo.cl`.
- En esta etapa la contraseña no se valida contra un backend real.

> Esta lógica es únicamente de demostración para la EP1 y despues se reemplazara por autenticación real con backend en la EP2.


