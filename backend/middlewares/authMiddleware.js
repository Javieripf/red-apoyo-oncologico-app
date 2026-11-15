import jwt from 'jsonwebtoken';
import { getConfig } from '../config/env.js';
import { findById } from '../models/userModel.js';
import { HttpError, asyncHandler } from '../utils/http.js';

export const requireAuth = asyncHandler(async (req, res, next) => {
  const match = /^Bearer (.+)$/i.exec(req.headers.authorization || '');
  if (!match) throw new HttpError(401, 'Debes iniciar sesión.', 'NO_AUTENTICADO');
  let payload;
  try { payload = jwt.verify(match[1], getConfig().jwtSecret, { algorithms: ['HS256'] }); }
  catch { throw new HttpError(401, 'Sesión vencida o no válida.', 'TOKEN_INVALIDO'); }
  const usuario = await findById(payload.sub);
  if (!usuario) throw new HttpError(401, 'La cuenta ya no está disponible.', 'NO_AUTENTICADO');
  req.user = usuario;
  next();
});
export const requireRole = role => (req, res, next) => req.user?.rol === role ? next() : next(new HttpError(403, 'No tienes permisos para esta operación.', 'PROHIBIDO'));
