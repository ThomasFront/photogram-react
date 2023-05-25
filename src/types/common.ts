export type Nullable<T> = null | T

export enum LoadingVariants {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed'
}