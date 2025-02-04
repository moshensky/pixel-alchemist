import type { PropsWithChildren } from 'react'

export function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="text-center py-12">
      <p className="text-red-500 mb-4">{children}</p>
    </div>
  )
}
