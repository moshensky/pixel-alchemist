import type { ImageEditorState } from '../../../hooks'
import type { Dimensions } from '../types'
import { EditorControls } from './EditorControls'

type Props = {
  state: ImageEditorState
  maxDimensions?: Dimensions
  onChange: (state: ImageEditorState) => void
}

export function ControlsSection({ state, maxDimensions, onChange }: Props) {
  return (
    <div className="mt-6 lg:mt-0 lg:w-80 xl:w-96">
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <EditorControls
          initialState={state}
          maxDimensions={maxDimensions}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
