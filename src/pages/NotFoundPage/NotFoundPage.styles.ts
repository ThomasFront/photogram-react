import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;

  button {
    margin-top: 16px;
    font-size: 16px;
  }

  p {
    font-size: 16px;

    @media(min-width: 768px){
      font-size: 18px;
    }
  }
`

export const AnimationContainer = styled.div`

  .animation {
    width: 300px;
    height: 300px;

    @media(min-width: 768px){
      width: 400px;
      height: 400px;
    }

    @media(min-width: 992px){
      width: 500px;
      height: 500px;
    }
  }
`