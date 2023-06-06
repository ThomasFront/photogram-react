import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { getPosts, loadingsSelector, postsSelector } from "../../store/slices/postsSlice/postsSlice"
import { useSelector } from "react-redux"
import { LoaderContainer, NewUsersContainer, PostsContainer, UserInfo, UsersBox, Wrapper } from "./Feed.styles"
import { Post } from "../Post"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { userSelector } from "../../store/slices/userSlice/userSlice"
import { getNewUsers, newUsersSelector } from "../../store/slices/usersSlice/usersSlice"
import { Link } from "react-router-dom"
import { LoadingVariants } from "../../types/common"
import { LoaderSpinner } from "../Loading/LoaderSpinner"

export const Feed = () => {
  const dispatch = useAppDispatch()
  const posts = useSelector(postsSelector)
  const user = useSelector(userSelector)
  const newUsers = useSelector(newUsersSelector)
  const { getPosts: getPostsLoading } = useSelector(loadingsSelector)
  const isLoading = getPostsLoading === LoadingVariants.pending

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getNewUsers())
  }, [user?.avatar, user?.nick])

  return (
    <Wrapper>
      <PostsContainer>
        {isLoading ?
          <LoaderContainer>
            <LoaderSpinner />
          </LoaderContainer> :
          posts.length ?
            posts.map(post => <Post key={post.postId} post={post} />) :
            <p>Brak postów</p>
        }
      </PostsContainer>
      <NewUsersContainer>
        <UserInfo to={`/profile/${user?.uid}`}>
          {user?.avatar ?
            <img src={user.avatar} alt="Ikona użytkownika" /> :
            <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika" />
          }
          <p>{user?.nick}</p>
        </UserInfo>
        <span>Nowi użytkownicy</span>
        <UsersBox>
          {newUsers.map(({ uid, nick, avatar }) => (
            user?.uid !== uid && (
              <Link key={uid} to={`/profile/${uid}`}>
                {avatar ?
                  <img src={avatar} alt="Ikona użytkownika" /> :
                  <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika" />
                }
                <p>{nick}</p>
              </Link>
            )
          ))}
        </UsersBox>
      </NewUsersContainer>
    </Wrapper>
  )
}
