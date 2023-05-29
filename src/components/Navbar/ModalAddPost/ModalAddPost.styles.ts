import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  p {
    font-weight: 400;
    margin-bottom: 8px;
  }

  button {
    margin-left: auto;
    width: 50%;
    max-width: 200px;
  }
`

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
    background-color: ${({theme}) => theme.colors.black[70]};
    border-radius: 6px;
    color: ${({theme}) => theme.colors.pure['white']};
    transition: background-color 0.2s;
    margin: 0 auto;

    &:hover {
      background-color: ${({theme}) => theme.colors.black[60]};
    }
  }
`

export const TextareaContainer = styled.form`

`

export const ImageName = styled.p`
  margin-top: 4px;
  color: ${({theme}) => theme.colors.black[80]};
  font-size: 14px;
  text-align: right;
`

export const ErrorContainer = styled.div`
  text-align: right;
`