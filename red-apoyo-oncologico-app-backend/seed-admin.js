import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { pool } from './config/db.js';
import { createAdmin } from './models/userModel.js';
import { email, password, string } from './utils/validation.js';

try {
  const correo = email(process.env.ADMIN_EMAIL);
  const clave = password(process.env.ADMIN_PASSWORD);
  const nombre = string(process.env.ADMIN_NAME || 'Administrador','Nombre',2,100);
  const hash = await bcrypt.hash(clave,12);
  const creado = await createAdmin({id:randomUUID(),nombre,correo,hash});
  console.log(creado ? `Administrador creado: ${correo}` : `Ya existe una cuenta con correo ${correo}; no se modificó.`);
} catch(err) { console.error(err.message); process.exitCode=1; }
finally { await pool.end(); }
