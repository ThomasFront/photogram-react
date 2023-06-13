import { Player } from "@lottiefiles/react-lottie-player"
import { AnimationContainer, Wrapper } from "./NotFoundPage.styles"
import notFoundAnimation from '../../assets/animations/notFoundAnimation.json'
import { Button } from "../../components/Button"
import { Link } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <Wrapper>
      <AnimationContainer>
        <Player
          autoplay
          loop
          src={notFoundAnimation}
          className="animation"
        >
        </Player>
      </AnimationContainer>
      <p>Ups. Taka podstrona nie istnieje...</p>
      <Link to="/">
        <Button>Wróc do strony głównej</Button>
      </Link>
    </Wrapper>
  )
}
