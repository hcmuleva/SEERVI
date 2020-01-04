
import React from 'react'
import { useState } from 'react';
export default function MyComponent() {
    const [value, setValue] = useState(0)
    const [count,setCount]=useState(5)
    return (
      <span>
        <button type="button" onClick={()=>setValue(v => v + 1)}>{value}</button>
        <button type="button" onClick={()=>setCount(count => count + 1)}>ComponentInc{count}</button>
        
      </span>
    )
}
