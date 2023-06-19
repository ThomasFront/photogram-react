import { Modal } from "../Modal"
import { ButtonContainer, FileContainer, ImageName, UsernameContainer } from "./EditProfileModal.styles"
import { EditProfileModalProps } from "./types"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { changeUserAvatar, changeUsername, errorsSelector, loadingsSelector, userSelector } from "../../../store/slices/userSlice/userSlice"
import { useAppDispatch } from "../../../store/hooks"
import { useState } from "react"
import { Button } from "../../Button"
import { ErrorMessage } from "../../../styles/common"
import { unwrapResult } from "@reduxjs/toolkit"
import { LoadingVariants } from "../../../types/common"
import { Input } from "../../Input"

export const EditProfileModal = ({ onClose }: EditProfileModalProps) => {
  const user = useSelector(userSelector)
  const { changeUserAvatar: changeAvatarLoading, changeUsername: changeUsernameLoading } = useSelector(loadingsSelector)
  const { changeUserAvatar: changeAvatarError, changeUsername: changeUsernameError } = useSelector(errorsSelector)
  const isChangeAvatarLoading = changeAvatarLoading === LoadingVariants.pending
  const isChangeUsernameLoading = changeUsernameLoading === LoadingVariants.pending
  const dispatch = useAppDispatch()
  const [fileName, setFileName] = useState("");

  const schema = yup.object().shape({
    image: yup.mixed(),
    username: yup.string().min(3, 'Wpisz min. 3 znaki.').max(12, 'Nazwa użytkownika może zawierać max. 12 znaków.'),
  })

  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      username: user?.nick
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ image, username }) => {
    if (user) {
      if (image) {
        const results = unwrapResult(await dispatch(changeUserAvatar({
          userId: user.uid,
          image
        })))
        if (results) {
          onClose()
        }
      }
      if (username) {
        const payload = unwrapResult(await dispatch(changeUsername({
          userUid: user.uid,
          newUsername: username
        })))
        if (payload) {
          onClose()
        }
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <UsernameContainer>
          <p>Zmień nazwę użytkownika</p>
          <Input
            register={register}
            name="username"
            placeholder="Nowa nazwa użytkownika"
          />
        </UsernameContainer>

        {errors.username?.message && <ErrorMessage>{errors.username.message as string}</ErrorMessage>}
        <ButtonContainer>
          <Button
            isLoading={isChangeAvatarLoading || isChangeUsernameLoading}
            loadingText="Aktualizacja..."
          >
            Zaktualizuj
          </Button>
        </ButtonContainer>
      </form>
      {changeAvatarError && <ErrorMessage>Zmiana zdjęcia nie powiodła się.</ErrorMessage>}
      {changeUsernameError && <ErrorMessage>Zmiana nazwy użytkownika nie powiodła się.</ErrorMessage>}
    </Modal>
  )
}
