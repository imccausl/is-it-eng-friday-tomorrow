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
  name,
  email,
  config,
  onSuccess,
  onFailure,
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

  console.log(avatar, name, email)
  return (
    <SignOutButtonStyle onClick={handleSignOut}>
      <SignOutButtonContainer>
        <Avatar src={avatar} alt={`Signed into Google as ${name}`} />
        <NameContainer>
          <NameStyle>{name}</NameStyle>
          <EmailStyle>{email}</EmailStyle>
        </NameContainer>
      </SignOutButtonContainer>
    </SignOutButtonStyle>
  )
}

export default GoogleSignOut
