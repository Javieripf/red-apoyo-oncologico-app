import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonButton, 
  IonItem, 
  IonSelect, 
  IonSelectOption, 
  IonIcon, 
  IonSpinner,
  IonToast,
  IonLabel,
  useIonViewWillEnter
} from '@ionic/react';
import { compassOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import { useAuth } from '@/context/AuthContext';
import * as api from '@/services/api';
import { Recurso, TipoRelacion } from '@/types';
import { ETIQUETAS_RELACION } from '@/data/mockData';

const ConfigurarPerfil: React.FC = () => {
  const { usuario, actualizarUsuario } = useAuth();
  const [seleccion, setSeleccion] = useState<TipoRelacion | ''>('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guardar = async () => {
    if (!usuario || !seleccion) return;
    setGuardando(true);
    try {
      await actualizarUsuario({ ...usuario, tipoRelacion: seleccion, perfilConfigurado: true });
    } catch {
      setError('Ocurrió un error al guardar tu perfil. Intenta nuevamente.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="ra-config-panel">
      <h1 className="ra-display" style={{ fontSize: 24 }}>
        Antes de comenzar
      </h1>
      <p style={{ color: 'var(--ra-color-ink-soft)', lineHeight: 1.55 }}>
        Cuéntanos qué relación tienes con la persona que está en tratamiento. Con esto organizamos los
        recursos que te mostraremos primero — siempre podrás explorar los demás también.
      </p>

      <IonItem className="ra-surface" lines="none" style={{ margin: 'var(--ra-space-4) 0', borderRadius: '8px' }}>
        <IonSelect
          label="Mi relación es de…"
          labelPlacement="stacked"
          placeholder="Selecciona una opción"
          value={seleccion}
          onIonChange={(e) => setSeleccion(e.detail.value)}
        >
          {Object.entries(ETIQUETAS_RELACION).map(([valor, etiqueta]) => (
            <IonSelectOption key={valor} value={valor}>
              {etiqueta}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonButton expand="block" disabled={!seleccion || guardando} onClick={guardar}>
        {guardando ? 'Guardando…' : 'Guardar y continuar'}
      </IonButton>

      <IonToast 
        isOpen={!!error} 
        message={error ?? ''} 
        duration={3000} 
        color="danger" 
        onDidDismiss={() => setError(null)} 
      />
    </div>
  );
};

const Inicio: React.FC = () => {
  const { usuario } = useAuth();
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    if (!usuario?.perfilConfigurado) {
      setCargando(false);
      return;
    }
    
    setCargando(true);
    api.listarRecursos(usuario.tipoRelacion)
      .then((r) => {
        setRecursos(r);
      })
      .catch(() => {
        setError('No pudimos cargar los recursos. Verifica tu conexión.');
      })
      .finally(() => {
        setCargando(false);
      });
  });

  if (!usuario) return null;

  return (
    <IonPage>
      <Header titulo={usuario.perfilConfigurado ? `Hola, ${usuario.nombre.split(' ')[0]}` : 'Bienvenido/a'} mostrarSalir />
      
      <IonContent className="ra-content-with-rail">
        <div className="ra-page-wrap ra-page-narrow">
          {!usuario.perfilConfigurado ? (
            <ConfigurarPerfil />
          ) : (
            <>
              <p className="ra-eyebrow" style={{ marginBottom: 'var(--ra-space-3)' }}>
                Recursos para {ETIQUETAS_RELACION[usuario.tipoRelacion as TipoRelacion].toLowerCase()}
              </p>

              <IonItem 
                button 
                detail={true} 
                routerLink="/directorio" 
                className="ra-surface"
                lines="none"
                style={{
                  '--border-radius': '12px',
                  '--padding-start': 'var(--ra-space-4)',
                  '--padding-end': 'var(--ra-space-2)',
                  '--padding-top': 'var(--ra-space-2)',
                  '--padding-bottom': 'var(--ra-space-2)',
                  '--background': 'transparent', 
                  border: '1px solid var(--ra-color-line)',
                  marginBottom: 'var(--ra-space-5)',
                }}
              >
                <IonIcon icon={compassOutline} slot="start" style={{ fontSize: 26, color: 'var(--ra-color-pine)' }} />
                <IonLabel className="ion-text-wrap">
                  <strong style={{ fontFamily: 'var(--ra-font-display)', fontSize: 16, color: 'var(--ra-color-ink)' }}>
                    Directorio de apoyo
                  </strong>
                  <p style={{ fontSize: 13, color: 'var(--ra-color-ink-soft)', marginTop: 4 }}>
                    Especialistas y grupos disponibles para ti
                  </p>
                </IonLabel>
              </IonItem>

              {cargando ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
                  <IonSpinner name="crescent" color="primary" />
                </div>
              ) : (
                recursos.map((r) => <ResourceCard key={r.id} recurso={r} />)
              )}
            </>
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

export default Inicio;