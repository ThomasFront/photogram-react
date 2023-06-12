import Skeleton from "react-loading-skeleton"
import { SkeletonPostsWrapper, Wrapper } from "./ProfileSkeleton.styles"
import 'react-loading-skeleton/dist/skeleton.css'

export const ProfileSkeleton = () => {
  const skeletonPosts = [1, 2, 3, 4];

  return (
    <Wrapper>
      <Skeleton height={180} />
      <SkeletonPostsWrapper>
        {skeletonPosts.map((post, index) => <Skeleton key={index} height={300} />)}
      </SkeletonPostsWrapper>
    </Wrapper>
  )
}
