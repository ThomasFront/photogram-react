import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/hooks"
import { logOutUser, userSelector } from "../../store/slices/userSlice/userSlice"
import { Button } from "../Button"
import { LogoContainer, MenuContainer, NavItemsWrapper, StyledNav } from "./Navbar.styles"
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { useMemo, useState } from "react"
import { AddPostModal } from "../Modal/AddPostModal"

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const [showAddPostModal, setShowAddPostModal] = useState(false)

  const userAvatar = useMemo(() => {
    return user?.avatar
  }, [user?.avatar])

  const handleLogOut = () => {
    dispatch(logOutUser())
    navigate('/')
  }

  return user ? (
    <>
      {showAddPostModal && (
        <AddPostModal
          onClose={() => setShowAddPostModal(false)}
        />
      )}
      <StyledNav>
        <NavItemsWrapper>
          <LogoContainer>
            <Link to="/">
              <p>Photogram</p>
            </Link>
          </LogoContainer>
          <MenuContainer>
            <BsFillPlusCircleFill
              onClick={() => setShowAddPostModal(true)}
            />
            <Link to={`/profile/${user.uid}`} >
              {userAvatar ?
                <img src={userAvatar} alt="Ikona użytkownika" />
                : <img src={userDefaultAvatar} alt="Domyślna ikona użytkownika" />
              }
            </Link>
            <Button
              onClick={handleLogOut}
            >
              Wyloguj
            </Button>
          </MenuContainer>
        </NavItemsWrapper>
      </StyledNav>
    </>
  ) : <></>
}

