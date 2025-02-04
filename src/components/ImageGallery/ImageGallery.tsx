import { useGalleryState } from '../../hooks'
import { useGetImagesQuery } from '../../services/picsum'
import { ImageGrid } from './ImageGrid'

export function ImageGallery() {
  const {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    ref,
  } = useGalleryState()

  const {
    data: images,
    isLoading,
    error,
  } = useGetImagesQuery({ page, limit: itemsPerPage })

  return (
    <div ref={ref}>
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500">
            Failed to load images. Please try again later.
          </p>
        </div>
      ) : (
        <ImageGrid
          images={images ?? []}
          isLoading={isLoading}
          page={page}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  )
}
