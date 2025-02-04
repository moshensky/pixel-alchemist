type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Checkbox({ label, checked, onChange }: Props) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-gray-300 text-blue-600"
      />
      <span>{label}</span>
    </label>
  )
}
