import { createGlobalStyle } from "styled-components";
import { lightTheme } from "./theme";

type GlobalThemeType = {
  theme: typeof lightTheme
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
    color: ${({theme}) => theme.colors.text[100]};
    background-color: ${({theme}) => theme.colors.text[10]};
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  a {
    text-decoration: none;
    color: ${({theme}) => theme.colors.text[100]};
  }

  input, textarea {
    font-family: 'Roboto', sans-serif;
    color: ${({theme}) => theme.colors.fieldText[100]};
  }
`