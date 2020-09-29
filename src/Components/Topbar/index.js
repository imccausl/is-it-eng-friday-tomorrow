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
  const menuItems = [
    <SignedInAsStyle>
      Signed in as {avatarDetails.firstName} {avatarDetails.lastName} (
      {avatarDetails.email})
    </SignedInAsStyle>,
    <GoogleSignOut title="Sign Out" />,
  ]

  return (
    <TopbarContainer>
      <HeaderStyle>Is it eng friday tomorrow?</HeaderStyle>
      <Dropdown
        header={<Avatar url={avatarDetails.avatar} />}
        items={menuItems}
      />
    </TopbarContainer>
  )
}

export default Topbar
