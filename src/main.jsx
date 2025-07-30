import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from './pages/auth/Register.jsx'
import Movies from './pages/movie/Movies.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Register /> */}
    <Movies />
  </StrictMode>,
)
