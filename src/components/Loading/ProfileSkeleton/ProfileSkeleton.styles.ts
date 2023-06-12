import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 16px;
`

export const SkeletonPostsWrapper = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media(min-width: 600px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 800px){
    grid-template-columns: repeat(3, 1fr);
  }

  @media(min-width: 1000px){
    grid-template-columns: repeat(4, 1fr);
  }
`