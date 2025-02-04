import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import { useState } from 'react'
import { Link } from 'react-router'
import { useImageEditorState } from '../../hooks/editor'
import {
  createImageUrl,
  useGetImageInfoQuery,
  useLazyDownloadImageQuery,
} from '../../services/picsum'
import { makeGalleryRoute } from '../../utils/makeRoutes'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { ControlsSection } from './ControlsSection'
import { ErrorMessage } from './ErrorMessage'
import { PreviewSection } from './PreviewSection'

type Props = {
  imageId: string
}

export function ImageEditor({ imageId }: Props) {
  const [state, setState] = useImageEditorState(imageId)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)

  const [download, { isLoading: isDownloading, error: downloadError }] =
    useLazyDownloadImageQuery()

  const {
    data: imageInfo,
    isLoading: isImageInfoLoading,
    error: apiError,
  } = useGetImageInfoQuery({ imageId })

  if (isImageInfoLoading) {
    return <LoadingSpinner />
  }

  if (apiError) {
    return <ErrorMessage>Image not found or no longer available</ErrorMessage>
  }

  const maxImageDimensions = pipe(
    O.fromNullable(imageInfo),
    O.map(({ width, height }) => ({ width, height })),
    O.toUndefined,
  )

  const imageUrl = createImageUrl({ imageId, ...state })
  const handleDownload = () => download({ imageId, ...state })

  const isLoading = isPreviewLoading || isDownloading

  const backToGalleryRoute = state.returnTo
    ? makeGalleryRoute(state.returnTo.page, state.returnTo.items)
    : '/'

  return (
    <>
      <div className="flex items-center justify-between mb-4 text-black">
        <h1 className="text-3xl font-bold">Image editor</h1>
        <Link
          to={backToGalleryRoute}
          className="inline-flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Gallery</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8 text-black">
        <div className="flex-1 space-y-4">
          <PreviewSection
            imageInfo={imageInfo}
            imageUrl={imageUrl}
            isLoading={isLoading}
            onLoadingChange={setIsPreviewLoading}
            onDownload={handleDownload}
          />
          {downloadError && (
            <ErrorMessage>Failed to download image</ErrorMessage>
          )}
        </div>

        <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
          <ControlsSection
            state={state}
            maxDimensions={maxImageDimensions}
            onChange={setState}
          />
        </div>
      </div>
    </>
  )
}
