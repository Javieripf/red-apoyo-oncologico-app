import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import { useAuth } from '@/context/AuthContext';
import { RolUsuario } from '@/types';

interface ProtectedRouteProps extends RouteProps {
  rolRequerido?: RolUsuario;
  children: React.ReactNode;
}

// Controla el acceso según autenticación y rol (RNF03, FT05).
// - Sin sesión → redirige a /login.
// - Con sesión pero rol incorrecto → redirige a la vista principal de su rol,
//   en lugar de dejarlo entrar a rutas administrativas.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolRequerido, children, ...rest }) => {
  const { usuario, cargando } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (cargando) {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40vh' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          );
        }

        if (!usuario) {
          return <Redirect to="/login" />;
        }

        if (rolRequerido && usuario.rol !== rolRequerido) {
          return <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/app/inicio'} />;
        }

        return children;
      }}
    />
  );
};

export default ProtectedRoute;
