import { StyledInput } from "./Input.styles"
import { InputProps, InputVariants } from "./types"

export const Input = ({ variant = InputVariants.primary, name, register, isError, ...props }: InputProps) => {
  return (
    <StyledInput
      variant={variant}
      {...(name && register && register(name))}
      isError={isError}
      {...props}
    />
  )
}
