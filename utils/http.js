export class HttpError extends Error {
  constructor(status, message, code = 'SOLICITUD_INVALIDA') {
    super(message); this.status = status; this.code = code;
  }
}
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
export const success = (res, data, status = 200) => res.status(status).json({ data });
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err.code === '23505') return res.status(409).json({ error: { codigo: 'DUPLICADO', mensaje: 'Ya existe un registro con esos datos.' } });
  if (err.code === '23503') return res.status(409).json({ error: { codigo: 'RELACION_INEXISTENTE', mensaje: 'No existe el registro relacionado.' } });
  if (err.code === '22P02') return res.status(400).json({ error: { codigo: 'FORMATO_INVALIDO', mensaje: 'Uno de los valores tiene un formato incorrecto.' } });
  if (err.status && err.status < 500) return res.status(err.status).json({ error: { codigo: err.code, mensaje: err.message } });
  console.error('Error interno:', err.message);
  return res.status(500).json({ error: { codigo: 'ERROR_INTERNO', mensaje: 'No fue posible completar la solicitud.' } });
};
