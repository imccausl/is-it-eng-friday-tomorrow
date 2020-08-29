import './GoogleAuth.css'

import React from 'react'

import googleLogo from '../../img/btn_google_signin_light_normal_web.png'

export const withGoogleAuth = (config, WrappedComponent) =>
  class extends React.PureComponent {
    state = {
      isSignedIn: false,
      hasError: false,
      error: '',
      loadingGapi: true,
    }

    componentDidMount() {
      this.initGapi()
    }

    initGapi = () => {
      const script = document.createElement('script')
      script.onload = () => {
        console.log('Script loaded..')
        window.gapi.load('client:auth2', this.initClient)
      }
      script.src = 'https://apis.google.com/js/client.js'
      document.body.appendChild(script)
    }

    initClient = (script) => {
      const { gapi } = window

      gapi.client.init(config).then(
        () => {
          this.setState({ loadingGapi: false })

          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus)

          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        (error) => {
          this.setState({ error, hasError: true })
        }
      )
    }

    updateSigninStatus = (isSignedIn) => {
      this.setState({ isSignedIn })
    }

    handleAuthClick = (event) => {
      const { gapi } = window

      gapi.auth2.getAuthInstance().signIn()
    }

    handleSignoutClick = (event) => {
      const { gapi } = window

      gapi.auth2.getAuthInstance().signOut()
    }

    getAuthButton = () => {
      const { isSignedIn } = this.state

      if (!isSignedIn) {
        return (
          <button
            onClick={this.handleAuthClick}
            type="button"
            id="login-button"
          >
            <img src={googleLogo} alt="Sign in with google" />
          </button>
        )
      }

      return (
        <button
          onClick={this.handleSignoutClick}
          type="button"
          id="logoutButton"
        >
          Sign out
        </button>
      )
    }

    render() {
      const { isSignedIn, loadingGapi } = this.state

      return (
        <>
          {!loadingGapi && isSignedIn && <WrappedComponent />}
          {loadingGapi && <div>Loading Google auth...</div>}
          {!loadingGapi && (
            <div className="button-container">{this.getAuthButton()}</div>
          )}
        </>
      )
    }
  }
