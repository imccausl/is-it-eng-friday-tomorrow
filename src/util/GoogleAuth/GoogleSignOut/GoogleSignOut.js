import React from 'react'
import PropTypes from 'prop-types'

import { SignOutContainer, Avatar } from './GoogleSignOut.styles'

const GoogleSignOut = (props) => {
  return (
    <SignOutContainer>
      <Avatar img={props.avatar} />
    </SignOutContainer>
  )
}

export default GoogleSignOut
