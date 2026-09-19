# API de Recursos para Redes de Apoyo Oncológico

## 1. Identificación del Equipo
* **Nombre del Equipo:** Nombre del equipo
* **Integrantes:**
  * Javier Poblete - Rol
  * Joaquin Perez - Rol
  * Camilo Alvarez - Rol
  * Vicente Bravo - Rol
 
## 2. Distribución de Responsabilidades
* **Javier:** Configuración del proyecto Ionic, diseño UI/UX en Figma, implementación de vistas frontend.
* **Joaquin:** Configuración de Node.js/Express, diseño del modelo relacional, despliegue de base de datos.
* **Camilo:** Redacción de documentación, pruebas de usabilidad, prototipado.
* **Vicente:** Integración de rutas protegidas, conexión frontend-backend (servicios).

## 3. Descripción General del Sistema

El sistema es una aplicación móvil y web diseñada para entregar psicoeducación y recursos de apoyo personalizados a familiares, cuidadores, hijos, parejas y amigos de personas diagnosticadas con cáncer.

A través de una API REST, la aplicación permite organizar y distribuir contenidos específicos según el perfil del usuario, facilitando el acceso a artículos, guías, recomendaciones y contactos de redes de apoyo.

La aplicación también incorpora herramientas de autocuidado, como una bitácora emocional, además de un directorio de especialistas y grupos de apoyo.

El sistema considera dos roles principales:

* **Usuario:** Familiar, cuidador, pareja, hijo/a o amigo/a de una persona con cáncer.
* **Administrador:** Encargado de gestionar los recursos y contenidos disponibles en la plataforma.

La aplicación será desarrollada considerando tanto dispositivos móviles como navegadores web.

## 4. Justificación del Problema

El diagnóstico de cáncer no solo afecta a la persona diagnosticada, sino también a las personas que forman parte de su red de apoyo. Familiares, parejas, hijos, amigos y cuidadores pueden enfrentar cambios en sus rutinas, preocupaciones, responsabilidades y situaciones emocionales asociadas al proceso de acompañamiento.

Una de las dificultades existentes corresponde al acceso a información adecuada para cada tipo de acompañante. La información disponible en Internet puede ser extensa, técnica o estar principalmente enfocada en la persona que presenta el diagnóstico, sin considerar las necesidades particulares de quienes cumplen diferentes roles dentro de la red de apoyo.

Por ejemplo, las necesidades de un hijo pueden ser diferentes a las de una pareja que participa directamente en el cuidado diario. Del mismo modo, un amigo puede buscar información sobre cómo brindar apoyo emocional sin necesariamente asumir tareas de cuidado.

Esta situación puede dificultar la búsqueda de información pertinente y hacer que las personas tengan que revisar múltiples fuentes antes de encontrar contenido relacionado con su situación.

Por este motivo, el proyecto propone una aplicación que centralice recursos de apoyo y los organice considerando el perfil del usuario. El objetivo es facilitar el acceso a información comprensible, organizada y relacionada con las necesidades de cada tipo de acompañante.

La aplicación no busca reemplazar la atención médica o psicológica profesional. Su función corresponde a proporcionar recursos educativos, herramientas de autocuidado y facilitar el acceso a redes de apoyo.

## 5. Objetivos del Proyecto

### Objetivo General

Desarrollar una plataforma web y móvil que ofrezca recursos educativos y herramientas de apoyo personalizados para familiares, cuidadores, hijos, parejas y amigos de personas con cáncer.

### Objetivos Específicos

* Personalizar los recursos de acuerdo con el tipo de relación que el usuario mantiene con la persona con cáncer.
* Facilitar el acceso a contenidos educativos y de apoyo organizados por categorías.
* Permitir que los usuarios registren su estado emocional mediante una bitácora personal de autocuidado.
* Proporcionar un directorio de especialistas y grupos de apoyo.
* Permitir guardar recursos de interés para consultarlos posteriormente.
* Facilitar la gestión de los recursos disponibles mediante un rol administrador.
* Proporcionar información sobre el uso de los recursos mediante un panel de métricas para el administrador.

## 6. Usuarios Objetivo

La aplicación considera principalmente dos roles:

1. **Usuario**
2. **Administrador**

El rol de usuario corresponde a personas que forman parte de la red de apoyo de una persona con cáncer.

### Usuario

El usuario puede corresponder a:

* Pareja.
* Hijo/a.
* Padre o madre.
* Familiar.
* Amigo/a.
* Cuidador/a.

Se considera que estos usuarios pueden presentar diferentes niveles de experiencia tecnológica y diferentes necesidades de información.

