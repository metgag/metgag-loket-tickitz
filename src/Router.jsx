import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Index from './pages/movie/Index.jsx'
import Movies from './pages/movie/Movies.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route element={<RouterLayout />}>
          <Route index element={<Index />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouterLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Router;
