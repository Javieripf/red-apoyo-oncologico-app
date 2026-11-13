import { HttpError } from '../utils/http.js';

const cache = new Map();
const TTL_MS = 24 * 60 * 60 * 1000;

// La URL externa es fija: la ciudad solo se envía como parámetro codificado.
export async function geocodeCity(city, { fetchImpl = fetch, now = Date.now } = {}) {
  const key = city.trim().toLocaleLowerCase('es');
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now()) return cached.value;

  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.set('name', city);
  url.searchParams.set('count', '1');
  url.searchParams.set('language', 'es');
  url.searchParams.set('countryCode', 'CL');
  let response;
  try {
    response = await fetchImpl(url, { signal: AbortSignal.timeout(3500) });
  } catch {
    throw new HttpError(502, 'El servicio de ubicaciones no está disponible.', 'SERVICIO_EXTERNO');
  }
  if (!response.ok) throw new HttpError(502, 'El servicio de ubicaciones no respondió.', 'SERVICIO_EXTERNO');
  let data;
  try { data = await response.json(); }
  catch { throw new HttpError(502, 'Respuesta inválida del servicio de ubicaciones.', 'SERVICIO_EXTERNO'); }
  const place = data.results?.[0];
  if (!place || !Number.isFinite(place.latitude) || !Number.isFinite(place.longitude))
    throw new HttpError(404, 'No se encontró esa ciudad en Chile.', 'CIUDAD_NO_ENCONTRADA');
  const value = { ciudad: place.name, region: place.admin1 ?? '', latitud: place.latitude, longitud: place.longitude, fuente: 'Open-Meteo / GeoNames' };
  cache.set(key, { value, expiresAt: now() + TTL_MS });
  if (cache.size > 200) cache.delete(cache.keys().next().value);
  return value;
}
