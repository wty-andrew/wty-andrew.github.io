interface Vec2 {
  x: number
  y: number
}

export const degrees = (rad: number) => (rad * 180) / Math.PI

export const radians = (degrees: number) => (degrees * Math.PI) / 180

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max))

export const normalize = ({ x, y }: Vec2): Vec2 => {
  const length = Math.sqrt(x * x + y * y)
  return { x: x / length, y: y / length }
}

export const scale = ({ x, y }: Vec2, s: number): Vec2 => ({
  x: x * s,
  y: y * s,
})
