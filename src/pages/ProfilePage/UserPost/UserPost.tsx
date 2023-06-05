import { useState } from "react"
import { DetailsContainer, Wrapper } from "./UserPost.styles"
import { UserPostProps } from "./types"
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai"

export const UserPost = ({ post }: UserPostProps) => {
  const { image, username, likes, comments } = post
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Wrapper
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {showDetails && (
        <DetailsContainer>
          <div>
            <AiOutlineHeart />
            <span>{likes.length}</span>
          </div>
          <div>
            <AiOutlineComment />
            <span>{comments.length}</span>
          </div>
        </DetailsContainer>
      )}
      <img src={image} alt={`Zdjęcie użytkownika ${username}`} />
    </Wrapper>
  )
}
