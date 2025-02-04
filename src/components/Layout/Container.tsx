import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ className: string }>

export function Container({ children, className }: Props) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
