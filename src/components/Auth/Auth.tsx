import { AnimationContainer, FormContainer, FormHeader, FormWrapper, NoAccountContainer, Wrapper } from "./Auth.styles"
import Typewriter from 'typewriter-effect';
import { Player } from '@lottiefiles/react-lottie-player';
import authAnimation from '../../assets/animations/authAnimation.json'
import { useState } from "react";
import { RegisterForm } from "../Forms/RegisterForm";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { AiFillInstagram } from 'react-icons/ai'
import { LogInForm } from "../Forms/LogInForm";

export const Auth = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  return (
    <Wrapper>
      <AnimationContainer>
        <Player
          autoplay
          loop
          src={authAnimation}
          className="animation"
        >
        </Player>
      </AnimationContainer>
      <FormWrapper
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <FormContainer>
          <AiFillInstagram />
          <FormHeader>
            <h1>Photogram</h1>
            <Typewriter
              options={{
                strings: ['Dodawaj posty i zdjęcia...', 'Poznawaj nowe osoby...', 'Odkrywaj nowe miejsca...', 'Dziel się chwilami...'],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </FormHeader>
          {showRegisterForm ?
            <RegisterForm /> :
            <LogInForm />
          }
        </FormContainer>
        <NoAccountContainer>
          {showRegisterForm ?
            <div>
              <span>Masz już konto?</span>
              <Button
                onClick={() => setShowRegisterForm(false)}
                variant={ButtonVariants.text}
              >
                Zaloguj się
              </Button>
            </div> :
            <div>
              <span>Nie masz konta?</span>
              <Button
                onClick={() => setShowRegisterForm(true)}
                variant={ButtonVariants.text}
              >
                Zarejestruj się
              </Button>
            </div>
          }
        </NoAccountContainer>
      </FormWrapper>
    </Wrapper>
  )
}
