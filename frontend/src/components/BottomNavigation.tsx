import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, libraryOutline, heartOutline, bookmarkOutline, personOutline } from 'ionicons/icons';
import './BottomNavigation.css';


const BottomNavigation: React.FC = () => (
  <IonTabBar slot="bottom" className="ra-tabbar">
    <IonTabButton tab="inicio" href="/inicio">
      <IonIcon icon={homeOutline} />
      <IonLabel>Inicio</IonLabel>
    </IonTabButton>
    <IonTabButton tab="recursos" href="/recursos">
      <IonIcon icon={libraryOutline} />
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
);

export default BottomNavigation;
