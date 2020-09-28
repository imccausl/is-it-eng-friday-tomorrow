import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  DropdownContainer,
  DropdownHeader,
  DropdownItemsContainer,
  DropdownItemContainer,
} from './Dropdown.styles'

const ITEM_SHAPE = {}

const mapMenuItems = (item) => {
  return <DropdownItemContainer>{item}</DropdownItemContainer>
}

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnMenuClick = (e) => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContainer>
      <DropdownHeader
        onClick={handleOnMenuClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {props.header}
      </DropdownHeader>
      {isOpen && (
        <DropdownItemsContainer>
          {props.items.map(mapMenuItems)}
        </DropdownItemsContainer>
      )}
    </DropdownContainer>
  )
}

Dropdown.propTypes = {
  header: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Dropdown
