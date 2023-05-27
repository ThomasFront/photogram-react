import { useRef } from "react"
import { Button } from "../Button"
import { ButtonVariants } from "../Button/types"
import { ContentContainer, HeadingContainer, MainInformationContainer, Wrapper } from "./Modal.styles"
import { ModalProps } from "./types"
import { IoClose } from 'react-icons/io5'
import useOnClickOutside from "../../hooks/useOnClickOutside"

export const Modal = ({ children, heading, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, onClose)

  return (
    <Wrapper>
      <ContentContainer
        ref={modalRef}
      >
        <HeadingContainer>
          <p>{heading}</p>
          <Button
            variant={ButtonVariants.text}
            onClick={onClose}
          >
            <IoClose />
          </Button>
        </HeadingContainer>
        <MainInformationContainer>
          {children}
        </MainInformationContainer>
      </ContentContainer>
    </Wrapper>
  )
}
