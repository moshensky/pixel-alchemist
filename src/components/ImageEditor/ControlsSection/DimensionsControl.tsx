import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { NumberInput } from '../../ui/NumberInput'
import type { Dimensions } from '../types'
import { updateDimensions } from './updateDimensions'

const MIN_DIMENSIONS = { width: 1, height: 1 }
const MAX_DIMENSIONS = {
  width: Number.POSITIVE_INFINITY,
  height: Number.POSITIVE_INFINITY,
}

type Props = {
  dimensions: Dimensions
  maxDimensions?: Dimensions
  onChange: (dimensions: Dimensions) => void
}

export function DimensionsControl({
  dimensions,
  maxDimensions,
  onChange,
}: Props) {
  const [isLocked, setIsLocked] = useState(false)

  const handleDimensionChange =
    (dimension: 'width' | 'height') => (value: string) => {
      const newValue = Number(value)
      if (Number.isNaN(newValue)) {
        return
      }

      const updatedDimensions = updateDimensions(
        dimensions,
        maxDimensions || MAX_DIMENSIONS,
        MIN_DIMENSIONS,
        newValue,
        dimension,
        isLocked,
      )

      onChange(updatedDimensions)
    }

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <NumberInput
          label="Width"
          value={dimensions.width}
          step={10}
          onChange={handleDimensionChange('width')}
        />
        <button
          type="button"
          className="mb-[2px] p-2 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
          aria-label={isLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
          title={isLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? (
            <LockClosedIcon className="w-5 h-5" />
          ) : (
            <LockOpenIcon className="w-5 h-5" />
          )}
        </button>
        <NumberInput
          label="Height"
          value={dimensions.height}
          step={10}
          onChange={handleDimensionChange('height')}
        />
      </div>
    </div>
  )
}
