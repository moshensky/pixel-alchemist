import { useNavigate, useSearchParams } from 'react-router'
import { makeEditorRoute } from '../../utils/makeRoutes'
import {
  type ImageEditorState,
  createUrlSearchParams,
  getStateFromUrlOrDefaults,
} from './imageEditorState'

export function useImageEditorState(
  imageId: string,
): [ImageEditorState, (newState: Partial<ImageEditorState>) => void] {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const state = getStateFromUrlOrDefaults(searchParams)

  const setState = (newState: Partial<ImageEditorState>) => {
    const params = createUrlSearchParams(state, newState)
    navigate(makeEditorRoute(imageId, params))
  }

  return [state, setState]
}
