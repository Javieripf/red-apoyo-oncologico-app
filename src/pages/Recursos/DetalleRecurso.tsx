import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonSpinner, 
  IonButton, 
  IonIcon, 
  IonToast,
  IonText,
  useIonViewWillEnter 
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { bookmark, bookmarkOutline, timeOutline, alertCircleOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import * as api from '@/services/api';
import { Recurso } from '@/types';
import { ETIQUETAS_CATEGORIA } from '@/data/mockData';

const DetalleRecurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recurso, setRecurso] = useState<Recurso | null>(null);
  const [cargando, setCargando] = useState(true);
  const [esFavorito, setEsFavorito] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    setCargando(true);
    setError(null);
    
    Promise.all([api.obtenerRecurso(id), api.listarFavoritos()])
      .then(([r, favoritos]) => {
        setRecurso(r ?? null);
        setEsFavorito(!!r && favoritos.includes(r.id));
      })
      .catch(() => {
        setError('No pudimos cargar la información de este recurso. Verifica tu conexión.');
      })
      .finally(() => {
        setCargando(false);
      });
  });

  const toggleFavorito = async () => {
    if (!recurso) return;
    
    try {
      const favoritos = await api.alternarFavorito(recurso.id);
      const ahoraFavorito = favoritos.includes(recurso.id);
      setEsFavorito(ahoraFavorito);
      setMensaje(ahoraFavorito ? 'Recurso guardado en favoritos' : 'Recurso eliminado de favoritos');
    } catch (e) {
      setError('Ocurrió un error al actualizar tus favoritos.');
    }
  };

  return (
    <IonPage>
      <Header titulo="Recurso" mostrarVolver defaultHref="/recursos" />
      <IonContent className="ra-content-with-rail">
        
        {cargando ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30vh' }}>
            <IonSpinner name="crescent" color="primary" />
          </div>
        ) : !recurso ? (
          <div className="ion-padding" style={{ textAlign: 'center', marginTop: '10vh' }}>
            <IonIcon icon={alertCircleOutline} style={{ fontSize: 48, color: 'var(--ra-color-clay)', marginBottom: '16px' }} />
            <IonText color="medium">
              <p>No pudimos encontrar este recurso o ya no está disponible.</p>
            </IonText>
          </div>
        ) : (
          <div className="ion-padding" style={{ maxWidth: 640, margin: '0 auto' }}>
            
            <span className="ra-eyebrow" style={{ color: 'var(--ra-color-clay)' }}>
              {ETIQUETAS_CATEGORIA[recurso.categoria]}
            </span>
            
            <h1 className="ra-display" style={{ fontSize: 26, lineHeight: 1.3, margin: '8px 0 12px' }}>
              {recurso.titulo}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ra-space-4)',
                marginBottom: 'var(--ra-space-5)',
                color: 'var(--ra-color-ink-soft)',
                fontSize: 13.5,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <IonIcon icon={timeOutline} /> {recurso.tiempoLecturaMin} min de lectura
              </span>
            </div>

            <IonText color="dark">
              <p style={{ lineHeight: 1.7, fontSize: 16, whiteSpace: 'pre-line' }}>
                {recurso.contenido}
              </p>
            </IonText>

            <IonButton
              fill={esFavorito ? 'solid' : 'outline'}
              color="secondary"
              onClick={toggleFavorito}
              expand="block"
              style={{ marginTop: 'var(--ra-space-6)' }}
            >
              <IonIcon slot="start" icon={esFavorito ? bookmark : bookmarkOutline} />
              {esFavorito ? 'Guardado en favoritos' : 'Guardar en favoritos'}
            </IonButton>

            <div style={{ 
              marginTop: 'var(--ra-space-6)', 
              paddingTop: 'var(--ra-space-4)', 
              borderTop: '1px solid var(--ra-color-line)' 
            }}>
              <IonText color="medium">
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, textAlign: 'center' }}>
                  Este contenido es estrictamente educativo y de apoyo. No reemplaza en ningún caso 
                  el diagnóstico, tratamiento u orientación de un profesional de la salud acreditado.
                </p>
              </IonText>
            </div>
          </div>
        )}

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

export default DetalleRecurso;