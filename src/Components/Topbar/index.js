import React from 'react'

import { GoogleSignOut } from '../../util/GoogleAuth'
import { HeaderStyle, TopbarContainer } from './Topbar.styles'

const Topbar = ({ avatarDetails, signOutProps }) => {
  return (
    <TopbarContainer>
      <HeaderStyle>Is it eng friday tomorrow?</HeaderStyle>
      <GoogleSignOut {...avatarDetails} {...signOutProps} />
    </TopbarContainer>
  )
}

export default Topbar
