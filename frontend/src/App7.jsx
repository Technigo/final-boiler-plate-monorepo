// wanted to save before delete some comments :)

import { useState, useEffect } from "react";
import YouTube from "react-youtube"

export const App = () => {
  const [displayText, setDisplayText] = useState("you are alone in the dark ...")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showAuthSection, setShowAuthSection] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // event handler for when the user is ready to proceed, with playing video enough
  const onReady = (event) => {
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
        // need to remove freezing when no delay for this text works
        // setDisplayText(isLoggedIn ? "you are freezing ..." : "it is dark and cold ...")
        setDisplayText("it is dark and cold ...")
        setShowAuthSection(true) // show the register/login section
      }, 10000)

      // clenup function to cancel the timeout if the component unmounts or video stops playing
      return () => clearTimeout(timeoutId)
    }
  }, [isVideoPlaying])

  // change text withoout delay when isLoggedin is updated
  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn)
    // this makes it is dark and cold is showing without delay, so need to remove this
    // setDisplayText(isLoggedIn ? "you are freezing ..." : "it is dark and cold ...")
    setDisplayText(isLoggedIn ? "you are freezing ..." : displayText)
  }, [isLoggedIn, displayText])

  const handleRegister = async () => {
    try {
      console.log("trying register:", username)
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
      })
      console.log("after fetch:", username)
      
      console.log("Response status:", response.status)
      const responseText = await response.text()
      console.log("Response text:", responseText)

      // const data = await response.json()
      const data = JSON.parse(responseText) // parse the json response bcs response can be read only once
      console.log("after update data:", username)
      console.log(data)
      setIsLoggedIn(true)
      console.log("isLoggedIn:", isLoggedIn)
    } catch (error) {
      console.error("couldnt register", error)
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log(data)
      setIsLoggedIn(true)
      console.log("isLoggedIn:", isLoggedIn)
    } catch (error) {
      console.error("couldnt login", error)
    }
  }

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
        {/* {isLoggedIn ? "you are freezing ..." : displayText} */}
        {displayText}
        {showAuthSection && (
        <div>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="secret"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>start</button>
          <button onClick={handleLogin}>load</button>
        </div>
      )}
      </div>
    </div>
  )
};
