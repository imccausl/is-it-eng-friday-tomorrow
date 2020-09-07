import React from 'react'

import useGoogleSignIn from './useGoogleSignIn'

import googleLogo from '../../img/btn_google_signin_light_normal_web.png'

const GoogleSignInButton = ({ config, onSuccess, onFailure }) => {
  const [signIn, loaded] = useGoogleSignIn({ config, onSuccess, onFailure })

  const handleSignIn = (e) => {
    if (!loaded) {
      e.preventDefault()
      return
    }

    signIn(e)
  }

  const buttonContent = loaded ? (
    <img src={googleLogo} alt="Sign in with Google" />
  ) : (
    'Loading API...'
  )

  return (
    <button onClick={handleSignIn} id="login-button">
      {buttonContent}
    </button>
  )
}

export default GoogleSignInButton
