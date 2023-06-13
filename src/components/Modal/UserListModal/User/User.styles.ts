import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;

  img {
    width: 32px;
    height: 32px;
    margin-top: 4px;
    border-radius: 50%;
    object-fit: cover;

    @media(min-width: 576px){
      width: 64px;
      height: 64px;
    }
  }

  a {
    transition: color 0.2s;

    &:hover {
      color: ${({theme}) => theme.colors.text[50]};
    }
  }

  @media(min-width: 576px){
    gap: 16px;
    font-size: 20px;
  }
`