import { Navigate, useParams } from 'react-router'
import { ImageEditor } from './ImageEditor'

export function ImageEditorRoute() {
  const { imageId } = useParams<{ imageId: string }>()

  if (!imageId) {
    return <Navigate to="/" replace />
  }

  return <ImageEditor imageId={imageId} />
}
