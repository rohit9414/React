import { useState } from 'react'

export default function App() {
  let [count, setCount] = useState(0)

  const increment = () => {
    count++;
    setCount(count);
  }

  return (
    <div className="App">
      <p style={{backgroundColor: 'lightgray'}}>counter:{count}</p>
      <button onClick={increment}>Increment</button>/*increment function call hota hai 
      and setcount count ki value increament karta hai phir app ke rerender karta hai*/
    </div>
  )
}