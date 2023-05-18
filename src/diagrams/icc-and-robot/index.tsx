import React from 'react'
import styled from 'styled-components'

import { Arrow, Ruler, Arc } from '../../components/svg'
import { radians } from '../../utils'

export const DashedLine = styled.line`
  fill: none;
  stroke: black;
  stroke-dasharray: 4, 3;
`

interface LabelProps extends React.SVGProps<SVGTextElement> {
  title: string
  x?: number
  y?: number
}

const Label = ({ title, x = 0, y = 0, ...props }: LabelProps) => (
  <text x={x} y={y} fontFamily="KaTex_Math" {...props}>
    {title}
  </text>
)

// Parameters
const robotRadius = 20
const ICCRadius = 200

const ICC = { x: 200, y: 60 }

const angle1 = 45
const angle2 = 60

const calculatePose = (angle) => {
  const rad = radians(angle)
  return {
    x: ICC.x + ICCRadius * Math.sin(rad),
    y: ICC.y + ICCRadius * Math.cos(rad),
    angle,
  }
}

const initPose = calculatePose(angle1)
const finalPose = calculatePose(angle2)

interface RobotProps {
  x: number
  y: number
  angle: number
  angleLabel?: () => React.ReactElement
}

const Robot = ({ x, y, angle, angleLabel }: RobotProps) => (
  <>
    <g transform={`translate(${x},${y}) rotate(${-angle})`}>
      <circle r={robotRadius} fill="ivory" stroke="beige" strokeWidth="3" />
      <Arrow x1={0} y1={0} x2={30} y2={0} hollow strokeWidth={2} />

      {angleLabel && angleLabel()}
    </g>
    <DashedLine
      x1={x - ICCRadius * Math.sin(radians(angle))}
      y1={y}
      x2={x + 40}
      y2={y}
    />
    <line x1={ICC.x} y1={ICC.y} x2={x} y2={y} fill="none" stroke="black" />
  </>
)

const ICCAndRobot = () => (
  <svg viewBox="0,0,600,300">
    <rect height="100%" width="100%" fill="white" />

    <g transform={`translate(${ICC.x},${ICC.y})`}>
      <circle r={3} fill="black" />
      <Label title="ICC" x={-30} y={0} fontSize="12" />

      <Ruler // radius of curvature
        x1={0}
        y1={-20}
        x2={ICCRadius}
        y2={-20}
        labelDy={-10}
        label={() => <Label title="R" />}
      />

      <DashedLine // vertical line
        x1={0}
        y1={0}
        x2={0}
        y2={ICCRadius * Math.cos(radians(angle1))}
      />

      <Label
        x={30 * Math.sin(radians(angle1 / 2)) - 4}
        y={30 * Math.cos(radians(angle1 / 2)) + 5}
        title="θ"
      />

      <Arc
        r={40}
        startAngle={90 - angle2}
        endAngle={90 - angle1}
        stroke="black"
      />

      <Label
        x={60 * Math.sin(radians((angle1 + angle2) / 2)) - 3}
        y={60 * Math.cos(radians((angle1 + angle2) / 2)) + 2}
        title="ωΔt"
      />
    </g>

    <Robot
      x={initPose.x}
      y={initPose.y}
      angle={initPose.angle}
      angleLabel={() => (
        <Label
          x={20}
          y={-4}
          title="θ"
          transform={`rotate(${initPose.angle})`}
          fontSize={12}
        />
      )}
    />

    <Robot
      x={finalPose.x}
      y={finalPose.y}
      angle={finalPose.angle}
      angleLabel={() => (
        <Label
          x={15}
          y={-6}
          title="θ + ωΔt"
          transform={`rotate(${finalPose.angle})`}
          fontSize={12}
        />
      )}
    />

    <Arc
      x={ICC.x}
      y={ICC.y}
      r={ICCRadius}
      startAngle={0}
      endAngle={90}
      stroke="palevioletred"
      strokeDasharray="2,2"
    />
  </svg>
)

export default ICCAndRobot
