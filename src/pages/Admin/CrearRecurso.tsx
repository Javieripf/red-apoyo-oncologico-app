import React, { useState } from 'react';
import { IonContent, IonPage, IonToast, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Header from '@/components/Header';
import RecursoForm from './RecursoForm';
import * as api from '@/services/api';

const CrearRecurso: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const guardar = async (valores: Parameters<typeof api.crearRecurso>[0]) => {
    try {
      setCargando(true);
      setError(null);
      await api.crearRecurso(valores);
      
      // replace en lugar de push elimina este formulario del stack de navegación.
      // Así, si el admin presiona "Atrás", no volverá accidentalmente a un formulario vacío.
      history.replace('/admin/recursos');
    } catch {
      setError('No pudimos guardar el recurso. Intenta nuevamente.');
    } finally {
      setCargando(false); 
    }
  };

  return (
    <IonPage>
      <Header titulo="Nuevo recurso" mostrarVolver defaultHref="/admin/recursos" />
      
      <IonContent className="ra-content-with-rail">
        <div className="ion-padding" style={{ maxWidth: 720, margin: '0 auto' }}>
          <RecursoForm onGuardar={guardar} textoBoton="Registrar recurso" />
        </div>

        <IonLoading 
          isOpen={cargando} 
          message="Guardando recurso..." 
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

export default CrearRecurso;