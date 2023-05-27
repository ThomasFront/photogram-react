import { InputWrapper, StyledInput } from "./Input.styles"
import { InputProps, InputVariants } from "./types"

export const Input = ({ variant = InputVariants.primary, name, register, isError, icon, ...props }: InputProps) => {
  return (
    <InputWrapper
      icon={!!icon}
    >
      <StyledInput
        variant={variant}
        {...(name && register && register(name))}
        isError={isError}
        {...props}
      />
      {icon && icon}
    </InputWrapper>
  )
}
