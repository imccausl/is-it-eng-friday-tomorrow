import styled, { css } from 'styled-components'
const hoverStyles = (isClickable) => {
  if (isClickable) {
    return css`
      &:hover {
        background-color: lightgrey;
        cursor: pointer;
      }

      &:hover:last-of-type {
        border-bottom-left-radius: 0.25em;
        border-bottom-right-radius: 0.25em;
      }
    `
  }
}

export const DropdownHeader = styled.button`
  background: transparent;
  border: none;
  display: block;
`

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
`

export const DropdownItemsContainer = styled.ul`
  list-style-type: none;
  position: absolute;
  padding: 0;
  margin: 50px 0 0 0;
  right: 0;
  min-width: 50%;
  border-radius: 0.25em;
  border: 1px solid black;
  background: white;
`

export const DropdownItemContainer = styled.li`
  color: black;
  padding: 10px;
  border-bottom: ${({ bottomBorder }) =>
    bottomBorder ? '1px solid lightgrey' : 'none'};
  ${({ isClickable }) => hoverStyles(isClickable)}
`
