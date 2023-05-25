import { useAppDispatch } from "../../store/hooks"
import { logOutUser } from "../../store/slices/userSlice/userSlice"
import { Button } from "../Button"

export const Feed = () => {
  const dispatch = useAppDispatch()
  return (
    <div>
      Feed
      <Button
        onClick={() => dispatch(logOutUser())}
      >
        Wyloguj
      </Button>
    </div>
  )
}
