import * as React from 'react';

const df = () => { };

export function useWatchedRef(callback: (node: HTMLElement) => any) : [React.MutableRefObject<HTMLElement | undefined>, ((node: HTMLElement) => void)] {
  const ref = React.useRef<HTMLElement>()
  const setRef = React.useCallback((node : HTMLElement) => {ref.current = node; callback(node);}, []);
  return [ref, setRef]
}

export function useHover(ref: React.MutableRefObject<HTMLElement>) {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const handleMouseOver = () => setHovered(true);
  const handleMouseOut = () => setHovered(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
    return df;
  }, [ref.current]);

  return hovered;
}

interface useWidthReducerParams {
  width: number | null,
  isAuto: boolean
}

export function useWidth(optionsRef: { current: HTMLElement }, userWidth: null | string | number) {
  const initialArgs: useWidthReducerParams = { width: 50, isAuto: false }
  const reduce = (_: any, value: null | string | number): useWidthReducerParams => {
    if (value === 'auto') {
      return { width: null, isAuto: true }
    }
    if (Number.isInteger(value as number)) {
      return { width: value as number, isAuto: false }
    }
    return { width: null, isAuto: false }
  };
  const [{ width, isAuto }, setWidth] = React.useReducer(reduce, initialArgs)

  React.useEffect(() => {
    setWidth(userWidth)
  }, [userWidth])

  React.useEffect(() => {
    if (optionsRef.current == null)
      return
    if (!isAuto)
      return

    const elem = optionsRef.current

    if (elem.style.display === 'none') {
      elem.style.visibility = 'hidden'
      elem.style.display = 'inline-block'
      setTimeout(() => {
        setWidth(elem.scrollWidth)
        elem.style.display = 'none'
        elem.style.visibility = 'visible'
      })
    } else {
      setWidth(elem.scrollWidth)
    }
  }, [optionsRef.current])

  return width
}


export function useSlide(animationTime: number, defaultShow: boolean) {
  const timeoutShowRef = React.useRef<NodeJS.Timeout>()
  const [styles, setStyles] = React.useState({})
  const [optionsRef, setRef] = useWatchedRef((node) => {
    if(node == null)  return {}
    if (defaultShow === true) {
      return setStyles({
        height: node.scrollHeight
      })
    } else {
      return setStyles({
        display: 'none',
        height: 0,
        overflowY: 'hidden'
      })
    }
  })

  const slideDown = (elem: HTMLElement) => {
    elem.style.display = 'block'
    elem.style.transition = `height, ${animationTime}s linear`
    elem.style.height = `${elem.scrollHeight}px`;
    timeoutShowRef.current = setTimeout(() => {
      elem.style["overflow-y"] = "auto";
    }, animationTime * 1000.0)
  }

  const slideUp = (elem: HTMLElement) => {
    elem.style["overflow-y"] = "hidden";
    elem.style.transition = `height, ${animationTime}s linear`
    elem.style.height = `0px`;
    timeoutShowRef.current = setTimeout(() => {
      elem.style.display = "none";
    }, animationTime * 1000.0)
  }

  const [show, setShow] = React.useReducer((_: boolean, value: boolean): boolean => {
    clearTimeout(timeoutShowRef.current as NodeJS.Timeout);
    if (value === true) {
      slideDown(optionsRef.current as HTMLElement);
    }
    else {
      slideUp(optionsRef.current as HTMLElement)
    }
    return value
  }, defaultShow)

  return [show, setShow, styles, setRef]
}


export function useFlip(optionsRef : React.MutableRefObject<HTMLElement>, show : boolean, position : string = 'bottom', auto : boolean = true) {

  const flipTop = (elem : HTMLElement) => {
    elem.style.transformOrigin = 'bottom'
    elem.style.top = 'unset'
    elem.style.bottom = '100%'
  }

  const flipBottom = (elem : HTMLElement) => {
    elem.style.transform = ''
    elem.style.bottom = 'unset'
    elem.style.top = 'unset'
  }

  const [current, setCurrent] = React.useState(position)
  React.useEffect(() => setCurrent(position), [position])

  const checkPosition = () => {
    if (optionsRef.current == null)
      return

    if (show !== true)
      return

    const y = optionsRef.current.parentElement!.getBoundingClientRect().top
    const screenHeight = window.innerHeight
    const height = optionsRef.current.scrollHeight

    if (y + height + 100 > screenHeight && y - height > 0) {
      if (current != 'top')
        setCurrent('top')
    } else if (y + height - 100 < screenHeight) {
      if (current != 'bottom')
        setCurrent('bottom')
    }
  }

  React.useEffect(() => {
    if (optionsRef.current == null)
      return
    if (show !== true)
      return

    switch (current) {
      case 'bottom': return flipBottom(optionsRef.current);
      case 'top': return flipTop(optionsRef.current)
    }
  }, [optionsRef.current, show, current])

  React.useEffect(() => {
    if (optionsRef.current == null)
      return
    if (auto !== true)
      return

    checkPosition()
    document.addEventListener('scroll', checkPosition)
    return () => {
      document.removeEventListener('scroll', checkPosition)
    }
  }, [optionsRef.current, auto, show, current])
}
