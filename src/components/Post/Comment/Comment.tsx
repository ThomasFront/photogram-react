import { Link } from "react-router-dom"
import { Wrapper } from "./Comment.styles"
import { CommentProps } from "./types"
import userDefaultAvatar from '../../../assets/images/userDefaultAvatar.png'

export const Comment = ({ commentData }: CommentProps) => {
  const { username, comment, userId, userAvatar } = commentData

  return (
    <Wrapper>
      <div>
        {userAvatar ?
          <img src={userAvatar} alt="Ikona użytkownika." /> :
          <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika." />
        }
        <Link to={`/profile/${userId}`}>{username} </Link>
      </div>
      <p>{comment}</p>
    </Wrapper>
  )
}
