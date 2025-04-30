import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Sessions from './pages/Sessions'
import { GlobalStyle } from './styles/GlobalStyles'
import CreateSession from './pages/CreateSession'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <CreateSession />
  </StrictMode>,
)
