import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18NProvider } from './I18NProvider.tsx'

function getRootElement(id: string): HTMLElement {
  const element = document.getElementById(id)
  if (!element) {
    throw new Error(
      `Failed to find element with id "${id}". Please ensure there is a <div id="${id}"> element in your HTML.`,
    )
  }
  return element
}

createRoot(getRootElement('root')).render(
  <StrictMode>
    <I18NProvider>
      <App />
    </I18NProvider>
  </StrictMode>,
)
