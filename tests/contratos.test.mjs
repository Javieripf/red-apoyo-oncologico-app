import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(new URL('../' + path, import.meta.url),'utf8');
test('Login exige ocho caracteres, igual que el backend', () => {
  const login=read('src/pages/Login/Login.tsx');
  assert.match(login,/password\.length >= 8/);
  assert.doesNotMatch(login,/password\.length >= 6/);
});
test('Cliente autentica por JWT real en sessionStorage', () => {
  const api=read('src/services/api.ts');
  assert.match(api,/sessionStorage\.setItem\(TOKEN_KEY/);
  assert.match(api,/Authorization: `Bearer \$\{token\}`/);
  assert.match(api,/request<AuthResult>\('\/auth\/login'/);
});
test('Frontend dispone de operaciones para bitácora y directorio', () => {
  const api=read('src/services/api.ts');
  assert.match(api,/modificarRegistroBitacora/);
  assert.match(api,/eliminarRegistroBitacora/);
  assert.match(api,/crearEntradaDirectorio/);
  assert.match(api,/modificarEntradaDirectorio/);
  assert.match(api,/eliminarEntradaDirectorio/);
});
test('Rutas de administrador incluyen directorio', () => {
  assert.match(read('src/routes/AppRoutes.tsx'),/\/admin\/directorio/);
});
