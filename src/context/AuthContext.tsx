import React, { createContext, useContext, useEffect, useState } from 'react';
import { Usuario } from '@/types';
import * as api from '@/services/api';

interface AuthContextValue {
  usuario: Usuario | null;
  cargando: boolean;
  ingresar: (correo: string, password: string) => Promise<Usuario>;
  registrarse: (datos: Parameters<typeof api.registrar>[0]) => Promise<Usuario>;
  salir: () => Promise<void>;
  actualizarUsuario: (usuario: Usuario) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setUsuario(api.obtenerSesion());
    setCargando(false);
  }, []);

  const ingresar: AuthContextValue['ingresar'] = async (correo, password) => {
    const u = await api.login(correo, password);
    setUsuario(u);
    return u;
  };

  const registrarse: AuthContextValue['registrarse'] = async (datos) => {
    const u = await api.registrar(datos);
    setUsuario(u);
    return u;
  };

  const salir = async () => {
    await api.cerrarSesion();
    setUsuario(null);
  };

  const actualizarUsuario = async (u: Usuario) => {
    const actualizado = await api.actualizarPerfil(u);
    setUsuario(actualizado);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, ingresar, registrarse, salir, actualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
