import { LoaderSpinner } from "../LoaderSpinner"
import { Wrapper } from "./FullScreenLoading.styles"

export const FullScreenLoading = () => {
  return (
    <Wrapper>
      <LoaderSpinner />
    </Wrapper>
  )
}
