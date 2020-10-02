import React from 'react'

import Dropdown from '../../util/Dropdown'
import { GoogleSignOut } from '../../util/GoogleAuth'

import {
  AvatarImg,
  HeaderStyle,
  TopbarContainer,
  SignedInAsStyle,
} from './Topbar.styles'

const Avatar = ({ url }) => {
  return <AvatarImg src={url} />
}

const Topbar = ({ avatarDetails, signOutProps }) => {
  const getSignedInText = () => {
    if (!avatarDetails) {
      return 'Signing in...'
    }

    const { firstName, lastName, email } = avatarDetails

    let fullName = ''
    let emailText = ''

    if (firstName) {
      fullName = firstName
    }

    if (fullName && lastName) {
      fullName = `${fullName} ${lastName}`
    } else if (!fullName && lastName) {
      fullName = lastName
    }

    if (fullName && email) {
      emailText = ` (${email})`
    } else if (!fullName && email) {
      emailText = email
    }

    return `Signed in as ${fullName}${emailText}`
  }
  const menuItems = [
    {
      isClickable: false,
      element: <SignedInAsStyle>{getSignedInText()}</SignedInAsStyle>,
    },
    {
      isClickable: true,
      element: (
        <GoogleSignOut textAlign="left" title="Sign Out" {...signOutProps} />
      ),
    },
  ]

  return (
    <TopbarContainer>
      <HeaderStyle>Is it eng friday tomorrow?</HeaderStyle>
      {avatarDetails ? (
        <Dropdown
          header={<Avatar url={avatarDetails.avatar} />}
          items={menuItems}
        />
      ) : (
        <p>Signing in...</p>
      )}
    </TopbarContainer>
  )
}

export default Topbar
