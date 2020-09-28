import styled from 'styled-components'

export const DropdownHeader = styled.button`
  background: transparent;
  border: none;
  display: block;
`

export const DropdownContainer = styled.div`
  position: relative;
`

export const DropdownItemsContainer = styled.ul`
  list-style-type: none;
  position: absolute;
  padding: 0;
  margin: 10px 0 0 0;
  right: 0;
  width: 5em;
  border-radius: 0.25em;
  background: white;
`

export const DropdownItemContainer = styled.li`
  color: black;
  padding: 10px;
`
