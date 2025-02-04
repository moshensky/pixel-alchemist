import type { PicsumImage } from '../schema/image'
import type { ImageUrlParams } from '../shared/types'

export type GetImagesQueryArg = {
  page: number
  limit: number
}

export type GetImagesResult = ReadonlyArray<PicsumImage>

export type GetImageInfoArg = {
  imageId: string
}

export type DownloadImageArg = ImageUrlParams
