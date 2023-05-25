import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getUserFromDatabase, userSelector } from "../../store/slices/userSlice/userSlice";
import { useSelector } from "react-redux";

export const GlobalLayout = () => {
  const [user] = useAuthState(auth)
  const userData = useSelector(userSelector)
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

  return <></>
}
