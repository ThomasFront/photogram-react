import styled, { css } from "styled-components";
import { InputVariants } from "./types";

const handleVariant = (variant: InputVariants) => {
  switch(variant){
    case InputVariants.primary:
      default: 
      return css`
        border: 1px solid rgba(0, 0, 0, 0.2);
        background-color: rgba(0, 0, 0, 0.05);
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
    outline-color: rgba(0, 0, 0, 0.1);
  }
  ${({isError}) => isError && css`
    border: 1px solid crimson;
    &:focus {
      outline-color: #fa98ac;
    }
  `}
  ${({variant}) => variant && handleVariant(variant)}
`