import React from 'react'
import PropTypes from 'prop-types'

// https://stackoverflow.com/questions/808826
const Arrow = ({
  x1,
  y1,
  x2,
  y2,
  color = 'black',
  size = 5,
  hollow = false,
  doubleEnded = false,
  ...props
}) => {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const cos1 = size * Math.cos(angle - Math.PI / 6)
  const sin1 = size * Math.sin(angle - Math.PI / 6)
  const cos2 = size * Math.cos(angle + Math.PI / 6)
  const sin2 = size * Math.sin(angle + Math.PI / 6)

  const startR = { x: x1 + cos2, y: y1 + sin2 }
  const startL = { x: x1 + cos1, y: y1 + sin1 }
  const endR = { x: x2 - cos1, y: y2 - sin1 }
  const endL = { x: x2 - cos2, y: y2 - sin2 }

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        fill="none"
        stroke={color}
        {...props}
      />

      <polyline
        points={`${endR.x},${endR.y} ${x2},${y2} ${endL.x},${endL.y}`}
        fill={hollow ? 'none' : color}
        stroke={color}
        {...props}
      />

      {doubleEnded && (
        <polyline
          points={`${startL.x},${startL.y} ${x1},${y1} ${startR.x},${startR.y}`}
          fill={hollow ? 'none' : color}
          stroke={color}
          {...props}
        />
      )}
    </g>
  )
}

Arrow.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  hollow: PropTypes.bool,
  doubleEnded: PropTypes.bool,
}

export default Arrow
