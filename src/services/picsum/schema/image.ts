import { z } from 'zod'

export const ImageSchema = z.object({
  id: z.string(),
  author: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  url: z.string(),
  download_url: z.string(),
})

export type ImageSchema = z.infer<typeof ImageSchema>

export type PicsumImage = Omit<ImageSchema, 'download_url'> & {
  downloadUrl: string
}
