import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { getPosts, loadingsSelector, postsSelector } from "../../store/slices/postsSlice/postsSlice"
import { loadingsSelector as usersLoadingsSelector } from "../../store/slices/usersSlice/usersSlice"
import { useSelector } from "react-redux"
import { NewUsersContainer, PostsContainer, UserInfo, UsersBox, Wrapper } from "./Feed.styles"
import { Post } from "../Post"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { themeModeSelector, userSelector } from "../../store/slices/userSlice/userSlice"
import { getNewUsers, newUsersSelector } from "../../store/slices/usersSlice/usersSlice"
import { Link } from "react-router-dom"
import { LoadingVariants, ThemeModeVariants } from "../../types/common"
import 'react-loading-skeleton/dist/skeleton.css'
import { PostSkeleton } from "../Loading/PostSkeleton"
import Skeleton from "react-loading-skeleton"
import { motion } from "framer-motion"

export const Feed = () => {
  const themeMode = useSelector(themeModeSelector)
  const isDarkMode = themeMode === ThemeModeVariants.dark
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
          <img
            src={user?.avatar ? user.avatar : userDefaultAvatar}
            alt="Ikona użytkownika"
            loading="lazy"
          />
          <p>{user?.nick}</p>
        </UserInfo>
        <span>Nowi użytkownicy</span>
        <UsersBox>
          {newUsersLoading ?
            <Skeleton count={5} height={30} baseColor={isDarkMode ? "#202020" : "#ebebeb"} highlightColor={isDarkMode ? "#444" : "#f5f5f5"} /> :
            newUsers.map(({ uid, nick, avatar }, index) => (
              user?.uid !== uid && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={uid}
                >
                  <Link key={uid} to={`/profile/${uid}`}>
                    <img
                      src={avatar ? avatar : userDefaultAvatar}
                      alt="Ikona użytkownika"
                      loading="lazy"
                    />
                    <p>{nick}</p>
                  </Link>
                </motion.div>
              )
            ))
          }
        </UsersBox>
      </NewUsersContainer>
    </Wrapper>
  )
}
