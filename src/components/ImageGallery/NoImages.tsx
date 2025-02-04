import { Button } from '../ui/Button'

type Props = {
  page: number
  onGoToFirstPage: () => void
}

export function NoImages({ page, onGoToFirstPage }: Props) {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-gray-600 mb-4">
        No images found on page {page}
      </p>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">You can:</p>
        <Button variant="primary" onClick={onGoToFirstPage}>
          Go to first page
        </Button>
      </div>
    </div>
  )
}
