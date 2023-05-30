import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  @media(min-width: 992px){
    flex-direction: row;
    gap: 16px;
  }
`

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  article:not(:last-child){
    border-bottom: 1px solid ${({theme}) => theme.colors.black[20]};
  }
  

  @media(min-width: 992px){
    width: 70%;
  }
`

export const NewUsersContainer = styled.aside`
  display: none;

  @media(min-width: 992px){
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 30%;
    padding: 8px;
    height: fit-content;

    span {
      color: ${({theme}) => theme.colors.black[50]};
    }
  }
`

export const UserInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  
  img {
    width: 56px;
    height: 56px;
  }

  p {
    font-weight: bold;
  }
`

export const UsersBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  img {
    width: 32px;
    height: 32px;
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
  }
`