### Características generales

Los usuarios podrían:

* Utilizar principalmente dispositivos móviles.
* Consultar información durante períodos cortos de tiempo.
* Buscar información fácil de comprender.
* Necesitar recursos relacionados con su rol específico.
* Tener diferentes niveles de experiencia utilizando aplicaciones.
* Acceder desde sus hogares, lugares de trabajo, centros de salud o durante desplazamientos.
* Necesitar información organizada para encontrar rápidamente un recurso.

### Necesidades principales

* Encontrar información confiable y organizada.
* Acceder a recursos relacionados con su rol.
* Encontrar herramientas de autocuidado.
* Consultar recursos de apoyo emocional.
* Encontrar especialistas y grupos de apoyo.
* Guardar recursos importantes.
* Poder acceder desde dispositivos móviles y computadores.

### Posibles dificultades

* Exceso de información disponible en Internet.
* Información demasiado técnica.
* Dificultad para determinar qué contenido es pertinente.
* Falta de tiempo para revisar contenidos extensos.
* Dificultad para encontrar recursos dirigidos específicamente a familiares o cuidadores.
* Diferentes niveles de experiencia tecnológica.

### Administrador

El administrador corresponde al usuario encargado de gestionar los contenidos de la plataforma.

### Funciones principales

* Crear recursos.
* Modificar recursos.
* Eliminar recursos.
* Categorizar recursos.
* Asociar recursos a determinados perfiles.
* Consultar métricas de utilización.

El administrador utilizará principalmente un computador o notebook debido a que sus tareas requieren gestionar una mayor cantidad de información.

## Proto-personas

Las siguientes proto-personas corresponden a perfiles hipotéticos construidos a partir del análisis del problema y de las características esperadas de los usuarios de la aplicación.

**No representan resultados obtenidos directamente de usuarios reales.** Corresponden a una caracterización preliminar basada en fuentes secundarias, análisis de soluciones existentes y supuestos razonados.

### Proto-persona 1: Familiar/cuidadora

* **Nombre ficticio:** Carolina
* **Edad:** 42 años
* **Tipo de usuario o rol:** Familiar / cuidadora

#### Características generales

Carolina tiene un familiar cercano diagnosticado con cáncer y participa frecuentemente en su acompañamiento. Utiliza principalmente su teléfono móvil para buscar información y comunicarse.

Tiene poco tiempo disponible durante el día y prefiere encontrar información organizada y fácil de comprender.

#### Necesidades principales

* Encontrar información confiable.
* Saber cómo apoyar emocionalmente a su familiar.
* Encontrar recursos relacionados con el autocuidado.
* Acceder rápidamente a información relevante.
* Encontrar profesionales o grupos de apoyo.

#### Objetivos de uso

Utilizar la aplicación para encontrar recursos relacionados con su rol de cuidadora, conocer herramientas de autocuidado y acceder a redes de apoyo cuando sea necesario.

#### Dificultades o puntos de frustración

* Información demasiado técnica.
* Exceso de información en Internet.
* No saber qué fuentes son confiables.
* Poco tiempo disponible para buscar información.
* Dificultad para encontrar contenido específico para cuidadores.

#### Funcionalidades que utilizaría

* Perfil de apoyo.
* Feed personalizado.
* Recursos educativos.
* Bitácora emocional.
* Directorio.
* Favoritos.

#### Dispositivo y contexto probable de acceso

Utilizaría principalmente un teléfono móvil, desde su hogar, lugar de trabajo o durante desplazamientos.

### Proto-persona 2: Hijo/a

* **Nombre ficticio:** Matías
* **Edad:** 20 años
* **Tipo de usuario o rol:** Hijo

#### Características generales

Matías es estudiante universitario y su padre o madre se encuentra atravesando un tratamiento contra el cáncer.

Tiene experiencia utilizando aplicaciones móviles y busca información que le permita comprender mejor cómo acompañar a su familiar.

Prefiere contenidos breves, claros y fáciles de consultar.

#### Necesidades principales

* Comprender cómo apoyar a su familiar.
* Encontrar información adaptada a su situación.
* Manejar sus propias emociones.
* Encontrar recursos de apoyo.
* Saber dónde solicitar ayuda.

#### Objetivos de uso

Utilizar la aplicación para acceder a recursos educativos relacionados con el rol de hijo, encontrar herramientas de apoyo emocional y guardar contenidos relevantes.

#### Dificultades o puntos de frustración

* Información médica demasiado compleja.
* Información que está dirigida principalmente al paciente.
* No encontrar recursos específicos para hijos.
* No saber cómo abordar determinadas situaciones emocionales.

