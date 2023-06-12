import { Wrapper } from "./PostSkeleton.styles"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const PostSkeleton = () => {
  return (
    <Wrapper>
      <Skeleton height={50} />
      <Skeleton height={500} />
      <Skeleton count={3} height={40} />
    </Wrapper>
  )
}
