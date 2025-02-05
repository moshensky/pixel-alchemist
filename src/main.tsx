import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { App } from './App.tsx'
import { I18NProvider } from './I18NProvider.tsx'
import { store } from './store'

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
  <ErrorBoundary fallback={<div>Ups! Something went wrong.</div>}>
    <StrictMode>
      <Provider store={store}>
        <I18NProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18NProvider>
      </Provider>
    </StrictMode>
  </ErrorBoundary>,
)
