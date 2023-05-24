import { StyledButton } from "./Button.styles"
import { ButtonProps, ButtonVariants } from "./types"

export const Button = ({ variant = ButtonVariants.primary, ...props }: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      {...props}
    />
  )
}
