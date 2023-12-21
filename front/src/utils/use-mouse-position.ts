import { useEffect, useState } from 'react'

//https://codedaily.io/tutorials/Create-a-useMousePosition-Hook-with-useEffect-and-useState-in-React
export const useMousePosition = (ref: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const oldRef = ref
    const setFromEvent = (e: any) => setPosition({ x: e.clientX, y: e.clientY })
    if (ref) ref?.current.addEventListener('mousemove', setFromEvent)

    return () => {
      if (oldRef && oldRef?.current) oldRef?.current.removeEventListener('mousemove', setFromEvent)
    }
  }, [ref])

  return position
}
