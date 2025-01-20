import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { LibraryContextProvider } from './context/LibraryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <LibraryContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LibraryContextProvider>
    </UserContextProvider>
  </StrictMode>
)

