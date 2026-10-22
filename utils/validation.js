import { HttpError } from './http.js';

export const relaciones = ['pareja','hijo_a','padre_madre','familiar','amigo_a','cuidador_a'];
export const categorias = ['apoyo_emocional','comunicacion','autocuidado','aspectos_practicos','informacion_medica_general'];
export const estados = ['tranquilo_a','triste','ansioso_a','cansado_a','esperanzado_a','abrumado_a'];
export const cleanEmail = value => typeof value === 'string' ? value.trim().toLowerCase() : '';
export function string(value, campo, min = 1, max = 255) {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) {
    throw new HttpError(400, `${campo} debe tener entre ${min} y ${max} caracteres.`, 'VALIDACION');
  }
  return value.trim();
}
export function email(value) {
  const correo = cleanEmail(value);
  if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) throw new HttpError(400, 'Ingresa un correo válido.', 'VALIDACION');
  return correo;
}
export function password(value) {
  if (typeof value !== 'string' || value.length < 8 || Buffer.byteLength(value, 'utf8') > 72)
    throw new HttpError(400, 'La contraseña debe tener al menos 8 caracteres y hasta 72 bytes.', 'VALIDACION');
  return value;
}
export function choice(value, values, campo) {
  if (!values.includes(value)) throw new HttpError(400, `${campo} no es válido.`, 'VALIDACION');
  return value;
}
export function validateResource(b) {
  if (!b || typeof b !== 'object' || Array.isArray(b)) throw new HttpError(400, 'El cuerpo debe ser un objeto.', 'VALIDACION');
  if (!Array.isArray(b.perfiles) || b.perfiles.length < 1 || b.perfiles.length > relaciones.length || new Set(b.perfiles).size !== b.perfiles.length)
    throw new HttpError(400, 'Selecciona uno o más perfiles diferentes.', 'VALIDACION');
  b.perfiles.forEach(v => choice(v, relaciones, 'Perfil'));
  const min = Number(b.tiempoLecturaMin);
  if (!Number.isInteger(min) || min < 1 || min > 180) throw new HttpError(400, 'tiempoLecturaMin debe ser entero entre 1 y 180.', 'VALIDACION');
  if (b.destacado !== undefined && typeof b.destacado !== 'boolean') throw new HttpError(400, 'destacado debe ser booleano.', 'VALIDACION');
  return {
    titulo: string(b.titulo, 'titulo', 4, 180), resumen: string(b.resumen, 'resumen', 4, 500),
    contenido: string(b.contenido, 'contenido', 11, 10000),
    categoria: choice(b.categoria, categorias, 'Categoría'), perfiles: b.perfiles,
    tiempoLecturaMin: min, destacado: b.destacado === undefined ? null : b.destacado,
  };
}
