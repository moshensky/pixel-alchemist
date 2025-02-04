import type { ImageUrlParams } from '../shared/types'

export function createImageName({
  imageId,
  grayscale,
  blur,
  width,
  height,
}: ImageUrlParams): string {
  const parts = [`image-${imageId}`]

  if (grayscale) {
    parts.push('grayscale')
  }

  if (blur > 0) {
    parts.push(`blur-${blur}`)
  }

  parts.push(`${width}x${height}`)

  return `${parts.join('-')}.jpg`
}
