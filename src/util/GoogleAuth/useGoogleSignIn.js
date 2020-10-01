import { useCallback, useEffect, useState } from 'react'

import { loadScript, removeScript } from './utils'

const useGoogleSignIn = ({
  config,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  const [loaded, setLoaded] = useState(false)

  const handleSignInSuccess = useCallback(() => {
    onSuccess()
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
      console.log('inside load script callback...')

      const { gapi } = window
      const GoogleAuth = gapi.auth2.getAuthInstance()
      console.log(GoogleAuth)
      if (!GoogleAuth) {
        gapi.client.init(config).then(
          () => {
            console.log('initializing...')
            if (!unmounted) {
              setLoaded(true)
              const auth2 = gapi.auth2.getAuthInstance()
              const signedIn = auth2.isSignedIn.get()

              if (signedIn) {
                handleSignInSuccess()
              }
            }
          },
          (error) => {
            setLoaded(true)
            onFailure(error)
          }
        )
      } else {
        setLoaded(true)
        const auth2 = gapi.auth2.getAuthInstance()
        const signedIn = auth2.isSignedIn.get()

        if (signedIn) {
          handleSignInSuccess()
        }
      }
    })

    return () => {
      unmounted = true
      removeScript()
    }
  }, [config, handleSignInSuccess, onFailure])

  return [signIn, loaded]
}

export default useGoogleSignIn
