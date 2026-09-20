import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, libraryOutline, heartOutline, bookmarkOutline, personOutline } from 'ionicons/icons';
import './BottomNavigation.css';

// Navegación principal del rol Usuario. En móvil se usa dentro de <IonTabs>
// como barra inferior (IonTabBar/IonTabButton, ver sección 9 del brief);
// en pantallas anchas la misma barra se convierte en riel lateral vía CSS.
const BottomNavigation: React.FC = () => (
  <IonTabBar slot="bottom" className="ra-tabbar">
    <IonTabButton tab="inicio" href="/app/inicio">
      <IonIcon icon={homeOutline} />
      <IonLabel>Inicio</IonLabel>
    </IonTabButton>
    <IonTabButton tab="recursos" href="/app/recursos">
      <IonIcon icon={libraryOutline} />
      <IonLabel>Recursos</IonLabel>
    </IonTabButton>
    <IonTabButton tab="bitacora" href="/app/bitacora">
      <IonIcon icon={heartOutline} />
      <IonLabel>Bitácora</IonLabel>
    </IonTabButton>
    <IonTabButton tab="favoritos" href="/app/favoritos">
      <IonIcon icon={bookmarkOutline} />
      <IonLabel>Favoritos</IonLabel>
    </IonTabButton>
    <IonTabButton tab="perfil" href="/app/perfil">
      <IonIcon icon={personOutline} />
      <IonLabel>Perfil</IonLabel>
    </IonTabButton>
  </IonTabBar>
);

export default BottomNavigation;
