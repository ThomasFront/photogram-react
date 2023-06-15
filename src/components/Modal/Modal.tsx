import { useRef } from "react"
import { Button } from "../Button"
import { ButtonVariants } from "../Button/types"
import { ContentContainer, HeadingContainer, MainInformationContainer, Wrapper } from "./Modal.styles"
import { ModalProps } from "./types"
import { IoClose } from 'react-icons/io5'
import useOnClickOutside from "../../hooks/useOnClickOutside"
import useLockBodyScroll from "../../hooks/useLockBodyScroll"

export const Modal = ({ children, heading, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, onClose)
  useLockBodyScroll(true, 'root')

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ContentContainer
        ref={modalRef}
        initial={{ zoom: 0 }}
        animate={{ zoom: 1 }}
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
