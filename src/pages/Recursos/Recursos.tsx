import React, { useMemo, useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonSpinner, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel,
  IonToast,
  useIonViewWillEnter
} from '@ionic/react';
import Header from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import * as api from '@/services/api';
import { CategoriaRecurso, Recurso } from '@/types';
import { ETIQUETAS_CATEGORIA } from '@/data/mockData';

const Recursos: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoria, setCategoria] = useState<CategoriaRecurso | 'todos'>('todos');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Hook de ciclo de vida nativo de Ionic en lugar de useEffect
  useIonViewWillEnter(() => {
    setCargando(true);
    setError(null);
    
    Promise.all([api.listarRecursos(), api.listarFavoritos()])
      .then(([r, f]) => {
        setRecursos(r);
        setFavoritos(f);
      })
      .catch(() => {
        setError('No pudimos cargar los recursos. Verifica tu conexión a internet.');
      })
      .finally(() => {
        setCargando(false);
      });
  });

  const visibles = useMemo(
    () => (categoria === 'todos' ? recursos : recursos.filter((r) => r.categoria === categoria)),
    [recursos, categoria]
  );

  const toggleFavorito = async (id: string) => {
    try {
      const nuevosFavoritos = await api.alternarFavorito(id);
      setFavoritos(nuevosFavoritos);
      
      const guardado = nuevosFavoritos.includes(id);
      setMensaje(guardado ? 'Recurso guardado en favoritos' : 'Recurso eliminado de favoritos');
    } catch (e) {
      setError('Ocurrió un error al intentar actualizar tus favoritos.');
    }
  };

  return (
    <IonPage>
      <Header titulo="Recursos" />
      <IonContent className="ra-content-with-rail">
        <div className="ion-padding" style={{ maxWidth: 640, margin: '0 auto' }}>
          
          <IonSegment
            scrollable
            mode="md" // Fuerza el estilo Material Design (línea inferior) por coherencia visual en iOS y Android
            value={categoria}
            onIonChange={(e) => setCategoria((e.detail.value as CategoriaRecurso | 'todos') ?? 'todos')}
            style={{ marginBottom: 'var(--ra-space-4)' }}
          >
            <IonSegmentButton value="todos">
              <IonLabel>Todos</IonLabel>
            </IonSegmentButton>
            {Object.entries(ETIQUETAS_CATEGORIA).map(([valor, etiqueta]) => (
              <IonSegmentButton key={valor} value={valor}>
                <IonLabel>{etiqueta}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : visibles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--ra-space-5)' }}>
              <p style={{ color: 'var(--ra-color-ink-soft)' }}>No hay recursos en esta categoría todavía.</p>
            </div>
          ) : (
            visibles.map((r) => (
              <ResourceCard
                key={r.id}
                recurso={r}
                esFavorito={favoritos.includes(r.id)}
                onToggleFavorito={toggleFavorito}
              />
            ))
          )}
        </div>

        {/* Notificaciones para el usuario */}
        <IonToast
          isOpen={!!mensaje}
          message={mensaje ?? ''}
          duration={2000}
          color="success"
          onDidDismiss={() => setMensaje(null)}
          position="bottom"
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

export default Recursos;