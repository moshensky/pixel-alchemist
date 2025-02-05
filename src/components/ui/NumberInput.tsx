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
  const [keyPressed, setKeyPressed] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (!isDirty) {
      setInputValue(`${value}`)
    }
  }, [value, isDirty])

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value
    setInputValue(newValue)
    setIsDirty(true)

    // The change is triggered most probably by the spinner buttons
    // when diff equals to step and no key was pressed
    const diff = Math.abs(ev.target.valueAsNumber - Number(inputValue))
    if (diff === step && keyPressed === false) {
      onChange(newValue)
    }

    setKeyPressed(false)
  }

  const handleBlur = () => {
    onChange(inputValue)
    setIsDirty(false)
  }

  const handleKeyDown = () => {
    setKeyPressed(true)
  }

  return (
    <label>
      {label}
      <input
        type="number"
        value={inputValue}
        onKeyDown={handleKeyDown}
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
