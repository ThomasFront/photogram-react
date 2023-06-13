import { Wrapper } from "./PostSkeleton.styles"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux"
import { themeModeSelector } from "../../../store/slices/userSlice/userSlice"
import { ThemeModeVariants } from "../../../types/common"

export const PostSkeleton = () => {
  const themeMode = useSelector(themeModeSelector)
  const isDarkMode = themeMode === ThemeModeVariants.dark

  return (
    <Wrapper>
      <SkeletonTheme baseColor={isDarkMode ? "#202020" : "#ebebeb"} highlightColor={isDarkMode ? "#444" : "#f5f5f5"}>
        <Skeleton height={50} />
        <Skeleton height={500} />
        <Skeleton count={3} height={40} />
      </SkeletonTheme>
    </Wrapper>
  )
}
