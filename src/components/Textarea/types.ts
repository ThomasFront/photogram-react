import { FieldValues, UseFormRegister } from "react-hook-form"

export type TextareaProps = {
  register?: UseFormRegister<FieldValues>
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>