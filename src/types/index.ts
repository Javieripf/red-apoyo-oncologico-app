// Tipos centrales del sistema — reflejan el modelo descrito en la
// definición funcional (RF01–RF07) y sirven de contrato con la API REST.

export type RolUsuario = 'usuario' | 'administrador';

export type TipoRelacion =
  | 'pareja'
  | 'hijo_a'
  | 'padre_madre'
  | 'familiar'
  | 'amigo_a'
  | 'cuidador_a';

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  tipoRelacion?: TipoRelacion;
  perfilConfigurado: boolean;
}

export type CategoriaRecurso =
  | 'apoyo_emocional'
  | 'comunicacion'
  | 'autocuidado'
  | 'aspectos_practicos'
  | 'informacion_medica_general';

export interface Recurso {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: CategoriaRecurso;
  perfiles: TipoRelacion[];
  tiempoLecturaMin: number;
  destacado?: boolean;
  vistas: number;
  guardados: number;
}

export type EstadoEmocional =
  | 'tranquilo_a'
  | 'triste'
  | 'ansioso_a'
  | 'cansado_a'
  | 'esperanzado_a'
  | 'abrumado_a';

export interface RegistroBitacora {
  id: string;
  fecha: string; // ISO
  estado: EstadoEmocional;
  nota?: string;
}

export type TipoDirectorio = 'especialista' | 'grupo_de_apoyo';

export interface EntradaDirectorio {
  id: string;
  nombre: string;
  tipo: TipoDirectorio;
  especialidad: string;
  modalidad: 'presencial' | 'online' | 'mixta';
  ciudad: string;
  contacto: string;
  descripcion: string;
}

export interface MetricaRecurso {
  recursoId: string;
  titulo: string;
  vistas: number;
  guardados: number;
}

export interface MetricasPorPerfil {
  tipoRelacion: TipoRelacion;
  vistas: number;
}
