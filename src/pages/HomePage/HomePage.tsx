import { useState } from "react"
import { Feed } from "../../components/Feed"
import { Auth } from "../../components/Auth"

export const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return isAuthenticated ? <Feed /> : <Auth />
}
