import { Link } from "react-router-dom"
import { Wrapper } from "./Comment.styles"
import { CommentProps } from "./types"
import userDefaultAvatar from '../../../assets/images/userDefaultAvatar.png'
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { unwrapResult } from "@reduxjs/toolkit"
import { getUserAvatar, getUsername } from "../../../store/slices/postsSlice/postsSlice"

export const Comment = ({ commentData }: CommentProps) => {
  const { comment, userId } = commentData
  const [username, setUsername] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const dispatch = useAppDispatch()

  const handleUsername = async () => {
    const payload = unwrapResult(await dispatch(getUsername(userId)))
    setUsername(payload)
  }

  const handleUserAvatar = async () => {
    const payload = unwrapResult(await dispatch(getUserAvatar(userId)))
    setUserAvatar(payload)
  }

  useEffect(() => {
    handleUsername()
    handleUserAvatar()
  }, [])

  return (
    <Wrapper>
      <div>
        <Link to={`/profile/${userId}`}>
          {userAvatar ?
            <img src={userAvatar} alt="Ikona użytkownika." /> :
            <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika." />
          }
        </Link>
        <Link to={`/profile/${userId}`}>{username}</Link>
      </div>
      <p>{comment}</p>
    </Wrapper>
  )
}
