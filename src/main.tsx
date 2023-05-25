import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyles } from './styles/GlobalStyles.ts'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { GlobalLayout } from './layouts/GlobalLayout/GlobalLayout.tsx'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalLayout />
          <GlobalStyles />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
