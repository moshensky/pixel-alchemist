import clsx from 'clsx'
import { type ChangeEvent, useEffect, useState } from 'react'

type Props = {
  label: string
  value: number
  step?: number
  inputClassName?: string
  onChange: (value: string) => void
}

export function NumberInput({
  label,
  value,
  step,
  inputClassName,
  onChange,
}: Props) {
  const [inputValue, setInputValue] = useState(`${value}`)

  useEffect(() => {
    setInputValue(`${value}`)
  }, [value])

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value)
  }

  const handleBlur = () => {
    onChange(inputValue)
  }

  return (
    <label>
      {label}
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        step={step}
        className={clsx(
          'mt-1 p-1 block w-full rounded-sm border-gray-300 shadow-sm',
          inputClassName,
        )}
      />
    </label>
  )
}
