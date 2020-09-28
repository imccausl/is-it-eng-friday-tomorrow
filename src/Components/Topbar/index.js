import React from 'react'

import Dropdown from '../../util/Dropdown'
import { GoogleSignOut } from '../../util/GoogleAuth'

import { AvatarImg, HeaderStyle, TopbarContainer } from './Topbar.styles'

const Avatar = ({ url }) => {
  return <AvatarImg src={url} />
}

const Topbar = ({ avatarDetails, signOutProps }) => {
  const menuItems = [<GoogleSignOut title="Sign Out" />]

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
