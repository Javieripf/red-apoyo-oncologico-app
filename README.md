# API de Recursos para Redes de Apoyo Oncológico — Frontend

Frontend en **Ionic + React + TypeScript** para la aplicación de psicoeducación
y recursos de apoyo dirigida a familiares, parejas, hijos y amigos de personas
con cáncer. Implementa la arquitectura de navegación, los task flows y la
estructura de proyecto descritos en la definición funcional (EP1).

## Puesta en marcha

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

- Para entrar como **usuario**, usa cualquier correo que **no** empiece con "admin".
- Para entrar como **administrador**, usa un correo que empiece con "admin" (ej: `admin@redapoyo.cl`).
- La contraseña no se valida contra un backend real en este scaffold: cualquier valor no vacío funciona.

## Estado actual

El frontend está completo y navegable de punta a punta (rutas públicas,
protegidas de usuario y de administrador, los 7 requerimientos funcionales y
los 3 task flows del documento). La capa `src/services/api.ts` concentra
**toda** la comunicación con el backend: hoy simula la API REST con datos en
memoria/`localStorage`, y está escrita para que reemplazar cada función por un
`fetch` real a Node/Express (cuando esté desplegado) no requiera tocar las
pantallas. La variable `VITE_API_URL` ya está preparada para apuntar a esa API.

## Estructura

```
src/
├── components/       # ResourceCard, Header, BottomNavigation, ProtectedRoute
├── context/          # AuthContext (sesión, rol, perfil)
├── data/             # Datos semilla + diccionarios de etiquetas (ES)
├── pages/
│   ├── Login/ Registro/
│   ├── Inicio/ Recursos/ Bitacora/ Directorio/ Favoritos/ Perfil/   (Usuario)
│   └── Admin/         # AdminInicio, GestionRecursos, Crear/EditarRecurso, Metricas
├── routes/            # AppRoutes.tsx — define rutas públicas/protegidas
├── services/          # api.ts — capa de acceso a datos
├── theme/             # variables.css — tokens de diseño y overrides de Ionic
└── types/             # Modelos TypeScript compartidos
```

## Rutas

| Ruta | Acceso |
|---|---|
| `/login`, `/registro` | Públicas |
| `/app/*` | Usuario autenticado |
| `/admin/*` | Administrador autenticado |

Un usuario sin sesión que intente entrar a `/app/*` o `/admin/*` es
redirigido a `/login`. Un usuario autenticado sin el rol correcto es
redirigido a la vista principal de su propio rol (`ProtectedRoute.tsx`).

## Diseño

La paleta y tipografía (`src/theme/variables.css`) se alejan deliberadamente
del azul/verde clínico típico de apps de salud: un fondo cálido neutro, un
verde bosque como color de confianza, un tono arcilla para lo emocional/humano
(bitácora, apoyo) y una tipografía serif editorial para títulos. Todo se
mapea a las variables de Ionic para que los componentes nativos (`IonButton`,
`IonCard`, etc.) hereden el sistema sin overrides por pantalla.

## Próximos pasos sugeridos

1. Conectar `src/services/api.ts` a la API REST real (Node/Express) cuando
   Joaquín la despliegue — mismas firmas de función, cambia solo la
   implementación interna.
2. Sustituir el login simulado por autenticación real (JWT / sesiones) y
   quitar el atajo de "correo que empieza con admin".
3. Incorporar el prototipo definitivo de Figma para ajustar textos/imágenes.
4. Ejecutar `npx cap add android` / `npx cap add ios` cuando se necesite
   empaquetar con Capacitor para tiendas móviles.
