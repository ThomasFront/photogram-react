import { Feed } from "../../components/Feed"
import { Auth } from "../../components/Auth"
import { useSelector } from "react-redux"
import { userSelector } from "../../store/slices/userSlice/userSlice"

export const HomePage = () => {
  const user = useSelector(userSelector)

  return user ? <Feed /> : <Auth />
}
