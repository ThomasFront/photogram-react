import { LoadingVariants, Nullable } from "../../../types/common"

export type LikePostType = {
  userId: string
  postId: string
}

export type LikePostArgType = {
  newLikes: Array<string>
  postId: string
}

export type AddPostArgType = {
  description: string
  image: File
  userId: string
  username: string
}

export type PostType = {
  description: string
  image: string
  userId: string
  postId: string
  username: string
  timestamp: number
  comments: any
  likes: any
}

export type PostsState = {
  posts: Array<PostType>
  loadings: {
    addPost: LoadingVariants
    getPosts: LoadingVariants
    likePost: LoadingVariants
  }
  errors: {
    addPost: Nullable<string>
    getPosts: Nullable<string>
    likePost: Nullable<string>
  }
}