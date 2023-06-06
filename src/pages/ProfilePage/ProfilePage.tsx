import { useParams } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { useEffect, useMemo, useState } from "react"
import { getSpecificUserDetails, specificUserSelector } from "../../store/slices/usersSlice/usersSlice"
import { useSelector } from "react-redux"
import { loadingsSelector } from "../../store/slices/usersSlice/usersSlice"
import { errorsSelector } from "../../store/slices/usersSlice/usersSlice"
import { LoadingVariants } from "../../types/common"
import { DetailsBottom, DetailsBox, DetailsTop, NoPostsInformation, PostsContainer, UserDetailsContainer, Wrapper } from "./ProfilePage.styles"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { Button } from "../../components/Button"
import { userSelector } from "../../store/slices/userSlice/userSlice"
import { ButtonVariants } from "../../components/Button/types"
import { LoaderSpinner } from "../../components/Loading/LoaderSpinner"
import { ErrorMessage, LoaderWrapper } from "../../styles/common"
import { UserPost } from "./UserPost"
import { EditProfileModal } from "../../components/Modal/EditProfileModal"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

export const ProfilePage = () => {
  const params = useParams()
  const { userId } = params
  const specificUser = useSelector(specificUserSelector)
  const user = useSelector(userSelector)
  const { getSpecificUserDetails: getUserLoading } = useSelector(loadingsSelector)
  const { getSpecificUserDetails: isError } = useSelector(errorsSelector)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const isLoading = getUserLoading === LoadingVariants.pending
  const dispatch = useAppDispatch()
  const postsAmount = specificUser?.userPosts.length

  const registeredDate = useMemo(() => {
    if (specificUser?.userDetails.registeredTimestamp) {
      return format(specificUser?.userDetails.registeredTimestamp, 'd MMMM yyyy', { locale: pl })
    }
  }, [specificUser?.userDetails.registeredTimestamp])

  useEffect(() => {
    if (userId) {
      dispatch(getSpecificUserDetails(userId))
    }
  }, [userId, user?.avatar, user?.nick])

  if (isError) return <ErrorMessage>Błąd pobierania danych użytkownika.</ErrorMessage>
  if (isLoading) return <LoaderWrapper><LoaderSpinner /></LoaderWrapper>

  return (
    <Wrapper>
      {showEditProfileModal && (
        <EditProfileModal
          onClose={() => setShowEditProfileModal(false)}
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
            {user?.uid === specificUser?.userDetails.uid && (
              <Button
                variant={ButtonVariants.secondary}
                onClick={() => setShowEditProfileModal(true)}
              >
                Edytuj profil
              </Button>
            )}
          </DetailsTop>
          <DetailsBottom>
            <p>Posty: <span>{postsAmount}</span></p>
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
