import { CommentType } from "../../../store/slices/postsSlice/types"

export type PostModalProps = {
  onClose: () => void
  username: string
  image: string
  comments: Array<CommentType>
  likes: Array<string>
  postId: string
  description: string
  userId: string
  preview?: boolean
}