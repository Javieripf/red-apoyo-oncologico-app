// Capa de datos de usuarios. Consultas parametrizadas para evitar SQL injection.
import { query } from '../config/db.js';

export const userCols = 'id, nombre, correo, rol, tipo_relacion AS "tipoRelacion", (tipo_relacion IS NOT NULL) AS "perfilConfigurado"';

export async function findById(id) {
  const { rows } = await query(`SELECT ${userCols} FROM usuarios WHERE id = $1`, [id]);
  return rows[0] ?? null;
}
export async function findByEmail(correo) {
  const { rows } = await query(`SELECT ${userCols}, password_hash FROM usuarios WHERE correo = $1`, [correo]);
  return rows[0] ?? null;
}
export async function createUser({ id, nombre, correo, hash, relacion }) {
  const { rows } = await query(`INSERT INTO usuarios (id,nombre,correo,password_hash,rol,tipo_relacion)
    VALUES ($1,$2,$3,$4,'usuario',$5) RETURNING ${userCols}`,
    [id,nombre,correo,hash,relacion]);
  return rows[0];
}
export async function updateUserRelationship(id, relacion) {
  const { rows } = await query(`UPDATE usuarios SET tipo_relacion=$1 WHERE id=$2 RETURNING ${userCols}`, [relacion,id]);
  return rows[0] ?? null;
}
export async function createAdmin({ id, nombre, correo, hash }) {
  const result = await query(`INSERT INTO usuarios (id,nombre,correo,password_hash,rol)
    VALUES ($1,$2,$3,$4,'administrador') ON CONFLICT (correo) DO NOTHING`, [id,nombre,correo,hash]);
  return result.rowCount > 0;
}
