import { useParams } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { useEffect, useMemo, useState } from "react"
import { getSpecificUserDetails, specificUserSelector } from "../../store/slices/usersSlice/usersSlice"
import { useSelector } from "react-redux"
import { loadingsSelector } from "../../store/slices/usersSlice/usersSlice"
import { errorsSelector } from "../../store/slices/usersSlice/usersSlice"
import { errorsSelector as userErrorsSelector } from "../../store/slices/userSlice/userSlice"
import { loadingsSelector as userLoadingsSelector } from "../../store/slices/userSlice/userSlice"
import { LoadingVariants } from "../../types/common"
import { DetailsBottom, DetailsBox, DetailsTop, NoPostsInformation, PostsContainer, UserDetailsContainer, Wrapper } from "./ProfilePage.styles"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { Button } from "../../components/Button"
import { followUser, userSelector } from "../../store/slices/userSlice/userSlice"
import { ButtonVariants } from "../../components/Button/types"
import { ErrorMessage } from "../../styles/common"
import { UserPost } from "./UserPost"
import { EditProfileModal } from "../../components/Modal/EditProfileModal"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { ProfileSkeleton } from "../../components/Loading/ProfileSkeleton"
import { postsSelector } from "../../store/slices/postsSlice/postsSlice"
import { UserListModal } from "../../components/Modal/UserListModal"

export const ProfilePage = () => {
  const params = useParams()
  const { userId } = params
  const specificUser = useSelector(specificUserSelector)
  const user = useSelector(userSelector)
  const { getSpecificUserDetails: getUserLoading } = useSelector(loadingsSelector)
  const { getSpecificUserDetails: getUserError } = useSelector(errorsSelector)
  const { followUser: followUserLoading } = useSelector(userLoadingsSelector)
  const { followUser: followUserError } = useSelector(userErrorsSelector)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const isGetUserLoading = getUserLoading === LoadingVariants.pending
  const isFollowUserLoading = followUserLoading === LoadingVariants.pending
  const dispatch = useAppDispatch()
  const postsAmount = specificUser?.userPosts.length
  const posts = useSelector(postsSelector)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowedBy, setShowFollowedBy] = useState(false)

  const isFollowed = useMemo(() => {
    if (user?.uid) {
      return specificUser?.userDetails.followedBy.includes(user?.uid)
    }
  }, [specificUser])

  const registeredDate = useMemo(() => {
    if (specificUser?.userDetails.registeredTimestamp) {
      return format(specificUser?.userDetails.registeredTimestamp, 'd MMMM yyyy', { locale: pl })
    }
  }, [specificUser?.userDetails.registeredTimestamp])

  useEffect(() => {
    if (userId) {
      dispatch(getSpecificUserDetails(userId))
    }
  }, [userId, user?.avatar, user?.nick, posts])

  const handleFollowUser = () => {
    if (user?.uid && userId) {
      dispatch(followUser({
        userUid: user?.uid,
        followerUid: userId
      }))
    }
  }

  if (getUserError) return <ErrorMessage>Błąd pobierania danych użytkownika.</ErrorMessage>
  if (isGetUserLoading) return <ProfileSkeleton />

  return (
    <Wrapper>
      {showEditProfileModal && (
        <EditProfileModal
          onClose={() => setShowEditProfileModal(false)}
        />
      )}
      {showFollowers && (
        <UserListModal
          onClose={() => setShowFollowers(false)}
          userList={specificUser?.userDetails.followers || []}
          heading={`Obserwowani przez ${specificUser?.userDetails.nick}`}
        />
      )}
      {showFollowedBy && (
        <UserListModal
          onClose={() => setShowFollowedBy(false)}
          userList={specificUser?.userDetails.followedBy || []}
          heading={`Obserwujący ${specificUser?.userDetails.nick}`}
        />
      )}
      <UserDetailsContainer>
        {specificUser?.userDetails.avatar ?
          <img src={specificUser?.userDetails.avatar} alt="Ikona użytkownika" />
          : <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika" />
        }
        <DetailsBox>
          <DetailsTop>
            <h1>{specificUser?.userDetails.nick}</h1>
            {user?.uid === specificUser?.userDetails.uid ? (
              <Button
                variant={ButtonVariants.secondary}
                onClick={() => setShowEditProfileModal(true)}
              >
                Edytuj profil
              </Button>
            ) :
              <Button
                variant={isFollowed ? ButtonVariants.secondary : ButtonVariants.primary}
                onClick={handleFollowUser}
                isLoading={isFollowUserLoading}
                loadingText="Przetwarzanie"
              >
                {isFollowed ? "Obserwowanie" : "Obserwuj"}
              </Button>
            }
          </DetailsTop>
          {followUserError && <ErrorMessage>Błąd obserwacji użytkownika.</ErrorMessage>}
          <DetailsBottom>
            <p>Posty: <span>{postsAmount}</span></p>
            <p onClick={() => setShowFollowers(true)}>Obserwowani: <span>{specificUser?.userDetails.followers.length}</span></p>
            <p onClick={() => setShowFollowedBy(true)}>Obserwujących: <span>{specificUser?.userDetails.followedBy.length}</span></p>
            <p>Zarejestrowany: <span>{registeredDate}</span></p>
          </DetailsBottom>
        </DetailsBox>
      </UserDetailsContainer>
      {specificUser?.userPosts.length ?
        <PostsContainer>
          {specificUser.userPosts.map(post => <UserPost key={post.postId} post={post} />)}
        </PostsContainer> :
        <NoPostsInformation>Brak postów</NoPostsInformation>
      }
    </Wrapper>
  )
}
