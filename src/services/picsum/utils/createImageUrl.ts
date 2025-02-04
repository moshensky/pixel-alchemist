import { BASE_URL, type ImageUrlParams } from '../shared/types'

export function createImageUrl({
  imageId,
  width,
  height,
  grayscale,
  blur,
}: ImageUrlParams) {
  const url = new URL(`${BASE_URL}/id/${imageId}/${width}/${height}`)

  if (grayscale) {
    url.searchParams.append('grayscale', '')
  }

  if (blur > 0) {
    url.searchParams.append('blur', blur.toString())
  }

  return url.toString()
}
