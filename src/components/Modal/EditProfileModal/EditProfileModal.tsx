import { Modal } from "../Modal"
import { ButtonContainer, FileContainer, FormWrapper, ImageName } from "./EditProfileModal.styles"
import { EditProfileModalProps } from "./types"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { changeUserAvatar, errorsSelector, loadingsSelector, userSelector } from "../../../store/slices/userSlice/userSlice"
import { useAppDispatch } from "../../../store/hooks"
import { useState } from "react"
import { Button } from "../../Button"
import { ErrorMessage } from "../../../styles/common"
import { unwrapResult } from "@reduxjs/toolkit"
import { LoadingVariants } from "../../../types/common"

export const EditProfileModal = ({ onClose }: EditProfileModalProps) => {
  const user = useSelector(userSelector)
  const { changeUserAvatar: changeAvatarLoading } = useSelector(loadingsSelector)
  const { changeUserAvatar: changeAvatarError } = useSelector(errorsSelector)
  const isLoading = changeAvatarLoading === LoadingVariants.pending
  const dispatch = useAppDispatch()
  const [fileName, setFileName] = useState("");

  const schema = yup.object().shape({
    image: yup.mixed().required("Zdjęcie profilowe jest wymagane.")
  })

  const { handleSubmit, setValue, trigger, formState: { errors } } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ image }) => {
    if (user) {
      const results = unwrapResult(await dispatch(changeUserAvatar({
        userId: user.uid,
        image
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
      heading="Edytuj profil"
      onClose={onClose}
    >
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FileContainer>
          <p>Zmień zdjęcie profilowe</p>
          <label htmlFor="file-upload">
            <span>Wybierz zdjęcie</span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </label>
          {fileName && <ImageName>Wybrano: {fileName.slice(0, 30)}{fileName.length >= 30 && '...'}</ImageName>}
          {errors.image?.message && <ErrorMessage>{errors.image.message as string}</ErrorMessage>}
        </FileContainer>
        <ButtonContainer>
          <Button
            isLoading={isLoading}
            loadingText="Zmiana..."
          >
            Zmień
          </Button>
        </ButtonContainer>
      </FormWrapper>
      {changeAvatarError && <ErrorMessage>Zmiana zdjęcia nie powiodła się.</ErrorMessage>}
    </Modal>
  )
}
