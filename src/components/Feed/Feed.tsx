import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { getPosts, postsSelector } from "../../store/slices/postsSlice/postsSlice"
import { useSelector } from "react-redux"
import { NewUsersContainer, PostsContainer, UserInfo, UsersBox, Wrapper } from "./Feed.styles"
import { Post } from "../Post"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { userSelector } from "../../store/slices/userSlice/userSlice"
import { getNewUsers, newUsersSelector } from "../../store/slices/usersSlice/usersSlice"
import { Link } from "react-router-dom"

export const Feed = () => {
  const dispatch = useAppDispatch()
  const posts = useSelector(postsSelector)
  const user = useSelector(userSelector)
  const newUsers = useSelector(newUsersSelector)

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getNewUsers())
  }, [])

  return (
    <Wrapper>
      <PostsContainer>
        {posts.length ?
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
