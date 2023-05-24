import { Button } from "../../Button"
import { Input } from "../../Input"
import { Wrapper } from "../Forms.styles"

export const LoginForm = () => {
  return (
    <Wrapper>
      <Input
        placeholder="E-mail"
      />
      <Input
        placeholder="Hasło"
      />
      <Button>Zaloguj się</Button>
    </Wrapper>
  )
}
