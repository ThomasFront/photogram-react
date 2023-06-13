import { Route, Routes } from "react-router"
import { HomePage } from "./pages/HomePage"
import { MainLayout } from "./layouts/MainLayout"
import { ProfilePage } from "./pages/ProfilePage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
