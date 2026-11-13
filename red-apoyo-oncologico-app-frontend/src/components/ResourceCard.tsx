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
import { ResumenRecurso } from '@/types';
import { ETIQUETAS_CATEGORIA } from '@/data/mockData';

interface ResourceCardProps {
  recurso: ResumenRecurso;
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
              aria-label={esFavorito ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              style={{ '--padding-start': '8px', '--padding-end': '8px', marginTop: '-10px', marginRight: '-10px', minHeight: '44px', minWidth: '44px' }}
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                onToggleFavorito(recurso.id);
              }}
            >
              <IonIcon aria-hidden="true" 
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
              <IonIcon aria-hidden="true" icon={timeOutline} /> 
              {recurso.tiempoLecturaMin} min
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IonIcon aria-hidden="true" icon={eyeOutline} /> 
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
