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
import Table from './pages/admin/Table.jsx'
import Chart from './pages/admin/Chart.jsx'
import Forget from './pages/auth/Forget.jsx'
import Create from './pages/admin/Create.jsx'
import RoleRoutes from './components/RoleRoutes.jsx'
import AdminNavbar from './components/AdminNavbar.jsx'
import AutoLogout from './components/AutoLogout.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forget" element={<Forget />} />
        </Route>

        {/* Public routes */}
        <Route element={<RouteLayout />}>
          <Route index element={<Index />} />
        </Route>
        <Route path="movie" element={<RouteLayout />}>
          <Route path="list" element={<Movies />} />
          <Route path="detail/:movieId" element={<MovieDetail />} />

          {/* Movie routes protected for "user" */}
          <Route element={
            <AutoLogout>
              <RoleRoutes allowedRoles={["user"]} />
            </AutoLogout>
          }>
            <Route path="order" element={<Order />} />
            <Route path="payment" element={<Payment />} />
            <Route path="ticket" element={<Ticket />} />
          </Route>
        </Route>

        {/* Profile routes (protected for "user") */}
        <Route element={
          <AutoLogout>
            <RoleRoutes allowedRoles={["user"]} />
          </AutoLogout>
        }>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>

        {/* Admin routes (protected for "admin") */}
        <Route element={
          <AutoLogout>
            <RoleRoutes allowedRoles={["admin"]} />
          </AutoLogout>
        }>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="chart" element={<Chart />} />
            <Route path="table" element={<Table />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteLayout() {
  return (
    <AutoLogout>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </AutoLogout>
  );
}

function ProfileLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  )
}

export default Router;
