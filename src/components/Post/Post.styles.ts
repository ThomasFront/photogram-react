import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'

export const TopHeading = styled.div`
  margin-bottom: 8px;
`

export const PostDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;

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

  >div {
    display: flex;
    flex-direction: column;

    a {
      font-weight: 500;
    }

    span {
      color: ${({theme}) => theme.colors.fieldText[100]};
      font-weight: 300;
      font-size: 14px;
      
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
`

export const ImageContainer = styled.div`
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  @media(min-width: 768px){
    height: 500px;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 32px;
  padding: 8px 0;

  svg {
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${({theme}) => theme.colors.text[60]};
    }
  }
`

export const FillHeartIcon = styled(AiFillHeart)`
  color: #E60C29;
`

export const OutlineHeartIcon = styled(AiOutlineHeart)`
  
  
`

export const CommentIcon = styled(AiOutlineComment)`
  margin-bottom: 1px; 
`

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: start;

  gap: 4px;
  
  p {
    font-weight: 300;
    word-break: break-all;
  }

  a {
    font-weight: 500;
  }
`

export const LikesAmount = styled.p`
  font-weight: 500;
  margin-bottom: 2px;
  cursor: pointer;
  transition: color 0.2s;
  width: fit-content;

  &:hover {
    color: ${({theme}) => theme.colors.text[50]};
  }
`

export const CommentsContainer = styled.div`
  margin-bottom: 12px;

  form {
    display: flex;
    margin-top: 8px;

    >div {
      width: 100%;
    }

    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      &:focus {
        outline: transparent;
      }
    }
    
    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  `

  export const CommentsBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 4px;

    button {
      margin-top: 8px;
      text-align: left;
      font-size: 14px;
      width: fit-content;
    }
  `