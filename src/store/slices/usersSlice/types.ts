import { LoadingVariants, Nullable, UserType } from "../../../types/common"
import { PostType } from "../postsSlice/types"

export type SpecificUserDetailsType = {
  userDetails: UserType,
  userPosts: Array<PostType>,
}

export type UsersState = {
  newUsers: Array<UserType>
  specificUser: Nullable<SpecificUserDetailsType>
  loadings: {
    getNewUsers: LoadingVariants
    getSpecificUserDetails: LoadingVariants
  },
  errors: {
    getNewUsers: Nullable<string>
    getSpecificUserDetails: Nullable<string>
  }
}