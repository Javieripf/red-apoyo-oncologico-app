# Pruebas adicionales de la entrega final

Fecha: 12 de noviembre de 2026. Entorno: Docker Desktop local en Windows, frontend en `http://localhost:8080`, PostgreSQL y API en la red interna de Compose. Los datos de carga se eliminaron al terminar.

| Requisito | Prueba ejecutada | Resultado |
| --- | --- | --- |
| RNF01, accesibilidad | axe-core con reglas WCAG 2 A/AA, 2.1 A/AA y 2.2 AA sobre 14 rutas de usuario y administración a 360, 768 y 1280 px (42 combinaciones); primera navegación con Tab en login | **0 infracciones automáticas** en las 42 combinaciones; Tab enfoca el primer campo. Se corrigieron etiquetas de botones, casillas y barras de progreso, iconos decorativos, contraste de placeholder y bloqueo de zoom. La revisión manual de todos los criterios WCAG aún es necesaria. |
| RNF02, adaptación | En las mismas 42 combinaciones se comparó `document.documentElement.scrollWidth` con `innerWidth`, se verificó la ruta y se recopilaron errores de JavaScript | **0 desbordamientos horizontales**, **0 redirecciones inesperadas** y **0 errores de página**. |
| EF1, avisos y almacenamiento local | En Edge móvil se seleccionó un filtro de recursos, se recargó la página y se guardó y quitó un favorito | El filtro `autocuidado` persistió tras recargar; aparecieron los avisos de favorito guardado y eliminado. |
| RNF03, errores | Pruebas HTTP de 400, 401, 403, 404 y 409, con mensaje estructurado y sin traza. El limitador 429 se comprobó con prueba unitaria. | Correcto para los casos probados. La presentación visual de todos los errores de cada formulario no se evaluó exhaustivamente. |
| RNF04, privacidad | Dos cuentas distintas: acceso sin JWT a bitácora y favoritos, intento de edición/borrado ajeno, listado de bitácora y favoritos del otro usuario | 401 sin JWT; 404 para edición/borrado ajeno; datos separados entre cuentas. |
| RNF05, contraseñas | Consulta de todos los hashes de `usuarios` sin imprimir sus valores; inspección de registro y perfil por API | 6 de 6 hashes existentes con prefijo bcrypt `$2a$12$`; 0 de otro tipo. API no entrega `password_hash`. |
| RNF06, rendimiento | Se insertaron 1000 recursos y 1000 entradas de directorio temporales. Tres tandas de 20 GET simultáneos por ruta (60 mediciones por ruta), tras 3 solicitudes de calentamiento. Tiempo medido en el cliente Node, incluyendo transferencia y lectura del JSON. | `/api/recursos`: mediana **85,1 ms**, p95 **160,5 ms**, máximo 178,7 ms. `/api/directorio`: mediana **76,8 ms**, p95 **136,8 ms**, máximo 143,7 ms. Ambos inferiores a la meta local de 800 ms. Se borraron 1000 + 1000 registros: quedaron 8 recursos y 3 entradas de directorio. |
| EF3, XSS/SQL/CORS | Recurso temporal con `<img onerror>` y `<script>` visitado en Edge; filtro SQL malicioso; origen CORS no permitido | El payload apareció como texto sin ejecutarse ni crear imagen; el filtro recibió 400; el origen no permitido recibió 403. El recurso temporal se eliminó. |
| EF6, Docker | Reconstrucción del frontend tras las correcciones y pruebas contra `localhost:8080` | Compilación correcta y frontend iniciado. |

Se repitieron `npm test` (backend 14/14, frontend 4/4) y la compilación TypeScript/Vite. El paquete común de Ionic sigue generando una advertencia de tamaño (aprox. 1,29 MB sin comprimir, 287 kB gzip); las rutas de la aplicación están separadas por carga diferida.

