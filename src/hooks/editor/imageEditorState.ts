export type ImageEditorState = {
  width: number
  height: number
  blur: number
  grayscale: boolean
  returnTo?: {
    page: number
    items: number
  }
}

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const MAX_BLUR = 10
const MIN_BLUR = 0

function parseIntWithDefault(
  value: string | null,
  defaultValue: number,
): number {
  const parsed = Number.parseInt(value ?? 'NaN', 10)
  return Number.isNaN(parsed) ? defaultValue : parsed
}

function parseOptionalInt(value: string | null): number | undefined {
  if (value === null) {
    return undefined
  }
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? undefined : parsed
}

function parseBoolean(value: string | null): boolean {
  return value === 'true'
}

function clampBlur(blur: number): number {
  return Math.min(MAX_BLUR, Math.max(MIN_BLUR, blur))
}

export function getStateFromUrlOrDefaults(
  params: URLSearchParams,
): ImageEditorState {
  const returnPage = parseOptionalInt(params.get('returnPage'))
  const returnItems = parseOptionalInt(params.get('returnItems'))
  return {
    width: parseIntWithDefault(params.get('width'), DEFAULT_WIDTH),
    height: parseIntWithDefault(params.get('height'), DEFAULT_HEIGHT),
    grayscale: parseBoolean(params.get('grayscale')),
    blur: clampBlur(parseIntWithDefault(params.get('blur'), 0)),
    returnTo:
      returnPage && returnItems
        ? {
            page: returnPage,
            items: returnItems,
          }
        : undefined,
  }
}

export function createUrlSearchParams(
  currentState: ImageEditorState,
  newState: Partial<ImageEditorState>,
): URLSearchParams {
  const params = new URLSearchParams()
  const state = { ...currentState, ...newState }

  params.set('width', state.width.toString())
  params.set('height', state.height.toString())

  if (state.blur > 0) {
    params.set('blur', state.blur.toString())
  }

  if (state.grayscale) {
    params.set('grayscale', 'true')
  }

  if (state.returnTo) {
    params.set('returnPage', `${state.returnTo.page}`)
    params.set('returnItems', `${state.returnTo.items}`)
  }

  return params
}
