import { query, transaction } from '../config/db.js';

const fields = `r.id, r.titulo, r.resumen, r.contenido, r.categoria,
  r.tiempo_lectura_min AS "tiempoLecturaMin", r.destacado,
  ARRAY(SELECT tipo_relacion FROM recurso_perfiles WHERE recurso_id=r.id ORDER BY tipo_relacion) AS perfiles,
  (SELECT COUNT(*)::integer FROM visualizaciones WHERE recurso_id=r.id) AS vistas,
  (SELECT COUNT(*)::integer FROM favoritos WHERE recurso_id=r.id) AS guardados`;

export async function findResourceById(id) {
  const { rows } = await query(`SELECT ${fields} FROM recursos r WHERE r.id=$1`, [id]);
  return rows[0] ?? null;
}
export async function findResources({ perfil, categoria } = {}) {
  const conditions = [], values = [];
  if (perfil) {
    values.push(perfil);
    conditions.push(`EXISTS (SELECT 1 FROM recurso_perfiles p WHERE p.recurso_id=r.id AND p.tipo_relacion=$${values.length})`);
  }
  if (categoria) {
    values.push(categoria);
    conditions.push(`r.categoria=$${values.length}`);
  }
  const where = conditions.length ? ' WHERE ' + conditions.join(' AND ') : '';
  const { rows } = await query(`SELECT ${fields} FROM recursos r${where} ORDER BY r.destacado DESC, r.creado_en DESC`, values);
  return rows;
}
export async function recordView(userId, resourceId) {
  await query('INSERT INTO visualizaciones (usuario_id,recurso_id) VALUES ($1,$2)', [userId,resourceId]);
}
export async function createResourceRecord(id,b) {
  await transaction(async client => {
    await client.query('INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [id,b.titulo,b.resumen,b.contenido,b.categoria,b.tiempoLecturaMin,b.destacado ?? false]);
    for (const p of b.perfiles) await client.query('INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ($1,$2)',[id,p]);
  });
  return findResourceById(id);
}
export async function updateResourceRecord(id,b) {
  const modified = await transaction(async client => {
    const result = await client.query('UPDATE recursos SET titulo=$2,resumen=$3,contenido=$4,categoria=$5,tiempo_lectura_min=$6,destacado=COALESCE($7,destacado),actualizado_en=NOW() WHERE id=$1 RETURNING id',
      [id,b.titulo,b.resumen,b.contenido,b.categoria,b.tiempoLecturaMin,b.destacado]);
    if (!result.rowCount) return false;
    await client.query('DELETE FROM recurso_perfiles WHERE recurso_id=$1',[id]);
    for (const p of b.perfiles) await client.query('INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ($1,$2)',[id,p]);
    return true;
  });
  return modified ? findResourceById(id) : null;
}
export async function deleteResourceRecord(id) {
  const result = await query('DELETE FROM recursos WHERE id=$1',[id]);
  return result.rowCount > 0;
}
