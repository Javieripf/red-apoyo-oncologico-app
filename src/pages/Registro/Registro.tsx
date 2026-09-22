import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonText,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonLoading,
  IonInputPasswordToggle
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ETIQUETAS_RELACION } from '@/data/mockData';
import { TipoRelacion } from '@/types';

const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Registro: React.FC = () => {
  const { registrarse } = useAuth();
  const history = useHistory();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [tipoRelacion, setTipoRelacion] = useState<TipoRelacion | ''>('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  
  const [tocado, setTocado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  // Lógica de validación
  const nombreValido = nombre.trim().length > 1;
  const correoValido = CORREO_REGEX.test(correo);
  const passwordValida = password.length >= 8;
  const passwordsCoinciden = password.length > 0 && password === confirmar;
  const formularioValido = nombreValido && correoValido && passwordValida && passwordsCoinciden && tipoRelacion && aceptaTerminos;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTocado(true);
    setErrorGeneral(null);

    // Se detiene aquí si fallan las validaciones, pero ahora la UI sí reaccionará
    if (!formularioValido) return;

    setEnviando(true);
    try {
      await registrarse({ nombre: nombre.trim(), correo, tipoRelacion: tipoRelacion as TipoRelacion });
      history.replace('/inicio');
    } catch {
      setErrorGeneral('No pudimos crear tu cuenta. Inténtalo nuevamente o verifica si el correo ya existe.');
    } finally {
      setEnviando(false);
    }
  };

  // NUEVO: La función devuelve solo las clases de validación para inyectarlas directo al input
  const claseInputError = (condicionInvalida: boolean) => 
    tocado && condicionInvalida ? 'ion-invalid ion-touched' : '';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" text="" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <h1 className="ra-display" style={{ fontSize: 26, margin: '0 0 6px' }}>
            Crea tu cuenta
          </h1>
          <p style={{ color: 'var(--ra-color-ink-soft)', margin: '0 0 var(--ra-space-5)', lineHeight: 1.5 }}>
            Solo pedimos lo necesario para personalizar tus recursos. No solicitamos datos médicos de la persona con cáncer.
          </p>

          <form onSubmit={handleSubmit}>
            <IonItem className="ra-surface" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }} lines="none">
              <IonInput
                className={claseInputError(!nombreValido)}
                label="Nombre *"
                labelPlacement="stacked"
                placeholder="Ej: Javier"
                value={nombre}
                onIonInput={(e) => setNombre(e.detail.value ?? '')}
                errorText="El nombre es obligatorio."
              />
            </IonItem>

            <IonItem className="ra-surface" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }} lines="none">
              <IonInput
                className={claseInputError(!correoValido)}
                label="Correo electrónico *"
                labelPlacement="stacked"
                type="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onIonInput={(e) => setCorreo(e.detail.value ?? '')}
                errorText="Ingresa un formato de correo válido."
              />
            </IonItem>

            <IonItem className="ra-surface" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }} lines="none">
              <IonInput
                className={claseInputError(!passwordValida)}
                label="Contraseña *"
                labelPlacement="stacked"
                type="password"
                placeholder="Crea una contraseña segura"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? '')}
                helperText="Debe contener un mínimo de 8 caracteres."
                errorText="La contraseña es muy corta (mín. 8)."
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>

            <IonItem className="ra-surface" style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }} lines="none">
              <IonInput
                className={claseInputError(!passwordsCoinciden)}
                label="Confirmar contraseña *"
                labelPlacement="stacked"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmar}
                onIonInput={(e) => setConfirmar(e.detail.value ?? '')}
                errorText="Las contraseñas no coinciden."
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>

            <IonItem className="ra-surface" style={{ marginBottom: 'var(--ra-space-4)', borderRadius: '8px' }} lines="none">
              <IonSelect
                className={claseInputError(!tipoRelacion)}
                label="Tipo de relación *"
                labelPlacement="stacked"
                placeholder="Selecciona una opción"
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

            <div style={{ marginBottom: 'var(--ra-space-4)' }}>
              <IonItem lines="none" style={{ '--background': 'transparent', '--padding-start': 0 }}>
                <IonCheckbox
                  className={claseInputError(!aceptaTerminos)}
                  slot="start"
                  checked={aceptaTerminos}
                  onIonChange={(e) => setAceptaTerminos(e.detail.checked)}
                />
                <IonText style={{ fontSize: 14, marginLeft: 8 }}>Acepto los términos y condiciones *</IonText>
              </IonItem>
              {tocado && !aceptaTerminos && (
                <IonText color="danger">
                  <p style={{ fontSize: 12, margin: '4px 0 0 8px' }}>Debes aceptar los términos para registrarte.</p>
                </IonText>
              )}
            </div>

            {errorGeneral && (
              <IonText color="danger">
                <p style={{ fontSize: 13, textAlign: 'center', marginBottom: 'var(--ra-space-3)' }}>⚠ {errorGeneral}</p>
              </IonText>
            )}

            <IonButton expand="block" type="submit" disabled={enviando}>
              Crear cuenta
            </IonButton>
          </form>
        </div>

        <IonLoading isOpen={enviando} message="Registrando tus datos..." spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};

export default Registro;