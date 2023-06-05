export type Nullable<T> = null | T

export enum LoadingVariants {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed'
}

export type UserType = {
  email: string
  nick: string
  uid: string
  avatar?: string
}