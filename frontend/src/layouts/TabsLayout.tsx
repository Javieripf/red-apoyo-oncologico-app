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

import Inicio from '@/pages/Inicio/Inicio';
import Recursos from '@/pages/Recursos/Recursos';
import DetalleRecurso from '@/pages/Recursos/DetalleRecurso';
import Directorio from '@/pages/Directorio/Directorio';
import Bitacora from '@/pages/Bitacora/Bitacora';
import Favoritos from '@/pages/Favoritos/Favoritos';
import Perfil from '@/pages/Perfil/Perfil';

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
          <IonIcon icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="recursos" href="/recursos">
          <IonIcon icon={bookOutline} />
          <IonLabel>Recursos</IonLabel>
        </IonTabButton>

        <IonTabButton tab="bitacora" href="/bitacora">
          <IonIcon icon={heartOutline} />
          <IonLabel>Bitácora</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="favoritos" href="/favoritos">
          <IonIcon icon={bookmarkOutline} />
          <IonLabel>Favoritos</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;