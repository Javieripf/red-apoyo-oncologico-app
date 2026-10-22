-- Recursos de demostración basados en las tarjetas EP1. No representan información clínica verificada.
BEGIN;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r1', 'Qué decir (y qué evitar) cuando no sabes qué decir', 'Frases simples para acompañar sin minimizar lo que la otra persona siente.', 'Acompañar no significa tener las palabras perfectas. Muchas veces basta con estar presente, escuchar sin apurar la conversación y evitar frases que buscan "arreglar" el momento. Preferir preguntas abiertas como "¿cómo estás hoy?" por sobre afirmaciones como "todo va a estar bien" ayuda a que la persona sienta que su experiencia es válida.', 'comunicacion', 4, TRUE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r1', 'pareja') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r1', 'hijo_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r1', 'familiar') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r1', 'amigo_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r1', 'cuidador_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r1', 'padre_madre') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r2', 'Cuidar a quien cuida: señales de agotamiento', 'Cómo reconocer el desgaste del cuidador antes de que se vuelva crítico.', 'El agotamiento del cuidador se manifiesta en cansancio persistente, irritabilidad, dificultad para dormir y sensación de estar "siempre encendido". Reconocer estas señales temprano permite pedir ayuda a tiempo: turnarse con otros familiares, aceptar apoyo externo y reservar espacios breves de descanso reales.', 'autocuidado', 5, TRUE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r2', 'cuidador_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r2', 'pareja') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r2', 'padre_madre') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r3', 'Hablarle a un hijo o hija sobre el diagnóstico de un padre', 'Cómo adaptar la conversación según la edad, sin ocultar ni sobrecargar.', 'Los niños y adolescentes perciben cuando algo cambia en la casa, aunque no se les explique. Explicar con honestidad, usando un lenguaje adecuado a la edad, y dejar espacio para preguntas repetidas en distintos momentos, ayuda a reducir la incertidumbre y la sensación de aislamiento.', 'comunicacion', 6, FALSE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r3', 'hijo_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r3', 'padre_madre') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r4', 'Ser pareja de alguien en tratamiento: sostener sin desaparecer', 'Cómo mantener la propia identidad mientras se acompaña de cerca.', 'Es común que la pareja de una persona en tratamiento postergue sus propias necesidades. Sostener el vínculo no requiere renunciar a los propios espacios: trabajo, amistades y descanso siguen siendo parte necesaria del equilibrio, tanto propio como de la relación.', 'apoyo_emocional', 5, FALSE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r4', 'pareja') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r5', 'Amistad en tiempos de tratamiento: cómo ayudar sin invadir', 'Formas concretas de ofrecer apoyo cuando no se sabe si es "muy poco" o "demasiado".', 'Ofrecer ayuda específica ("¿te llevo el jueves a control?") suele ser más útil que un genérico "cualquier cosa avísame". Respetar los tiempos y silencios de la persona, sin desaparecer ni sobre-preguntar, sostiene el vínculo sin generar presión.', 'apoyo_emocional', 3, FALSE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r5', 'amigo_a') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r6', 'Organización práctica: licencias, permisos y trámites frecuentes', 'Una guía breve de los trámites que suelen surgir durante el acompañamiento.', 'Durante el proceso surgen trámites administrativos que pueden sumar carga a la familia: licencias médicas, permisos laborales y gestiones con isapre o Fonasa. Organizar esta información en un solo lugar reduce la carga mental de quienes acompañan.', 'aspectos_practicos', 7, FALSE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r6', 'familiar') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r6', 'cuidador_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r6', 'pareja') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r6', 'hijo_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r6', 'padre_madre') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r7', 'Diez minutos de respiración consciente para el cuidador', 'Una práctica breve de autocuidado para usar entre una tarea y otra.', 'No se necesita media hora libre para hacer una pausa real. Diez minutos de respiración lenta, en un lugar tranquilo, pueden bajar la activación del cuerpo y despejar la mente antes de retomar el día.', 'autocuidado', 3, FALSE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r7', 'cuidador_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r7', 'pareja') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r7', 'familiar') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r7', 'padre_madre') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r7', 'amigo_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r7', 'hijo_a') ON CONFLICT DO NOTHING;
INSERT INTO recursos (id,titulo,resumen,contenido,categoria,tiempo_lectura_min,destacado) VALUES ('r8', 'Entender el proceso de tratamiento sin volverse experto en oncología', 'Lo esencial para orientarse en las etapas del tratamiento sin abrumarse.', 'No es necesario dominar términos médicos para acompañar bien. Conocer las etapas generales del proceso —diagnóstico, tratamiento, controles— ayuda a anticipar cambios de rutina y a hacer mejores preguntas al equipo tratante, sin reemplazar su orientación.', 'informacion_medica_general', 6, FALSE) ON CONFLICT (id) DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r8', 'familiar') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r8', 'pareja') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r8', 'hijo_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r8', 'cuidador_a') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r8', 'padre_madre') ON CONFLICT DO NOTHING;
INSERT INTO recurso_perfiles (recurso_id,tipo_relacion) VALUES ('r8', 'amigo_a') ON CONFLICT DO NOTHING;
INSERT INTO directorio (id,nombre,tipo,especialidad,modalidad,ciudad,contacto,descripcion) VALUES
('d1','Directorio de apoyo (demostración)','especialista','Psicología para familiares y cuidadores','online','Nacional','Contacto no disponible','Registro ficticio para probar filtros; no corresponde a un servicio verificado.'),
('d2','Grupo de conversación (demostración)','grupo_de_apoyo','Acompañamiento entre pares','online','Nacional','Contacto no disponible','Registro ficticio para pruebas de la interfaz; no corresponde a una organización verificada.'),
('d3','Taller de autocuidado (demostración)','grupo_de_apoyo','Autocuidado de cuidadores','presencial','Viña del Mar','Contacto no disponible','Registro ficticio para probar la búsqueda; no se ofrece atención mediante esta entrada.')
ON CONFLICT (id) DO NOTHING;
COMMIT;
