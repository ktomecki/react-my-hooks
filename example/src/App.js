import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap'

import { useHover, useWidth, useSlide, useFlip, useAnimationFrames, useTransition } from 'react-my-hooks'

export function Example({ title, description, children }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {children}
      </Card.Body>
    </Card>
  )
}

function UseHoverExample() {
  const buttonRef = React.useRef()
  const hovered = useHover(buttonRef)
  return (
    <Example title="useHover">
      <button ref={buttonRef}>
        {hovered ? "yes" : "no"}
      </button>
    </Example>

  )
}

function UseWidthExample() {
  const theRef = React.useRef()
  const width = useWidth(theRef, "auto")
  return (
    <Example title="useWidth">
      <span style={{ width, display: 'inline-block', border: '1px solid black' }}>
        a
      </span>
      <br />
      <span ref={theRef} style={{ border: '1px solid black' }}>
        Hello I Have long width
      </span>
    </Example>
  )
}

function UseSlideExample() {
  const [show, setShow, styles, setRef] = useSlide(0.5, false)

  return (
    <Example title="useSlide">
      <button onClick={() => setShow(!show)}>
        Show
      </button>
      <div ref={setRef} style={{ ...styles, border: '1px solid black', position: 'absolute' }}>
        <ul>
          <li>One</li>
          <li>Three</li>
          <li>Four</li>
          <li>Five</li>
        </ul>
      </div>
    </Example>
  )
}

function UseFlipExample() {
  const theRef = React.useRef()
  useFlip(theRef, true)

  return (
    <Example title="useFlip">
      <div style={{ border: '1px solid black', margin: '80vh auto', position: 'relative' }}>
        Hello
      <div ref={theRef} style={{ border: '1px solid black', position: 'absolute' }}>
          <ul>
            <li>One</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
          </ul>
        </div>
      </div>
    </Example>
  )
}

function UseAnimationFramesExample() {
  const [value, start] = useAnimationFrames([0.9, 1.0, 0.8, 1.2, 1.0], 100, 1.0)

  React.useEffect(() => {
    start()
  }, [start])
  return (
    <Example title="useAnimationFrames">
      <button onClick={() => start()}>Animate</button>
      <div style={{ backgroundColor: 'blue', transformOrigin: 'top', transition: 'all .1s ease-in-out', transform: `scaleY(${value})` }}>
        Hello
      </div>
    </Example>
  )
}

function UseTransitionExample() {
  const [destination, setDestination] = React.useState(50)
  const value = useTransition(destination, 500)

  return (
    <Example title="useTransition">
      <input style={{width: '100%'}} type="range" value={destination} onChange={e => setDestination(e.target.value)} />
      <div style={{ backgroundColor: `rgb(0, ${parseInt(value*1.55)}, ${parseInt(value*2.55)})` }}>
        Hello
      </div>
      <br/>
      <div style={{position:'relative',}}>
        <div style={{width: `${value}%`, backgroundColor: 'rgba(0, 50, 100, 0.3)', height: 50}}>

        </div>
      </div>
    </Example>
  )
}


const App = () => {
  const [page, setPage] = React.useState("useHover")
  return (
    <Container>
      <Card>
        <Card.Body>
          <button onClick={() => setPage("useHover")}>
            useHover
          </button>
          <button onClick={() => setPage("useWidth")}>
            useWidth
          </button>
          <button onClick={() => setPage("useSlide")}>
            useSlide
          </button>
          <button onClick={() => setPage("useFlip")}>
            useFlip
          </button>
          <button onClick={() => setPage("useAnimationFrames")}>
            useAnimationFrames
          </button>
          <button onClick={() => setPage("useTransition")}>
          useTransition
          </button>
        </Card.Body>

      </Card>
      {page === "useHover" && <UseHoverExample />}
      {page === "useWidth" && <UseWidthExample />}
      {page === "useSlide" && <UseSlideExample />}
      {page === "useFlip" && <UseFlipExample />}
      {page === "useAnimationFrames" && <UseAnimationFramesExample />}
      {page === "useTransition" && <UseTransitionExample />}
    </Container>
  )
}
export default App
