import {
  CategoriaRecurso,
  EntradaDirectorio,
  EstadoEmocional,
  Recurso,
  TipoRelacion,
} from '@/types';

export const ETIQUETAS_RELACION: Record<TipoRelacion, string> = {
  pareja: 'Pareja',
  hijo_a: 'Hijo/a',
  padre_madre: 'Padre o madre',
  familiar: 'Familiar',
  amigo_a: 'Amigo/a',
  cuidador_a: 'Cuidador/a',
};

export const ETIQUETAS_CATEGORIA: Record<CategoriaRecurso, string> = {
  apoyo_emocional: 'Apoyo emocional',
  comunicacion: 'Comunicación',
  autocuidado: 'Autocuidado',
  aspectos_practicos: 'Aspectos prácticos',
  informacion_medica_general: 'Información general',
};

export const ETIQUETAS_ESTADO: Record<EstadoEmocional, { label: string; icon: string }> = {
  tranquilo_a: { label: 'Tranquilo/a', icon: '🌿' },
  triste: { label: 'Triste', icon: '💧' },
  ansioso_a: { label: 'Ansioso/a', icon: '🌀' },
  cansado_a: { label: 'Cansado/a', icon: '🌙' },
  esperanzado_a: { label: 'Esperanzado/a', icon: '🌱' },
  abrumado_a: { label: 'Abrumado/a', icon: '🌊' },
};

export const RECURSOS_MOCK: Recurso[] = [
  {
    id: 'r1',
    titulo: 'Qué decir (y qué evitar) cuando no sabes qué decir',
    resumen: 'Frases simples para acompañar sin minimizar lo que la otra persona siente.',
    contenido:
      'Acompañar no significa tener las palabras perfectas. Muchas veces basta con estar presente, escuchar sin apurar la conversación y evitar frases que buscan "arreglar" el momento. Preferir preguntas abiertas como "¿cómo estás hoy?" por sobre afirmaciones como "todo va a estar bien" ayuda a que la persona sienta que su experiencia es válida.',
    categoria: 'comunicacion',
    perfiles: ['pareja', 'hijo_a', 'familiar', 'amigo_a', 'cuidador_a', 'padre_madre'],
    tiempoLecturaMin: 4,
    destacado: true,
    vistas: 342,
    guardados: 58,
  },
  {
    id: 'r2',
    titulo: 'Cuidar a quien cuida: señales de agotamiento',
    resumen: 'Cómo reconocer el desgaste del cuidador antes de que se vuelva crítico.',
    contenido:
      'El agotamiento del cuidador se manifiesta en cansancio persistente, irritabilidad, dificultad para dormir y sensación de estar "siempre encendido". Reconocer estas señales temprano permite pedir ayuda a tiempo: turnarse con otros familiares, aceptar apoyo externo y reservar espacios breves de descanso reales.',
    categoria: 'autocuidado',
    perfiles: ['cuidador_a', 'pareja', 'padre_madre'],
    tiempoLecturaMin: 5,
    destacado: true,
    vistas: 289,
    guardados: 71,
  },
  {
    id: 'r3',
    titulo: 'Hablarle a un hijo o hija sobre el diagnóstico de un padre',
    resumen: 'Cómo adaptar la conversación según la edad, sin ocultar ni sobrecargar.',
    contenido:
      'Los niños y adolescentes perciben cuando algo cambia en la casa, aunque no se les explique. Explicar con honestidad, usando un lenguaje adecuado a la edad, y dejar espacio para preguntas repetidas en distintos momentos, ayuda a reducir la incertidumbre y la sensación de aislamiento.',
    categoria: 'comunicacion',
    perfiles: ['hijo_a', 'padre_madre'],
    tiempoLecturaMin: 6,
    vistas: 156,
    guardados: 34,
  },
  {
    id: 'r4',
    titulo: 'Ser pareja de alguien en tratamiento: sostener sin desaparecer',
    resumen: 'Cómo mantener la propia identidad mientras se acompaña de cerca.',
    contenido:
      'Es común que la pareja de una persona en tratamiento postergue sus propias necesidades. Sostener el vínculo no requiere renunciar a los propios espacios: trabajo, amistades y descanso siguen siendo parte necesaria del equilibrio, tanto propio como de la relación.',
    categoria: 'apoyo_emocional',
    perfiles: ['pareja'],
    tiempoLecturaMin: 5,
    vistas: 198,
    guardados: 40,
  },
  {
    id: 'r5',
    titulo: 'Amistad en tiempos de tratamiento: cómo ayudar sin invadir',
    resumen: 'Formas concretas de ofrecer apoyo cuando no se sabe si es "muy poco" o "demasiado".',
    contenido:
      'Ofrecer ayuda específica ("¿te llevo el jueves a control?") suele ser más útil que un genérico "cualquier cosa avísame". Respetar los tiempos y silencios de la persona, sin desaparecer ni sobre-preguntar, sostiene el vínculo sin generar presión.',
    categoria: 'apoyo_emocional',
    perfiles: ['amigo_a'],
    tiempoLecturaMin: 3,
    vistas: 122,
    guardados: 21,
  },
  {
    id: 'r6',
    titulo: 'Organización práctica: licencias, permisos y trámites frecuentes',
    resumen: 'Una guía breve de los trámites que suelen surgir durante el acompañamiento.',
    contenido:
      'Durante el proceso surgen trámites administrativos que pueden sumar carga a la familia: licencias médicas, permisos laborales y gestiones con isapre o Fonasa. Organizar esta información en un solo lugar reduce la carga mental de quienes acompañan.',
    categoria: 'aspectos_practicos',
    perfiles: ['familiar', 'cuidador_a', 'pareja', 'hijo_a', 'padre_madre'],
    tiempoLecturaMin: 7,
    vistas: 175,
    guardados: 63,
  },
  {
    id: 'r7',
    titulo: 'Diez minutos de respiración consciente para el cuidador',
    resumen: 'Una práctica breve de autocuidado para usar entre una tarea y otra.',
    contenido:
      'No se necesita media hora libre para hacer una pausa real. Diez minutos de respiración lenta, en un lugar tranquilo, pueden bajar la activación del cuerpo y despejar la mente antes de retomar el día.',
    categoria: 'autocuidado',
    perfiles: ['cuidador_a', 'pareja', 'familiar', 'padre_madre', 'amigo_a', 'hijo_a'],
    tiempoLecturaMin: 3,
    vistas: 264,
    guardados: 88,
  },
  {
    id: 'r8',
    titulo: 'Entender el proceso de tratamiento sin volverse experto en oncología',
    resumen: 'Lo esencial para orientarse en las etapas del tratamiento sin abrumarse.',
    contenido:
      'No es necesario dominar términos médicos para acompañar bien. Conocer las etapas generales del proceso —diagnóstico, tratamiento, controles— ayuda a anticipar cambios de rutina y a hacer mejores preguntas al equipo tratante, sin reemplazar su orientación.',
    categoria: 'informacion_medica_general',
    perfiles: ['familiar', 'pareja', 'hijo_a', 'cuidador_a', 'padre_madre', 'amigo_a'],
    tiempoLecturaMin: 6,
    vistas: 210,
    guardados: 45,
  },
];

