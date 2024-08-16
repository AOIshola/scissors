import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ShortenerContextProvider } from './context/ShortenerContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from './context/Theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ShortenerContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ShortenerContextProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
