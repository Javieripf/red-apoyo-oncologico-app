# Trazabilidad funcional y progreso de la entrega

El catálogo RF01–RF18 procede de la [especificación del frontend](../red-apoyo-oncologico-app-frontend/README.md). Cada fila identifica la pantalla, la operación que la respalda y una comprobación del [conjunto de pruebas de aceptación](../pruebas/escenarios.cjs). El programa imprime el identificador después de verificar el resultado.

## Escenarios de aceptación

1. **Publicar una guía y comprobar su uso.** El administrador inicia sesión y publica una guía para familiares. Una persona se registra con esa relación, entra por la pantalla de login, encuentra la guía en Inicio, abre su contenido y la guarda. Al consultarla en Favoritos puede retirarla. Administración observa una lectura y un guardado antes de la retirada, actualiza el título y finalmente elimina la guía.
2. **Llevar una bitácora personal.** Con su sesión activa, la persona registra dos estados. Recupera primero el más reciente, corrige el estado y luego la nota de la primera entrada. Después la elimina y vuelve a consultar el historial.
3. **Encontrar apoyo y mantener el directorio.** La persona busca una ciudad y filtra los resultados por tipo en la interfaz. Administración crea una entrada temporal, cambia su nombre y la retira. La cuenta usuaria consulta el directorio después de cada cambio.

Las pruebas de login, lectura de la guía, favoritos, búsqueda y filtro usan Edge. Las operaciones de administración y bitácora usan HTTP contra la misma instalación de Nginx, Express y PostgreSQL. Las lecturas posteriores comprueban el efecto persistido.

## Matriz de requerimientos

En la columna de implementación, los nombres de pantalla corresponden a [src/pages](../red-apoyo-oncologico-app-frontend/src/pages). Las rutas HTTP llevan el prefijo `/api`. Cada enlace de la última columna apunta a la aserción y al mensaje `RFxx OK` del archivo de aceptación. La prueba finaliza con error si falla una aserción.

