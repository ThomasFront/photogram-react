import { CommentType } from "../../../store/slices/postsSlice/type"

export type PostModalProps = {
  onClose: () => void
  username: string
  image: string
  comments: Array<CommentType>
}