import { Button } from "../../Button"
import { Modal } from "../../Modal"
import { Textarea } from "../../Textarea"
import { FileContainer, FormContainer, TextareaContainer } from "./ModalAddPost.styles"
import { ModalAddPostProps } from "./types"

export const ModalAddPost = ({ onClose }: ModalAddPostProps) => {

  return (
    <Modal
      heading="Dodaj nowy post"
      onClose={onClose}
    >
      <FormContainer>
        <FileContainer>
          <p>Dodaj zdjęcie</p>
          <label htmlFor="file-upload">
            <span>Wybierz zdjęcie</span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
            />
          </label>
        </FileContainer>
        <TextareaContainer>
          <p>Dodaj opis</p>
          <Textarea
            placeholder="Opis..."
          />
        </TextareaContainer>
        <Button>
          Dodaj post
        </Button>
      </FormContainer>
    </Modal>
  )
}
