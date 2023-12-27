import { useState, useEffect } from "react";
import YouTube from "react-youtube"

export const App = () => {
  const [displayText, setDisplayText] = useState("you are alone in the dark ...")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      // mute: 1, // i added this to test autoplay. but enabling this even not giving mute the video
    },
  }

  const videoUrl = "https://www.youtube.com/watch?v=BjOq9SEDzKY"

  // // event handler for when the video ends
  // const onEnd = (event) => {
  //   // do something when the video ends (if needed)
  //   console.log("video ended:", event)
  // }

  // event handler for when the user is ready to proceed, with playing video enough
  const onReady = (event) => {
    console.log('user is ready', event)
    // you can access the player instance here (if needed)
    const player = event.target

    // this might not work bcs chatgpt said
    //  In react-youtube, you don't directly use addEventListener to listen for events like onStateChange. Instead, you provide a prop called onStateChange directly in the YouTube component.
    // // listen for the 'stateChange' event to determine if the video is playing
    // player.addEventListener('onStateChange', (event) => {
    //   // not working 
    //   console.log('State changed:', event.data)
    //   if(event.data === YouTube.PlayerState.PLAYING) {
    //     setIsVideoPlaying(true)
    //   }
    // })

    // const onStateChange = (event) => {
    //   console.log('State changed', event.data)
    //   if (event.data === YouTube.PlayerState.PLAYING) {
    //     setIsVideoPlaying(true)
    //   }
    // }
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
      {/* <Header /> */}
      <header>
        <h1>you are alone in the dark ...</h1>
        {/* <h1>{displayText}</h1> */}
        {/* <YouTube videoId={videoUrl.split("v=")[1]} opts={opts} onEnd={onEnd} /> */}
        {/* <YouTube videoId={videoUrl.split("v=")[1]} opts={opts} onEnd={onReady} /> */}
        <YouTube 
          videoId="BjOq9SEDzKY" 
          opts={{ height: "390", width: "640", playerVars: { autoplay: 1 } }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </header>
      <div>
        {/* "you are alone in the dark ... " */}
        {/* <h1>{displayText}</h1> */}
        {displayText}
      </div>
    </div>
  )
};
