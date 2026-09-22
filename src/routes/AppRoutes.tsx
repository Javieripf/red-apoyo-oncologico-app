import React from 'react';
import { IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Vistas Públicas
import Login from '@/pages/Login/Login';
import Registro from '@/pages/Registro/Registro';

// Contenedor de Usuario (Menú inferior)
import TabsLayout from '@/layouts/TabsLayout';

// Vistas de Administrador
import AdminInicio from '@/pages/Admin/AdminInicio';
import GestionRecursos from '@/pages/Admin/GestionRecursos';
import CrearRecurso from '@/pages/Admin/CrearRecurso';
import EditarRecurso from '@/pages/Admin/EditarRecurso';
import Metricas from '@/pages/Admin/Metricas';

const AppRoutes: React.FC = () => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <IonSpinner name="crescent" color="primary" />
      </div>
    );
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        
        {/* ================= RUTAS PÚBLICAS ================= */}
        {/* Si el usuario ya inició sesión, lo expulsamos del login/registro */}
        <Route exact path="/login" render={() => (
          usuario ? <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} /> : <Login />
        )} />
        <Route exact path="/registro" render={() => (
          usuario ? <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} /> : <Registro />
        )} />

        {/* ================= RUTAS ADMINISTRADOR ================= */}
        <Route exact path="/admin/inicio" render={() => (
          usuario?.rol === 'administrador' ? <AdminInicio /> : <Redirect to="/login" />
        )} />
        <Route exact path="/admin/recursos" render={() => (
          usuario?.rol === 'administrador' ? <GestionRecursos /> : <Redirect to="/login" />
        )} />
        <Route exact path="/admin/recursos/nuevo" render={() => (
          usuario?.rol === 'administrador' ? <CrearRecurso /> : <Redirect to="/login" />
        )} />
        <Route exact path="/admin/recursos/:id/editar" render={() => (
          usuario?.rol === 'administrador' ? <EditarRecurso /> : <Redirect to="/login" />
        )} />
        <Route exact path="/admin/metricas" render={() => (
          usuario?.rol === 'administrador' ? <Metricas /> : <Redirect to="/login" />
        )} />

        {/* ================= RUTAS DE USUARIO (CON TABS) ================= */}
        {/* Al pasar un arreglo de rutas exactas, evitamos el choque con /login o /admin */}
        <Route 
          path={['/inicio', '/recursos', '/directorio', '/bitacora', '/favoritos', '/perfil']} 
          render={() => {
            if (!usuario) return <Redirect to="/login" />;
            if (usuario.rol === 'administrador') return <Redirect to="/admin/inicio" />;
            return <TabsLayout />;
          }} 
        />

        {/* ================= RUTA RAÍZ (PUNTO DE ENTRADA) ================= */}
        <Route exact path="/" render={() => {
          if (!usuario) return <Redirect to="/login" />;
          return usuario.rol === 'administrador' ? <Redirect to="/admin/inicio" /> : <Redirect to="/inicio" />;
        }} />

      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRoutes;