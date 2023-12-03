import React, { forwardRef, useRef, useCallback } from 'react'
import { mergeRefs } from 'react-merge-refs'

const toSvgCoords = (svg: SVGSVGElement, screenX: number, screenY: number) => {
  const point = svg.createSVGPoint()
  point.x = screenX
  point.y = screenY
  const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse())
  return { x, y }
}

interface DragData {
  x: number
  y: number
  lastX: number
  lastY: number
  dx: number
  dy: number
}

interface DraggableProps {
  x: number
  y: number
  children: React.ReactNode
  onDragStart?: (e: DragData) => void
  onDrag?: (e: DragData) => void
  onDragEnd?: (e: DragData) => void
}

// https://stackoverflow.com/questions/53458053
const Draggable = forwardRef<SVGGElement, DraggableProps>(
  (
    {
      children,
      x,
      y,
      onDragStart,
      onDrag,
      onDragEnd,
      ...props
    }: DraggableProps,
    ref
  ) => {
    const localRef = useRef<SVGGElement>()
    const offsetRef = useRef({ x: 0, y: 0 })
    const dataRef = useRef({ x, y, lastX: x, lastY: y, dx: 0, dy: 0 })

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        e.preventDefault()

        const { x: cursorX, y: cursorY } = toSvgCoords(
          localRef.current.ownerSVGElement,
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
        onDrag && onDrag(data)
      },
      [onDrag]
    )

    const handleMouseUp = useCallback(
      (e: MouseEvent) => {
        e.preventDefault()
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        onDragEnd && onDragEnd(dataRef.current)
      },
      [onDragEnd, handleMouseMove]
    )

    const handleMouseDown = useCallback(
      (e) => {
        e.preventDefault()
        if (e.button !== 0) return // only handle left click

        const { x: cursorX, y: cursorY } = toSvgCoords(
          localRef.current.ownerSVGElement,
          e.clientX,
          e.clientY
        )
        offsetRef.current = { x: cursorX - x, y: cursorY - y }
        const { current: data } = dataRef
        data.lastX = x
        data.lastY = y

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        onDragStart && onDragStart(data)
      },
      [handleMouseMove, handleMouseUp, onDragStart]
    )

    return (
      <g
        ref={mergeRefs([localRef, ref])}
        transform={`translate(${x}, ${y})`}
        cursor="move"
        onMouseDown={handleMouseDown}
        {...props}
      >
        {children}
      </g>
    )
  }
)

export default Draggable
