import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../../Button"
import { Input } from "../../Input"
import { Wrapper } from "../Form.styles"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "../../../styles/common";

export const RegisterForm = () => {

  const schema = yup.object().shape({
    nick: yup.string().required('Podaj swój nick.'),
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
          placeholder="Nazwa użytkownika"
          name="nick"
          register={register}
          isError={!!errors.nick}
        />
        {errors.nick?.message && <ErrorMessage>{errors.nick.message as string}</ErrorMessage>}
      </label>
      <label>
        <Input
          placeholder="E-mail"
          name="email"
          register={register}
          isError={!!errors.email}
        />

        {errors.email?.message && <ErrorMessage>{errors.email.message as string}</ErrorMessage>}
      </label>
      <label>
        <Input
          placeholder="Hasło"
          name="password"
          register={register}
          isError={!!errors.password}
        />
        {errors.password?.message && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      </label>
      <Button>
        Zarejestruj się
      </Button>
    </Wrapper>
  )
}
