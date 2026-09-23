import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonItem, 
  IonSelect, 
  IonSelectOption, 
  IonButton, 
  IonToast, 
  IonIcon,
  IonLoading
} from '@ionic/react';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { ETIQUETAS_RELACION } from '@/data/mockData';
import { TipoRelacion } from '@/types';

const Perfil: React.FC = () => {
  const { usuario, actualizarUsuario, salir } = useAuth();
  const [tipoRelacion, setTipoRelacion] = useState<TipoRelacion | undefined>(usuario?.tipoRelacion);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!usuario) return null;

  const guardar = async () => {
    if (!tipoRelacion) return;
    
    setGuardando(true);
    setError(null);
    
    try {
      await actualizarUsuario({ ...usuario, tipoRelacion, perfilConfigurado: true });
      setMensaje('Perfil actualizado correctamente');
    } catch (e) {
      setError('Ocurrió un error al actualizar tu perfil. Intenta nuevamente.');
    } finally {
      setGuardando(false);
    }
  };

  const sinCambios = tipoRelacion === usuario.tipoRelacion;

  return (
    <IonPage>
      <Header titulo="Mi perfil" />
      <IonContent className="ra-content-with-rail">
        <div className="ra-page-wrap ra-page-small">
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--ra-space-6)' }}>
            <IonIcon icon={personCircleOutline} style={{ fontSize: 80, color: 'var(--ra-color-pine)' }} />
            <h1 className="ra-display" style={{ fontSize: 24, margin: '8px 0 2px' }}>{usuario.nombre}</h1>
            <p style={{ margin: 0, color: 'var(--ra-color-ink-soft)', fontSize: 14 }}>{usuario.correo}</p>
            
            {usuario.rol === 'administrador' && (
              <span style={{ 
                marginTop: '12px', 
                padding: '4px 12px', 
                background: 'var(--ra-color-clay)', 
                color: 'white', 
                borderRadius: '12px', 
                fontSize: 12, 
                fontWeight: 600 
              }}>
                Administrador
              </span>
            )}
          </div>

          <p className="ra-eyebrow" style={{ marginBottom: 'var(--ra-space-2)' }}>Configuración de cuenta</p>
          
          <IonItem className="ra-surface" lines="none" style={{ marginBottom: 'var(--ra-space-4)', borderRadius: '8px' }}>
            <IonSelect
              label="Mi relación es de…"
              labelPlacement="stacked"
              value={tipoRelacion}
              onIonChange={(e) => setTipoRelacion(e.detail.value)}
            >
              {Object.entries(ETIQUETAS_RELACION).map(([valor, etiqueta]) => (
                <IonSelectOption key={valor} value={valor}>
                  {etiqueta}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonButton 
            expand="block" 
            disabled={!tipoRelacion || sinCambios || guardando} 
            onClick={guardar}
          >
            Guardar cambios
          </IonButton>

          <div style={{ marginTop: 'var(--ra-space-6)', borderTop: '1px solid var(--ra-color-line)', paddingTop: 'var(--ra-space-4)' }}>
            <IonButton expand="block" fill="clear" color="danger" onClick={() => salir()}>
              <IonIcon slot="start" icon={logOutOutline} />
              Cerrar sesión
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={guardando} message="Actualizando perfil..." spinner="crescent" />
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
          duration={3000} 
          color="danger" 
          onDidDismiss={() => setError(null)} 
          position="bottom" 
        />
      </IonContent>
    </IonPage>
  );
};

export default Perfil;