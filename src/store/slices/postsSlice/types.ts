import { LoadingVariants, Nullable, UserType } from "../../../types/common"

export type AddCommentType = {
  newComments: Array<CommentType>
  postId: string
}

export type CommentType = {
  comment: string
  commentId: string
  username: string
  userId: string
  userAvatar: string
}

export type AddCommentArgType = {
  comment: string
  username: string
  userId: string
  postId: string
  userAvatar: string
}

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
  userAvatar: string
}

export type PostType = {
  description: string
  image: string
  userId: string
  postId: string
  username: string
  timestamp: number
  comments: Array<CommentType>
  likes: Array<string>
  userAvatar?: string
}

export type PostsState = {
  posts: Array<PostType>
  loadings: {
    addPost: LoadingVariants
    getPosts: LoadingVariants
    likePost: LoadingVariants
    addCommentToPost: LoadingVariants
  }
  errors: {
    addPost: Nullable<string>
    getPosts: Nullable<string>
    likePost: Nullable<string>
    addCommentToPost: Nullable<string>
  }
}