import './App.css';

import React from 'react'
import moment from 'moment'

import config from './config'
class GoogleSignIn extends React.Component {
    state = {
        isSignedIn: false,
        hasError: false,
        error: '',
    }

    componentDidMount() {
        this.initGapi()
    }

    initGapi = () => {
        const script = document.createElement('script')
        script.onload = () => {
            console.log("Script loaded..")
            window.gapi.load('client:auth2', this.initClient)
        }
        script.src = "https://apis.google.com/js/client.js"
        document.body.appendChild(script)
    }

    initClient = script => {
        const { gapi } = window

        gapi.client.init({
            clientId: process.env.REACT_APP_CLIENT_ID,
            scope: process.env.REACT_APP_SCOPE,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)

            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        }, error => {
            this.setState({ error, hasError: true})
        })


    }

    updateSigninStatus = isSignedIn => {
        this.setState({ isSignedIn: true })
    }

    handleAuthClick = event => {
        const { gapi } = window

        gapi.auth2.getAuthInstance().signIn()
    }

    handleSignoutClick = event => {
        const { gapi } = window

        gapi.auth2.getAuthInstance().signOut()
    }

    render() {
        const { isSignedIn } = this.state

        if (!isSignedIn) {
            return (
                <button onClick={this.handleAuthClick} type="button" id="loginButton">
                    Login with Google
                </button>
            )
        }

        return <GoogleAnswer />
    }
}

class GoogleAnswer extends React.Component {
    state = {
        hasEvents: false,
        isEngFriday: false,
        loading: true,
    }
    componentDidMount() {
        const { gapi } = window
        const today = moment()
        const tomorrowString = today.add(1, 'days').format('yyyy-MM-DD')

        gapi.client.calendar.events.list({
            'calendarId': process.env.REACT_APP_CALENDAR_ID,
            'timeMin': today.add(-1, 'days').format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items
            console.log(events)
            if (events.length > 0) {
                const eventSummaries = events.reduce((acc, event) => {
                    const eventStartRaw = event.start && event.start.dateTime
                    const eventStartDate = eventStartRaw && moment(eventStartRaw).format('yyyy-MM-DD')
                    if (eventStartDate === tomorrowString) {
                        return acc.concat(event.summary)
                    }
                    return acc
                }, [])
                console.log(eventSummaries)
                this.setState({ isEngFriday: eventSummaries.includes('Engineering Friday'), hasEvents: true, loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    render() {
        const {loading, hasEvents, isEngFriday} = this.state
       if (loading) {
           return (
               <div className="status">Finding out...</div>
           )
       }

       if (!loading && !hasEvents) {
           return (
               <div className="answer">
                   NO
               </div>
           )
       }
        return (
            <div className="answer">
                {isEngFriday ? 'YES' : 'NO'}
            </div>
        )
    }
}

function App() {
  return (
    <div className="App">
        <div className="wrapper">
            <header className="App-header">
                <p>
                Is it eng friday tomorrow?
                </p>
            </header>
            <main>
                <GoogleSignIn />
            </main>
        </div>
    </div>
  );
}

export default App;
