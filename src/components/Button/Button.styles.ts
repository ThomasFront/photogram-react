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
        padding: 12px 24px;
        font-size: 14px;
        background-color: ${({theme}) => theme.colors.primary[100]};
        border-radius: 6px;
        color: ${({theme}) => theme.colors.pure['white']};
        transition: background-color 0.2s;

        &:hover {
          background-color: ${({theme}) => theme.colors.primary[90]};
        }
      `
    case ButtonVariants.secondary:
      return css`
        padding: 12px 24px;
        font-size: 14px;
        background-color: ${({theme}) => theme.colors.black[20]};
        border-radius: 6px;
        color: ${({theme}) => theme.colors.black[100]};
        transition: background-color 0.2s;

        &:hover {
          background-color: ${({theme}) => theme.colors.black[30]};
        }
      `
    case ButtonVariants.text:
      return css`
        background-color: transparent;
        font-size: 16px;
        color: ${({theme}) => theme.colors.primary[100]};
        transition: color 0.2s;

        &:hover {
          color: ${({theme}) => theme.colors.primary[90]};
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