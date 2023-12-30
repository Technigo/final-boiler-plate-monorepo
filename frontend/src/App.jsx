import { useState, useEffect } from "react";
import YouTube from "react-youtube"

export const App = () => {
  const [displayText, setDisplayText] = useState("you are alone in the dark ...")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showAuthSection, setShowAuthSection] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [registrationError, setRegistrationError] = useState(null)
  const [accessToken, setAccessToken] = useState("")
  const [showButton, setShowButton] = useState(false)
  const [isGoForwardClicked, setIsGoForwardClicked] = useState(false)
  const [refuseToMove, setRefuseToMove] = useState(false)
  const [loopCounter, setLoopCounter] = useState(0)
  const [showButton2, setShowButton2] = useState(true)

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
        setDisplayText("it is dark and cold ...")
        setShowAuthSection(true) // show the register/login section
      }, 10000)

      // clenup function to cancel the timeout if the component unmounts or video stops playing
      return () => clearTimeout(timeoutId)
    }
  }, [isVideoPlaying])

  // change text without delay when isLoggedin is updated
  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn)
    // setDisplayText(isLoggedIn ? "you are freezing ..." : displayText)
    // only update displayText if isLoggedIn is true and not after 10 sec (showButton false), which will make not setdisplaytext to continuously render "you are freezing ... " even after i set new text value for displaytext
    if (isLoggedIn && !showButton ) {
      setDisplayText("you are freezing ... ")
    }
  // }, [isLoggedIn, displayText])
  }, [isLoggedIn, showButton])

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
      
      if (response.status === 201) {
        // registration successful, proceed with login
        setAccessToken(data.response.accessToken)
        setIsLoggedIn(true)
        setShowAuthSection(false) // hide this after registration
        setRegistrationError(null) // reset regi err if regi is successful // idk i need this here
        // show button after 10 sec
        setTimeout(() => {
          setShowButton(true)
        }, 10000)
      } else {
        // registration failed. would be better handle accordingly 
        // for now, just logging err msg
        console.error("cant register:", data.response)
        // registration failed. set the err msg in state
        const errorMessage = data.response || "cant register"
        setRegistrationError(errorMessage)
      }

      console.log("isLoggedIn:", isLoggedIn)
    } catch (error) {
      console.error("couldnt register", error)
      // set err msg if there is exception
      setRegistrationError("couldnt register")
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

      if (response.status === 200) {
        // login successful, set token in state
        setAccessToken(data.response.accessToken)
        setIsLoggedIn(true)
        console.log("isLoggedIn:", isLoggedIn)
        setShowAuthSection(false) // hide after login
        // show button after 10 sec
        setTimeout(() => {
          setShowButton(true)
        }, 10000)
      }
    } catch (error) {
      console.error("couldnt login", error)
    }
  }

  const handleUP = async () => {
    try {
      const response = await fetch('http://localhost:3000/up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        },
      })
      const data = await response.json()
      console.log(data)
      // check if the fetch request was successful before updating displayText
      if (response.ok) {
        // setDisplayText([
        //   "you step forward, but you stay there",
        //   "there is vision that never can be reached"
        // ])
        const originalText = "you step forward, but you stay there"
        setDisplayText([originalText])
        setTimeout(() => {
          setDisplayText([originalText, "there is vision that never can be reached"])
          // show go forward button again after 10sec
          setTimeout(() => {
            setIsGoForwardClicked(false)
            setRefuseToMove(true) // to change the label of the button 
            // loop counter
            if (refuseToMove) {
              setLoopCounter((prevCounter) => prevCounter + 1)
              console.log("Loop Counter:", loopCounter)
              if (loopCounter > 0) {
                setDisplayText("... the snow turns to the rain ")
                // reset the counter for the next time
                setLoopCounter(0)
                // setShowButton(false) // hide the button after the loop
                setShowButton2(false)
              } 
            }
          }, 10000)
        }, 10000)
        // assuming that the 'grid' property is an array in the response
        // const updateGrid = data.response.grid
        // update the displayText state with the new value
        // wanted to show text based on grid position. so this is something to be done next someday
        setIsGoForwardClicked(true)
      } else {
        console.error('Error:', data.response || 'Failed to go forward')
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  console.log("Current displayText value:", displayText) // to see if the component is re-rendering 

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
        {/* {displayText.map((line, index) => (
          <div key={index}>{line}</div>
        ))} {' '} */}
        {/* if displaytext is a string, render it as it is */}
        {typeof displayText === 'string' ? (
          displayText
        ) : (
          // if displaytext is an array, map over it and render each line
          <>
            {displayText.map((line, index) => (
              <div key={index}>{line}</div>
            ))} 
            {' '}
          </>
        )}
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
          <br/>
          <div style={{ color: 'red' }}>{registrationError}</div>
        </div>
      )}
      {isLoggedIn && showButton && !isGoForwardClicked && (
        <button onClick={handleUP}>{refuseToMove ? "i refuse to move, admit the end" : "go forward"}</button>
      )}
      </div>
    </div>
  )
};
