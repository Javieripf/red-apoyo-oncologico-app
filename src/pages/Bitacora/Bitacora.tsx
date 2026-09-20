import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonTextarea, 
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonLoading,
  IonToast,
  IonCard,
  IonCardContent,
  IonRippleEffect,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  useIonViewWillEnter
} from '@ionic/react';
import Header from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import * as api from '@/services/api';
import { EstadoEmocional, Recurso, RegistroBitacora } from '@/types';
import { ETIQUETAS_ESTADO } from '@/data/mockData';

const CATEGORIA_SUGERIDA: Partial<Record<EstadoEmocional, string[]>> = {
  ansioso_a: ['r7', 'r2'],
  triste: ['r1', 'r4'],
  cansado_a: ['r2', 'r7'],
  abrumado_a: ['r2', 'r6'],
};

const Bitacora: React.FC = () => {
  const [seleccionado, setSeleccionado] = useState<EstadoEmocional | null>(null);
  const [nota, setNota] = useState('');
  
  const [guardando, setGuardando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  
  const [sugeridos, setSugeridos] = useState<Recurso[]>([]);
  const [historial, setHistorial] = useState<RegistroBitacora[]>([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(true);
  
  const [error, setError] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    setCargandoHistorial(true);
    api.listarBitacora()
      .then(setHistorial)
      .catch(() => {
        setError('No pudimos cargar tu historial reciente. Verifica tu conexión.');
      })
      .finally(() => {
        setCargandoHistorial(false);
      });
  });

  const guardar = async () => {
    if (!seleccionado) return;
    
    setGuardando(true);
    setError(null);
    
    try {
      const registro = await api.registrarEstado({ 
        fecha: new Date().toISOString(), 
        estado: seleccionado, 
        nota: nota.trim() || undefined 
      });
      
      setHistorial((h) => [registro, ...h]);

      const idsSugeridos = CATEGORIA_SUGERIDA[seleccionado] ?? ['r7'];
      const todos = await api.listarRecursos();
      setSugeridos(todos.filter((r) => idsSugeridos.includes(r.id)));

      setConfirmado(true);
    } catch (e) {
      setError('Ocurrió un error al guardar tu registro. Intenta nuevamente.');
    } finally {
      setGuardando(false);
    }
  };

  const reiniciar = () => {
    setSeleccionado(null);
    setNota('');
    setConfirmado(false);
    setSugeridos([]);
  };

  return (
    <IonPage>
      <Header titulo="Bitácora emocional" />
      <IonContent className="ra-content-with-rail">
        <div className="ion-padding" style={{ maxWidth: 560, margin: '0 auto' }}>
          
          {!confirmado ? (
            <>
              <p style={{ color: 'var(--ra-color-ink-soft)', lineHeight: 1.55, marginTop: 0 }}>
                ¿Cómo te sientes hoy? Este registro es personal, no es un diagnóstico ni reemplaza una evaluación profesional.
              </p>

              {/* Implementación de IonGrid para maquetación responsiva nativa */}
              <IonGrid className="ion-no-padding" style={{ margin: 'var(--ra-space-5) 0' }}>
                <IonRow style={{ gap: 'var(--ra-space-3)', justifyContent: 'center' }}>
                  {Object.entries(ETIQUETAS_ESTADO).map(([valor, { label, icon }]) => {
                    const activo = seleccionado === valor;
                    return (
                      <IonCol 
                        size="5.8" // Aproximadamente 50% menos el gap
                        key={valor}
                        onClick={() => setSeleccionado(valor as EstadoEmocional)}
                        className="ra-surface ion-activatable ripple-parent"
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          padding: 'var(--ra-space-3)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                          cursor: 'pointer',
                          borderColor: activo ? 'var(--ra-color-pine)' : 'var(--ra-color-line)',
                          borderWidth: activo ? 2 : 1,
                          borderStyle: 'solid',
                          background: activo ? 'rgba(47, 74, 69, 0.06)' : 'var(--ra-color-paper-raised)',
                          borderRadius: '12px',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <span style={{ fontSize: 28 }}>{icon}</span>
                        <span style={{ fontSize: 13, textAlign: 'center', fontWeight: activo ? 600 : 400, color: 'var(--ra-color-ink)' }}>
                          {label}
                        </span>
                        <IonRippleEffect />
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>

              <IonItem className="ra-surface" lines="none" style={{ borderRadius: '12px' }}>
                <IonTextarea
                  label="Nota (opcional)"
                  labelPlacement="stacked"
                  placeholder="Si quieres, cuenta un poco más sobre cómo te sientes…"
                  autoGrow
                  value={nota}
                  onIonInput={(e) => setNota(e.detail.value ?? '')}
                />
              </IonItem>

              <IonButton expand="block" disabled={!seleccionado || guardando} onClick={guardar} style={{ marginTop: 'var(--ra-space-4)' }}>
                Guardar registro
              </IonButton>
            </>
          ) : (
            <div>
              <IonCard className="ion-no-margin" style={{ marginBottom: 'var(--ra-space-5)', boxShadow: 'none', border: '1px solid var(--ra-color-pine)', background: 'rgba(47, 74, 69, 0.04)' }}>
                <IonCardContent>
                  <p style={{ margin: 0, color: 'var(--ra-color-pine)', fontWeight: 600, fontSize: 16 }}>Registro guardado ✓</p>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--ra-color-ink-soft)' }}>
                    Gracias por tomarte un momento para ti.
                  </p>
                </IonCardContent>
              </IonCard>

              {sugeridos.length > 0 && (
                <>
                  <p className="ra-eyebrow" style={{ marginBottom: 'var(--ra-space-3)' }}>
                    Recursos que podrían ayudarte ahora
                  </p>
                  {sugeridos.map((r) => (
                    <ResourceCard key={r.id} recurso={r} />
                  ))}
                </>
              )}

              <IonButton expand="block" fill="outline" onClick={reiniciar} style={{ marginTop: 'var(--ra-space-4)' }}>
                Hacer otro registro
              </IonButton>
            </div>
          )}

          <div style={{ marginTop: 'var(--ra-space-7)' }}>
            <p className="ra-eyebrow" style={{ marginBottom: 'var(--ra-space-3)' }}>
              Historial reciente
            </p>
            
            {cargandoHistorial ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-4)' }}>
                <IonSpinner name="crescent" color="primary" />
              </div>
            ) : historial.length === 0 ? (
              <p style={{ color: 'var(--ra-color-ink-soft)', fontSize: 14, textAlign: 'center' }}>
                Aún no tienes registros en tu bitácora.
              </p>
            ) : (
              <IonList className="ion-no-padding" style={{ background: 'transparent' }}>
                {historial.slice(0, 8).map((h) => (
                  <IonItem key={h.id} lines="full" style={{ '--background': 'transparent', '--padding-start': 0 }}>
                    <span slot="start" style={{ fontSize: 26, margin: '0 16px 0 0' }}>
                      {ETIQUETAS_ESTADO[h.estado].icon}
                    </span>
                    <IonLabel>
                      <h3 style={{ fontSize: 15, fontWeight: 500 }}>
                        {ETIQUETAS_ESTADO[h.estado].label}
                      </h3>
                      {h.nota && <p style={{ fontSize: 13, color: 'var(--ra-color-ink-soft)', whiteSpace: 'normal', marginTop: '4px' }}>{h.nota}</p>}
                    </IonLabel>
                    <span slot="end" style={{ fontSize: 12, color: 'var(--ra-color-clay)' }}>
                      {new Date(h.fecha).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                    </span>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>
        </div>

        <IonLoading isOpen={guardando} message="Guardando tu registro..." spinner="crescent" />
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

export default Bitacora;