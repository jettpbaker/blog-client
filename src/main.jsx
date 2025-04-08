import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import './forms.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/router'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
import { DevBanner } from './components/DevBanner/DevBanner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          {/* <DevBanner /> */}
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
