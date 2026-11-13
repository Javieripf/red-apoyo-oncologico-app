import { query } from '../config/db.js';

export async function getDiary(userId) {
  const { rows } = await query('SELECT id,fecha,estado,nota FROM bitacora WHERE usuario_id=$1 ORDER BY fecha DESC LIMIT 100',[userId]);
  return rows;
}
export async function createDiaryEntry({ id, userId, estado, nota }) {
  const { rows } = await query('INSERT INTO bitacora (id,usuario_id,estado,nota) VALUES ($1,$2,$3,$4) RETURNING id,fecha,estado,nota',[id,userId,estado,nota]);
  return rows[0];
}
export async function updateDiaryEntry(id,userId,{estado,nota}) {
  const {rows} = await query(`UPDATE bitacora
    SET estado=COALESCE($3,estado), nota=CASE WHEN $4::boolean THEN $5 ELSE nota END
    WHERE id=$1 AND usuario_id=$2 RETURNING id,fecha,estado,nota`,
    [id,userId,estado ?? null,nota !== undefined,nota ?? null]);
  return rows[0] ?? null;
}
export async function removeDiaryEntry(id,userId) {
  const result=await query('DELETE FROM bitacora WHERE id=$1 AND usuario_id=$2',[id,userId]);
  return result.rowCount>0;
}
export async function getDirectory() {
  const { rows } = await query('SELECT id,nombre,tipo,especialidad,modalidad,ciudad,contacto,descripcion FROM directorio ORDER BY nombre');
  return rows;
}
export async function getDirectoryEntry(id) {
  const { rows } = await query('SELECT id, ciudad, modalidad FROM directorio WHERE id=$1', [id]);
  return rows[0] ?? null;
}
export async function createDirectoryEntry(id,entry) {
  const {rows}=await query(`INSERT INTO directorio (id,nombre,tipo,especialidad,modalidad,ciudad,contacto,descripcion)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [id,entry.nombre,entry.tipo,entry.especialidad,entry.modalidad,entry.ciudad,entry.contacto,entry.descripcion]);
  return rows[0];
}
export async function updateDirectoryEntry(id,entry) {
  const {rows}=await query(`UPDATE directorio SET nombre=$2,tipo=$3,especialidad=$4,modalidad=$5,ciudad=$6,contacto=$7,descripcion=$8
    WHERE id=$1 RETURNING *`,
    [id,entry.nombre,entry.tipo,entry.especialidad,entry.modalidad,entry.ciudad,entry.contacto,entry.descripcion]);
  return rows[0] ?? null;
}
export async function removeDirectoryEntry(id) {
  const result=await query('DELETE FROM directorio WHERE id=$1',[id]);
  return result.rowCount>0;
}
export async function getFavorites(userId) {
  const { rows } = await query('SELECT recurso_id FROM favoritos WHERE usuario_id=$1 ORDER BY agregado_en DESC',[userId]);
  return rows.map(r=>r.recurso_id);
}
export async function resourceExists(resourceId) {
  const result = await query('SELECT 1 FROM recursos WHERE id=$1',[resourceId]);
  return result.rowCount>0;
}
export async function addFavoriteRecord(userId,resourceId) {
  const result=await query('INSERT INTO favoritos (usuario_id,recurso_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',[userId,resourceId]);
  return result.rowCount>0;
}
export async function removeFavoriteRecord(userId,resourceId) {
  await query('DELETE FROM favoritos WHERE usuario_id=$1 AND recurso_id=$2',[userId,resourceId]);
}
export async function getResourceMetrics() {
  const { rows: porRecurso } = await query(`SELECT r.id AS "recursoId", r.titulo,
    COALESCE(v.vistas,0) AS vistas, COALESCE(f.guardados,0) AS guardados
    FROM recursos r
    LEFT JOIN (SELECT recurso_id, COUNT(*)::integer AS vistas FROM visualizaciones GROUP BY recurso_id) v ON v.recurso_id=r.id
    LEFT JOIN (SELECT recurso_id, COUNT(*)::integer AS guardados FROM favoritos GROUP BY recurso_id) f ON f.recurso_id=r.id
    ORDER BY vistas DESC, r.titulo`);
  const { rows: porPerfil } = await query(`SELECT u.tipo_relacion AS "tipoRelacion", COUNT(*)::integer AS vistas
    FROM visualizaciones v JOIN usuarios u ON u.id=v.usuario_id
    WHERE u.tipo_relacion IS NOT NULL GROUP BY u.tipo_relacion ORDER BY vistas DESC`);
  return { porRecurso, porPerfil };
}