#### Funcionalidades que utilizaría

* Perfil de apoyo.
* Feed personalizado.
* Recursos educativos.
* Bitácora emocional.
* Favoritos.
* Directorio de apoyo.

#### Dispositivo y contexto probable de acceso

Utilizaría principalmente un teléfono móvil y secundariamente un computador portátil.

### Supuestos utilizados para las proto-personas

Los perfiles anteriores se construyen a partir de los siguientes supuestos:

* Las personas de la red de apoyo pueden buscar información sobre cómo acompañar a una persona con cáncer.
* Las necesidades de información pueden variar según el tipo de relación con la persona diagnosticada.
* Los usuarios pueden utilizar principalmente teléfonos móviles para consultar recursos.
* Algunos usuarios pueden disponer de poco tiempo para realizar búsquedas extensas.
* Los usuarios pueden preferir información clara y organizada.
* Las proto-personas no representan diagnósticos, mediciones psicológicas ni resultados de entrevistas reales.

## 7. Requerimientos

### Requerimientos Funcionales

Un requerimiento funcional describe una funcionalidad, servicio o comportamiento que el sistema deberá proporcionar.

| ID | Requerimiento funcional | Rol |
|---|---|---|
| **RF01** | El sistema deberá permitir al usuario configurar su perfil indicando el tipo de relación que mantiene con la persona con cáncer, como pareja, hijo/a, familiar, amigo/a o cuidador/a. | Usuario |
| **RF02** | El sistema deberá presentar un feed de recursos personalizados de acuerdo con el perfil y tipo de relación del usuario. | Usuario |
| **RF03** | El sistema deberá permitir al usuario registrar su estado emocional mediante una bitácora personal y consultar recursos relacionados con el autocuidado. | Usuario |
| **RF04** | El sistema deberá permitir al usuario buscar y consultar un directorio de especialistas y grupos de apoyo disponibles. | Usuario |
| **RF05** | El sistema deberá permitir al usuario guardar recursos como favoritos y acceder posteriormente a una biblioteca personal. | Usuario |
| **RF06** | El sistema deberá permitir al administrador crear, consultar, modificar, eliminar y categorizar recursos de apoyo. | Administrador |
| **RF07** | El sistema deberá proporcionar al administrador un panel de métricas que permita consultar información sobre los recursos más utilizados según el perfil de usuario. | Administrador |

### Funcionalidades Transversales

Estas funcionalidades son necesarias para el funcionamiento general del sistema, pero no forman parte de los siete requerimientos funcionales principales:

* **FT01:** Registro de usuario.
* **FT02:** Inicio de sesión.
* **FT03:** Cierre de sesión.
* **FT04:** Recuperación de acceso.
* **FT05:** Control de acceso según rol.

### Requerimientos No Funcionales

#### RNF01 - Usabilidad y accesibilidad

La interfaz deberá utilizar lenguaje claro, tamaños de texto legibles, contraste adecuado y controles fácilmente identificables, considerando usuarios con diferentes niveles de experiencia tecnológica.

#### RNF02 - Tolerancia a errores

Ante errores de conexión, solicitudes fallidas o indisponibilidad temporal del backend, la aplicación deberá mostrar mensajes comprensibles para el usuario y evitar exponer códigos de error o información técnica del sistema.

#### RNF03 - Seguridad y privacidad

La aplicación deberá proteger las credenciales y la información personal del usuario mediante mecanismos de autenticación, autorización por roles y almacenamiento seguro de las credenciales.

Las contraseñas no deberán almacenarse en texto plano.

#### RNF04 - Escalabilidad

El frontend deberá mantener una arquitectura modular basada en páginas, componentes, rutas y servicios, permitiendo incorporar nuevas funcionalidades sin realizar modificaciones masivas en la estructura existente.

#### RNF05 - Compatibilidad

La aplicación deberá funcionar correctamente en dispositivos móviles y navegadores web modernos, manteniendo una experiencia de navegación coherente entre ambas plataformas.

Se considerará compatibilidad con:

* Google Chrome.
* Mozilla Firefox.
* Microsoft Edge.
* Safari.
* Android.
* iOS.

#### RNF06 - Rendimiento

Las operaciones habituales de consulta deberán ejecutarse de manera fluida, evitando bloqueos de la interfaz y demoras que interrumpan la interacción del usuario.

#### RNF07 - Protección de información sensible

Los datos personales y registros asociados al usuario deberán manejarse aplicando principios de privacidad y minimización de datos. La aplicación deberá solicitar únicamente la información necesaria para proporcionar sus funcionalidades.

