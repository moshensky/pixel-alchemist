export function makeGalleryRoute(page: number, itemsPerPage: number): string {
  return `/?page=${page}&items=${itemsPerPage}`
}

export function makeEditorRoute(
  imageId: string,
  params?: URLSearchParams,
): string {
  return params
    ? `/edit-image/${imageId}?${params.toString()}`
    : `/edit-image/${imageId}`
}
