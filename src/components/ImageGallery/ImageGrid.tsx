import { ITEMS_PER_PAGE_OPTIONS, type ItemsPerPage } from '../../hooks/gallery'
import type { PicsumImage } from '../../services/picsum'
import { Button } from '../ui/Button'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { ImageCard } from './ImageCard'
import { NoImages } from './NoImages'

type Props = {
  images: ReadonlyArray<PicsumImage>
  isLoading: boolean
  page: number
  itemsPerPage: ItemsPerPage
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export const ImageGrid = ({
  images,
  isLoading,
  page,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: Props) => {
  const hasPrevious = page > 1
  const returnTo = new URLSearchParams({
    returnPage: `${page}`,
    returnItems: `${itemsPerPage}`,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  const hasImages = images.length > 0

  return (
    <div className="space-y-6">
      {hasImages ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} returnTo={returnTo} />
          ))}
        </div>
      ) : (
        <NoImages page={page} onGoToFirstPage={() => onPageChange(1)} />
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            className="rounded border-gray-300 text-sm"
            value={itemsPerPage}
            onChange={(e) =>
              onItemsPerPageChange(Number(e.target.value) as ItemsPerPage)
            }
          >
            {ITEMS_PER_PAGE_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevious || isLoading}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">Page {page}</span>

          <Button
            variant="secondary"
            onClick={() => onPageChange(page + 1)}
            disabled={isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
