import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../../Button"
import { Input } from "../../Input"
import { Wrapper } from "../Form.styles"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../../styles/common";

export const LoginForm = () => {

  const schema = yup.object().shape({
    email: yup.string().email('Podaj poprawny email.').required('Email jest wymagany.'),
    password: yup.string().required('Hasło jest wymagane.'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data)
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
          isError={!!errors.email}
        />
        {errors.email?.message && <ErrorMessage>{errors.email.message as string}</ErrorMessage>}
      </label>
      <label>
        <Input
          placeholder="Hasło"
          register={register}
          name="password"
          isError={!!errors.password}
        />
        {errors.password?.message && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      </label>
      <Button>Zaloguj się</Button>
    </Wrapper>
  )
}
