import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { z } from 'zod'
import { ImageSchema, type PicsumImage } from '../schema/image'
import { parseApiResponse } from '../schema/validation'
import { BASE_URL } from '../shared/types'
import { createImageName } from '../utils/createImageName'
import { createImageUrl } from '../utils/createImageUrl'
import { saveBlobLocally } from '../utils/saveBlobLocally'
import type {
  DownloadImageArg,
  GetImageInfoArg,
  GetImagesQueryArg,
  GetImagesResult,
} from './types'

export const picsumApi = createApi({
  reducerPath: 'picsumApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getImages: builder.query<GetImagesResult, GetImagesQueryArg>({
      query: ({ page, limit }) => `/v2/list?page=${page}&limit=${limit}`,
      transformResponse: (response: unknown) => {
        const images = parseApiResponse(z.array(ImageSchema), response)

        return images.map(({ download_url, ...rest }) => ({
          ...rest,
          downloadUrl: download_url,
        }))
      },
    }),
    getImageInfo: builder.query<PicsumImage, GetImageInfoArg>({
      query: ({ imageId }) => `/id/${imageId}/info`,
      transformResponse: (response: unknown) => {
        const image = parseApiResponse(ImageSchema, response)
        const { download_url, ...rest } = image

        return {
          ...rest,
          downloadUrl: download_url,
        }
      },
    }),
    downloadImage: builder.query<void, DownloadImageArg>({
      query: (data) => ({
        url: createImageUrl(data),
        method: 'GET',
        responseHandler: (response) =>
          response.blob().then((blob) => {
            saveBlobLocally(blob, createImageName(data))
          }),
      }),
    }),
  }),
})

export const {
  useGetImagesQuery,
  useGetImageInfoQuery,
  useLazyDownloadImageQuery,
} = picsumApi
