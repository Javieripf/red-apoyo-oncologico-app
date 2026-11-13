import test from 'node:test';
import assert from 'node:assert/strict';
import { geocodeCity } from '../services/geocoding.js';

test('geocodifica una ciudad con origen fijo, sin enviar otros datos, y usa caché', async () => {
  let calls = 0;
  const fetchImpl = async (url) => {
    calls++;
    assert.equal(url.origin, 'https://geocoding-api.open-meteo.com');
    assert.equal(url.searchParams.get('name'), 'Viña del Mar');
    assert.equal(url.searchParams.get('countryCode'), 'CL');
    return { ok: true, json: async () => ({ results: [{ name: 'Viña del Mar', admin1: 'Valparaíso', latitude: -33.02, longitude: -71.55 }] }) };
  };
  const first = await geocodeCity('Viña del Mar', { fetchImpl, now: () => 100 });
  const second = await geocodeCity('Viña del Mar', { fetchImpl, now: () => 200 });
  assert.equal(calls, 1);
  assert.deepEqual(second, first);
  assert.equal(first.latitud, -33.02);
});

test('falla de servicio externo produce respuesta estable', async () => {
  await assert.rejects(
    geocodeCity('Ciudad de prueba', { fetchImpl: async () => { throw new Error('secreto'); } }),
    { status: 502, code: 'SERVICIO_EXTERNO' },
  );
});
