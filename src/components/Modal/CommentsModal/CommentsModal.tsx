import { useMemo, useState } from "react"
import { Modal } from ".."
import { Comment } from "../../Post/Comment"
import { CommentsContainer, DescriptionContainer, FillHeartIcon, LikesContainer, OutlineHeartIcon, Wrapper } from "./CommentsModal.styles"
import { PostModalProps } from "./types"
import { useSelector } from "react-redux"
import { userSelector } from "../../../store/slices/userSlice/userSlice"
import { useAppDispatch } from "../../../store/hooks"
import { addCommentToPost, likePost } from "../../../store/slices/postsSlice/postsSlice"
import { Input } from "../../Input"
import { Button } from "../../Button"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../../styles/common"
import { Link } from "react-router-dom"

export const CommentsModal = ({ onClose, username, image, comments, likes, postId, description, userId, preview = false }: PostModalProps) => {
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const isLiked = useMemo(() => {
    if (likes) {
      return likes.includes(user?.uid as string)
    }
  }, [likes])

  const handleLikePost = async () => {
    if (user?.uid) {
      await dispatch(likePost({
        postId,
        userId: user.uid
      }))
    }
  }

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

  return (
    <Modal
      onClose={onClose}
      heading={`Post użytkownika ${username}`}
    >
      <Wrapper>
        <img
          src={image}
          alt={`Zdjęcie użytkownia ${username}`}
          loading="lazy"
        />
        <LikesContainer>
          {!preview ?
            isLiked ?
              <FillHeartIcon
                onClick={handleLikePost}
              /> :
              <OutlineHeartIcon
                onClick={handleLikePost}
              />
            :
            <></>
          }
          <p>Liczba polubień: <span>{likes?.length}</span></p>
        </LikesContainer>
        <DescriptionContainer>
          <Link to={`/profile/${userId}`}>{username} </Link>
          {description}
        </DescriptionContainer>
        {!!comments.length && (
          <CommentsContainer>
            <span>Wszystkie komentarze ({comments.length})</span>
            {comments.map(comment => <Comment key={comment.commentId} commentData={comment} />)}
          </CommentsContainer>
        )}
        {!preview &&
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
        }
        {errors.comment?.message && <ErrorMessage>{errors.comment.message as string}</ErrorMessage>}
      </Wrapper>
    </Modal>
  )
}
