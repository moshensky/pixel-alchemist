import type { PropsWithChildren } from 'react'
import { Container } from './Container'
import { Header } from './Header'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50">
        <Container className="py-8">{children}</Container>
      </main>
    </div>
  )
}
