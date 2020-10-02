import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  DropdownContainer,
  DropdownHeader,
  DropdownItemsContainer,
  DropdownItemContainer,
} from './Dropdown.styles'

const ITEM_SHAPE = {
  isClickable: PropTypes.bool,
  element: PropTypes.element,
}

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnMenuClick = (e) => {
    setIsOpen(!isOpen)
  }
  const menuIdentifier = Date.now()

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
          {props.items.map((item, index, array) => {
            const isLastItem = index === array.length - 1
            const itemKey = `${menuIdentifier}-dropdown-menu-item-${index}`

            return (
              <DropdownItemContainer
                bottomBorder={!isLastItem}
                isClickable={item.isClickable}
                key={itemKey}
              >
                {item.element}
              </DropdownItemContainer>
            )
          })}
        </DropdownItemsContainer>
      )}
    </DropdownContainer>
  )
}

Dropdown.propTypes = {
  header: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  items: PropTypes.shape(ITEM_SHAPE).isRequired,
}

export default Dropdown
