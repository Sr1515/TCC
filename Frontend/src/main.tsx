import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/GlobalStyles';
import { AuthProviderContext } from './context/AuthProvider';
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <AuthProviderContext>
        <AppRoutes />
      </AuthProviderContext>
    </BrowserRouter>
  </StrictMode>
);
