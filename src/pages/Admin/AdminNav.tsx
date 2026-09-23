import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { homeOutline, folderOutline, barChartOutline } from 'ionicons/icons';

const RUTAS = [
  { valor: '/admin/inicio', etiqueta: 'Inicio', icono: homeOutline },
  { valor: '/admin/recursos', etiqueta: 'Recursos', icono: folderOutline },
  { valor: '/admin/metricas', etiqueta: 'Métricas', icono: barChartOutline },
];

const AdminNav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  
  const activo = RUTAS.find((r) => location.pathname.startsWith(r.valor))?.valor ?? '/admin/inicio';

  return (
    <IonSegment 
      value={activo} 
      onIonChange={(e) => e.detail.value && history.push(String(e.detail.value))} 
      style={{ marginBottom: 'var(--ra-space-5)' }}
      mode="md" 
    >
      {RUTAS.map((r) => (
        <IonSegmentButton key={r.valor} value={r.valor} layout="icon-top">
          <IonIcon icon={r.icono} />
          <IonLabel>{r.etiqueta}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default AdminNav;