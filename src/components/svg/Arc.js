import React from 'react'
import PropTypes from 'prop-types'

import { radians } from '../../utils'

// https://stackoverflow.com/questions/5736398
const polarToCartesian = (x, y, r, angle) => {
  return { x: x + r * Math.cos(angle), y: y + r * Math.sin(angle) }
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
}) => {
  const start = polarToCartesian(x, y, r, radians(endAngle))
  const end = polarToCartesian(x, y, r, radians(startAngle))
  const sweepFlag = counterclockwise ? 0 : 1
  const largeArcFlag = (endAngle - startAngle > 180) * (1 - sweepFlag)
  return (
    <path
      d={`M${start.x} ${start.y} A${r} ${r},0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`}
      stroke={color}
      fill="none"
      {...props}
    />
  )
}

Arc.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  counterclockwise: PropTypes.bool,
  color: PropTypes.string,
}

export default Arc
