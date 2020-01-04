

import React from 'react'
import MyComponent from './MyComponent'
import { useState } from 'react';

export default function Parent() {
    const [instanceKey, setInstanceKey] = useState(0)
  const handleReset = () => setInstanceKey(i => i + 1)
  return (
   <div>
   <h1>Welcome to Parent Class</h1>
    <MyComponent key={instanceKey} />
    <button onClick={handleReset} type="button">Reset</button>
   </div>
  )
}
