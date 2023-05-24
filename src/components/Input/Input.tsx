import { StyledInput } from "./Input.styles"
import { InputProps, InputVariants } from "./types"

export const Input = ({ variant = InputVariants.primary, ...props }: InputProps) => {
  return (
    <StyledInput
      variant={variant}
      {...props}
    />
  )
}
