import YouTube from "react-youtube"

const Header = () => {
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    }

    const videoUrl = " https://www.youtube.com/watch?v=BjOq9SEDzKY"

    // event handler for when the video ends
    const onEnd = (event) => {
        // do something when the video ends (if needed)
        console.log("video ended:", event)
    }

    return (
        <header>
            <h1>you are alone in the dark ...</h1>
            <YouTube videoId={videoUrl.split("v=")[1]} opts={opts} onEnd={onEnd} />
        </header>
    )
}

export default Header