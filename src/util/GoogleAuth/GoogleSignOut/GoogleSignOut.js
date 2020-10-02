import React from 'react'

import useGoogleSignOut from '../useGoogleSignOut'
import {
  Avatar,
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
  textAlign,
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
      <SignOutButtonContainer textAlign={textAlign}>
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
