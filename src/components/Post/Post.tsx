import { ActionsContainer, CommentIcon, FillHeartIcon, ImageContainer, OutlineHeartIcon, PostDetails, TopHeading, Wrapper } from "./Post.styles"
import { PostProps } from "./types"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { handleDateFormat } from "../../utils"
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { likePost } from "../../store/slices/postsSlice/postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const Post = ({ post }: PostProps) => {
  const { postId, userId, username, image, description, timestamp, comments, likes } = post
  const dispatch = useAppDispatch()
  const [isLiked, setIsLiked] = useState(!!likes.length)

  const handleLikePost = async () => {
    const results = unwrapResult(await dispatch(likePost({
      postId,
      userId
    })))
    if (results) {
      setIsLiked(prev => !prev)
    }
  }

  return (
    <Wrapper>
      <TopHeading>
        <PostDetails>
          <img src={userDefaultAvatar} alt="Domyślne zdjęcie użytkownika." />
          <div>
            <p>{username}</p>
            <span>{handleDateFormat(timestamp)}</span>
          </div>
        </PostDetails>
      </TopHeading>
      <ImageContainer>
        <img src={image} alt={`Zdjęcie posta od użytkownika ${username}.`} />
      </ImageContainer>
      <ActionsContainer>
        {isLiked ?
          <FillHeartIcon
            onClick={handleLikePost}
          /> :
          <OutlineHeartIcon
            onClick={handleLikePost}
          />
        }
        <CommentIcon />
      </ActionsContainer>
    </Wrapper>
  )
}
