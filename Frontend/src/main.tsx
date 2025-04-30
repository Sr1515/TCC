import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Sessions from './pages/Sessions'
import { GlobalStyle } from './styles/GlobalStyles'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <Sessions />
  </StrictMode>,
)
