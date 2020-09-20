import React from 'react'
import PropTypes from 'prop-types'

import Arrow from './Arrow'

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
}) => {
  return (
    <g transform={`translate(${x},${y}) rotate(${-angle} 0 0)`} {...props}>
      <Arrow x1={0} y1={0} x2={length} y2={0} color={color} />
      <Arrow x1={0} y1={0} x2={0} y2={-length} color={color} />
      {xLabel && (
        <g
          transform={`translate(${
            length + xLabelDx
          },${-xLabelDy}) rotate(${angle})`}
        >
          {xLabel()}
        </g>
      )}
      {yLabel && (
        <g
          transform={`translate(${yLabelDx},${-(
            length + yLabelDy
          )}) rotate(${angle})`}
        >
          {yLabel()}
        </g>
      )}
    </g>
  )
}

Axes2D.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  angle: PropTypes.number,
  length: PropTypes.number,
  color: PropTypes.string,
  xLabelDx: PropTypes.number,
  xLabelDy: PropTypes.number,
  yLabelDx: PropTypes.number,
  yLabelDy: PropTypes.number,
  xLabel: PropTypes.func,
  yLabel: PropTypes.func,
}

export default Axes2D
