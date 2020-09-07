import { useState, useEffect } from 'react'
import { loadScript, removeScript } from './util'

const useGoogleSignOut = ({
    config,
    onSignoutSuccess = () => {},
    onFailure = () => {},
}) => {
    const [loaded, setLoaded] = useState(false)

    const signOut = () => {
        if (window.gapi) {
            const GoogleAuth = window.gapi.auth2.getAuthInstance()

            if (GoogleAuth) {
                GoogleAuth.signOut().then(GoogleAuth.disconnect().then(onSignoutSuccess))
            }
        }
    }

    useEffect(() => {
        loadScript(() => {
            const { gapi } = window
            gapi.load('auth2', () => {
                if (!gapi.auth2.getAuthInstance()) {
                    gapi.auth2.init(config).then(
                        () => setLoaded(true),
                        err => onFailure(err)
                    )
                } else {
                    setLoaded(true)
                }
            })
        })

        return () => {
            removeScript()
        }
    }, [config, onFailure])

    return [signOut, loaded]
}

export default useGoogleSignOut
