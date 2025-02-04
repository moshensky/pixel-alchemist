import { useState } from 'react'
import { Link } from 'react-router'
import {
  type PicsumImage,
  createImageDescription,
  createImageUrl,
} from '../../services/picsum'
import { makeEditorRoute } from '../../utils/makeRoutes'

const ASPECT_RATIO = 3 / 2
export const IMAGE_WIDTH = 501
export const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO

type Props = {
  image: PicsumImage
  returnTo?: URLSearchParams
}

export function ImageCard({ image, returnTo }: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const imageUrl = createImageUrl({
    imageId: image.id,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    blur: 0,
    grayscale: false,
  })

  return (
    <Link
      className="block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
      to={makeEditorRoute(image.id, returnTo)}
    >
      <div className="relative aspect-[3/2]">
        {!isImageLoaded && (
          <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse rounded-t-lg" />
        )}

        <img
          src={imageUrl}
          alt={createImageDescription(image)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <p className="p-4 text-gray-700 font-medium">
        {createImageDescription(image)}
      </p>
    </Link>
  )
}
