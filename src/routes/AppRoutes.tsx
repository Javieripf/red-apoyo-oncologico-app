// src/routes/AppRoutes.tsx
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

// Vistas de Administrador (Sin menú inferior)
import AdminInicio from '@/pages/Admin/AdminInicio';
import GestionRecursos from '@/pages/Admin/GestionRecursos';
import CrearRecurso from '@/pages/Admin/CrearRecurso';
import EditarRecurso from '@/pages/Admin/EditarRecurso';
import Metricas from '@/pages/Admin/Metricas';

const AppRoutes: React.FC = () => {
  const { usuario, cargando } = useAuth();

  // Previene destellos de redirección mientras el contexto valida la sesión
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />

        {/* ================= RUTAS ADMINISTRADOR ================= */}
        <Route exact path="/admin/inicio">
          {usuario?.rol === 'administrador' ? <AdminInicio /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/admin/recursos">
          {usuario?.rol === 'administrador' ? <GestionRecursos /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/admin/recursos/nuevo">
          {usuario?.rol === 'administrador' ? <CrearRecurso /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/admin/recursos/:id/editar">
          {usuario?.rol === 'administrador' ? <EditarRecurso /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/admin/metricas">
          {usuario?.rol === 'administrador' ? <Metricas /> : <Redirect to="/login" />}
        </Route>

        {/* ================= RUTAS USUARIO (CON TABS) ================= */}
        {/* Cualquier ruta que no coincida con login, registro o admin, cae en este layout */}
        <Route path="/" render={() => {
          if (!usuario) return <Redirect to="/login" />;
          if (usuario.rol === 'administrador') return <Redirect to="/admin/inicio" />;
          
          return <TabsLayout />;
        }} />

      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRoutes;