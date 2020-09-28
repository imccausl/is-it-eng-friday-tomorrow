import React, { useState } from 'react'
import PropTypes from 'prop-types'

import useGoogleSignOut from '../useGoogleSignOut'
import {
  Avatar,
  EmailStyle,
  NameContainer,
  NameStyle,
  SignOutButtonContainer,
  SignOutButtonStyle,
} from './GoogleSignOut.styles'

const GoogleSignOut = ({
  avatar,
  firstName,
  lastName,
  email,
  config,
  onSuccess,
  onFailure,
  title,
}) => {
  const [signOut, loaded] = useGoogleSignOut({
    config,
    onSuccess,
    onFailure,
  })

  const handleSignOut = (e) => {
    if (!loaded) {
      e.preventDefault()
      return
    }

    signOut(e)
  }

  return (
    <SignOutButtonStyle onClick={handleSignOut}>
      <SignOutButtonContainer>
        {avatar && (
          <Avatar
            src={avatar}
            alt={`Signed into Google as ${firstName} ${lastName}`}
          />
        )}
        <NameContainer>
          <NameStyle>{title}</NameStyle>
        </NameContainer>
      </SignOutButtonContainer>
    </SignOutButtonStyle>
  )
}

export default GoogleSignOut
