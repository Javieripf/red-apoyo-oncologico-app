// src/App.tsx
import { setupIonicReact, IonApp } from '@ionic/react';
import { AuthProvider } from './context/AuthContext'; // Tu provider actual
import AppRoutes from './routes/AppRoutes'; // Tu enrutador actual

/* Estilos Core de Ionic obligatorios */
import '@ionic/react/css/core.css';
/* Estilos básicos recomendados de Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Inicializar Ionic
setupIonicReact();

function App() {
  return (
    // Es muy importante envolver toda la app en <IonApp>
    <IonApp>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </IonApp>
  );
}

export default App;