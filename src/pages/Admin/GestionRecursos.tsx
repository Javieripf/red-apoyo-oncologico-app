import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonButton, 
  IonIcon, 
  IonAlert, 
  IonSpinner, 
  IonToast, 
  IonList, 
  IonItem, 
  IonLabel,
  useIonViewWillEnter 
} from '@ionic/react';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import AdminNav from './AdminNav';
import * as api from '@/services/api';
import { Recurso } from '@/types';
import { ETIQUETAS_CATEGORIA } from '@/data/mockData';

const GestionRecursos: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [porEliminar, setPorEliminar] = useState<Recurso | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); 

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      setRecursos(await api.listarRecursos());
    } catch {
      setError('No pudimos cargar la lista de recursos. Verifica tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  useIonViewWillEnter(() => {
    cargar();
  });

  const confirmarEliminar = async () => {
    if (!porEliminar) return;
    try {
      await api.eliminarRecurso(porEliminar.id);
      setMensaje('Recurso eliminado exitosamente.');
      cargar(); 
    } catch {
      setError('Ocurrió un error al intentar eliminar el recurso.');
    } finally {
      setPorEliminar(null);
    }
  };

  return (
    <IonPage>
      <Header titulo="Gestión de recursos" mostrarSalir />
      
      <IonContent className="ra-content">
        <div className="ra-page-wrap">
          <AdminNav />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--ra-space-4)' }}>
            <IonButton routerLink="/admin/recursos/nuevo">
              <IonIcon slot="start" icon={addOutline} />
              Nuevo recurso
            </IonButton>
          </div>

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : (
            <IonList className="ion-no-padding" style={{ background: 'transparent' }}>
              {recursos.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--ra-color-ink-soft)', marginTop: '20px' }}>
                  No hay recursos creados aún.
                </p>
              ) : (
                recursos.map((r) => (
                  <IonItem 
                    key={r.id} 
                    className="ra-surface" 
                    lines="none" 
                    style={{ 
                      marginBottom: 'var(--ra-space-3)', 
                      '--border-radius': '8px',
                      '--padding-start': 'var(--ra-space-4)',
                      '--padding-end': 'var(--ra-space-2)'
                    }}
                  >
                    <IonLabel>
                      <span className="ra-eyebrow" style={{ color: 'var(--ra-color-clay)' }}>
                        {ETIQUETAS_CATEGORIA[r.categoria]}
                      </span>
                      <h3 className="ra-display" style={{ fontSize: 16, margin: '2px 0 4px', whiteSpace: 'normal' }}>
                        {r.titulo}
                      </h3>
                      <p style={{ fontSize: 12.5, color: 'var(--ra-color-ink-soft)' }}>
                        {r.vistas} vistas · {r.guardados} guardados
                      </p>
                    </IonLabel>
                    
                    <IonButton slot="end" fill="clear" routerLink={`/admin/recursos/${r.id}/editar`} aria-label="Editar">
                      <IonIcon slot="icon-only" icon={createOutline} />
                    </IonButton>
                    
                    <IonButton slot="end" fill="clear" color="danger" onClick={() => setPorEliminar(r)} aria-label="Eliminar">
                      <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonButton>
                  </IonItem>
                ))
              )}
            </IonList>
          )}
        </div>

        <IonAlert
          isOpen={!!porEliminar}
          header="Eliminar recurso"
          message={`¿Eliminar "${porEliminar?.titulo}"? Esta acción no se puede deshacer.`}
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setPorEliminar(null) },
            { text: 'Eliminar', role: 'destructive', handler: confirmarEliminar },
          ]}
          onDidDismiss={() => setPorEliminar(null)}
        />
        
        <IonToast 
          isOpen={!!mensaje} 
          message={mensaje ?? ''} 
          duration={2500}
          color="success" 
          onDidDismiss={() => setMensaje(null)} 
          position="bottom" 
        />

        <IonToast 
          isOpen={!!error} 
          message={error ?? ''} 
          duration={3500} 
          color="danger" 
          onDidDismiss={() => setError(null)} 
          position="bottom" 
        />
      </IonContent>
    </IonPage>
  );
};

export default GestionRecursos;