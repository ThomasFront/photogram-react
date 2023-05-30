import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  >div {
    display: flex;
    align-items: center;
    gap: 4px;

    img {
      width: 16px;
      height: 16px;
      margin-top: 4px;

      @media(min-width: 576px){
        width: 20px;
        height: 20px;
      }
    }
  }
  
  p {
    font-weight: 300;
    word-break: break-all;
  }

  a {
    font-weight: bold;
  }
`