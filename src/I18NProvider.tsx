import type { PropsWithChildren } from 'react'
import { IntlProvider } from 'react-intl'
import enLocaleMessages from './assets/locales/en.json'

type Props = PropsWithChildren

export function I18NProvider({ children }: Props) {
  return (
    <IntlProvider locale="en" messages={enLocaleMessages}>
      {children}
    </IntlProvider>
  )
}
