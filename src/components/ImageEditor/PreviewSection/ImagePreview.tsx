import { useEffect, useRef, useState } from 'react'
import { ErrorMessage } from '../ErrorMessage'

type Props = {
  url: string
  onLoadStart: () => void
  onLoadEnd: () => void
}

export function ImagePreview({ url, onLoadStart, onLoadEnd }: Props) {
  const [previewError, setPreviewError] = useState<boolean>(false)
  const urlRef = useRef<string>('')

  const handlePreviewError = () => {
    setPreviewError(true)
    onLoadEnd()
  }

  useEffect(() => {
    // Ensure onLoadStart is called only once for each unique url
    if (urlRef.current !== url) {
      onLoadStart()
      setPreviewError(false)
      urlRef.current = url
    }
  }, [url, onLoadStart])

  return (
    <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
      {previewError ? (
        <ErrorMessage>
          Failed to load preview. The image might be too large or unavailable.
          Try different dimensions.
        </ErrorMessage>
      ) : (
        <img
          src={url}
          alt="Edit preview"
          className="w-full h-full object-contain"
          onError={handlePreviewError}
          onLoad={onLoadEnd}
        />
      )}
    </div>
  )
}
