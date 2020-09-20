export const degrees = (rad) => (rad * 180) / Math.PI

export const radians = (degrees) => (degrees * Math.PI) / 180

export const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

export const normalize = ({ x, y }) => {
  const length = Math.sqrt(x * x + y * y)
  return { x: x / length, y: y / length }
}

export const scale = ({ x, y }, s) => ({ x: x * s, y: y * s })
