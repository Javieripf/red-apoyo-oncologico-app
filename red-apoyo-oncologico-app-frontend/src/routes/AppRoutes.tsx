import React from 'react';
import { IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
const Login = React.lazy(() => import('@/pages/Login/Login'));
const Registro = React.lazy(() => import('@/pages/Registro/Registro'));
const TabsLayout = React.lazy(() => import('@/layouts/TabsLayout'));
const AdminInicio = React.lazy(() => import('@/pages/Admin/AdminInicio'));
const GestionRecursos = React.lazy(() => import('@/pages/Admin/GestionRecursos'));
const CrearRecurso = React.lazy(() => import('@/pages/Admin/CrearRecurso'));
const EditarRecurso = React.lazy(() => import('@/pages/Admin/EditarRecurso'));
const Metricas = React.lazy(() => import('@/pages/Admin/Metricas'));
const GestionDirectorio = React.lazy(() => import('@/pages/Admin/GestionDirectorio'));

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
      <React.Suspense fallback={<div role="status" style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}><IonSpinner name="crescent" color="primary" /></div>}>
      <IonRouterOutlet>
        

        <Route exact path="/login" render={() => (
          usuario ? <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} /> : <Login />
        )} />
        <Route exact path="/registro" render={() => (
          usuario ? <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} /> : <Registro />
        )} />


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
        <Route exact path="/admin/directorio" render={() => (
          usuario?.rol === 'administrador' ? <GestionDirectorio /> : <Redirect to="/login" />
        )} />

 
        <Route 
          path={['/inicio', '/recursos', '/directorio', '/bitacora', '/favoritos', '/perfil']} 
          render={() => {
            if (!usuario) return <Redirect to="/login" />;
            if (usuario.rol === 'administrador') return <Redirect to="/admin/inicio" />;
            return <TabsLayout />;
          }} 
        />

        <Route exact path="/" render={() => {
          if (!usuario) return <Redirect to="/login" />;
          return usuario.rol === 'administrador' ? <Redirect to="/admin/inicio" /> : <Redirect to="/inicio" />;
        }} />

      </IonRouterOutlet>
      </React.Suspense>
    </IonReactRouter>
  );
};

export default AppRoutes;
