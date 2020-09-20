import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const toSvgCoords = (svg, screenX, screenY) => {
  const point = svg.createSVGPoint()
  point.x = screenX
  point.y = screenY
  const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse())
  return { x, y }
}

// https://stackoverflow.com/questions/53458053
const Draggable = ({
  children,
  x,
  y,
  onDragStart = () => {},
  onDrag = () => {},
  onDragEnd = () => {},
  ...props
}) => {
  const ref = useRef()
  const offsetRef = useRef({ x: 0, y: 0 })
  const dataRef = useRef({ x, y, lastX: x, lastY: y, dx: 0, dy: 0 })

  const handleMouseMove = useRef((e) => {
    e.preventDefault()

    const { x: cursorX, y: cursorY } = toSvgCoords(
      ref.current.ownerSVGElement,
      e.clientX,
      e.clientY
    )
    const { current: data } = dataRef
    const newX = cursorX - offsetRef.current.x
    const newY = cursorY - offsetRef.current.y
    data.x = newX
    data.y = newY
    data.dx = newX - data.lastX
    data.dy = newY - data.lastY
    onDrag(data)
  })

  const handleMouseUp = useRef((e) => {
    e.preventDefault()
    document.removeEventListener('mousemove', handleMouseMove.current)
    document.removeEventListener('mouseup', handleMouseUp.current)
    onDragEnd(dataRef.current)
  })

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (e.button !== 0) return // only handle left click

    const { x: cursorX, y: cursorY } = toSvgCoords(
      ref.current.ownerSVGElement,
      e.clientX,
      e.clientY
    )
    offsetRef.current = { x: cursorX - x, y: cursorY - y }
    const { current: data } = dataRef
    data.lastX = x
    data.lastY = y

    document.addEventListener('mousemove', handleMouseMove.current)
    document.addEventListener('mouseup', handleMouseUp.current)
    onDragStart(data)
  }

  return (
    <g
      ref={ref}
      transform={`translate(${x}, ${y})`}
      cursor="move"
      onMouseDown={handleMouseDown}
      {...props}
    >
      {children}
    </g>
  )
}

Draggable.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
}

export default Draggable
