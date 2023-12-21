import React, { useState } from 'react'
interface ICounterProps {
  to: number
  duration: number
  float?: boolean
  precision?: number
}
const Counter = ({ to, duration = 5, float, precision = 3 }: ICounterProps) => {
  float = float ?? !Number.isInteger(to)
  console.log(to.toString(), float)

  let delta = 1
  let from = Math.floor(Math.random() * 0.7 * to)
  if (float) {
    delta = Math.pow(0.1, precision) / 2
    from = Math.random() * 0.7 * to
  }
  const [current, setCurrent] = useState(from)
  if (current < to) setTimeout(() => setCurrent((c) => (c >= to ? to : c + delta)), (duration * delta) / (to - from))
  return <> {float ? current?.toFixed(precision) ?? current : current} </>
}

export default Counter
