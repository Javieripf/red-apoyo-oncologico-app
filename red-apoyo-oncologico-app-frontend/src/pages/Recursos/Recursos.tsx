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
import { CategoriaRecurso, ResumenRecurso } from '@/types';
import { ETIQUETAS_CATEGORIA } from '@/data/mockData';

const FILTER_KEY = 'ra_categoria_recursos';
const savedCategory = (): CategoriaRecurso | 'todos' => {
  const value = localStorage.getItem(FILTER_KEY);
  return value === 'todos' || Object.prototype.hasOwnProperty.call(ETIQUETAS_CATEGORIA, value ?? '')
    ? value as CategoriaRecurso | 'todos' : 'todos';
};

const Recursos: React.FC = () => {
  const [recursos, setRecursos] = useState<ResumenRecurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoria, setCategoria] = useState<CategoriaRecurso | 'todos'>(savedCategory);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);


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
      const guardado = !favoritos.includes(id);
      await api.alternarFavorito(id, !guardado);
      setFavoritos((items) => guardado ? [...items, id] : items.filter((item) => item !== id));
      setMensaje(guardado ? 'Recurso guardado en favoritos' : 'Recurso eliminado de favoritos');
    } catch (e) {
      setError('Ocurrió un error al intentar actualizar tus favoritos.');
    }
  };

  return (
    <IonPage>
      <Header titulo="Recursos" />
      <IonContent className="ra-content-with-rail">
        <div className="ra-page-wrap ra-page-narrow">
          
          <IonSegment
            scrollable
            mode="md" 
            value={categoria}
            onIonChange={(e) => {
              const value = (e.detail.value as CategoriaRecurso | 'todos') ?? 'todos';
              setCategoria(value);
              localStorage.setItem(FILTER_KEY, value);
            }}
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
