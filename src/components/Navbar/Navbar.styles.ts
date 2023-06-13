import styled from "styled-components";

export const StyledNav = styled.nav`
  border-bottom: 1px solid ${({theme}) => theme.colors.text[20]};
  background-color: ${({theme}) => theme.colors.text[0]};
`

export const NavItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 16px;
`

export const LogoContainer = styled.div`

  p {
    font-family: 'Copse', serif;
    font-size: 24px;

    @media(min-width: 576px){
      font-size: 28px;
    }
  }
`

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    font-size: 24px;
    cursor: pointer;
    transition: color 0.2s;
    color: ${({theme}) => theme.colors.text[90]};

    @media(min-width: 576px){
      font-size: 30px;
    }

    &:hover {
      color: ${({theme}) => theme.colors.text[70]};
    }
  }

  img {
    width: 26px;
    height: 26px;
    margin-top: 4px;
    border-radius: 50%;
    object-fit: cover;

    @media(min-width: 576px){
      width: 32px;
      height: 32px;
    }
  }

  button {
    padding: 8px 16px;
    margin-left: 4px;

    @media(min-width: 576px){
      padding: 8px 24px;
      margin-left: 8px;
    }
  }

  @media(min-width: 768px){
    gap: 24px;
  }
`