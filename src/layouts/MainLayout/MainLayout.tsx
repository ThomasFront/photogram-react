import React from "react"
import { Container } from "./MainLayout.styles"
import { Navbar } from "../../components/Navbar"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Container>
        {children}
      </Container>
    </>
  )
}
