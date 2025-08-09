import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Index from './pages/movie/Index.jsx'
import Movies from './pages/movie/Movies.jsx'
import MovieDetail from './pages/movie/MovieDetail.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Order from './pages/payment/Order.jsx'
import Payment from './pages/payment/Payment.jsx'
import Ticket from './pages/payment/Ticket.jsx'
import Profile from './pages/profile/Profile.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route index element={(
          <>
            <Navbar />
            <Index />
            <Footer />
          </>
        )} />

        <Route path="movie" element={<RouteLayout />}>
          <Route path="list" element={<Movies />} />
          <Route path="order" element={<Order />} />
          <Route path="payment" element={<Payment />} />
          <Route path="detail/:movieId" element={<MovieDetail />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>

        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function ProfileLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Router;
