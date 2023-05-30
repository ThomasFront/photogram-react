import { LoadingVariants, Nullable, UserType } from "../../../types/common"

export type UsersState = {
  newUsers: Array<UserType>
  loadings: {
    getNewUsers: LoadingVariants
  },
  errors: {
    getNewUsers: Nullable<string>
  }
}