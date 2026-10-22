import type {
  EntradaDirectorio,
  MetricaRecurso,
  MetricasPorPerfil,
  Recurso,
  RegistroBitacora,
  TipoRelacion,
  Usuario,
} from '@/types';

// EP2: solicitudes reales a Express + PostgreSQL. Sin datos simulados.
export const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api').replace(/\/$/, '');
const TOKEN_KEY = 'ra_ep2_jwt';

interface ApiResponse<T> { data: T }
interface ApiErrorResponse { error?: { codigo?: string; mensaje?: string } }

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function getToken(): string | null { return sessionStorage.getItem(TOKEN_KEY); }
function saveToken(token: string) { sessionStorage.setItem(TOKEN_KEY, token); }
function clearToken() { sessionStorage.removeItem(TOKEN_KEY); }

async function request<T>(path: string, method: Method = 'GET', body?: unknown): Promise<T> {
  const token = getToken();
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error('No se pudo conectar con el backend. Comprueba que npm run dev esté activo en el servidor.');
  }
  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as ApiErrorResponse;
    if (response.status === 401 && token) {
      clearToken();
      window.dispatchEvent(new Event('ra:session-expired'));
    }
    throw new ApiError(response.status, errorBody.error?.mensaje ?? `Error HTTP ${response.status}`);
  }
  if (response.status === 204) return undefined as T;
  const result = (await response.json()) as ApiResponse<T>;
  return result.data;
}

interface AuthResult { usuario: Usuario; token: string }
export async function login(correo: string, password: string): Promise<Usuario> {
  const result = await request<AuthResult>('/auth/login', 'POST', { correo, password });
  saveToken(result.token);
  return result.usuario;
}

export async function registrar(datos: {
  nombre: string;
  correo: string;
  password: string;
  tipoRelacion: TipoRelacion;
}): Promise<Usuario> {
  const result = await request<AuthResult>('/auth/register', 'POST', datos);
  saveToken(result.token);
  return result.usuario;
}

export async function restaurarSesion(): Promise<Usuario | null> {
  if (!getToken()) return null;
  try {
    return await request<Usuario>('/auth/me');
  } catch {
    clearToken();
    return null;
  }
}

export async function actualizarPerfil(usuario: Usuario): Promise<Usuario> {
  return request<Usuario>('/auth/me', 'PATCH', { tipoRelacion: usuario.tipoRelacion });
}

export async function cerrarSesion(): Promise<void> {
  clearToken();
}

export async function listarRecursos(filtroPerfil?: TipoRelacion): Promise<Recurso[]> {
  const params = filtroPerfil ? `?perfil=${encodeURIComponent(filtroPerfil)}` : '';
  return request<Recurso[]>(`/recursos${params}`);
}

export async function obtenerRecurso(id: string): Promise<Recurso | undefined> {
  try {
    return await request<Recurso>(`/recursos/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export async function crearRecurso(recurso: Omit<Recurso, 'id' | 'vistas' | 'guardados'>): Promise<Recurso> {
  return request<Recurso>('/recursos', 'POST', recurso);
}

export async function actualizarRecurso(id: string, cambios: Partial<Recurso>): Promise<Recurso | undefined> {
  return request<Recurso>(`/recursos/${encodeURIComponent(id)}`, 'PUT', cambios);
}

export async function eliminarRecurso(id: string): Promise<void> {
  return request<void>(`/recursos/${encodeURIComponent(id)}`, 'DELETE');
}

export async function listarBitacora(): Promise<RegistroBitacora[]> {
  return request<RegistroBitacora[]>('/bitacora');
}

export async function registrarEstado(registro: Omit<RegistroBitacora, 'id'>): Promise<RegistroBitacora> {
  // La fecha se asigna en PostgreSQL, no en el navegador.
  return request<RegistroBitacora>('/bitacora', 'POST', { estado: registro.estado, nota: registro.nota });
}

export async function listarDirectorio(): Promise<EntradaDirectorio[]> {
  return request<EntradaDirectorio[]>('/directorio');
}

export async function listarFavoritos(): Promise<string[]> {
  return request<string[]>('/favoritos');
}

export async function alternarFavorito(recursoId: string): Promise<string[]> {
  const actuales = await listarFavoritos();
  const path = `/favoritos/${encodeURIComponent(recursoId)}`;
  if (actuales.includes(recursoId)) {
    await request<void>(path, 'DELETE');
  } else {
    await request<{ recursoId: string }>(path, 'POST');
  }
  return listarFavoritos();
}

export async function obtenerMetricas(): Promise<{
  porRecurso: MetricaRecurso[];
  porPerfil: MetricasPorPerfil[];
}> {
  return request<{ porRecurso: MetricaRecurso[]; porPerfil: MetricasPorPerfil[] }>('/metricas');
}
