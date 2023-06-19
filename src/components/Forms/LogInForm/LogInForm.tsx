import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../Button"
import { Input } from "../../Input"
import { Wrapper } from "../Form.styles"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../../styles/common";
import { useAppDispatch } from "../../../store/hooks";
import { errorsSelector, loadingsSelector, logInUser } from "../../../store/slices/userSlice/userSlice";
import { useSelector } from "react-redux";
import { LoadingVariants } from "../../../types/common";
import { AuthErrors } from "../../../store/slices/userSlice/types";
import { MdAlternateEmail } from 'react-icons/md'
import { RiKey2Fill } from 'react-icons/ri'

export const LogInForm = () => {
  const dispatch = useAppDispatch()
  const { logInUser: error } = useSelector(errorsSelector)
  const { logInUser: loading } = useSelector(loadingsSelector)
  const isLoading = loading === LoadingVariants.pending

  const schema = yup.object().shape({
    email: yup.string().email('Podaj poprawny email.').required('Email jest wymagany.'),
    password: yup.string().required('Hasło jest wymagane.'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: 'john.doe@example.com',
      password: 'example'
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    dispatch(logInUser({ email, password }))
  }

  return (
    <Wrapper
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        <Input
          placeholder="E-mail"
          register={register}
          name="email"
          type="text"
          isError={!!errors.email}
          icon={<MdAlternateEmail />}
        />
        {errors.email?.message && <ErrorMessage>{errors.email.message as string}</ErrorMessage>}
      </label>
      <label>
        <Input
          placeholder="Hasło"
          register={register}
          name="password"
          type="password"
          isError={!!errors.password}
          icon={<RiKey2Fill />}
        />
        {errors.password?.message && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      </label>
      {!!error && <ErrorMessage>{AuthErrors[error as keyof typeof AuthErrors]}</ErrorMessage>}
      <Button
        isLoading={isLoading}
        loadingText="Logowanie..."
      >
        Zaloguj się
      </Button>
    </Wrapper>
  )
}
