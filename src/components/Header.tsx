import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  titulo: string;
  mostrarVolver?: boolean;
  defaultHref?: string;
  mostrarSalir?: boolean;
}

const Header: React.FC<HeaderProps> = ({ titulo, mostrarVolver, defaultHref, mostrarSalir }) => {
  const { salir } = useAuth();

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        {mostrarVolver && (
          <IonButtons slot="start">
            <IonBackButton defaultHref={defaultHref ?? '/app/inicio'} text="" />
          </IonButtons>
        )}
        <IonTitle className="ra-display">{titulo}</IonTitle>
        {mostrarSalir && (
          <IonButtons slot="end">
            <IonButton onClick={() => salir()} aria-label="Cerrar sesión">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
