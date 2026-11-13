// src/layouts/TabsLayout.tsx
import React from 'react';
import { 
  IonTabs, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { homeOutline, bookOutline, heartOutline, bookmarkOutline, personOutline } from 'ionicons/icons';

const Inicio = React.lazy(() => import('@/pages/Inicio/Inicio'));
const Recursos = React.lazy(() => import('@/pages/Recursos/Recursos'));
const DetalleRecurso = React.lazy(() => import('@/pages/Recursos/DetalleRecurso'));
const Directorio = React.lazy(() => import('@/pages/Directorio/Directorio'));
const Bitacora = React.lazy(() => import('@/pages/Bitacora/Bitacora'));
const Favoritos = React.lazy(() => import('@/pages/Favoritos/Favoritos'));
const Perfil = React.lazy(() => import('@/pages/Perfil/Perfil'));

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/inicio" component={Inicio} />
        <Route exact path="/recursos" component={Recursos} />
        <Route exact path="/recursos/:id" component={DetalleRecurso} />
        <Route exact path="/directorio" component={Directorio} />
        <Route exact path="/bitacora" component={Bitacora} />
        <Route exact path="/favoritos" component={Favoritos} />
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/">
          <Redirect to="/inicio" />
        </Route>
      </IonRouterOutlet>

      {/* Barra de navegación inferior móvil */}
      <IonTabBar slot="bottom" className="ra-tabbar">
        <IonTabButton tab="inicio" href="/inicio">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="recursos" href="/recursos">
          <IonIcon aria-hidden="true" icon={bookOutline} />
          <IonLabel>Recursos</IonLabel>
        </IonTabButton>

        <IonTabButton tab="bitacora" href="/bitacora">
          <IonIcon aria-hidden="true" icon={heartOutline} />
          <IonLabel>Bitácora</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="favoritos" href="/favoritos">
          <IonIcon aria-hidden="true" icon={bookmarkOutline} />
          <IonLabel>Favoritos</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;
