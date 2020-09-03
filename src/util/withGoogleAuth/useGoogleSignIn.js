import './GoogleAuth.css'

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { loadScript, removeScript } from './utils'

import googleLogo from '../../img/btn_google_signin_light_normal_web.png'

const useGoogleSignIn = ({
  config,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  const [loaded, setLoaded] = useState(false)

  const handleSignInSuccess = useCallback(res => {
    onSuccess(res)
  }, [onSuccess])

  function signIn(e) {
    if (e) {
      e.preventDefault()
    }

    if (loaded) {
      const GoogleAuth = window.gapi.auth2.getAuthInstance()
      GoogleAuth.signIn().then(
        (res) => handleSignInSuccess(res),
        (err) => onFailure(err)
      )
    }
  }

  useEffect(() => {
    let unmounted = false

    loadScript(() => {
      const { gapi } = window
      const GoogleAuth = gapi.auth2.getAuthInstance()

      if (!GoogleAuth) {
        gapi.client.init(config).then(
          (res) => {
              if (!unmounted) {
                  setLoaded(true)

                  GoogleAuth.isSignedIn.listen(() => handleSignInSuccess(res))

                  const signedIn = GoogleAuth.isSignedIn.get()

                  if (signedIn) {
                    handleSignInSuccess(res)
                  }
              }
          },
          (error) => {
            setLoaded(true)
            onFailure(error)
          }
        )
      }
    })

    return () => {
      unmounted = true
      removeScript()
    }
  }, [config, handleSignInSuccess, onFailure])

  return [signIn, loaded]
}

export const GoogleSignInButton = ({config, onSuccess, onFailure}) => {
    const [signIn, loaded] = useGoogleSignIn({ config, onSuccess, onFailure})

    const handleSignIn = e => {
        if (!loaded) {
            e.preventDefault()
            return
        }

        signIn(e)
    }

    const buttonContent = loaded
        ? <img src={googleLogo} alt="Sign in with Google" />
        : 'Loading API...'


    return (
        <button
            onClick={handleSignIn}
            id="login-button"
        >
            {buttonContent}
        </button>
    )
}

export default useGoogleSignIn
