import { Button } from "../../Button"
import { Input } from "../../Input"
import { Wrapper } from "../Forms.styles"

export const RegisterForm = () => {
  return (
    <Wrapper>
      <Input
        placeholder="Nazwa użytkownika"
      />
      <Input
        placeholder="E-mail"
      />
      <Input
        placeholder="Hasło"
      />
      <Button>
        Zarejestruj się
      </Button>
    </Wrapper>
  )
}
