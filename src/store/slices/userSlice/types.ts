import { LoadingVariants, Nullable } from "../../../types/common";

export type UserType = {
  email: string
  nick: string
  uid: string
}

export type RegisterUserType = {
  email: string
  nick: string
  password: string
}

export type LogInUserType = {
  email: string
  password: string
}

export type UserState = {
  user: Nullable<UserType>
  loadings: {
    registerUser: LoadingVariants
    logInUser: LoadingVariants
    logOutUser: LoadingVariants
    getUser: LoadingVariants
  },
  errors: {
    registerUser: Nullable<string>
    logInUser: Nullable<string>
    logOutUser: Nullable<string>
    getUser: Nullable<string>
  }
}

export enum AuthErrors {
  "auth/email-already-in-use" = "Email zajęty.",
  "auth/user-not-found" = "Nie znaleziono użytkownika.",
  "auth/wrong-password" = "Błędne hasło.",
}