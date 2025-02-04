type Props = {
  label: string
  value: number
  max: number
  onChange: (value: number) => void
}

export function RangeInput({ label, value, max, onChange }: Props) {
  const backgroundPercentageFilling = (value / max) * 100
  const id = `range-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label htmlFor={id}>{label}</label>
        <span className="text-gray-500">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-blue-600 [&]:bg-gradient-to-r from-blue-600 to-blue-600 bg-no-repeat"
        style={{
          backgroundSize: `${backgroundPercentageFilling}% 100%`,
        }}
      />
    </div>
  )
}
