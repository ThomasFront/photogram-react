import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { SkeletonPostsWrapper, Wrapper } from "./ProfileSkeleton.styles"
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux"
import { themeModeSelector } from "../../../store/slices/userSlice/userSlice"
import { ThemeModeVariants } from "../../../types/common"

export const ProfileSkeleton = () => {
  const themeMode = useSelector(themeModeSelector)
  const isDarkMode = themeMode === ThemeModeVariants.dark
  const skeletonPosts = [1, 2, 3, 4];

  return (
    <Wrapper>
      <SkeletonTheme baseColor={isDarkMode ? "#202020" : "#ebebeb"} highlightColor={isDarkMode ? "#444" : "#f5f5f5"}>
        <Skeleton height={180} />
        <SkeletonPostsWrapper>
          {skeletonPosts.map((index) => <Skeleton key={index} height={300} />)}
        </SkeletonPostsWrapper>
      </SkeletonTheme>
    </Wrapper>
  )
}
