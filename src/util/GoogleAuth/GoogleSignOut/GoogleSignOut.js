import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useGoogleSignOut } from '../GoogleSignIn'
import { SignOutContainer, Avatar } from './GoogleSignOut.styles'

const GoogleSignOut = ({ avatar, firstName, lastName }) => {
  const [signOut, loaded] = useGoogleSignOut()

  const handleSignOut = (e) => {
    if (!loaded) {
      e.preventDefault()
      return
    }

    signOut(e)
  }

  return (
    <SignOutContainer onClick={handleSignOut}>
      <Avatar img={avatar} />
    </SignOutContainer>
  )
}

export default GoogleSignOut
