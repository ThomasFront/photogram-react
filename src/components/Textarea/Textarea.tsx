import { StyledTextarea } from "./Textarea.styles"
import { TextareaProps } from "./types"

export const Textarea = ({ ...props }: TextareaProps) => {
  return (
    <StyledTextarea
      {...props}
    />
  )
}
