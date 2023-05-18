import React, { useState, Children } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: rgba(var(--ifm-color-primary-rgb), 0.2);
  color: var(--ifm-color-primary);
  opacity: 99%;
  margin-top: calc(-1 * var(--ifm-leading) - var(--ifm-global-radius));
  margin-bottom: var(--ifm-leading);
  padding-top: calc(var(--ifm-pre-padding) / 3);
  padding-bottom: calc(var(--ifm-pre-padding) / 3);
  padding-right: var(--ifm-pre-padding);
  padding-left: var(--ifm-pre-padding);
  border-bottom-right-radius: var(--ifm-global-radius);
  border-bottom-left-radius: var(--ifm-global-radius);
  pointer-events: none;
`

const ToggleButton = styled.div`
  text-align: right;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
`

const DetailContainer = styled.div`
  padding-top: calc(var(--ifm-pre-padding) / 3);
  padding-bottom: calc(var(--ifm-pre-padding) / 3);
  border-top: 1px solid var(--ifm-color-primary);
  pointer-events: auto;

  & > :last-child {
    margin-bottom: 0;
  }
`

interface Props {
  children?: React.ReactNode
  defaultOpen?: boolean
  showText?: string
  hideText?: string
}

const Snippet = ({
  children,
  defaultOpen = false,
  showText = 'More',
  hideText = 'Hide',
}: Props) => {
  const [show, toggleShow] = useState(defaultOpen)
  const [code, ...rest] = Children.toArray(children)

  return (
    <>
      {code}

      {rest && (
        <>
          <Container>
            <ToggleButton onClick={() => toggleShow((state) => !state)}>
              {show ? hideText : showText}
            </ToggleButton>

            {show && <DetailContainer>{rest}</DetailContainer>}
          </Container>
        </>
      )}
    </>
  )
}

export default Snippet
