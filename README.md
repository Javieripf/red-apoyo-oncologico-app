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
El sistema es una aplicación móvil y web diseñada para entregar psicoeducación y recursos de contención personalizados a familiares, cuidadores, parejas y amigos de personas diagnosticadas con cáncer. A través de una API REST, la aplicación segmenta y distribuye contenido específico (artículos, guías, contactos) basado en el perfil del usuario, aliviando la carga emocional y facilitando el acceso a redes de apoyo verificadas.

## 4. Problema o Necesidad que Aborda 
El diagnóstico de cáncer genera un impacto psicosocial profundo en la red de apoyo del paciente. Con frecuencia el entorno sufre de ansiedad y depresión. La información actual en la web es excesivamente técnica, generalista y no discrimina al lector: un hijo adolescente necesita contención distinta que un esposo o esposa a cargo de administrar medicamentos. Al carecer de plataformas que dividan la educación según el rol específico del acompañante, la red de apoyo queda desatendida, perjudicando su salud mental y la calidad del cuidado.

## 5. Objetivos del Proyecto
* **Objetivo General:** Desarrollar una plataforma completa que ofrezca recursos educativos y herramientas de apoyo personalizadas para la red de soporte de pacientes con cáncer.
* **Objetivos Específicos:**
  * Clasificar a los usuarios de acuerdo con su proximidad al paciente para proporcionar contenido personalizado.
  * Facilitar el monitoreo del estado emocional de los cuidadores mediante una bitácora interactiva.
  * Proveer un directorio accesible de especialistas y grupos de apoyo psicológico.
 
## 6. Principales Funcionalidades
**Roles del Sistema:**
1. **Usuario:** (Familiar, Cuidador, Pareja, Amigo).
2. **Administrador:** (Gestor de contenidos médicos/psicológicos).

**Requerimientos Funcionales (RF):**
* **RF01 - Configuración de Perfil de Apoyo:** El sistema permitirá asignar la relación con el paciente (pareja, hijo, etc.) para adaptar el contenido.
* **RF02 - Feed de Recursos Adaptativo:** El sistema generará un listado dinámico de artículos filtrados automáticamente según el perfil del usuario.
* **RF03 - Bitácora Emocional:** El usuario podrá registrar su estado de ánimo diario, desencadenando recomendaciones inmediatas de contención.
* **RF04 - Directorio de Especialistas:** Buscador con filtros para encontrar psicólogos y grupos de apoyo verificados.
* **RF05 - Guardado de Favoritos:** El usuario podrá almacenar recursos en una biblioteca personal para acceso rápido.
* **RF06 - Gestión de Recursos (Admin):** El administrador podrá crear, editar, eliminar y categorizar material de apoyo (CRUD).
* **RF07 - Panel de Métricas (Admin):** El sistema mostrará al administrador un panel con los recursos más consultados divididos por perfil de usuario.

**Requerimientos No Funcionales (RNF):**
* **RNF01 - Usabilidad (Accesibilidad):** La interfaz cumplirá con directrices WCAG (alto contraste, tipografía escalable) pensado en cuidadores adultos mayores.
* **RNF02 - Tolerancia a Errores:** La aplicación deberá interceptar cualquier fallo de comunicación con el backend o pérdida de internet, mostrando un mensaje de alerta amigable (ej. "Revisa tu conexión e intenta de nuevo") y ocultando de la interfaz cualquier código de error técnico o de base de datos.
* **RNF03 - Seguridad:** Los datos sensibles de la bitácora emocional y contraseñas se almacenarán encriptados usando bcrypt.
* **RNF04 - Escalabilidad:** Arquitectura frontend modular (componentes, páginas, servicios) para permitir futuras integraciones sin refactorización masiva.
* **RNF05 - Compatibilidad:**

