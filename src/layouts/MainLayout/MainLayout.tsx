import React from "react"
import { Container } from "./MainLayout.styles"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
