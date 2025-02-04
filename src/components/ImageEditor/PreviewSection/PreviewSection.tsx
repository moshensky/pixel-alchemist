import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import type { PicsumImage } from '../../../services/picsum'
import { Button } from '../../ui/Button'
import { LoadingSpinner } from '../../ui/LoadingSpinner'
import { ImageInfo } from './ImageInfo'
import { ImagePreview } from './ImagePreview'

type Props = {
  imageInfo?: PicsumImage
  imageUrl: string
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
  onDownload: () => void
}

export function PreviewSection({
  imageInfo,
  imageUrl,
  isLoading,
  onLoadingChange,
  onDownload,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="relative">
        <ImagePreview
          url={imageUrl}
          onLoadStart={() => onLoadingChange(true)}
          onLoadEnd={() => onLoadingChange(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {imageInfo && <ImageInfo image={imageInfo} />}

      <div className="flex justify-end">
        <Button
          onClick={onDownload}
          className="inline-flex items-center space-x-2"
          disabled={isLoading}
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          <span>Download Image</span>
        </Button>
      </div>
    </div>
  )
}
