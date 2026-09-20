import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonText,
  IonIcon,
  IonLoading,
  IonRouterLink,
  IonInputPasswordToggle
} from '@ionic/react';
import { useHistory, Redirect } from 'react-router-dom';
import { leafOutline } from 'ionicons/icons';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const { ingresar, usuario, cargando } = useAuth();
  const history = useHistory();
  
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [tocado, setTocado] = useState(false);

  // Redirección si ya hay sesión activa
  if (!cargando && usuario) {
    return <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} />;
  }

  // Validaciones individuales
  const emailValido = correo.includes('@') && correo.includes('.');
  const passValida = password.length >= 6; // Validación básica exigida por la rúbrica

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTocado(true);
    setErrorGlobal(null);

    // Bloquea el envío si las validaciones individuales fallan
    if (!emailValido || !passValida) {
      return;
    }

    setEnviando(true);
    try {
      const u = await ingresar(correo, password);
      // Reemplaza el historial para que no puedan volver al login presionando "Atrás"
      history.replace(u.rol === 'administrador' ? '/admin/inicio' : '/inicio');
    } catch {
      setErrorGlobal('No pudimos verificar tus credenciales. Verifica tu correo y contraseña.');
    } finally {
      setEnviando(false);
    }
  };

  // Funciones auxiliares para clases de error nativas
  const claseErrorEmail = `ra-surface ${tocado && !emailValido ? 'ion-invalid ion-touched' : ''}`;
  const claseErrorPass = `ra-surface ${tocado && !passValida ? 'ion-invalid ion-touched' : ''}`;

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: '14vh' }}>
          
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'var(--ra-color-pine)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--ra-space-5)',
            }}
          >
            <IonIcon icon={leafOutline} style={{ color: 'white', fontSize: 24 }} />
          </div>

          <h1 className="ra-display" style={{ fontSize: 30, margin: '0 0 6px' }}>
            Red de Apoyo
          </h1>
          <p style={{ color: 'var(--ra-color-ink-soft)', margin: '0 0 var(--ra-space-6)', lineHeight: 1.5 }}>
            Recursos y acompañamiento para quienes sostienen a una persona con cáncer.
          </p>

          <form onSubmit={handleSubmit}>
            <IonItem className={claseErrorEmail} style={{ marginBottom: 'var(--ra-space-3)', borderRadius: '8px' }} lines="none">
              <IonInput
                label="Correo electrónico *"
                labelPlacement="stacked"
                type="email"
                autocomplete="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onIonInput={(e) => setCorreo(e.detail.value ?? '')}
                errorText="Ingresa un formato de correo válido"
              />
            </IonItem>

            <IonItem className={claseErrorPass} style={{ marginBottom: 'var(--ra-space-4)', borderRadius: '8px' }} lines="none">
              <IonInput
                label="Contraseña *"
                labelPlacement="stacked"
                type="password"
                autocomplete="current-password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? '')}
                errorText="La contraseña es obligatoria (mín. 6 caracteres)"
              >
                {/* Componente nativo para mostrar/ocultar contraseña */}
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>

            {errorGlobal && (
              <IonText color="danger">
                <p style={{ marginTop: 0, marginBottom: 'var(--ra-space-3)', fontSize: 14, textAlign: 'center' }}>
                  ⚠ {errorGlobal}
                </p>
              </IonText>
            )}

            <IonButton expand="block" type="submit" disabled={enviando} style={{ marginTop: 'var(--ra-space-3)' }}>
              Iniciar sesión
            </IonButton>
          </form>

          <p style={{ textAlign: 'center', marginTop: 'var(--ra-space-5)', fontSize: 14 }}>
            ¿Aún no tienes una cuenta?{' '}
            <IonRouterLink routerLink="/registro" style={{ color: 'var(--ra-color-clay)', fontWeight: 600 }}>
              Regístrate
            </IonRouterLink>
          </p>
          
          <p style={{ textAlign: 'center', marginTop: 'var(--ra-space-4)', fontSize: 12.5, color: 'var(--ra-color-ink-soft)' }}>
            Consejo de prueba: ingresa con un correo que empiece con "admin" para ver el panel administrador.
          </p>
        </div>

        {/* Feedback visual de carga que bloquea interacciones */}
        <IonLoading isOpen={enviando} message="Iniciando sesión..." spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};

export default Login;