import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { getPosts, loadingsSelector, postsSelector } from "../../store/slices/postsSlice/postsSlice"
import { loadingsSelector as usersLoadingsSelector } from "../../store/slices/usersSlice/usersSlice"
import { useSelector } from "react-redux"
import { NewUsersContainer, PostsContainer, UserInfo, UsersBox, Wrapper } from "./Feed.styles"
import { Post } from "../Post"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { userSelector } from "../../store/slices/userSlice/userSlice"
import { getNewUsers, newUsersSelector } from "../../store/slices/usersSlice/usersSlice"
import { Link } from "react-router-dom"
import { LoadingVariants } from "../../types/common"
import 'react-loading-skeleton/dist/skeleton.css'
import { PostSkeleton } from "../Loading/PostSkeleton"
import Skeleton from "react-loading-skeleton"

export const Feed = () => {
  const dispatch = useAppDispatch()
  const posts = useSelector(postsSelector)
  const user = useSelector(userSelector)
  const newUsers = useSelector(newUsersSelector)
  const { getPosts: getPostsLoading } = useSelector(loadingsSelector)
  const { getNewUsers: getNewUsersLoading } = useSelector(usersLoadingsSelector)
  const postsLoading = getPostsLoading === LoadingVariants.pending
  const newUsersLoading = getNewUsersLoading === LoadingVariants.pending

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getNewUsers())
  }, [user?.avatar, user?.nick])

  return (
    <Wrapper>
      <PostsContainer>
        {postsLoading ?
          <>
            <PostSkeleton />
            <PostSkeleton />
          </> :
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
          {newUsersLoading ?
            <Skeleton count={5} height={30} /> :
            newUsers.map(({ uid, nick, avatar }) => (
              user?.uid !== uid && (
                <Link key={uid} to={`/profile/${uid}`}>
                  {avatar ?
                    <img src={avatar} alt="Ikona użytkownika" /> :
                    <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika" />
                  }
                  <p>{nick}</p>
                </Link>
              )
            ))
          }
        </UsersBox>
      </NewUsersContainer>
    </Wrapper>
  )
}
