import type { PicsumImage } from '../schema/image'

export function createImageDescription({ id, author }: PicsumImage): string {
  return `#${id} by ${author}`
}
