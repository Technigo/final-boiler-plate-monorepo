// to test autoplay with header, bcs ive seen version from yesterday(with header component) autoplays.
// but it looks like... idk. not with header component. it does autoplay with sound on, but by some reason that i dont know yet

import { useEffect } from "react";
import Header from "./components/Header"
// import YouTube from "react-youtube"

export const App = () => {
  // const opts = {
  //   height: "390",
  //   width: "640",
  //   playerVars: {
  //     autoplay: 1,
  //     // mute: 1, // i added this to test autoplay. but enabling this even not giving mute the video
  //   },
  // }

  // const videoUrl = "https://www.youtube.com/watch?v=BjOq9SEDzKY"

  // // event handler for when the video ends
  // const onEnd = (event) => {
  //   // do something when the video ends (if needed)
  //   console.log("video ended:", event)
  // }

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
  return (
    <div>
      <Header />
      {/* <header>
        <h1>you are alone in the dark ...</h1>
        <YouTube videoId={videoUrl.split("v=")[1]} opts={opts} onEnd={onEnd} />
      </header> */}
      <div>
        "you are alone in the dark ... "
      </div>
    </div>
  )
};
