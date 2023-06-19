import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 97vh;
`

export const AnimationContainer = styled.div`
  display: none;
  width: 100%;

  .animation {
    width: 400px;
    height: 400px;

    @media(min-width: 992px){
      width: 500px;
      height: 500px;
    }

    @media(min-width: 1200px){
      width: 550px;
      height: 550px;
    }
  }

  @media(min-width: 768px){
    display: flex;
  }
`

export const FormWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  max-width: 500px;
`

export const FormContainer = styled.div`
  position: relative;
  border: 1px solid ${({theme}) => theme.colors.text[20]};
  padding: 32px 16px;
  background-color: ${({theme}) => theme.colors.pure['white']};

  >svg {
    position: absolute;
    font-size: 64px;
    color: ${({theme}) => theme.colors.primary[100]};
    top: -35px;
    right: 0px;
    transform: rotate(20deg);
  }

  @media(min-width: 992px){
    padding: 32px;
  }
`

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;

  h1 {
    font-family: 'Copse', serif;
    font-size: 28px;
    color: ${({theme}) => theme.colors.text[70]};

    @media(min-width: 820px){
      font-size: 36px;
    }
  }

  span {
    color: ${({theme}) => theme.colors.text[60]};
    padding-bottom: 4px;

    @media(min-width: 820px){
      font-size: 18px;
    }
  }
`

export const NoAccountContainer = styled.div`
  background-color: ${({theme}) => theme.colors.pure['white']};
  padding: 16px;
  border: 1px solid ${({theme}) => theme.colors.text[20]};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  span {
    color: ${({theme}) => theme.colors.text[50]};
  }
  
  button,
  span {
    font-size: 15px;
  }
`