import { CommentType } from "../../../store/slices/postsSlice/types"

export type PostModalProps = {
  onClose: () => void
  username: string
  image: string
  comments: Array<CommentType>
}