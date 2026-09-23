import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonSpinner, 
  IonToast, 
  IonLoading, 
  IonText,
  useIonViewWillEnter
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import RecursoForm from './RecursoForm';
import * as api from '@/services/api';
import { Recurso } from '@/types';

const EditarRecurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [recurso, setRecurso] = useState<Recurso | null>(null);
  
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    setCargando(true);
    setError(null);

    api.obtenerRecurso(id)
      .then((r) => {
        setRecurso(r ?? null);
      })
      .catch(() => {
        setError('No pudimos cargar la información de este recurso.');
        setRecurso(null);
      })
      .finally(() => {
        setCargando(false);
      });
  });

  const guardar = async (valores: Parameters<typeof api.actualizarRecurso>[1]) => {
    try {
      setGuardando(true);
      setError(null);
      
      await api.actualizarRecurso(id, valores);
      
      history.replace('/admin/recursos');
    } catch {
      setError('No pudimos guardar los cambios. Intenta nuevamente.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <IonPage>
      <Header titulo="Editar recurso" mostrarVolver defaultHref="/admin/recursos" />
      
      <IonContent className="ra-content">
        <div className="ra-page-wrap">
          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : !recurso ? (
            <div style={{ textAlign: 'center', padding: 'var(--ra-space-6)' }}>
              <IonText color="medium">
                <p>No encontramos este recurso o ya no está disponible.</p>
              </IonText>
            </div>
          ) : (
            <RecursoForm
              valoresIniciales={recurso}
              onGuardar={guardar}
              textoBoton="Guardar cambios"
            />
          )}
        </div>

        <IonLoading 
          isOpen={guardando} 
          message="Actualizando recurso..." 
          spinner="crescent"
        />

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

export default EditarRecurso;