import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../Button"
import { Input } from "../../Input"
import { Wrapper } from "../Form.styles"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../../styles/common";
import { errorsSelector, loadingsSelector, registerUser } from "../../../store/slices/userSlice/userSlice";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import { AuthErrors } from "../../../store/slices/userSlice/types";
import { LoadingVariants } from "../../../types/common";

export const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const { registerUser: error } = useSelector(errorsSelector)
  const { registerUser: loading } = useSelector(loadingsSelector)
  const isLoading = loading === LoadingVariants.pending

  const schema = yup.object().shape({
    nick: yup.string().required('Podaj swój nick.'),
    email: yup.string().email('Podaj poprawny email.').required('Email jest wymagany.'),
    password: yup.string().required('Hasło jest wymagane.').min(6, 'Hasło musi zawierać min. 6 znaków.'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, nick, password }) => {
    await dispatch(registerUser({ email, nick, password }))
  }

  return (
    <Wrapper
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        <Input
          placeholder="Nazwa użytkownika"
          name="nick"
          type="text"
          register={register}
          isError={!!errors.nick}
        />
        {errors.nick?.message && <ErrorMessage>{errors.nick.message as string}</ErrorMessage>}
      </label>
      <label>
        <Input
          placeholder="E-mail"
          name="email"
          type="text"
          register={register}
          isError={!!errors.email}
        />

        {errors.email?.message && <ErrorMessage>{errors.email.message as string}</ErrorMessage>}
      </label>
      <label>
        <Input
          placeholder="Hasło"
          name="password"
          type="password"
          register={register}
          isError={!!errors.password}
        />
        {errors.password?.message && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      </label>
      {!!error && <ErrorMessage>{AuthErrors[error as keyof typeof AuthErrors]}</ErrorMessage>}
      <Button
        isLoading={isLoading}
        loadingText="Rejestrowanie..."
      >
        Zarejestruj się
      </Button>
    </Wrapper>
  )
}
