import {
  type PicsumImage,
  createImageDescription,
} from '../../../services/picsum'

type Props = {
  image: PicsumImage
}

export function ImageInfo({ image }: Props) {
  return (
    <div className="mt-2 text-sm text-gray-500">
      {createImageDescription(image)}
    </div>
  )
}
