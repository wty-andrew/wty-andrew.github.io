import React from 'react'

import { radians } from '../../utils'

// https://stackoverflow.com/questions/5736398
const polarToCartesian = (x: number, y: number, r: number, angle: number) => {
  return { x: x + r * Math.cos(angle), y: y + r * Math.sin(angle) }
}

interface ArcProps {
  x?: number
  y?: number
  r?: number
  startAngle?: number
  endAngle?: number
  counterclockwise?: boolean
  color?: string
}

const Arc = ({
  x = 0,
  y = 0,
  r = 0,
  startAngle = 0,
  endAngle = 0,
  counterclockwise = true,
  color = 'black',
  ...props
}: ArcProps) => {
  const start = polarToCartesian(x, y, r, radians(endAngle))
  const end = polarToCartesian(x, y, r, radians(startAngle))
  const sweepFlag = counterclockwise ? 0 : 1
  const largeArcFlag = Number((endAngle - startAngle) > 180) * (1 - sweepFlag)
  return (
    <path
      d={`M${start.x} ${start.y} A${r} ${r},0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`}
      stroke={color}
      fill="none"
      {...props}
    />
  )
}

export default Arc
