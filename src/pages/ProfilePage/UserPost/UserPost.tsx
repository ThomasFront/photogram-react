import { useEffect, useState } from "react"
import { DetailsContainer, Wrapper } from "./UserPost.styles"
import { UserPostProps } from "./types"
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai"
import { CommentsModal } from "../../../components/Modal/CommentsModal"
import { useAppDispatch } from "../../../store/hooks"
import { getUsername } from "../../../store/slices/postsSlice/postsSlice"
import { unwrapResult } from "@reduxjs/toolkit"

export const UserPost = ({ post }: UserPostProps) => {
  const { image, username, likes, comments, postId, description, userId } = post
  const [showDetails, setShowDetails] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const dispatch = useAppDispatch()
  const [downloadedUsername, setDownloadedUsername] = useState("")

  const handleUsername = async () => {
    const name = unwrapResult(await dispatch(getUsername(userId)))
    setDownloadedUsername(name)
  }

  useEffect(() => {
    handleUsername()
  }, [])

  return (
    <>
      {showPreview && (
        <CommentsModal
          onClose={() => setShowPreview(false)}
          username={downloadedUsername}
          image={image}
          comments={comments}
          likes={likes}
          postId={postId}
          description={description}
          userId={userId}
          preview
        />
      )}
      <Wrapper
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        onClick={() => setShowPreview(true)}
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
        <img
          src={image}
          alt={`Zdjęcie użytkownika ${username}`}
          loading="lazy"
        />
      </Wrapper>
    </>
  )
}
