import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/hooks"
import { setThemeMode, logOutUser, themeModeSelector, userSelector } from "../../store/slices/userSlice/userSlice"
import { Button } from "../Button"
import { LogoContainer, MenuContainer, NavItemsWrapper, StyledNav } from "./Navbar.styles"
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom"
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.png'
import { useMemo, useState } from "react"
import { AddPostModal } from "../Modal/AddPostModal"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import { ThemeModeVariants } from "../../types/common"
import { useLocalStorage } from "../../hooks/useLocalStorage"

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const themeMode = useSelector(themeModeSelector)
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', false)

  const toggleTheme = () => {
    dispatch(setThemeMode(themeMode === ThemeModeVariants.dark ? ThemeModeVariants.light : ThemeModeVariants.dark))
    setDarkTheme(themeMode === ThemeModeVariants.dark ? false : true)
  };

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
            <DarkModeSwitch
              checked={themeMode === ThemeModeVariants.dark}
              onChange={toggleTheme}
              size={28}
            />
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

