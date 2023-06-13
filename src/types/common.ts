export type Nullable<T> = null | T

export enum LoadingVariants {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed'
}

export enum ThemeModeVariants {
  light = 'light',
  dark = 'dark',
}

export type UserType = {
  email: string
  nick: string
  uid: string
  registeredTimestamp: number
  followers: Array<string>,
  followedBy: Array<string>,
  avatar?: string
}