import './App.css'

import React from 'react'
import moment from 'moment'

import googleLogo from './img/btn_google_signin_light_normal_web.png'

class GoogleSignIn extends React.Component {
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

    gapi.client
      .init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPE,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
      })
      .then(
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
    this.setState({ isSignedIn: true })
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
        <button onClick={this.handleAuthClick} type="button" id="login-button">
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
        {isSignedIn && <GoogleAnswer />}
        {!loadingGapi && (
            <div className="button-container">
                {this.getAuthButton()}
            </div>
        )}
      </>
    )
  }
}

class GoogleAnswer extends React.Component {
  state = {
    hasError: false,
    hasEvents: false,
    isFriday: false,
    isEngFriday: false,
    loading: true,
    error: '',
  }

  componentDidMount() {
    const { gapi } = window
    const today = moment()
    const tomorrowString = today.add(1, 'days').format('yyyy-MM-DD')
    const tomorrowWeekday = moment().weekday()

    if (tomorrowWeekday === 4) {
      this.setState({ isFriday: true })
    }

    gapi.client.calendar.events
      .list({
        calendarId: process.env.REACT_APP_CALENDAR_ID,
        timeMin: today.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((response) => {
        const events = response.result.items
        if (process.env.NODE_ENV !== 'production') {
            console.log("today:", today.format('yyyy-MM-DD'))
            console.log("tomorrowString:", tomorrowString)
            console.log("timeMin:", today.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'))
            console.log(events)
        }
        if (events.length > 0) {
          const eventSummaries = events.reduce((acc, event) => {
            const eventStartRaw = event.start && event.start.dateTime
            const eventStartDate =
              eventStartRaw && moment(eventStartRaw).format('yyyy-MM-DD')
            if (eventStartDate === tomorrowString && event.status === 'confirmed') {
              return acc.concat(event.summary)
            }
            return acc
          }, [])

          this.setState({
            isEngFriday: eventSummaries.includes('Engineering Friday'),
            hasEvents: true,
            loading: false,
          })
        } else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ hasError: true, error, loading: false })
      })
  }

  render() {
    const { loading, hasEvents, hasError, isFriday, isEngFriday } = this.state
    if (loading) {
      return <div className="status">Finding out...</div>
    }

    if (!loading && !isFriday) {
        return <div className="not-friday">It's not Friday tomorrow</div>
    }
    if (!loading && !hasEvents) {
      return <div className="answer">NO</div>
    }

    if (hasError) {
      return <div className="error">Something's wrong!</div>
    }

    return <div className="answer">{isEngFriday ? 'YES' : 'NO'}</div>
  }
}

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <header className="App-header">
          <p>Is it eng friday tomorrow?</p>
        </header>
        <main>
          <GoogleSignIn />
        </main>
      </div>
    </div>
  )
}

export default App
