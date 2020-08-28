import './App.css'

import React from 'react'
import moment from 'moment'
class GoogleSignIn extends React.Component {
  state = {
    isFriday: false,
    isSignedIn: false,
    hasError: false,
    error: '',
  }

  componentDidMount() {
    const tomorrow = moment().weekday()
    if (tomorrow === 4) {
      this.setState({ isFriday: true })
      this.initGapi()
    }
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
        <button onClick={this.handleAuthClick} type="button" id="loginButton">
          Login with Google to Find Out
        </button>
      )
    }

    return (
      <div className="button-container">
        <button
          onClick={this.handleSignoutClick}
          type="button"
          id="loginButton"
        >
          Sign out
        </button>
      </div>
    )
  }

  render() {
    const { isSignedIn, isFriday } = this.state

    return (
      <>
        {isSignedIn && isFriday && <GoogleAnswer />}
        {!isFriday && (
          <div className="not-friday">It's not Friday tomorrow, so no.</div>
        )}
        {this.getAuthButton()}
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

    gapi.client.calendar.events
      .list({
        calendarId: process.env.REACT_APP_CALENDAR_ID,
        timeMin: today.add(-1, 'days').format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((response) => {
        const events = response.result.items
        if (events.length > 0) {
          const eventSummaries = events.reduce((acc, event) => {
            const eventStartRaw = event.start && event.start.dateTime
            const eventStartDate =
              eventStartRaw && moment(eventStartRaw).format('yyyy-MM-DD')
            if (eventStartDate === tomorrowString) {
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
    const { loading, hasEvents, hasError, isEngFriday } = this.state
    if (loading) {
      return <div className="status">Finding out...</div>
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
