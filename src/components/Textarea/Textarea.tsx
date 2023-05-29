import { StyledTextarea } from "./Textarea.styles"
import { TextareaProps } from "./types"

export const Textarea = ({ register, name, ...props }: TextareaProps) => {
  return (
    <StyledTextarea
      {...(register && name && register(name))}
      {...props}
    />
  )
}
