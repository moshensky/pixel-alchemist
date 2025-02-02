import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { IntlProvider } from 'react-intl'
import App from './App.tsx'
import enLocaleMessages from './assets/locales/en.json'

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
    <IntlProvider locale="en" messages={enLocaleMessages}>
      <App />
    </IntlProvider>
  </StrictMode>,
)
