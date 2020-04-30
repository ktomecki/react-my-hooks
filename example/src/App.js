import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap'

import { useHover, useWidth, useSlide, useFlip } from 'react-my-hooks'

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
        </Card.Body>

      </Card>
      {page === "useHover" && <UseHoverExample />}
      {page === "useWidth" && <UseWidthExample />}
      {page === "useSlide" && <UseSlideExample />}
      {page === "useFlip" && <UseFlipExample />}
    </Container>
  )
}
export default App
