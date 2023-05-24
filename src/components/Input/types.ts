import { InputHTMLAttributes } from "react";

export enum InputVariants {
  primary = 'primary'
}

export type InputProps = {
  variant?: InputVariants
} & InputHTMLAttributes<HTMLInputElement>