import { ActionsContainer, CommentIcon, CommentsBox, CommentsContainer, DescriptionContainer, FillHeartIcon, ImageContainer, LikesAmount, OutlineHeartIcon, PostDetails, TopHeading } from "./Post.styles"
import { PostProps } from "./types"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { handleDateFormat } from "../../utils"
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addCommentToPost, getUserAvatar, likePost } from "../../store/slices/postsSlice/postsSlice";
import { Input } from "../Input";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../styles/common";
import { Comment } from "./Comment";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/slices/userSlice/userSlice";
import { ButtonVariants } from "../Button/types";
import { CommentsModal } from "../Modal/CommentsModal";
import { unwrapResult } from "@reduxjs/toolkit";
import { UserListModal } from "../Modal/UserListModal";
import { motion } from "framer-motion";

export const Post = ({ post }: PostProps) => {
  const { postId, username, image, description, timestamp, comments, likes, userId } = post
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [userAvatar, setUserAvatar] = useState("")
  const [showLikes, setShowLikes] = useState(false)

  const isLiked = useMemo(() => {
    if (likes) {
      return likes.includes(user?.uid as string)
    }
  }, [likes])

  const schema = yup.object().shape({
    comment: yup.string().required('Komentarz jest pusty.').min(3, 'Wpisz min. 3 znaki.').max(60, 'Komentarz może zawierać max. 60 znaków.'),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ comment }) => {
    setLoading(true)
    if (user?.nick && user?.uid) {
      await dispatch(addCommentToPost({
        comment,
        username: user.nick,
        userId: user.uid,
        postId,
        userAvatar: user.avatar ? user.avatar : ''
      }))
      reset()
      setLoading(false)
    }
  };

  const handleLikePost = async () => {
    if (user?.uid) {
      await dispatch(likePost({
        postId,
        userId: user.uid
      }))
    }
  }

  const handleUserAvatar = async () => {
    const payload = unwrapResult(await dispatch(getUserAvatar(userId)))
    setUserAvatar(payload)
  }

  useEffect(() => {
    handleUserAvatar()
  }, [])

  return (
    <>
      {showCommentsModal && (
        <CommentsModal
          onClose={() => setShowCommentsModal(false)}
          image={image}
          username={username}
          comments={comments}
          likes={likes}
          postId={postId}
          description={description}
          userId={userId}
        />
      )}
      {showLikes && (
        <UserListModal
          onClose={() => setShowLikes(false)}
          userList={likes}
          heading="Wszystkie polubienia"
        />
      )}
      <motion.article
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <TopHeading>
          <PostDetails>
            <Link to={`/profile/${userId}`}>
              <img
                src={userAvatar ? userAvatar : userDefaultAvatar}
                alt="Domyślna ikona użytkownika."
                loading="lazy"
              />
            </Link>
            <div>
              <Link to={`/profile/${userId}`}>{username}</Link>
              <span>{handleDateFormat(timestamp)}</span>
            </div>
          </PostDetails>
        </TopHeading>
        <ImageContainer>
          <img
            src={image}
            alt={`Zdjęcie posta od użytkownika ${username}.`}
            onClick={() => setShowCommentsModal(true)}
            loading="lazy"
          />
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
          <CommentIcon
            onClick={() => setShowCommentsModal(true)}
          />
        </ActionsContainer>
        <LikesAmount
          onClick={() => setShowLikes(true)}
        >
          Liczba polubień: <span>{likes?.length}</span>
        </LikesAmount>
        <DescriptionContainer>
          <Link to={`/profile/${userId}`}>{username} </Link>
          {description}
        </DescriptionContainer>
        <CommentsContainer>
          {!!comments.length && (
            <CommentsBox>
              {comments.length >= 5 ?
                <>
                  {comments.slice(comments.length - 5, comments.length).map(comment => <Comment key={comment.commentId} commentData={comment} />)}
                  <Button
                    variant={ButtonVariants.text}
                    onClick={() => setShowCommentsModal(true)}
                  >
                    Zobacz wszystkie komentarze ({comments.length})
                  </Button>
                </> :
                <>
                  {comments.map(comment => <Comment key={comment.commentId} commentData={comment} />)}
                </>
              }
            </CommentsBox>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Dodaj komentarz"
              register={register}
              name="comment"
              isError={!!errors.comment?.message}
            />
            <Button
              isLoading={loading}
              loadingText="Dodaj"
            >
              Dodaj
            </Button>
          </form>
          {errors.comment?.message && <ErrorMessage>{errors.comment.message as string}</ErrorMessage>}
        </CommentsContainer>
      </motion.article>
    </>
  )
}
