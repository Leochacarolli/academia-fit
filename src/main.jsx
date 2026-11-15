import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AlunosProvider } from './context/AlunosContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlunosProvider>
      <App />
    </AlunosProvider>
  </StrictMode>
)
