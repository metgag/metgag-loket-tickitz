// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { logout } from "../redux/slices/tokenSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function handleLogout() {
    const url = `${import.meta.env.VITE_BASE_API_URL}/auth/logout`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const request = new Request(url, options);
    fetch(request)
      .then((resp) => {
        if (!resp.ok) throw resp.statusText;
        return resp.json();
      })
      .then(res => {
        if (res.success) {
          console.log(res.result);
          dispatch(logout());
          navigate("/auth/login");
        }
      })
      .catch(err => console.log(err))
  }

  const pages = [
    { to: "/", page: "Home" },
    { to: "/movie/list", page: "Movie" },
  ];
  const authStyle = "p-2 px-3 rounded-md hover:opacity-[.8]";
  const menuStyle = "cursor-pointer";

  const NavLinks = () =>
    pages.map((page, i) => (
      <ListItem key={i} to={page.to} page={page.page} />
    ));

  const MobileMenu = () =>
    menuVisible && (
      <div className="flex flex-col absolute text-right top-11 bg-white w-max">
        <NavLinks />
      </div>
    );

  const UserMenu = () =>
    dropdownVisible && (
      <div
        className={`manage-usr absolute flex-col top-11 border-b border-[#DEDEDE] right-8 md:right-0 bg-white`}
      >
        <Link to="/profile">
          <div className={`${menuStyle} border-[#DEDEDE] border-b`}>
            Preferences
          </div>
        </Link>
        <div className={menuStyle} onClick={handleLogout}>
          Log Out
        </div>
      </div>
    );

  return (
    <header className="py-2 px-6 md:px-28 sticky top-0 border-[#DEDEDE] text-sm font-medium border-b bg-white z-9999">
      <Toaster />
      <nav className="flex items-center justify-between relative">
        {/* Logo */}
        <div className="logo flex items-center relative gap-2">
          <img src="/tickitz-blu.svg" alt="Logo" />
        </div>

        {/* Desktop Nav */}
        <div className="center gap-6 hidden md:flex">
          <NavLinks />
          <div
            className="text-[#0F172A] font-semibold hover:text-blue-900 cursor-pointer"
            onClick={() => {
              if (!token) {
                toast.error("Login terlebih dahulu untuk memesan tiket.");
                return;
              }
              navigate("/movie/order");
            }}
          >
            Buy Ticket
          </div>
        </div>

        {/* Account Section */}
        <div className="account relative flex gap-3">
          {token ? (
            <div className="flex items-center gap-4">
              <img
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="object-cover shadow-lg cursor-pointer rounded-full size-[2.25rem] hover:opacity-[.8]"
                src="/vite.svg"
                alt="User avatar"
              />
              <UserMenu />
              <div
                className={`burger md:hidden ${menuStyle} text-lg hover:opacity-40`}
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <i className="nf nf-md-menu"></i>
              </div>
              <MobileMenu />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2 relative">
              <div className="flex gap-2">
                <Link
                  className={`${authStyle} border border-[#1D4ED8] text-[#1D4ED8]`}
                  to="/auth/login"
                >
                  Sign In
                </Link>
                <Link
                  className={`${authStyle} bg-[#1D4ED8] text-white`}
                  to="/auth/register"
                >
                  Sign Up
                </Link>
              </div>
              <div
                className={`burger md:hidden ${menuStyle} text-lg hover:opacity-40`}
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <i className="nf nf-md-menu"></i>
              </div>
              <MobileMenu />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

/**
 * Navigation List Item
 */
function ListItem({ to, page }) {
  return (
    <Link
      to={to}
      className="text-[#0F172A] font-semibold hover:text-blue-900"
    >
      {page}
    </Link>
  );
}
