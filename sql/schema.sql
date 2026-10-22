-- Ejecutar en la base de datos 'red_apoyo': psql -U postgres -d red_apoyo -f sql/schema.sql
-- PostgreSQL 14+. La aplicación gestiona ID UUID como texto, además de IDs semilla (r1...r8).
CREATE TABLE IF NOT EXISTS usuarios (
  id TEXT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL CHECK (length(trim(nombre)) >= 2),
  correo VARCHAR(254) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'usuario' CHECK (rol IN ('usuario','administrador')),
  tipo_relacion VARCHAR(20) CHECK (tipo_relacion IN ('pareja','hijo_a','padre_madre','familiar','amigo_a','cuidador_a')),
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tipo_relacion_segun_rol CHECK (rol='administrador' OR tipo_relacion IS NOT NULL)
);
CREATE TABLE IF NOT EXISTS recursos (
  id TEXT PRIMARY KEY,
  titulo VARCHAR(180) NOT NULL,
  resumen VARCHAR(500) NOT NULL,
  contenido TEXT NOT NULL,
  categoria VARCHAR(40) NOT NULL CHECK (categoria IN ('apoyo_emocional','comunicacion','autocuidado','aspectos_practicos','informacion_medica_general')),
  tiempo_lectura_min INTEGER NOT NULL CHECK (tiempo_lectura_min BETWEEN 1 AND 180),
  destacado BOOLEAN NOT NULL DEFAULT FALSE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS recurso_perfiles (
  recurso_id TEXT NOT NULL REFERENCES recursos(id) ON DELETE CASCADE,
  tipo_relacion VARCHAR(20) NOT NULL CHECK (tipo_relacion IN ('pareja','hijo_a','padre_madre','familiar','amigo_a','cuidador_a')),
  PRIMARY KEY (recurso_id, tipo_relacion)
);
CREATE TABLE IF NOT EXISTS favoritos (
  usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  recurso_id TEXT NOT NULL REFERENCES recursos(id) ON DELETE CASCADE,
  agregado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, recurso_id)
);
CREATE TABLE IF NOT EXISTS bitacora (
  id TEXT PRIMARY KEY,
  usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(25) NOT NULL CHECK (estado IN ('tranquilo_a','triste','ansioso_a','cansado_a','esperanzado_a','abrumado_a')),
  nota VARCHAR(2000)
);
CREATE TABLE IF NOT EXISTS directorio (
  id TEXT PRIMARY KEY,
  nombre VARCHAR(180) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('especialista','grupo_de_apoyo')),
  especialidad VARCHAR(200) NOT NULL,
  modalidad VARCHAR(20) NOT NULL CHECK (modalidad IN ('presencial','online','mixta')),
  ciudad VARCHAR(100) NOT NULL,
  contacto VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS visualizaciones (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  recurso_id TEXT NOT NULL REFERENCES recursos(id) ON DELETE CASCADE,
  fecha TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_bitacora_usuario_fecha ON bitacora(usuario_id, fecha DESC);
CREATE INDEX IF NOT EXISTS idx_visualizaciones_recurso ON visualizaciones(recurso_id);
CREATE INDEX IF NOT EXISTS idx_visualizaciones_usuario ON visualizaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_recurso_perfiles_tipo ON recurso_perfiles(tipo_relacion);
