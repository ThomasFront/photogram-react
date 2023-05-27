import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getUserFromDatabase } from "../../store/slices/userSlice/userSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/slices/userSlice/userSlice";
import { loadingsSelector } from "../../store/slices/userSlice/userSlice";
import { FullScreenLoading } from "../../components/Loading/FullScreenLoading";
import { LoadingVariants } from "../../types/common";

export const GlobalLayout = () => {
  const [user] = useAuthState(auth)
  const userData = useSelector(userSelector)
  const { getUser: getUserLoading } = useSelector(loadingsSelector)
  const isUserLoading = getUserLoading === LoadingVariants.pending
  const userUid = user?.uid
  const dispatch = useAppDispatch()

  const handleGetUser = async () => {
    if (userUid) {
      dispatch(getUserFromDatabase(userUid))
    }
  }

  useEffect(() => {
    if (user && !userData) {
      handleGetUser()
    }
  }, [user])

  return isUserLoading && <FullScreenLoading />
}
