import {
  EntradaDirectorio,
  MetricaRecurso,
  MetricasPorPerfil,
  Recurso,
  RegistroBitacora,
  TipoRelacion,
  Usuario,
} from '@/types';
import { DIRECTORIO_MOCK, RECURSOS_MOCK } from '@/data/mockData';

// -----------------------------------------------------------------------
// Capa de acceso a datos. Hoy simula la API REST con datos
// en memoria para que las pantallas se construyan como  tendrá el backend real.
// -----------------------------------------------------------------------

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEYS = {
  usuario: 'ra_usuario',
  bitacora: 'ra_bitacora',
  favoritos: 'ra_favoritos',
  recursos: 'ra_recursos',
};

function leerLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function escribirLS<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    
  }
}



export async function login(correo: string, _password: string): Promise<Usuario> {
  await delay();
  const esAdmin = correo.trim().toLowerCase().startsWith('admin');
  const usuario: Usuario = esAdmin
  
  // Usuario de prueba utilizado para simular la sesión según el rol (aunque se puede probar creando otro)
  ? {
      id: 'admin-1',
      nombre: 'Camilo Alvarez',
      correo: 'camilo.alvarez@ejemplo.com',
      rol: 'administrador',
      perfilConfigurado: true,
    }
  : leerLS<Usuario>(STORAGE_KEYS.usuario, {
      id: 'user-1',
      nombre: 'Carolina',
      correo: 'carolina@ejemplo.com',
      rol: 'usuario',
      perfilConfigurado: false,
    });
  escribirLS(STORAGE_KEYS.usuario, usuario);
  return usuario;
}

export async function registrar(datos: {
  nombre: string;
  correo: string;
  tipoRelacion: TipoRelacion;
}): Promise<Usuario> {
  await delay();

  const esAdmin = datos.correo.trim().toLowerCase().startsWith('admin');


  const usuario: Usuario = {
    id: esAdmin ? `admin-${Date.now()}` : `user-${Date.now()}`,
    nombre: datos.nombre,
    correo: datos.correo,
    rol: esAdmin ? 'administrador' : 'usuario',
    tipoRelacion: datos.tipoRelacion,
    perfilConfigurado: true,
  };
  
  escribirLS(STORAGE_KEYS.usuario, usuario);
  return usuario;
}

export async function actualizarPerfil(usuario: Usuario): Promise<Usuario> {
  await delay(150);
  escribirLS(STORAGE_KEYS.usuario, usuario);
  return usuario;
}

export function obtenerSesion(): Usuario | null {
  return leerLS<Usuario | null>(STORAGE_KEYS.usuario, null);
}

export async function cerrarSesion(): Promise<void> {
  await delay(100);
  localStorage.removeItem(STORAGE_KEYS.usuario);
}



function obtenerRecursosBase(): Recurso[] {
  return leerLS<Recurso[]>(STORAGE_KEYS.recursos, RECURSOS_MOCK);
}

export async function listarRecursos(filtroPerfil?: TipoRelacion): Promise<Recurso[]> {
  await delay();
  const todos = obtenerRecursosBase();
  if (!filtroPerfil) return todos;
  return todos.filter((r) => r.perfiles.includes(filtroPerfil));
}

export async function obtenerRecurso(id: string): Promise<Recurso | undefined> {
  await delay(150);
  return obtenerRecursosBase().find((r) => r.id === id);
}

export async function crearRecurso(recurso: Omit<Recurso, 'id' | 'vistas' | 'guardados'>): Promise<Recurso> {
  await delay();
  const nuevo: Recurso = { ...recurso, id: `r-${Date.now()}`, vistas: 0, guardados: 0 };
  const actuales = [nuevo, ...obtenerRecursosBase()];
  escribirLS(STORAGE_KEYS.recursos, actuales);
  return nuevo;
}

export async function actualizarRecurso(id: string, cambios: Partial<Recurso>): Promise<Recurso | undefined> {
  await delay();
  const actuales = obtenerRecursosBase().map((r) => (r.id === id ? { ...r, ...cambios } : r));
  escribirLS(STORAGE_KEYS.recursos, actuales);
  return actuales.find((r) => r.id === id);
}

export async function eliminarRecurso(id: string): Promise<void> {
  await delay();
  const actuales = obtenerRecursosBase().filter((r) => r.id !== id);
  escribirLS(STORAGE_KEYS.recursos, actuales);
}



export async function listarBitacora(): Promise<RegistroBitacora[]> {
  await delay(150);
  return leerLS<RegistroBitacora[]>(STORAGE_KEYS.bitacora, []).sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
}

export async function registrarEstado(registro: Omit<RegistroBitacora, 'id'>): Promise<RegistroBitacora> {
  await delay();
  const nuevo: RegistroBitacora = { ...registro, id: `b-${Date.now()}` };
  const actuales = [nuevo, ...leerLS<RegistroBitacora[]>(STORAGE_KEYS.bitacora, [])];
  escribirLS(STORAGE_KEYS.bitacora, actuales);
  return nuevo;
}



export async function listarDirectorio(): Promise<EntradaDirectorio[]> {
  await delay(200);
  return DIRECTORIO_MOCK;
}


export async function listarFavoritos(): Promise<string[]> {
  await delay(100);
  return leerLS<string[]>(STORAGE_KEYS.favoritos, []);
}

export async function alternarFavorito(recursoId: string): Promise<string[]> {
  await delay(100);
  const actuales = leerLS<string[]>(STORAGE_KEYS.favoritos, []);
  const siguiente = actuales.includes(recursoId)
    ? actuales.filter((id) => id !== recursoId)
    : [...actuales, recursoId];
  escribirLS(STORAGE_KEYS.favoritos, siguiente);
  return siguiente;
}



export async function obtenerMetricas(): Promise<{
  porRecurso: MetricaRecurso[];
  porPerfil: MetricasPorPerfil[];
}> {
  await delay(250);
  const recursos = obtenerRecursosBase();
  const porRecurso: MetricaRecurso[] = recursos
    .map((r) => ({ recursoId: r.id, titulo: r.titulo, vistas: r.vistas, guardados: r.guardados }))
    .sort((a, b) => b.vistas - a.vistas);

  const acumulado = new Map<TipoRelacion, number>();
  recursos.forEach((r) => {
    r.perfiles.forEach((perfil) => {
      acumulado.set(perfil, (acumulado.get(perfil) ?? 0) + r.vistas);
    });
  });
  const porPerfil: MetricasPorPerfil[] = Array.from(acumulado.entries()).map(([tipoRelacion, vistas]) => ({
    tipoRelacion,
    vistas,
  }));

  return { porRecurso, porPerfil };
}
