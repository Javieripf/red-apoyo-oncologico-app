import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonSpinner, 
  IonProgressBar, 
  IonText, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonToast,
  useIonViewWillEnter
} from '@ionic/react';
import Header from '@/components/Header';
import AdminNav from './AdminNav';
import * as api from '@/services/api';
import { MetricaRecurso, MetricasPorPerfil } from '@/types';
import { ETIQUETAS_RELACION } from '@/data/mockData';

// Refactorizado para usar el componente nativo IonProgressBar
const BarraHorizontal: React.FC<{ etiqueta: string; valor: number; max: number; color: string }> = ({ etiqueta, valor, max, color }) => {
  const porcentaje = max > 0 ? valor / max : 0;
  
  return (
    <div style={{ marginBottom: 'var(--ra-space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 8 }}>
        <IonText color="dark" style={{ fontWeight: 500 }}>{etiqueta}</IonText>
        <IonText color="medium">{valor}</IonText>
      </div>
      <IonProgressBar 
        value={porcentaje} 
        style={{ 
          '--progress-background': color, 
          '--background': 'var(--ra-color-line)',
          height: 8, 
          borderRadius: 999 
        }} 
      />
    </div>
  );
};

const Metricas: React.FC = () => {
  const [porRecurso, setPorRecurso] = useState<MetricaRecurso[]>([]);
  const [porPerfil, setPorPerfil] = useState<MetricasPorPerfil[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Garantiza que las métricas se recarguen cada vez que el admin entra a la pestaña
  useIonViewWillEnter(() => {
    setCargando(true);
    api.obtenerMetricas()
      .then(({ porRecurso, porPerfil }) => {
        setPorRecurso(porRecurso);
        setPorPerfil(porPerfil.sort((a, b) => b.vistas - a.vistas));
      })
      .catch(() => {
        setError('No pudimos cargar las métricas en este momento.');
      })
      .finally(() => {
        setCargando(false);
      });
  });

  const maxRecurso = Math.max(...porRecurso.map((r) => r.vistas), 1);
  const maxPerfil = Math.max(...porPerfil.map((p) => p.vistas), 1);

  return (
    <IonPage>
      <Header titulo="Métricas" mostrarSalir />
      
      <IonContent className="ra-content-with-rail">
        <div className="ion-padding" style={{ maxWidth: 720, margin: '0 auto' }}>
          <AdminNav />

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ra-space-6)' }}>
              <IonSpinner name="crescent" color="primary" />
            </div>
          ) : (
            <>
              {/* Uso de IonCard para estructurar el Dashboard nativo */}
              <IonCard className="ion-no-margin" style={{ marginBottom: 'var(--ra-space-5)', boxShadow: 'none', border: '1px solid var(--ra-color-line)' }}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: 16, color: 'var(--ra-color-ink)' }}>Recursos más consultados</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {porRecurso.length > 0 ? porRecurso.slice(0, 8).map((r) => (
                    <BarraHorizontal 
                      key={r.recursoId} 
                      etiqueta={r.titulo} 
                      valor={r.vistas} 
                      max={maxRecurso} 
                      color="var(--ra-color-pine)" 
                    />
                  )) : (
                    <p style={{ textAlign: 'center', color: 'var(--ra-color-ink-soft)' }}>No hay datos suficientes.</p>
                  )}
                </IonCardContent>
              </IonCard>

              <IonCard className="ion-no-margin" style={{ boxShadow: 'none', border: '1px solid var(--ra-color-line)' }}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: 16, color: 'var(--ra-color-ink)' }}>Vistas por tipo de perfil</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {porPerfil.length > 0 ? porPerfil.map((p) => (
                    <BarraHorizontal
                      key={p.tipoRelacion}
                      etiqueta={ETIQUETAS_RELACION[p.tipoRelacion]}
                      valor={p.vistas}
                      max={maxPerfil}
                      color="var(--ra-color-clay)"
                    />
                  )) : (
                    <p style={{ textAlign: 'center', color: 'var(--ra-color-ink-soft)' }}>No hay datos suficientes.</p>
                  )}
                </IonCardContent>
              </IonCard>
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

export default Metricas;