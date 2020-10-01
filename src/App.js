import './App.css'

import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { GoogleSignIn } from './util/GoogleAuth'
import Topbar from './Components/Topbar'

const config = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  scope: process.env.REACT_APP_SCOPE,
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
}

class Answer extends React.Component {
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
          console.log('today:', today.format('yyyy-MM-DD'))
          console.log('tomorrowString:', tomorrowString)
          console.log('timeMin:', today.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'))
          console.log(events)
        }
        if (events.length > 0) {
          const eventSummaries = events.reduce((acc, event) => {
            const eventStartRaw = event.start && event.start.dateTime
            const eventStartDate =
              eventStartRaw && moment(eventStartRaw).format('yyyy-MM-DD')
            if (
              eventStartDate === tomorrowString &&
              event.status === 'confirmed'
            ) {
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

    if (!loading && !hasEvents) {
      return <div className="answer">NO</div>
    }

    if (hasError) {
      return <div className="error">Something's wrong!</div>
    }

    return (
      <div className="answer">{isEngFriday && isFriday ? 'YES' : 'NO'}</div>
    )
  }
}

function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [avatarDetails, setAvatarDetails] = useState(null)

  const handleSignIn = (res) => {
    const userProfile = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile()

    setAvatarDetails({
      firstName: userProfile.getGivenName(),
      lastName: userProfile.getFamilyName(),
      avatar: userProfile.getImageUrl(),
      email: userProfile.getEmail(),
    })

    setSignedIn(true)
  }

  const handleSignOut = () => {
    setSignedIn(false)
  }

  const handleAuthFail = (err) => {
    console.log(err)
  }

  const handleSignOutFailure = (err) => {}

  return (
    <div className="App">
      <div className="wrapper">
        <header className="App-header">
          {signedIn ? (
            <Topbar
              avatarDetails={avatarDetails}
              signOutProps={{
                config,
                handleSuccess: handleSignOut,
                handleFailure: handleSignOutFailure,
              }}
            />
          ) : (
            <p className="app-header-text">Is it eng friday tomorrow?</p>
          )}
        </header>
        <main>
          {signedIn && <Answer />}
          {!signedIn && (
            <GoogleSignIn
              config={config}
              onSuccess={handleSignIn}
              onFailure={handleAuthFail}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
