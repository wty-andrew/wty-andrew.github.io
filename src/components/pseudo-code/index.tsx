import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { render } from 'pseudocode'

const Container = styled.div`
  font-size: 1.5em;

  .ps-root .ps-algorithm {
    border-color: inherit;
  }

  .ps-root .ps-algorithm.with-caption > .ps-line:first-of-type {
    border-color: inherit;
  }
`

interface Props {
  src: string
  children: string
  indentSize: string
  commentDelimiter: string
  lineNumber: boolean
  lineNumberPunc: string
  noEnd: boolean
  captionCount: number
  titlePrefix: string
}

const PseudoCode = ({
  src,
  children,
  indentSize,
  commentDelimiter,
  lineNumber,
  lineNumberPunc,
  noEnd,
  captionCount,
  titlePrefix,
  ...props
}: Props) => {
  const content = src || children
  const ref = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    const options = {
      indentSize,
      commentDelimiter,
      lineNumber,
      lineNumberPunc,
      noEnd,
      captionCount,
      titlePrefix,
    }
    const domElem = ref.current
    render(content, domElem, options)
    return () => domElem.firstChild.remove()
  }, [
    content,
    indentSize,
    commentDelimiter,
    lineNumber,
    lineNumberPunc,
    noEnd,
    captionCount,
    titlePrefix,
  ])

  return <Container ref={ref} {...props} />
}

export default PseudoCode
