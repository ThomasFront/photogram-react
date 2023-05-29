import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'

export const Wrapper = styled.article`

`

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

    @media(min-width: 576px){
      width: 32px;
      height: 32px;
    }
  }

  >div {
    display: flex;
    flex-direction: column;

    p {
      font-weight: 500;
    }

    span {
      color: ${({theme}) => theme.colors.black[40]};
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
  }

  @media(min-width: 768px){
    height: 500px;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 32px;
  padding: 8px 0;

  svg {
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${({theme}) => theme.colors.black[60]};
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