import { SCRIPT_SRC, SCRIPT_ID } from './constants'

export const loadScript = (callback) => {
    const script = document.createElement('script')
    script.onload = () => {
      console.log('Script loaded..')
      window.gapi.load('client:auth2', callback)
    }
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    document.body.appendChild(script)
  }

  export const removeScript = () => {
    const element = document.getElementById(SCRIPT_ID)

    if (element) {
      element.parentNode.removeChild(element)
    }
  }
