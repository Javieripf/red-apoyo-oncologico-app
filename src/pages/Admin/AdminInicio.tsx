import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonButton, 
  IonIcon,
  IonSpinner,
  IonToast,
  useIonViewWillEnter
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import AdminNav from './AdminNav';
import * as api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

const AdminInicio: React.FC = () => {
  const { usuario } = useAuth();
  const [totalRecursos, setTotalRecursos] = useState(0);
  const [totalVistas, setTotalVistas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Garantiza que el contador se actualice si el admin vuelve de crear/editar un recurso
  useIonViewWillEnter(() => {
    setCargando(true);
    api.listarRecursos()
      .then((r) => {
        setTotalRecursos(r.length);
        setTotalVistas(r.reduce((acc, x) => acc + x.vistas, 0));
      })
      .catch(() => {
        setError('No pudimos cargar las estadísticas del panel. Verifica tu conexión.');
      })
      .finally(() => {
        setCargando(false);
      });
  });

  return (
    <IonPage>
      <Header titulo="Panel administrador" mostrarSalir />
      
      <IonContent className="ra-content-with-rail ion-padding">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <AdminNav />

          <p style={{ color: 'var(--ra-color-ink-soft)', marginTop: 0 }}>
            Hola {usuario?.nombre?.split(' ')[0]}, aquí puedes gestionar los recursos disponibles y revisar
            cómo se están utilizando.
          </p>

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : (
            <IonGrid className="ion-no-padding" style={{ margin: 'var(--ra-space-5) 0' }}>
              <IonRow style={{ gap: 'var(--ra-space-3)' }}>
                <IonCol className="ra-surface" style={{ padding: 'var(--ra-space-4)', borderRadius: '8px' }}>
                  <p className="ra-eyebrow">Recursos publicados</p>
                  <p className="ra-display" style={{ fontSize: 32, margin: 0 }}>{totalRecursos}</p>
                </IonCol>
                <IonCol className="ra-surface" style={{ padding: 'var(--ra-space-4)', borderRadius: '8px' }}>
                  <p className="ra-eyebrow">Vistas totales</p>
                  <p className="ra-display" style={{ fontSize: 32, margin: 0 }}>{totalVistas}</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}

          <IonButton 
            expand="block" 
            fill="clear"
            routerLink="/admin/recursos/nuevo"
            className="ra-surface"
            style={{
              '--border-style': 'dashed',
              '--border-width': '2px',
              '--border-color': 'var(--ra-color-pine)',
              '--color': 'var(--ra-color-pine)',
              fontWeight: 600,
              height: 'auto',
              padding: 'var(--ra-space-2) 0',
              borderRadius: '8px'
            }}
          >
            <IonIcon icon={addOutline} slot="start" />
            Crear nuevo recurso
          </IonButton>
        </div>

        <IonToast 
          isOpen={!!error} 
          message={error ?? ''} 
          duration={3000} 
          color="danger" 
          onDidDismiss={() => setError(null)} 
          position="bottom" 
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminInicio;