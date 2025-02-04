import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={clsx(
        'px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        variant === 'primary'
          ? 'text-white bg-blue-600 hover:bg-blue-700'
          : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  )
}
