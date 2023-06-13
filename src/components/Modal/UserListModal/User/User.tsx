import { useEffect, useState } from "react"
import { UserProps } from "./types"
import { unwrapResult } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../store/hooks"
import { Wrapper } from "./User.styles"
import { getUserAvatar, getUsername } from "../../../../store/slices/postsSlice/postsSlice"
import { Link } from "react-router-dom"
import userDefaultAvatar from '../../../../assets/images/userDefaultAvatar.png'
import { useSelector } from "react-redux"
import { loadingsSelector } from '../../../../store/slices/postsSlice/postsSlice'
import { errorsSelector } from '../../../../store/slices/postsSlice/postsSlice'
import { LoadingVariants, ThemeModeVariants } from "../../../../types/common"
import { ErrorMessage } from "../../../../styles/common"
import Skeleton from "react-loading-skeleton"
import { themeModeSelector } from "../../../../store/slices/userSlice/userSlice"

export const User = ({ userId, onClose }: UserProps) => {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const themeMode = useSelector(themeModeSelector)
  const isDarkMode = themeMode === ThemeModeVariants.dark
  const { getUsername: usernameLoading, getUserAvatar: userAvatarLoading } = useSelector(loadingsSelector)
  const { getUsername: usernameError, getUserAvatar: userAvatarError } = useSelector(errorsSelector)
  const isUsernameLoading = usernameLoading === LoadingVariants.pending
  const isUserAvatarLoading = userAvatarLoading === LoadingVariants.pending

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

  if (usernameError || userAvatarError) return <ErrorMessage>Błąd pobierania danych użytkownika.</ErrorMessage>
  if (isUsernameLoading || isUserAvatarLoading)
    return (
      <Skeleton
        height={60}
        baseColor={isDarkMode ? "#202020" : "#ebebeb"} highlightColor={isDarkMode ? "#444" : "#f5f5f5"}
      />
    )

  return (
    <Wrapper>
      <Link
        onClick={onClose}
        to={`/profile/${userId}`}>
        {userAvatar ?
          <img src={userAvatar} alt="Ikona użytkownika." /> :
          <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika." />
        }
      </Link>
      <Link
        onClick={onClose}
        to={`/profile/${userId}`}>
        {username}
      </Link>
    </Wrapper>
  )
}
