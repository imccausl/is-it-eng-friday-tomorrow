import { useState, useEffect, useCallback } from 'react'

import { SCRIPT_SRC, SCRIPT_ID } from './constants'

const loadScript = (callback) => {
  const script = document.createElement('script')
  script.onload = () => {
    console.log('Script loaded..')
    window.gapi.load('client:auth2', callback)
  }
  script.id = SCRIPT_ID
  script.src = SCRIPT_SRC
  document.body.appendChild(script)
}

const removeScript = () => {
  const element = document.getElementById(SCRIPT_ID)

  if (element) {
    element.parentNode.removeChild(element)
  }
}

const useGoogleSignIn = ({
  config,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  const [loaded, setLoaded] = useState(false)

  const handleSignInSuccess = (res) => {
    onSuccess(res)
  }

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
    let unmounted = true

    loadScript(() => {
      const { gapi } = window
      const GoogleAuth = gapi.auth2.getAuthInstance()

      if (!GoogleAuth) {
        gapi.client.init(config).then(
          (res) => {
            setLoaded(true)
            const signedIn = GoogleAuth.isSignedIn.get()
            if (signedIn) {
              handleSignInSuccess(res)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [loaded])

  return [signIn, loaded]
}

export default useGoogleSignIn
