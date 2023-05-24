import { ButtonHTMLAttributes } from "react"

export enum ButtonVariants {
  primary = 'primary',
  text = 'text'
}

export type ButtonProps = {
  variant?: ButtonVariants
} & ButtonHTMLAttributes<HTMLButtonElement>