import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { findByEmail, createUser, updateUserRelationship } from '../models/userModel.js';
import { getConfig } from '../config/env.js';
import { HttpError, success, asyncHandler } from '../utils/http.js';
import { email, password, string, choice, relaciones } from '../utils/validation.js';

const tokenFor = user => jwt.sign({ role: user.rol }, getConfig().jwtSecret,
  { subject: user.id, expiresIn: getConfig().jwtExpiresIn, algorithm: 'HS256' });

export const register = asyncHandler(async (req,res) => {
  const nombre=string(req.body?.nombre,'nombre',2,100);
  const correo=email(req.body?.correo);
  const clave=password(req.body?.password);
  const relacion=choice(req.body?.tipoRelacion,relaciones,'Relación');
  const hash=await bcrypt.hash(clave,12);
  const usuario=await createUser({id:randomUUID(),nombre,correo,hash,relacion});
  success(res,{usuario,token:tokenFor(usuario)},201);
});
export const login = asyncHandler(async (req,res) => {
  const correo=email(req.body?.correo);
  const clave=req.body?.password;
  if (typeof clave!=='string' || !clave.length || Buffer.byteLength(clave,'utf8')>72)
    throw new HttpError(401,'Correo o contraseña incorrectos.','CREDENCIALES_INVALIDAS');
  const found=await findByEmail(correo);
  if (!found || !(await bcrypt.compare(clave,found.password_hash)))
    throw new HttpError(401,'Correo o contraseña incorrectos.','CREDENCIALES_INVALIDAS');
  const {password_hash, ...usuario}=found;
  success(res,{usuario,token:tokenFor(usuario)});
});
export const me=(req,res)=>success(res,req.user);
export const updateMe=asyncHandler(async (req,res) => {
  if (req.user.rol!=='usuario') throw new HttpError(403,'Solo los usuarios actualizan su relación.','PROHIBIDO');
  const relacion=choice(req.body?.tipoRelacion,relaciones,'Relación');
  success(res,await updateUserRelationship(req.user.id,relacion));
});
