import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  font-size: 14px;
  border: 1px solid ${({theme}) => theme.colors.black[20]};
  background-color: ${({theme}) => theme.colors.black[10]};
  resize: none;
  min-height: 200px;
  &:focus{
    outline-color: ${({theme}) => theme.colors.black[20]};
  }
`