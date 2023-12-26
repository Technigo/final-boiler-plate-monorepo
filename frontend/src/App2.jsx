import { useEffect, useState } from "react";

export const App = () => {
  const [audio] = useState(new Audio('https://www.youtube.com/watch?v=BjOq9SEDzKY'))
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

  const playAudio = () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }

  return (
    <p onClick={playAudio}>you are alone in the dark ... </p>
  )
};
