import { Route, Routes } from "react-router"
import { HomePage } from "./pages/HomePage"
import { MainLayout } from "./layouts/MainLayout"
import { ProfilePage } from "./pages/ProfilePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { useSelector } from "react-redux"
import { themeModeSelector } from "./store/slices/userSlice/userSlice"
import { ThemeModeVariants } from "./types/common"
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/theme.ts'
import { GlobalStyles } from "./styles/GlobalStyles.ts"

function App() {
  const themeMode = useSelector(themeModeSelector)
  const isDarkTheme = themeMode === ThemeModeVariants.dark;

  return (

    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
