import { query } from '../config/db.js';

export async function getDiary(userId) {
  const { rows } = await query('SELECT id,fecha,estado,nota FROM bitacora WHERE usuario_id=$1 ORDER BY fecha DESC LIMIT 100',[userId]);
  return rows;
}
export async function createDiaryEntry({ id, userId, estado, nota }) {
  const { rows } = await query('INSERT INTO bitacora (id,usuario_id,estado,nota) VALUES ($1,$2,$3,$4) RETURNING id,fecha,estado,nota',[id,userId,estado,nota]);
  return rows[0];
}
export async function getDirectory() {
  const { rows } = await query('SELECT id,nombre,tipo,especialidad,modalidad,ciudad,contacto,descripcion FROM directorio ORDER BY nombre');
  return rows;
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
  await query('INSERT INTO favoritos (usuario_id,recurso_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',[userId,resourceId]);
}
export async function removeFavoriteRecord(userId,resourceId) {
  await query('DELETE FROM favoritos WHERE usuario_id=$1 AND recurso_id=$2',[userId,resourceId]);
}
export async function getResourceMetrics() {
  const { rows: porRecurso } = await query(`SELECT r.id AS "recursoId", r.titulo,
    (SELECT COUNT(*)::integer FROM visualizaciones v WHERE v.recurso_id=r.id) AS vistas,
    (SELECT COUNT(*)::integer FROM favoritos f WHERE f.recurso_id=r.id) AS guardados
    FROM recursos r ORDER BY vistas DESC, r.titulo`);
  const { rows: porPerfil } = await query(`SELECT u.tipo_relacion AS "tipoRelacion", COUNT(*)::integer AS vistas
    FROM visualizaciones v JOIN usuarios u ON u.id=v.usuario_id
    WHERE u.tipo_relacion IS NOT NULL GROUP BY u.tipo_relacion ORDER BY vistas DESC`);
  return { porRecurso, porPerfil };
}
