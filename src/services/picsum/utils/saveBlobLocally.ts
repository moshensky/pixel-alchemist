export function saveBlobLocally(blob: Blob, filename: string): void {
  const objectUrl = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = filename
  anchor.click()
  window.URL.revokeObjectURL(objectUrl)
}
