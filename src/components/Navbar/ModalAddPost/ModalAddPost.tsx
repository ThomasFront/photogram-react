import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../Button"
import { Modal } from "../../Modal"
import { Textarea } from "../../Textarea"
import { ErrorContainer, FileContainer, FormContainer, ImageName, TextareaContainer } from "./ModalAddPost.styles"
import { ModalAddPostProps } from "./types"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../../styles/common"
import { useState } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { addPost, errorsSelector, loadingsSelector } from "../../../store/slices/postsSlice/postsSlice"
import { useSelector } from "react-redux"
import { userSelector } from "../../../store/slices/userSlice/userSlice"
import { unwrapResult } from "@reduxjs/toolkit"
import { LoadingVariants } from "../../../types/common"

export const ModalAddPost = ({ onClose }: ModalAddPostProps) => {
  const dispatch = useAppDispatch()
  const user = useSelector(userSelector)
  const [fileName, setFileName] = useState("");
  const { addPost: addPostLoading } = useSelector(loadingsSelector)
  const { addPost: isError } = useSelector(errorsSelector)
  const isLoading = addPostLoading === LoadingVariants.pending

  const schema = yup.object().shape({
    description: yup.string().required('Opis jest wymagany.').min(3, 'Opis musi zawierać min 3 znaki.').max(200, 'Opis nie może posiadać więcej niż 200 znaków.'),
    image: yup.mixed().required("Zdjęcie jest wymagane.")
  })

  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ description, image }) => {
    if (user) {
      const results = unwrapResult(await dispatch(addPost({
        description,
        image,
        username: user?.nick,
        userId: user?.uid,
      })))
      if (results) {
        onClose()
      }
    }
  }

  const handleUploadImage = (event: any) => {
    setFileName(event.target.files[0].name);
    setValue('image', event.target.files[0])
    trigger('image')
  }

  return (
    <Modal
      heading="Dodaj nowy post"
      onClose={onClose}
    >
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
      >
        <FileContainer>
          <p>Dodaj zdjęcie</p>
          <label htmlFor="file-upload">
            <span>Wybierz zdjęcie</span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </label>
          {errors.image?.message && <ErrorMessage>{errors.image.message as string}</ErrorMessage>}
          {fileName && <ImageName>Wybrano: {fileName.slice(0, 30)}{fileName.length >= 30 && '...'}</ImageName>}
        </FileContainer>
        <TextareaContainer>
          <p>Dodaj opis</p>
          <Textarea
            placeholder="Opis..."
            register={register}
            name="description"
          />
          {errors.description?.message && <ErrorMessage>{errors.description.message as string}</ErrorMessage>}
        </TextareaContainer>
        <Button
          isLoading={!!isLoading}
          loadingText="Dodawanie..."
        >
          Dodaj post
        </Button>
        {isError && (
          <ErrorContainer>
            <ErrorMessage>Dodawanie posta nie powiodło się.</ErrorMessage>
          </ErrorContainer>
        )}
      </FormContainer>
    </Modal>
  )
}
