import { useState } from "react"
import { useValue } from "./useValue"

export const ControlledCounter = () => {

  // const [c , setC ] = useState(0)
  const [counter, setCounter] = useValue({
    defaultValue : 0
  })


  return (
    <div>
      {counter}
      <button onClick={() => setCounter(counter + 1)}>
        +
      </button>
    </div>
  )
}