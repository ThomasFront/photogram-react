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

export const NewUsersContainer = styled.div`
  display: none;

  @media(min-width: 992px){
    display: flex;
    width: 30%;
    padding: 4px 0;
  }
`