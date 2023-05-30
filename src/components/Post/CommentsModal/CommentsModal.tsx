import { Modal } from "../../Modal"
import { Comment } from "../Comment"
import { CommentsContainer, Wrapper } from "./CommentsModal.styles"
import { PostModalProps } from "./types"

export const CommentsModal = ({ onClose, username, image, comments }: PostModalProps) => {
  return (
    <Modal
      onClose={onClose}
      heading={`Post użytkownika ${username}`}
    >
      <Wrapper>
        <img src={image} alt={`Zdjęcie użytkownia ${username}`} />
        {!!comments.length && (
          <CommentsContainer>
            <span>Wszystkie komentarze ({comments.length})</span>
            {comments.map(comment => <Comment key={comment.commentId} commentData={comment} />)}
          </CommentsContainer>
        )}
      </Wrapper>
    </Modal>
  )
}
