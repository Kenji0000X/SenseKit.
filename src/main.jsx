import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/sensekit.css'
import './styles/settings.css'
import './styles/components.css'
import './styles/accessibility-modes.css'
import { AccessibilityProvider } from './context/AccessibilityContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  </StrictMode>,
)
