import React, { useState, SVGProps } from 'react'
import styled from 'styled-components'

import { Arrow, Draggable, Ruler, Axes2D, Arc } from '../../components/svg'
import { degrees, clamp } from '../../utils'

const remap = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
) => {
  return ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow) + toLow
}

export const DashedLine = styled.line`
  fill: none;
  stroke: black;
  stroke-dasharray: 4, 3;
`

interface LabelProps extends SVGProps<SVGTextElement> {
  title: string
  x: number
  y: number
}

const Label = ({ title, x = 0, y = 0, ...props }: LabelProps) => (
  <text x={x} y={y} fontFamily="KaTex_Math" {...props}>
    {title}
  </text>
)

// Parameters
const wheelRadius = 20
const wheelThickness = 10
const wheelSeparation = 100
const robotRadius = 85
const velocity = 50
const maxAngularVelocity = 0.8

const ICCPosition = { x: 120, y: 80 }
const robotInitPosition = { x: 320, y: 200 }
const robotInitAngle = degrees(
  Math.atan2(
    robotInitPosition.x - ICCPosition.x,
    robotInitPosition.y - ICCPosition.y
  )
)

const DiffDriveModel = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [robotPose, setRobotPose] = useState({
    x: robotInitPosition.x,
    y: robotInitPosition.y,
    angle: robotInitAngle,
  })
  const ICCRadius = Math.hypot(
    ICCPosition.x - robotPose.x,
    ICCPosition.y - robotPose.y
  )

  const omega = Math.min(velocity / ICCRadius, maxAngularVelocity)
  const speedRight = omega * (ICCRadius + wheelSeparation / 2)
  const speedLeft = omega * (ICCRadius - wheelSeparation / 2)
  const speed = (speedRight + speedLeft) / 2

  const handleDrag = ({ x, y }: { x: number; y: number }) => {
    const angle = degrees(Math.atan2(x - ICCPosition.x, y - ICCPosition.y))
    setRobotPose((prev) => ({ ...prev, x, y, angle }))
  }

  // fade out some part when everything are squeezed together
  const opacity = remap(clamp(ICCRadius, 100, 150), 100, 150, 0.1, 1)

  return (
    <svg viewBox="0,0,600,400">
      <rect // background hack
        height="100%"
        width="100%"
        fill="white"
      />
      <Draggable
        x={robotPose.x}
        y={robotPose.y}
        onDrag={handleDrag}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <g transform={`rotate(${-robotPose.angle})`}>
          <circle
            r={robotRadius}
            fill="ivory"
            stroke="beige"
            strokeWidth={isHovered ? 6 : 3}
          />
          <Ruler // for wheel axel
            x1={-wheelRadius - 10}
            y1={wheelSeparation / 2}
            x2={-wheelRadius - 10}
            y2={-wheelSeparation / 2}
            labelDx={-10}
            label={() => (
              <Label
                x={-5}
                y={5}
                title="L"
                transform={`rotate(${robotPose.angle})`}
                opacity={opacity}
              />
            )}
            strokeOpacity={opacity}
          />
          <line // wheel axle
            x1={0}
            y1={(wheelSeparation - wheelThickness) / 2}
            x2={0}
            y2={-(wheelSeparation + wheelThickness) / 2}
            stroke="gainsboro"
            strokeWidth="5"
          />
          <rect // left wheel
            x={-wheelRadius}
            y={-(wheelSeparation + wheelThickness) / 2}
            width={wheelRadius * 2}
            height={wheelThickness}
            fill="grey"
          />
          <rect // right wheel
            x={-wheelRadius}
            y={(wheelSeparation - wheelThickness) / 2}
            width={wheelRadius * 2}
            height={wheelThickness}
            fill="grey"
          />

          <Ruler // radius of curvature
            x1={30}
            y1={0}
            x2={30}
            y2={-ICCRadius}
            labelDx={10}
            label={() => (
              <Label
                x={-7}
                y={5}
                title="R"
                transform={`rotate(${robotPose.angle})`}
                opacity={opacity}
                pointerEvents="none"
              />
            )}
            strokeOpacity={opacity}
            pointerEvents="none"
          />
          <Ruler // for wheel radius
            x1={0}
            y1={wheelSeparation / 2 + 15}
            x2={-wheelRadius}
            y2={wheelSeparation / 2 + 15}
            labelDy={10}
            label={() => (
              <Label
                x={-4}
                y={4}
                title="r"
                transform={`rotate(${robotPose.angle})`}
              />
            )}
          />

          <Arrow // robot speed (center)
            x1={0}
            y1={0}
            x2={speed}
            y2={0}
            strokeWidth={3}
            color="royalblue"
          />
          <g transform={`translate(${0},${wheelSeparation / 2})`}>
            <Arrow // right wheel speed
              x1={0}
              y1={0}
              x2={speedRight}
              y2={0}
              strokeWidth={3}
              color="lightcoral"
            />
            <g transform={`translate(${speedRight + 14},0)`}>
              <Label
                x={-7}
                y={3}
                title="vR"
                transform={`rotate(${robotPose.angle})`}
                fontSize={12}
              />
            </g>
          </g>
          <g transform={`translate(${0},${-wheelSeparation / 2})`}>
            <Arrow // left wheel speed
              x1={0}
              y1={0}
              x2={speedLeft}
              y2={0}
              strokeWidth={3}
              color="lightseagreen"
            />
            <g
              transform={`translate(${
                speedLeft + Math.sign(speedLeft) * 14
              },0)`}
            >
              <Label
                x={-7}
                y={3}
                title="vL"
                transform={`rotate(${robotPose.angle})`}
                fontSize={12}
              />
            </g>
          </g>
        </g>
      </Draggable>

      <g
        transform={`translate(${ICCPosition.x},${ICCPosition.y})`}
        opacity={opacity}
      >
        <circle r={3} fill="black" />
        <Label title="ICC" x={-10} y={-8} fontSize="12" />
      </g>
      <DashedLine
        x1={ICCPosition.x}
        y1={ICCPosition.y}
        x2={robotPose.x}
        y2={robotPose.y}
        pointerEvents="none"
      />

      <DashedLine
        x1={robotPose.x - 120}
        y1={robotPose.y}
        x2={robotPose.x + 120}
        y2={robotPose.y}
        pointerEvents="none"
      />

      <Axes2D // robot coordinate
        x={robotPose.x}
        y={robotPose.y}
        length={120}
        angle={robotPose.angle}
        xLabelDx={10}
        yLabelDx={10}
        yLabelDy={5}
        xLabel={() => <Label x={-6} y={3} title="Xr" fontSize={10} />}
        yLabel={() => <Label x={-5} y={3} title="Yr" fontSize={10} />}
        opacity={opacity}
        pointerEvents="none"
      />
      <Axes2D // world coordinate
        x={40}
        y={360}
        length={250}
        xLabelDx={10}
        yLabelDy={10}
        xLabel={() => <Label x={-8} y={3} title="Xw" fontSize={10} />}
        yLabel={() => <Label x={-5} y={5} title="Yw" fontSize={10} />}
      />
      <Arc
        x={ICCPosition.x}
        y={ICCPosition.y}
        r={ICCRadius}
        startAngle={45 - robotPose.angle}
        endAngle={135 - robotPose.angle}
        stroke="palevioletred"
        strokeDasharray="2,2"
        pointerEvents="none"
      />
    </svg>
  )
}

export default DiffDriveModel
