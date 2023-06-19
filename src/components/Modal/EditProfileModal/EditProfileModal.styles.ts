import styled from "styled-components";

export const FileContainer = styled.div`

  input {
    display: none;
  }

  span:first-child {
    display: block;
    text-align: center;
    cursor: pointer;
    padding: 12px 24px;
    font-size: 14px;
    background-color: ${({theme}) => theme.colors.text[70]};
    border-radius: 6px;
    color: ${({theme}) => theme.colors.pure['white']};
    transition: background-color 0.2s;
    margin: 0 auto;

    &:hover {
      background-color: ${({theme}) => theme.colors.text[60]};
    }
  }
`

export const ImageName = styled.p`
  margin-top: 4px;
  color: ${({theme}) => theme.colors.text[80]};
  font-size: 14px;
  text-align: right;
`

export const ButtonContainer = styled.div`
  margin-top: 24px;
  text-align: right;
`

export const UsernameContainer = styled.div`
  margin-top: 32px;
`