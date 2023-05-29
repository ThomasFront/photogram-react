import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { getPosts, postsSelector } from "../../store/slices/postsSlice/postsSlice"
import { useSelector } from "react-redux"
import { NewUsersContainer, PostsContainer, Wrapper } from "./Feed.styles"
import { Post } from "../Post"

export const Feed = () => {
  const dispatch = useAppDispatch()
  const posts = useSelector(postsSelector)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <Wrapper>
      <PostsContainer>
        {posts.map(post => <Post key={post.postId} post={post} />)}
      </PostsContainer>
      <NewUsersContainer>
        NEW USERS
      </NewUsersContainer>
    </Wrapper>
  )
}
