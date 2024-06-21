import Lottie from "lottie-react"
import Loading from "../assets/Loading.json"

export const LoadingAnimation = () => {
  return (
    <Lottie
      animationData={Loading}
      loop={true}
      autoplay
      style={{
        width: 300,
        height: 300,
      }}       
    />
  )
}