export const DIRECTORIO_MOCK: EntradaDirectorio[] = [
  {
    id: 'd1',
    nombre: 'Centro de Apoyo Psico-oncológico Renacer',
    tipo: 'especialista',
    especialidad: 'Psicología para familiares y cuidadores',
    modalidad: 'mixta',
    ciudad: 'Santiago',
    contacto: 'contacto@renacer-apoyo.cl',
    descripcion: 'Atención individual y familiar enfocada en el proceso de acompañamiento oncológico.',
  },
  {
    id: 'd2',
    nombre: 'Grupo de apoyo para parejas cuidadoras',
    tipo: 'grupo_de_apoyo',
    especialidad: 'Encuentro semanal de pares',
    modalidad: 'online',
    ciudad: 'Nacional',
    contacto: 'grupoparejas@redapoyo.cl',
    descripcion: 'Espacio de conversación guiado, una vez por semana, para parejas en rol de cuidado.',
  },
  {
    id: 'd3',
    nombre: 'Fundación Juntos Podemos',
    tipo: 'grupo_de_apoyo',
    especialidad: 'Apoyo a hijos e hijas de personas con cáncer',
    modalidad: 'presencial',
    ciudad: 'Viña del Mar',
    contacto: '+56 9 1234 5678',
    descripcion: 'Talleres mensuales dirigidos a adolescentes y jóvenes adultos.',
  },
  {
    id: 'd4',
    nombre: 'Dra. Marcela Iturra — Psicóloga clínica',
    tipo: 'especialista',
    especialidad: 'Duelo anticipado y ansiedad asociada al cuidado',
    modalidad: 'online',
    ciudad: 'Valparaíso',
    contacto: 'miturra@consulta-psi.cl',
    descripcion: 'Consulta particular con experiencia en acompañamiento a familias oncológicas.',
  },
  {
    id: 'd5',
    nombre: 'Línea de escucha Red de Apoyo',
    tipo: 'grupo_de_apoyo',
    especialidad: 'Contención telefónica inmediata',
    modalidad: 'online',
    ciudad: 'Nacional',
    contacto: '800 200 300',
    descripcion: 'Línea de escucha gratuita, disponible de lunes a sábado, 9:00 a 21:00.',
  },
];
