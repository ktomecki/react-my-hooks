import React from 'react'

import { useHover, useWidth, useSlide, useFlip } from 'react-my-hooks'

function UseHoverExample() {
  const buttonRef = React.useRef()
  const hovered = useHover(buttonRef)
  return (
    <button ref={buttonRef}>
      {hovered ? "yes" : "no"}
    </button>
  )
}

function UseWidthExample() {
  const theRef = React.useRef()
  const width = useWidth(theRef, "auto")
  return (
    <div>
      <span style={{ width, display: 'inline-block', border: '1px solid black' }}>
        a
      </span>
      <br/>
      <span ref={theRef} style={{ border: '1px solid black' }}>
        Hello I Have long width
      </span>
    </div>
  )
}

function UseSlideExample() {
  const [show, setShow, styles, setRef] = useSlide(0.5, false)

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        Show
      </button>
      <div ref={setRef} style={{...styles, border: '1px solid black', position: 'absolute'}}>
        <ul>
          <li>One</li>
          <li>Three</li>
          <li>Four</li>
          <li>Five</li>
        </ul>
      </div>
    </div>
  )
}


function UseFlipExample() {
  const theRef = React.useRef()
  useFlip(theRef, true)

  return (
    <div style={{border: '1px solid black', margin: '1900px auto', position: 'relative'}}>
      Hello
      <div ref={theRef} style={{border: '1px solid black', position: 'absolute'}}>
        <ul>
          <li>One</li>
          <li>Three</li>
          <li>Four</li>
          <li>Five</li>
        </ul>
      </div>
    </div>
  )
}


const App = () => {
  return (
    <div style={{height: '5v  h'}}>
      <UseHoverExample />
      <br/>
      <br/>
      <UseWidthExample/>
      <br/>
      <br/>
      <UseSlideExample/>
      <br/>
      <br/>
      <UseFlipExample/>
    </div>
  )
}
export default App
