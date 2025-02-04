import { render as rtlRender } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { I18NProvider } from '../I18NProvider'

function AllTheProviders({ children }: PropsWithChildren) {
  return <I18NProvider>{children}</I18NProvider>
}

function render(ui: ReactElement, options = {}) {
  return {
    ...rtlRender(ui, {
      wrapper: AllTheProviders,
      ...options,
    }),
  }
}

export * from '@testing-library/react'
export { render }
