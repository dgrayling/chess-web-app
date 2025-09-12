import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChessBoardProvider } from './state/ChessBoardProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChessBoardProvider>
      <App />
    </ChessBoardProvider>
  </StrictMode>,
)
