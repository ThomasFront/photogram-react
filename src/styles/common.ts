import styled from "styled-components";

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.info.error[100]};
  font-size: 14px;
`

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`