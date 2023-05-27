import { InputHTMLAttributes, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export enum InputVariants {
  primary = 'primary'
}

export type InputProps = {
  variant?: InputVariants
  register?: UseFormRegister<FieldValues>
  isError?: boolean
  icon?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>