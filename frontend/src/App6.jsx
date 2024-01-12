import { useState, useEffect } from "react";
import YouTube from "react-youtube"

export const App = () => {
  const [displayText, setDisplayText] = useState("you are alone in the dark ...")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // event handler for when the user is ready to proceed, with playing video enough
  const onReady = (event) => {
    console.log('user is ready', event)
    // you can access the player instance here (if needed)
    const player = event.target
  }

  const onStateChange = (event) => {
    console.log('State changed', event.data)
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsVideoPlaying(true)
    }
  }

  useEffect(() => {
    // document.body.style.textAlign = 'center'
    document.body.style.fontFamily = 'Roboto, sans-serif'
    document.body.style.fontSize = '24px'
    document.body.style.alignItems = 'center'
    document.body.style.justifyContent = 'center'
    document.body.style.display = 'flex'
    // document.body.style.placeItems = 'center'
    document.body.style.height = '100vh'

    // Cleanup function to reset the style when the component unmounts
    return () => {
      // document.body.style.textAlign = ''
      document.body.style.fontFamily = ''
      document.body.style.fontSize = ''
      document.body.style.alignItems = ''
      document.body.style.justifyContent = ''
      document.body.style.display = ''
      // document.body.style.placeItems = ''
      document.body.style.height = ''
    }
  }, []) // the empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Change text after 10 seconds while the video is playing
    if (isVideoPlaying) {
      const timeoutId = setTimeout(() => {
        setDisplayText("it is dark and cold ...")
      }, 10000)

      // clenup function to cancel the timeout if the component unmounts or video stops playing
      return () => clearTimeout(timeoutId)
    }
  }, [isVideoPlaying])

  return (
    <div>
      <header>
        <h1>you are alone in the dark ...</h1>
        <YouTube 
          videoId="BjOq9SEDzKY" 
          opts={{ height: "390", width: "640", playerVars: { autoplay: 1 } }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </header>
      <div>
        {displayText}
      </div>
    </div>
  )
};
