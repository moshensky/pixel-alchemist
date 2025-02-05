import { useEffect, useState } from 'react'
import { z } from 'zod'
import { type ImageEditorState, useDebounce } from '../../../hooks'
import { Checkbox } from '../../ui/Checkbox'
import { RangeInput } from '../../ui/RangeInput'
import type { Dimensions } from '../types'
import { DimensionsControl } from './DimensionsControl'

const DEBOUNCE_MS = 300

const dimensionsSchema = z.object({
  width: z.number().min(1).max(15000),
  height: z.number().min(1).max(15000),
  blur: z.number().min(0).max(10),
})

type Props = {
  initialState: ImageEditorState
  maxDimensions?: Dimensions
  onChange: (state: ImageEditorState) => void
}

export function EditorControls({
  initialState,
  maxDimensions,
  onChange,
}: Props) {
  const [error, setError] = useState<string>()
  // Because of debounce we control a copy of the state
  const [localState, setLocalState] = useState(initialState)
  const debouncedOnChange = useDebounce(onChange, DEBOUNCE_MS)

  useEffect(() => {
    setLocalState(initialState)
  }, [initialState])

  const handleChange = (newState: Partial<ImageEditorState>) => {
    try {
      const updatedState = { ...localState, ...newState }
      dimensionsSchema.parse(updatedState)
      setError(undefined)
      setLocalState(updatedState)
      debouncedOnChange(updatedState)
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError('Value is out of range')
      }
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h3 className="font-bold mb-3">Dimensions</h3>

        <DimensionsControl
          dimensions={localState}
          maxDimensions={maxDimensions}
          onChange={(dimensions) => handleChange(dimensions)}
        />

        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

        {maxDimensions && (
          <div className="text-gray-500 mt-2">
            Original size: {maxDimensions.width} x {maxDimensions.height} px
          </div>
        )}
      </section>

      <section>
        <h3 className="font-bold mb-3">Effects</h3>

        <div className="space-y-4">
          <Checkbox
            label="Grayscale"
            checked={localState.grayscale}
            onChange={() => handleChange({ grayscale: !localState.grayscale })}
          />

          <RangeInput
            label="Blur"
            value={localState.blur}
            max={10}
            onChange={(value) => handleChange({ blur: value })}
          />
        </div>
      </section>
    </div>
  )
}
