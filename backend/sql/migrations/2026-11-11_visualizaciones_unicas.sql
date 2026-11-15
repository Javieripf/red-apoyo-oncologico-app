
DELETE FROM visualizaciones a USING visualizaciones b
WHERE a.id > b.id AND a.usuario_id=b.usuario_id AND a.recurso_id=b.recurso_id
  AND ((a.fecha AT TIME ZONE 'UTC')::date) = ((b.fecha AT TIME ZONE 'UTC')::date);
CREATE UNIQUE INDEX IF NOT EXISTS uq_visualizacion_por_dia
ON visualizaciones (usuario_id,recurso_id,((fecha AT TIME ZONE 'UTC')::date));
