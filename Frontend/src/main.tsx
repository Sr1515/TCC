import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignUp />
  </StrictMode>,
)
