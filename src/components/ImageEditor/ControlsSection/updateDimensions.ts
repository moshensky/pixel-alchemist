import type { Dimensions } from '../types'

function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function updateDimensions(
  currentDimensions: Dimensions,
  maxDimensions: Dimensions,
  minDimensions: Dimensions,
  newValue: number,
  dimensionToUpdate: 'width' | 'height',
  isAspectRatioLocked: boolean,
): Dimensions {
  const { width, height } = currentDimensions
  const { width: maxWidth, height: maxHeight } = maxDimensions
  const { width: minWidth, height: minHeight } = minDimensions
  const aspectRatio = width / height

  let updatedWidth = width
  let updatedHeight = height

  if (dimensionToUpdate === 'width') {
    updatedWidth = clampValue(newValue, minWidth, maxWidth)

    if (isAspectRatioLocked) {
      updatedHeight = Math.round(updatedWidth / aspectRatio)
      const clampedHeight = clampValue(updatedHeight, minHeight, maxHeight)

      // If height was clamped, readjust width to maintain aspect ratio
      if (clampedHeight !== updatedHeight) {
        updatedHeight = clampedHeight
        updatedWidth = Math.round(updatedHeight * aspectRatio)
      }
    }
  } else {
    updatedHeight = clampValue(newValue, minHeight, maxHeight)

    if (isAspectRatioLocked) {
      updatedWidth = Math.round(updatedHeight * aspectRatio)
      const clampedWidth = clampValue(updatedWidth, minWidth, maxWidth)

      // If width was clamped, readjust height to maintain aspect ratio
      if (clampedWidth !== updatedWidth) {
        updatedWidth = clampedWidth
        updatedHeight = Math.round(updatedWidth / aspectRatio)
      }
    }
  }

  return { width: updatedWidth, height: updatedHeight }
}
