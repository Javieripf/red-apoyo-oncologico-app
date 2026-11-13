const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { chromium } = require('playwright-core');

const origin = 'http://localhost:' + (process.env.WEB_PORT || '8080');
const user = { correo: 'ef-' + randomUUID() + '@example.com', password: randomUUID(),
  nombre: 'Persona de prueba', tipoRelacion: 'familiar' };
const checked = new Set();
function pass(id) {
  checked.add(id);
  console.log(id, 'OK');
}
async function api(path, { method = 'GET', token, body, status = 200 } = {}) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  if (body) headers['Content-Type'] = 'application/json';
  const response = await fetch(origin + '/api' + path, {
    method, headers, body: body && JSON.stringify(body), signal: AbortSignal.timeout(15000)
  });
  assert.equal(response.status, status, method + ' ' + path + ' devolvió ' + response.status);
  if (status !== 204) return (await response.json()).data;
}
async function diary(token) {
  const create = (estado, nota) => api('/bitacora', {method:'POST', token, body:{estado, nota}, status:201});
  const first = await create('tranquilo_a', 'Primer registro');
  const second = await create('cansado_a', 'Segundo registro');
  let history = await api('/bitacora', {token});
  assert.equal(history.find(e => e.id === first.id)?.estado, 'tranquilo_a');
  pass('RF03');
  assert.deepEqual(history.slice(0, 2).map(e => e.id), [second.id, first.id]);
  pass('RF12');
  const path = '/bitacora/' + first.id;
  await api(path, {method:'PATCH', token, body:{estado:'esperanzado_a'}});
  history = await api('/bitacora', {token});
  assert.equal(history.find(e => e.id === first.id)?.estado, 'esperanzado_a');
  pass('RF13');
  await api(path, {method:'PATCH', token, body:{nota:'Nota corregida'}});
  const edited = (await api('/bitacora', {token})).find(e => e.id === first.id);
  assert.equal(edited.nota, 'Nota corregida');
  assert.equal(edited.estado, 'esperanzado_a');
  pass('RF14');
  await api(path, {method:'DELETE', token, status:204});
  assert.ok(!(await api('/bitacora', {token})).some(e => e.id === first.id));
  pass('RF15');
  await api('/bitacora/' + second.id, {method:'DELETE', token, status:204});
}
async function useDirectory(page) {
  await page.goto(origin + '/directorio');
  const search = page.getByRole('searchbox');
  const group = page.getByText('Taller de autocuidado (demostración)', {exact:true});
  const specialist = page.getByText('Directorio de apoyo (demostración)', {exact:true});
  await specialist.waitFor();
  await search.fill('Viña del Mar');
  await group.waitFor();
  await specialist.waitFor({state:'hidden'});
  pass('RF04');
  await search.fill('');
  await specialist.waitFor();
  await page.locator('ion-segment-button[value="grupo_de_apoyo"]').click();
  await specialist.waitFor({state:'hidden'});
  await group.waitFor();
  await page.reload();
  await group.waitFor();
  assert.equal(await specialist.count(), 0);
  pass('RF05');
}
async function run() {
  assert.ok(process.env.ADMIN_PASSWORD && process.env.ADMIN_EMAIL, 'Configura la cuenta admin en .env y ejecuta seed:admin.');
  const browser = await chromium.launch({ channel: process.env.EF_BROWSER || 'msedge' });
  const clean = [];
  try {
    const admin = (await api('/auth/login', {method:'POST', body:{
      correo:process.env.ADMIN_EMAIL, password:process.env.ADMIN_PASSWORD
    }})).token;
    async function publish(path, body) {
      const record = await api(path, {method:'POST', body, token:admin, status:201});
      clean.push(path + '/' + record.id);
      return record.id;
    }
    async function withdraw(path) {
      await api(path, {method:'DELETE', token:admin, status:204});
      clean.splice(clean.indexOf(path), 1);
    }
    try {
      const title = 'Guía de acompañamiento ' + randomUUID().slice(0,8);
      const draft = {titulo:title, resumen:'Para familiares', contenido:'Contenido de prueba para la familia.',
        categoria:'autocuidado', tiempoLecturaMin:3, perfiles:['familiar'], destacado:false};
      const id = await publish('/recursos', draft);
      const resource = '/recursos/' + id;
      assert.equal((await api(resource, {token:admin})).titulo, title);
      pass('RF08');
      const entry = {nombre:title, tipo:'grupo_de_apoyo', especialidad:'Apoyo familiar', ciudad:'Santiago',
        modalidad:'presencial', contacto:'grupo@example.com', descripcion:'Entrada temporal de prueba'};
      const entryId = await publish('/directorio', entry);
      const directory = '/directorio/' + entryId;
      const readEntry = async token => (await api('/directorio', {token})).find(e => e.id === entryId);
      assert.equal((await readEntry(admin)).nombre, title);
      pass('RF16');
      await api('/auth/register', {method:'POST', body:user, status:201});
      const page = await browser.newPage();
      await page.goto(origin + '/login');
      await page.locator('input[type=email]').fill(user.correo);
      await page.locator('input[type=password]').fill(user.password);
      await page.getByRole('button', {name:'Iniciar sesión'}).click();
      await page.waitForURL('**/inicio');
      const token = (await api('/auth/login', {method:'POST', body:{correo:user.correo,password:user.password}})).token;
      assert.equal((await api('/auth/me', {token})).tipoRelacion, 'familiar');
      pass('RF01');
      await page.getByText(title, {exact:true}).waitFor();
      assert.ok(!(await api('/recursos?perfil=pareja', {token})).some(r => r.id === id));
      pass('RF02');
      await page.goto(origin + resource);
      await page.getByText(draft.contenido, {exact:true}).waitFor();
      await page.getByRole('button', {name:'Guardar en favoritos'}).click();
      await page.getByRole('button', {name:'Guardado en favoritos'}).waitFor();
      await page.goto(origin + '/favoritos');
      await page.getByText(title, {exact:true}).waitFor();
      pass('RF06');
      await api('/metricas', {token, status:403});
      const metrics = await api('/metricas', {token:admin});
      const count = metrics.porRecurso.find(r => r.recursoId === id);
      assert.equal(count.vistas, 1);
      assert.equal(count.guardados, 1);
      pass('RF11');
      await page.getByRole('button', {name:'Quitar de favoritos'}).click();
      await page.getByText('Aún no has guardado recursos.').waitFor();
      assert.ok(!(await api('/favoritos', {token})).includes(id));
      pass('RF07');
      await diary(token);
      await useDirectory(page);
      const updated = title + ' revisada';
      await api(resource, {method:'PUT', token:admin, body:{...draft, titulo:updated}});
      assert.equal((await api(resource, {token})).titulo, updated);
      pass('RF09');
      await api(directory, {method:'PUT', token:admin, body:{...entry, nombre:updated}});
      assert.equal((await readEntry(token)).nombre, updated);
      pass('RF17');
      await withdraw(directory);
      assert.equal(await readEntry(token), undefined);
      pass('RF18');
      await withdraw(resource);
      await api(resource, {token, status:404});
      pass('RF10');
      assert.equal(checked.size, 18);
      console.log('18/18 requerimientos verificados');
    } finally {
      for (const path of clean.reverse()) await api(path, {method:'DELETE', token:admin, status:204});
    }
  } finally { await browser.close(); }
}
run().catch(error => { console.error(error.message); process.exitCode = 1; });
