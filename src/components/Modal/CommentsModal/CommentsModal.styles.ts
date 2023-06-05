import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

export const Wrapper = styled.div`
  
  img {
    width: 100%;
    max-height: 500px;
  }

  span {
    color: ${({theme}) => theme.colors.black[50]};
    display: inline-block;
    margin: 8px 0;
  }

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

export const CommentsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
`

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    font-weight: 500;
  }

  span {
    color: ${({theme}) => theme.colors.black[100]};
  }

  svg {
    cursor: pointer;
    transition: color 0.2s;
    font-size: 32px;

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