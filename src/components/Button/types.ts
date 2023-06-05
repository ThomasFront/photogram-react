import { ButtonHTMLAttributes } from "react"

export enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  text = 'text'
}

export type ButtonProps = {
  variant?: ButtonVariants
  isLoading?: boolean
  loadingText?: string
} & ButtonHTMLAttributes<HTMLButtonElement>