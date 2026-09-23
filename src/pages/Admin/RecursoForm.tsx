import React, { useState } from 'react';
import { 
  IonItem, 
  IonInput, 
  IonTextarea, 
  IonSelect, 
  IonSelectOption, 
  IonButton, 
  IonText, 
  IonCheckbox, 
  IonLabel,
  IonList
} from '@ionic/react';
import { CategoriaRecurso, Recurso, TipoRelacion } from '@/types';
import { ETIQUETAS_CATEGORIA, ETIQUETAS_RELACION } from '@/data/mockData';

export interface RecursoFormValues {
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: CategoriaRecurso | '';
  perfiles: TipoRelacion[];
  tiempoLecturaMin: number;
}

interface RecursoFormProps {
  valoresIniciales?: Partial<RecursoFormValues>;
  onGuardar: (valores: Omit<RecursoFormValues, 'categoria'> & { categoria: CategoriaRecurso }) => Promise<void>;
  textoBoton: string;
}

const RecursoForm: React.FC<RecursoFormProps> = ({ valoresIniciales, onGuardar, textoBoton }) => {
  const [titulo, setTitulo] = useState(valoresIniciales?.titulo ?? '');
  const [resumen, setResumen] = useState(valoresIniciales?.resumen ?? '');
  const [contenido, setContenido] = useState(valoresIniciales?.contenido ?? '');
  const [categoria, setCategoria] = useState<CategoriaRecurso | ''>(valoresIniciales?.categoria ?? '');
  const [perfiles, setPerfiles] = useState<TipoRelacion[]>(valoresIniciales?.perfiles ?? []);
  const [tiempoLecturaMin, setTiempoLecturaMin] = useState(valoresIniciales?.tiempoLecturaMin ?? 5);
  
  const [tocado, setTocado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const errores = {
    titulo: titulo.trim().length <= 3,
    resumen: resumen.trim().length <= 3,
    contenido: contenido.trim().length <= 10,
    categoria: !categoria,
    perfiles: perfiles.length === 0,
    tiempoLectura: tiempoLecturaMin < 1
  };

  const valido = !Object.values(errores).some(Boolean);

  const alternarPerfil = (perfil: TipoRelacion) => {
    setPerfiles((prev) => (prev.includes(perfil) ? prev.filter((p) => p !== perfil) : [...prev, perfil]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTocado(true);
    
    if (!valido || !categoria) return;
    
    setGuardando(true);
    try {
      await onGuardar({ 
        titulo: titulo.trim(), 
        resumen: resumen.trim(), 
        contenido: contenido.trim(), 
        categoria, 
        perfiles, 
        tiempoLecturaMin 
      });
    } finally {
      setGuardando(false);
    }
  };

  const claseError = (errorCondicion: boolean) => 
    `ra-surface ${tocado && errorCondicion ? 'ion-invalid ion-touched' : ''}`;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
      <IonItem className={claseError(errores.titulo)} lines="none" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }}>
        <IonInput 
          label="Título *" 
          labelPlacement="stacked" 
          placeholder="Ej: Guía de apoyo familiar"
          value={titulo} 
          onIonInput={(e) => setTitulo(e.detail.value ?? '')} 
          errorText="El título debe tener al menos 4 caracteres"
        />
      </IonItem>

      <IonItem className={claseError(errores.resumen)} lines="none" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }}>
        <IonTextarea
          label="Resumen breve *"
          labelPlacement="stacked"
          placeholder="Describe brevemente el objetivo de este recurso..."
          autoGrow
          value={resumen}
          onIonInput={(e) => setResumen(e.detail.value ?? '')}
          errorText="El resumen es muy corto"
        />
      </IonItem>

      <IonItem className={claseError(errores.contenido)} lines="none" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }}>
        <IonTextarea
          label="Contenido completo *"
          labelPlacement="stacked"
          placeholder="Escribe el contenido detallado aquí..."
          autoGrow
          rows={6}
          value={contenido}
          onIonInput={(e) => setContenido(e.detail.value ?? '')}
          errorText="El contenido debe tener al menos 11 caracteres"
        />
      </IonItem>

      <IonItem className={claseError(errores.categoria)} lines="none" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }}>
        <IonSelect 
          label="Categoría *" 
          labelPlacement="stacked" 
          placeholder="Selecciona una categoría" 
          value={categoria} 
          onIonChange={(e) => setCategoria(e.detail.value)}
        >
          {Object.entries(ETIQUETAS_CATEGORIA).map(([valor, etiqueta]) => (
            <IonSelectOption key={valor} value={valor}>
              {etiqueta}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonItem className={claseError(errores.tiempoLectura)} lines="none" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }}>
        <IonInput
          label="Tiempo de lectura estimado (min) *"
          labelPlacement="stacked"
          type="number"
          min={1}
          value={tiempoLecturaMin}
          onIonInput={(e) => setTiempoLecturaMin(Number(e.detail.value ?? 1))}
          errorText="Debe ser al menos 1 minuto"
        />
      </IonItem>

      <div style={{ margin: 'var(--ra-space-4) 0' }}>
        <p className="ra-eyebrow" style={{ 
          marginBottom: 'var(--ra-space-2)', 
          color: tocado && errores.perfiles ? 'var(--ion-color-danger)' : 'inherit' 
        }}>
          Perfiles a los que se asocia *
        </p>
        
        <IonList className="ra-surface ion-no-padding" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          {Object.entries(ETIQUETAS_RELACION).map(([valor, etiqueta]) => (
            <IonItem key={valor} lines="none" style={{ '--background': 'transparent' }}>
              <IonCheckbox
                slot="start"
                checked={perfiles.includes(valor as TipoRelacion)}
                onIonChange={() => alternarPerfil(valor as TipoRelacion)}
              />
              <IonLabel style={{ fontSize: 14 }}>{etiqueta}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      
        <div style={{ minHeight: '20px', marginTop: '4px' }}>
          {tocado && errores.perfiles && (
            <IonText color="danger">
              <p style={{ fontSize: 12, margin: '0 8px' }}>⚠ Selecciona al menos un perfil.</p>
            </IonText>
          )}
        </div>
      </div>

      <IonButton expand="block" type="submit" disabled={guardando} style={{ marginTop: 'var(--ra-space-5)' }}>
        {guardando ? 'Guardando...' : textoBoton}
      </IonButton>
    </form>
  );
};

export default RecursoForm;