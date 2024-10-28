import { type AnnotationHandler, InnerLine } from 'codehike/code'

const DEFAULT_LINE_HIGHLIGHT = '#414559'

const mark: AnnotationHandler = {
  name: 'mark',
  Line: ({ annotation, ...props }) => (
    <div
      className="flex"
      style={{
        borderLeft: 'solid 2px transparent',
        borderLeftColor: annotation?.query || 'transparent',
        backgroundColor: annotation ? DEFAULT_LINE_HIGHLIGHT : undefined,
      }}
    >
      <InnerLine merge={props} className="px-2 flex-1" />
    </div>
  ),
}

export default mark
