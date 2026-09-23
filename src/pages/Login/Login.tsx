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

  if (!cargando && usuario) {
    return <Redirect to={usuario.rol === 'administrador' ? '/admin/inicio' : '/inicio'} />;
  }

  
  const emailValido = correo.includes('@') && correo.includes('.');
  const passValida = password.length >= 6; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTocado(true);
    setErrorGlobal(null);

    if (!emailValido || !passValida) {
      return;
    }

    setEnviando(true);
    try {
      const u = await ingresar(correo, password);
      history.replace(u.rol === 'administrador' ? '/admin/inicio' : '/inicio');
    } catch {
      setErrorGlobal('No pudimos verificar tus credenciales. Verifica tu correo y contraseña.');
    } finally {
      setEnviando(false);
    }
  };

  const claseErrorEmail = `ra-surface ${tocado && !emailValido ? 'ion-invalid ion-touched' : ''}`;
  const claseErrorPass = `ra-surface ${tocado && !passValida ? 'ion-invalid ion-touched' : ''}`;

  return (
    <IonPage>
      <IonContent fullscreen className="ra-auth-content">
        <div className="ra-auth-shell">
          <div className="ra-auth-card">
          
          <div className="ra-brand-mark">
            <IonIcon icon={leafOutline} style={{ color: 'white', fontSize: 24 }} />
          </div>

          <h1 className="ra-auth-title">
            Red de Apoyo
          </h1>
          <p className="ra-section-subtitle">
            Recursos y acompañamiento para quienes sostienen a una persona con cáncer.
          </p>

          <form onSubmit={handleSubmit}>
            <IonItem className={claseErrorEmail + ' ra-form-item'} lines="none">
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

            <IonItem className={claseErrorPass + ' ra-form-item'} lines="none">
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

            <IonButton className="ra-primary-button" expand="block" type="submit" disabled={enviando}>
              Iniciar sesión
            </IonButton>
          </form>

          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
            ¿Aún no tienes una cuenta?{' '}
            <IonRouterLink routerLink="/registro" style={{ color: 'var(--ra-color-clay)', fontWeight: 600 }}>
              Regístrate
            </IonRouterLink>
          </p>
          
          <p className="ra-auth-footnote">
            Consejo de prueba: ingresa con un correo que empiece con "admin" para ver el panel administrador.
          </p>
          </div>
        </div>

        <IonLoading isOpen={enviando} message="Iniciando sesión..." spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};

export default Login;