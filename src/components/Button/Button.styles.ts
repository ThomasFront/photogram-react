import styled, { css } from "styled-components";
import { ButtonVariants } from "./types";

type StyledButtonProps = {
  variant: ButtonVariants
  isLoading?: boolean
}

const handleVariant = (variant: ButtonVariants) => {
  switch(variant){
    case ButtonVariants.primary:
      default: 
      return css`
        padding: 12px;
        font-size: 14px;
        background-color: #4192f4;
        border-radius: 6px;
        color: #fff;
        transition: background-color 0.2s;

        &:hover {
          background-color: #2f84ed;
        }
      `
    case ButtonVariants.text:
      return css`
        background-color: transparent;
        font-size: 16px;
        color: #4192f4;
        transition: color 0.2s;

        &:hover {
          color: #2f84ed;
        }
      `
  }
}

export const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  border: none;
  ${({isLoading}) => isLoading && css`
    filter: grayscale(1);
    cursor: not-allowed;
  `}
  ${({variant}) => variant && handleVariant(variant)}
`