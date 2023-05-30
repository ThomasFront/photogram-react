import { Link } from "react-router-dom"
import { Wrapper } from "./Comment.styles"
import { CommentProps } from "./types"
import userDefaultAvatar from '../../../assets/images/userDefaultAvatar.png'

export const Comment = ({ commentData }: CommentProps) => {
  const { username, comment, commentId, userId } = commentData

  return (
    <Wrapper>
      <div>
        <img src={userDefaultAvatar} alt="Domyślne zdjęcie użytkownika." />
        <Link to="/">{username} </Link>
      </div>
      <p>{comment}</p>
    </Wrapper>
  )
}
