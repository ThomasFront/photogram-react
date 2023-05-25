import { StyledButton } from "./Button.styles"
import { ButtonProps, ButtonVariants } from "./types"

export const Button = ({ variant = ButtonVariants.primary, isLoading, loadingText, disabled, children, ...props }: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      isLoading={isLoading}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? loadingText : children}
    </StyledButton>
  )
}
