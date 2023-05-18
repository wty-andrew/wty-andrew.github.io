import React from 'react'

import { normalize, scale } from '../../utils'

interface RulerProps {
  x1: number
  x2: number
  y1: number
  y2: number
  label?: () => React.ReactElement
  labelDx?: number
  labelDy?: number
  color?: string
}

const Ruler = ({
  x1,
  y1,
  x2,
  y2,
  label,
  labelDx = 0,
  labelDy = 0,
  color = 'black',
  ...props
}: RulerProps) => {
  const { x: dx, y: dy } = scale(normalize({ x: x2 - x1, y: y2 - y1 }), 5)
  const labelX = (x1 + x2) / 2 + labelDx
  const labelY = (y1 + y2) / 2 + labelDy

  return (
    <g>
      <line
        x1={x1 - dy}
        y1={y1 + dx}
        x2={x1 + dy}
        y2={y1 - dx}
        stroke={color}
        {...props}
      />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} {...props} />
      <line
        x1={x2 - dy}
        y1={y2 + dx}
        x2={x2 + dy}
        y2={y2 - dx}
        stroke={color}
        {...props}
      />
      {label && <g transform={`translate(${labelX},${labelY})`}>{label()}</g>}
    </g>
  )
}

export default Ruler
