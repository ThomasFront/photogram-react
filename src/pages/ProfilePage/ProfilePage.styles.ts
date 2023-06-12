import styled from "styled-components";

export const Wrapper = styled.section`

`

export const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-bottom: 48px;
  border-bottom: 1px solid ${({theme}) => theme.colors.black[20]};
  
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;

    @media(min-width: 576px){
      width: 126px;
      height: 126px;
    }
  }

  @media(min-width: 576px){
    gap: 48px;
  }
`

export const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DetailsTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  button {
    padding: 8px 16px;
  }

  @media(min-width: 450px){
    flex-direction: row;
    align-items: center;
  }
`

export const DetailsBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  p {
    
    span {
      font-weight: 500;
    }
  }
`

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 32px;

  @media(min-width: 600px){
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const NoPostsInformation = styled.p`
  margin-top: 64px;
  text-align: center;
  font-size: 20px;
  color: ${({theme}) => theme.colors.black[60]};
`