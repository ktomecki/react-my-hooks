import React from 'react'

import { useMyHook } from 'react-my-hooks'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
