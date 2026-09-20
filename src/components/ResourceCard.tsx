import React from 'react';
import { 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonCardContent,
  IonIcon,
  IonButton
} from '@ionic/react';
import { timeOutline, bookmarkOutline, bookmark, eyeOutline } from 'ionicons/icons';
import { Recurso } from '@/types';
import { ETIQUETAS_CATEGORIA } from '@/data/mockData';

interface ResourceCardProps {
  recurso: Recurso;
  esFavorito?: boolean;
  onToggleFavorito?: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ recurso, esFavorito = false, onToggleFavorito }) => {
  return (
    <IonCard 
      className="ion-no-margin" 
      style={{ 
        marginBottom: 'var(--ra-space-4)', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)', 
        borderRadius: '12px',
        border: '1px solid var(--ra-color-line)',
        background: 'var(--ra-color-paper)'
      }}
    >
      <IonCardHeader style={{ paddingBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IonCardSubtitle style={{ color: 'var(--ra-color-clay)', textTransform: 'none', fontWeight: 600, letterSpacing: 'normal', fontSize: '13px' }}>
            {ETIQUETAS_CATEGORIA[recurso.categoria]}
          </IonCardSubtitle>
          
          {/* Botón de favoritos solo se renderiza si se pasa la función onToggleFavorito */}
          {onToggleFavorito && (
            <IonButton 
              fill="clear" 
              style={{ '--padding-start': '8px', '--padding-end': '8px', marginTop: '-10px', marginRight: '-10px' }}
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                onToggleFavorito(recurso.id);
              }}
            >
              <IonIcon 
                slot="icon-only" 
                icon={esFavorito ? bookmark : bookmarkOutline} 
                style={{ color: esFavorito ? 'var(--ra-color-pine)' : 'var(--ra-color-ink-soft)', fontSize: '22px' }} 
              />
            </IonButton>
          )}
        </div>
        
        <IonCardTitle style={{ fontSize: '18px', color: 'var(--ra-color-ink)', lineHeight: '1.35', marginTop: '4px' }}>
          {recurso.titulo}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--ra-color-ink-soft)', lineHeight: '1.5' }}>
          {recurso.resumen}
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderTop: '1px solid var(--ra-color-line)', 
          paddingTop: '12px' 
        }}>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--ra-color-ink-soft)', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IonIcon icon={timeOutline} style={{ fontSize: '16px' }} /> 
              {recurso.tiempoLecturaMin} min
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IonIcon icon={eyeOutline} style={{ fontSize: '16px' }} /> 
              {recurso.vistas}
            </span>
          </div>
          
          <IonButton 
            fill="clear" 
            routerLink={`/recursos/${recurso.id}`}
            style={{ '--color': 'var(--ra-color-pine)', fontWeight: 600, '--padding-end': 0, height: 'auto', margin: 0 }}
          >
            Leer más
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ResourceCard;