import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import { useAuth } from '@/context/AuthContext';
import { RolUsuario } from '@/types';

interface ProtectedRouteProps extends RouteProps {
  rolRequerido?: RolUsuario;
  children: React.ReactNode;
}

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
          return <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} />;
        }

        return children;
      }}
    />
  );
};

export default ProtectedRoute;
