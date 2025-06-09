import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // StrictMode geçici olarak kapatıldı - authentication state problemi nedeniyle
  // <StrictMode>
    <App />
  // </StrictMode>,
) 