import React from 'react'
import PropTypes from 'prop-types'

import { normalize, scale } from '../../utils'

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
}) => {
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

Ruler.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  label: PropTypes.func,
  labelDx: PropTypes.number,
  labelDy: PropTypes.number,
  color: PropTypes.string,
}

export default Ruler
