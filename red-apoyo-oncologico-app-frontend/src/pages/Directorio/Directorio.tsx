import React, { useMemo, useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonSearchbar, 
  IonSpinner, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonToast,
  IonButton,
  useIonViewWillEnter
} from '@ionic/react';
import { locationOutline, callOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import * as api from '@/services/api';
import { EntradaDirectorio, TipoDirectorio, UbicacionCiudad } from '@/types';

const DIRECTORY_FILTER_KEY = 'ra_directorio_tipo';
const savedType = (): TipoDirectorio | 'todos' => {
  const value = localStorage.getItem(DIRECTORY_FILTER_KEY);
  return value === 'especialista' || value === 'grupo_de_apoyo' ? value : 'todos';
};

const ETIQUETAS_TIPO: Record<TipoDirectorio, string> = {
  especialista: 'Especialista',
  grupo_de_apoyo: 'Grupo de apoyo',
};

const ETIQUETAS_MODALIDAD: Record<EntradaDirectorio['modalidad'], string> = {
  presencial: 'Presencial',
  online: 'Online',
  mixta: 'Presencial y online',
};

const Directorio: React.FC = () => {
  const [entradas, setEntradas] = useState<EntradaDirectorio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState<TipoDirectorio | 'todos'>(savedType);
  const [ubicaciones, setUbicaciones] = useState<Record<string, UbicacionCiudad>>({});
  const [ubicandoId, setUbicandoId] = useState<string | null>(null);

 
  useIonViewWillEnter(() => {
    setCargando(true);
    api.listarDirectorio()
      .then((d) => {
        setEntradas(d);
      })
      .catch(() => {
        setError('No pudimos cargar el directorio. Verifica tu conexión.');
      })
      .finally(() => {
        setCargando(false);
      });
  });

  const visibles = useMemo(() => {
    return entradas.filter((e) => {
      const coincideTipo = tipo === 'todos' || e.tipo === tipo;
      const texto = `${e.nombre} ${e.especialidad} ${e.ciudad}`.toLowerCase();
      const coincideBusqueda = texto.includes(busqueda.toLowerCase());
      return coincideTipo && coincideBusqueda;
    });
  }, [entradas, tipo, busqueda]);

  const ubicar = async (entry: EntradaDirectorio) => {
    setUbicandoId(entry.id);
    try {
      const location = await api.ubicarCiudadDirectorio(entry.id);
      setUbicaciones((current) => ({ ...current, [entry.id]: location }));
    } catch {
      setError('No pudimos ubicar esa ciudad. Intenta más tarde.');
    } finally { setUbicandoId(null); }
  };

  return (
    <IonPage>
      <Header titulo="Directorio de apoyo" mostrarVolver defaultHref="/inicio" />
      <IonContent className="ra-content-with-rail">
        <div className="ra-page-wrap ra-page-narrow">
          
          <IonSearchbar
            placeholder="Buscar por nombre, especialidad o ciudad"
            value={busqueda}
            onIonInput={(e) => setBusqueda(e.detail.value ?? '')}
            style={{ '--background': 'var(--ra-color-paper-raised)', padding: 0, marginBottom: 'var(--ra-space-3)' }}
          />

          <IonSegment 
            value={tipo} 
            onIonChange={(e) => {
              const value = (e.detail.value as TipoDirectorio | 'todos') ?? 'todos';
              setTipo(value);
              localStorage.setItem(DIRECTORY_FILTER_KEY, value);
            }} 
            style={{ marginBottom: 'var(--ra-space-4)' }}
            mode="md"
          >
            <IonSegmentButton value="todos">
              <IonLabel>Todos</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="especialista">
              <IonLabel>Especialistas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="grupo_de_apoyo">
              <IonLabel>Grupos</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : visibles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--ra-space-5)' }}>
              <p style={{ color: 'var(--ra-color-ink-soft)' }}>No encontramos resultados para tu búsqueda.</p>
            </div>
          ) : (
            visibles.map((e) => (
              <IonCard 
                key={e.id} 
                className="ion-no-margin" 
                style={{ 
                  marginBottom: 'var(--ra-space-3)', 
                  boxShadow: 'none', 
                  border: '1px solid var(--ra-color-line)',
                  borderRadius: '12px'
                }}
              >
                <IonCardHeader style={{ paddingBottom: '8px' }}>
                  <IonCardSubtitle style={{ color: 'var(--ra-color-clay)', textTransform: 'none', fontWeight: 600, letterSpacing: 'normal' }}>
                    {ETIQUETAS_TIPO[e.tipo]}
                  </IonCardSubtitle>
                  <IonCardTitle style={{ fontSize: 18, color: 'var(--ra-color-ink)' }}>
                    {e.nombre}
                  </IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent>
                  <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--ra-color-ink-soft)', fontWeight: 500 }}>
                    {e.especialidad}
                  </p>
                  <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.5, color: 'var(--ra-color-ink)' }}>
                    {e.descripcion}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ra-space-4)', fontSize: 13, color: 'var(--ra-color-ink-soft)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <IonIcon aria-hidden="true" icon={locationOutline} style={{ color: 'var(--ra-color-pine)' }} /> 
                      {e.ciudad} · {ETIQUETAS_MODALIDAD[e.modalidad]}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <IonIcon aria-hidden="true" icon={callOutline} style={{ color: 'var(--ra-color-pine)' }} /> 
                      {e.contacto}
                    </span>
                  </div>
                  {e.modalidad !== 'online' && e.ciudad.toLocaleLowerCase('es') !== 'nacional' && (
                    <div style={{ marginTop: 'var(--ra-space-3)' }}>
                      {ubicaciones[e.id] ? (
                        <>
                          <a href={`https://www.openstreetmap.org/?mlat=${ubicaciones[e.id].latitud}&mlon=${ubicaciones[e.id].longitud}#map=12/${ubicaciones[e.id].latitud}/${ubicaciones[e.id].longitud}`}
                            target="_blank" rel="noopener noreferrer">Ver centro de {ubicaciones[e.id].ciudad} en el mapa</a>
                          <p style={{ fontSize: 12, margin: '6px 0 0' }}>Ubicación aproximada de la ciudad, no del servicio. Datos: {ubicaciones[e.id].fuente}.</p>
                        </>
                      ) : (
                        <IonButton size="small" fill="outline" disabled={ubicandoId === e.id} onClick={() => void ubicar(e)}>
                          {ubicandoId === e.id ? 'Buscando ciudad…' : 'Ubicar ciudad'}
                        </IonButton>
                      )}
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
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

export default Directorio;
