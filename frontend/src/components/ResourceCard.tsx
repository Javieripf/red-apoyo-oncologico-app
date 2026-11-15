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
      className="ion-no-margin ra-resource-card" 

    >
      <IonCardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IonCardSubtitle className="ra-resource-category" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
            {ETIQUETAS_CATEGORIA[recurso.categoria]}
          </IonCardSubtitle>
          
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
        
        <IonCardTitle className="ra-resource-title">
          {recurso.titulo}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p className="ra-resource-summary">
          {recurso.resumen}
        </p>
        
        <div className="ra-resource-meta">
          <div className="ra-resource-meta-left">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IonIcon icon={timeOutline} /> 
              {recurso.tiempoLecturaMin} min
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IonIcon icon={eyeOutline} /> 
              {recurso.vistas}
            </span>
          </div>
          
          <IonButton 
            fill="clear" 
            routerLink={`/recursos/${recurso.id}`}
            className="ra-resource-read"
          >
            Leer más
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ResourceCard;