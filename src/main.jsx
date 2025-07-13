import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter, Navigate } from 'react-router-dom'
import Control from './control.jsx'

const login = localStorage.getItem('login')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    {/* <App /> */}
    <Control />
    </HashRouter>
  </StrictMode>
)
