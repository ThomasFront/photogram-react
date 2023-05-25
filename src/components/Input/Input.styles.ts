import styled, { css } from "styled-components";
import { InputVariants } from "./types";

const handleVariant = (variant: InputVariants) => {
  switch(variant){
    case InputVariants.primary:
      default: 
      return css`
        border: 1px solid ${({theme}) => theme.colors.black[20]};
        background-color: ${({theme}) => theme.colors.black[10]};
      `
  }
}

type StyledInputProps = {
  variant: InputVariants
  isError?: boolean
}

export const StyledInput = styled.input<StyledInputProps>`
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  font-size: 14px;
  &:focus{
    outline-color: ${({theme}) => theme.colors.black[20]};
  }
  
  ${({variant}) => variant && handleVariant(variant)}
  ${({isError}) => isError && css`
    border: 1px solid ${({theme}) => theme.colors.info.error[100]};
    &:focus {
      outline-color: ${({theme}) => theme.colors.info.error[50]};
    }
  `}
`