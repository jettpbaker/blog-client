import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import './forms.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/router'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
import { CacheProvider } from './context/CacheProvider'
import { DevBanner } from './components/DevBanner/DevBanner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CacheProvider>
          <ToastProvider>
            <DevBanner />
            <AppRoutes />
          </ToastProvider>
        </CacheProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
