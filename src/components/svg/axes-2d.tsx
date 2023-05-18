import React from 'react'

import Arrow from './arrow'

interface Axes2DProps {
  x: number
  y: number
  angle?: number
  length?: number
  color?: string
  xLabelDx?: number
  xLabelDy?: number
  yLabelDx?: number
  yLabelDy?: number
  xLabel?: () => React.ReactElement
  yLabel?: () => React.ReactElement
}

const Axes2D = ({
  x,
  y,
  angle = 0,
  length = 30,
  color = 'black',
  xLabelDx = 0,
  xLabelDy = 0,
  yLabelDx = 0,
  yLabelDy = 0,
  xLabel,
  yLabel,
  ...props
}: Axes2DProps) => (
  <g transform={`translate(${x},${y}) rotate(${-angle} 0 0)`} {...props}>
    <Arrow x1={0} y1={0} x2={length} y2={0} color={color} />
    <Arrow x1={0} y1={0} x2={0} y2={-length} color={color} />
    {xLabel && (
      <g
        // prettier-ignore
        transform={`translate(${length + xLabelDx},${-xLabelDy}) rotate(${angle})`}
      >
        {xLabel()}
      </g>
    )}
    {yLabel && (
      <g
        // prettier-ignore
        transform={`translate(${yLabelDx},${-(length + yLabelDy)}) rotate(${angle})`}
      >
        {yLabel()}
      </g>
    )}
  </g>
)

export default Axes2D
