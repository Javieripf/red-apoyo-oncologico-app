// src/App.tsx
import { setupIonicReact, IonApp } from '@ionic/react';
import { AuthProvider } from './context/AuthContext'; 
import AppRoutes from './routes/AppRoutes'; 

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/app.css';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </IonApp>
  );
}

export default App;