| RF | Tarea | Implementación | Prueba y resultado esperado | Aserción |
| --- | --- | --- | --- | --- |
| RF01 | Configurar la relación | Registro, `auth/register`, `auth/me` | Tras registrarse e iniciar sesión, el perfil devuelve `familiar`. | [RF01](../pruebas/escenarios.cjs#L107) |
| RF02 | Recibir recursos del perfil | Inicio, `listarRecursos(usuario.tipoRelacion)`, `GET /recursos?perfil=…` | La guía exclusiva de familiares aparece en Inicio y queda fuera de la consulta para parejas. | [RF02](../pruebas/escenarios.cjs#L109) |
| RF03 | Registrar el estado emocional | Bitacora, `POST /bitacora` | El historial recupera el estado original por el ID creado. | [RF03](../pruebas/escenarios.cjs#L28) |
| RF04 | Buscar en el directorio | Directorio, `GET /directorio` y búsqueda en `visibles` | «Viña del Mar» muestra el taller de esa ciudad y oculta la entrada nacional de especialista. | [RF04](../pruebas/escenarios.cjs#L53) |
| RF05 | Filtrar por tipo de apoyo | Directorio, selector de tipo y `ra_directorio_tipo` | Grupos muestra el taller, oculta al especialista y conserva la selección tras recargar. | [RF05](../pruebas/escenarios.cjs#L64) |
| RF06 | Guardar un favorito | DetalleRecurso y Favoritos, `POST /favoritos/:id` | El usuario guarda desde el detalle y encuentra el mismo título en Favoritos. | [RF06](../pruebas/escenarios.cjs#L114) |
| RF07 | Retirar un favorito | Favoritos, `DELETE /favoritos/:id` | Al pulsar Quitar, la lista queda vacía y la API confirma la ausencia del ID. | [RF07](../pruebas/escenarios.cjs#L127) |
| RF08 | Crear un recurso | CrearRecurso y RecursoForm, `POST /recursos` | La lectura posterior por ID devuelve el título publicado. | [RF08](../pruebas/escenarios.cjs#L90) |
| RF09 | Editar un recurso | EditarRecurso y RecursoForm, `PUT /recursos/:id` | La cuenta usuaria recupera el título corregido. | [RF09](../pruebas/escenarios.cjs#L133) |
| RF10 | Eliminar un recurso | GestionRecursos, `DELETE /recursos/:id` | La lectura por ID devuelve 404 después de eliminarlo. | [RF10](../pruebas/escenarios.cjs#L142) |
| RF11 | Consultar métricas | Metricas, `GET /metricas` | El administrador ve una lectura y un guardado del recurso nuevo. La consulta del usuario devuelve 403. | [RF11](../pruebas/escenarios.cjs#L122) |
| RF12 | Consultar el historial en orden | Bitacora, `GET /bitacora`, `getDiary` | Dos entradas creadas en secuencia se recuperan en orden inverso. | [RF12](../pruebas/escenarios.cjs#L30) |
| RF13 | Corregir el estado propio | Bitacora, `PATCH /bitacora/:id` | Al volver a leer el registro se obtiene `esperanzado_a`. | [RF13](../pruebas/escenarios.cjs#L35) |
| RF14 | Corregir la nota propia | Bitacora, `PATCH /bitacora/:id` | La nueva nota persiste y se conserva el estado anterior. | [RF14](../pruebas/escenarios.cjs#L39) |
| RF15 | Borrar una entrada propia | Bitacora, `DELETE /bitacora/:id` | El historial posterior ya no contiene el ID eliminado. | [RF15](../pruebas/escenarios.cjs#L43) |
| RF16 | Dar de alta una entrada de directorio | GestionDirectorio, `POST /directorio` | El ID creado se encuentra en la lista con su nombre original. | [RF16](../pruebas/escenarios.cjs#L97) |
| RF17 | Actualizar el directorio | GestionDirectorio, `PUT /directorio/:id` | El usuario lee el nombre actualizado para el mismo ID. | [RF17](../pruebas/escenarios.cjs#L136) |
| RF18 | Retirar una entrada | GestionDirectorio, `DELETE /directorio/:id` | La lista que consulta el usuario deja de contener la entrada. | [RF18](../pruebas/escenarios.cjs#L139) |

El [cliente HTTP](../red-apoyo-oncologico-app-frontend/src/services/api.ts) conecta estas pantallas con los [controladores de Express](../red-apoyo-oncologico-app-backend/controllers). Las consultas de catálogo, bitácora, directorio y métricas se encuentran en [resourceModel.js](../red-apoyo-oncologico-app-backend/models/resourceModel.js) y [domainModel.js](../red-apoyo-oncologico-app-backend/models/domainModel.js).

## Resultado de la prueba funcional

El 13 de noviembre de 2026 se ejecutó `npm test` desde `pruebas/` contra los tres contenedores Docker locales en `localhost:8080`. El proceso terminó con código de salida 0 y registró estos resultados:

```text
RF08 OK  RF16 OK  RF01 OK  RF02 OK  RF06 OK  RF11 OK
RF07 OK  RF03 OK  RF12 OK  RF13 OK  RF14 OK  RF15 OK
RF04 OK  RF05 OK  RF09 OK  RF17 OK  RF18 OK  RF10 OK
18/18 requerimientos verificados
```

El recorrido usa Edge para login, consulta del recurso, favoritos y filtros del directorio. La creación y edición administrativas y la bitácora se comprueban por HTTP y mediante lecturas posteriores de la API. Esas operaciones también tienen pantallas implementadas, indicadas en la matriz. La prueba automatizada no sustituye una demostración manual de cada formulario administrativo.

## Progreso entre entregas

| Área | EP1 | EP2 | Entrega final |
| --- | --- | --- | --- |
| Perfil y persistencia | El prototipo gestionaba la sesión y datos en el navegador. | El cliente pasó a usar Express, JWT y PostgreSQL. El servidor comprueba los roles. | Los escenarios cruzan dos sesiones reales y verifican la persistencia consultando el dato después de cada escritura. |
| Interfaz | Se definieron los flujos en Figma y la navegación Ionic. | Las pantallas consumían la API y el enrutador importaba las vistas al inicio. | Las pantallas se cargan por demanda. Se habilitó zoom, se añadieron nombres accesibles a controles y se corrigió contraste. Se probaron 14 rutas en tres anchos. |
| Validación y errores | Los flujos iniciales usaban datos simulados. | Se incorporaron validaciones y permisos, incluyendo la edición de bitácoras por su propietario. | La suite de EF comprueba tipos de directorio, cambios parciales de bitácora, JSON inválido y manejo de fallos externos. Se validaron permisos entre cuentas en Docker. |
| Consultas | El catálogo se consultaba localmente. | El listado SQL compartía los campos del detalle, incluido el texto completo. | El listado omite el contenido y agrupa conteos. Se midió el p95 con 1000 altas temporales por tabla y 20 solicitudes simultáneas. |
| Integración y arranque | Prototipo de interfaz. | Frontend, API y PostgreSQL se configuraban por separado. | Compose construye ambas imágenes, inicializa el esquema y comprueba la salud de los servicios. El directorio consulta Open-Meteo con caché y tiempo máximo de espera. |

La comparación se basa en el [cliente de EP1](https://github.com/Javieripf/red-apoyo-oncologico-app/blob/dd49f07/src/services/api.ts), el [frontend previo a EF](https://github.com/Javieripf/red-apoyo-oncologico-app/tree/c8597f4), el [backend previo a EF](https://github.com/Javieripf/red-apoyo-oncologico-app/tree/c8a7f1b) y los [resultados de accesibilidad, seguridad y carga](evidencias-ef/PRUEBAS_ADICIONALES.md).

## Repetir la verificación

Usar una instalación de prueba preparada según los pasos 3.1 a 3.5 del [README final](../README_ENTREGA_FINAL.md), con los datos semilla y el administrador creado. En el equipo que lanza los escenarios se requieren Node.js 20.6 o posterior, npm y Microsoft Edge. Desde la raíz del proyecto, ejecutar en PowerShell

```powershell
Set-Location .\pruebas
npm ci
npm test
```

La prueba lee las credenciales administrativas y `WEB_PORT` del archivo `.env` de la raíz. Registra una cuenta de prueba única por ejecución. El administrador retira los datos de catálogo creados por la prueba y el usuario elimina sus dos entradas de bitácora. La cuenta sigue en la base hasta retirar el volumen de prueba. El resultado esperado es `18/18 requerimientos verificados`. Una aserción fallida devuelve un código de salida distinto de cero.

## Registro de instalación del 13 de noviembre de 2026

Se extrajo el ZIP en una carpeta vacía de Windows, se copiaron las variables de `.env.example` a un `.env` con claves nuevas y se eligió `WEB_PORT=18083` para mantener disponible la instalación de 8080. Compose creó un proyecto independiente con un volumen PostgreSQL nuevo. La validación de Compose, la construcción y los tres controles de salud pasaron. El endpoint `/api/health` devolvió `ok` y `connected`. El comando `seed:admin` creó la cuenta.

Los escenarios completaron **18/18** verificaciones. Una consulta adicional a `GET /api/directorio/d3/ubicacion` obtuvo coordenadas para **Viña del Mar** con atribución **Open-Meteo / GeoNames**. Las pruebas de carga y accesibilidad corresponden a la ejecución del 12 de noviembre descrita en el informe enlazado arriba.
