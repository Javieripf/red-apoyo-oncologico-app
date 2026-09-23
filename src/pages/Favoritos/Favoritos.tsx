import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonSpinner, 
  IonIcon,
  IonToast,
  useIonViewWillEnter
} from '@ionic/react';
import { bookmarkOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import * as api from '@/services/api';
import { Recurso } from '@/types';

const Favoritos: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    cargar();
  });

  const cargar = async () => {
    setCargando(true);
    try {
      const [todos, ids] = await Promise.all([api.listarRecursos(), api.listarFavoritos()]);
      setRecursos(todos.filter((r) => ids.includes(r.id)));
      setFavoritos(ids);
    } catch (err) {
      setError('No pudimos cargar tus favoritos. Verifica tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  const toggleFavorito = async (id: string) => {
    try {
      const nuevos = await api.alternarFavorito(id);
      setFavoritos(nuevos);
      setRecursos((prev) => prev.filter((r) => nuevos.includes(r.id)));
    } catch (err) {
      setError('Ocurrió un error al actualizar tus favoritos.');
    }
  };

  return (
    <IonPage>
      <Header titulo="Favoritos" />
      <IonContent className="ra-content-with-rail">
        <div className="ra-page-wrap ra-page-narrow">
          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : recursos.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 'var(--ra-space-7)', color: 'var(--ra-color-ink-soft)' }}>
              <IonIcon icon={bookmarkOutline} style={{ fontSize: 40, marginBottom: 'var(--ra-space-3)' }} />
              <p>Aún no has guardado recursos.</p>
              <p style={{ fontSize: 14 }}>Los recursos que guardes aparecerán aquí para que los encuentres fácilmente.</p>
            </div>
          ) : (
            recursos.map((r) => (
              <ResourceCard 
                key={r.id} 
                recurso={r} 
                esFavorito={favoritos.includes(r.id)} 
                onToggleFavorito={toggleFavorito} 
              />
            ))
          )}
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

export default Favoritos;