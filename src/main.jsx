import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)
