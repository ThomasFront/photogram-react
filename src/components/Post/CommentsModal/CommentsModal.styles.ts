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
`

export const CommentsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
`