import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

type GlobalThemeType = {
  theme: typeof theme
}

export const GlobalStyles = createGlobalStyle<GlobalThemeType>`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    color: ${({theme}) => theme.colors.black[100]};
    background-color: ${({theme}) => theme.colors.black[10]};
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
  }
`