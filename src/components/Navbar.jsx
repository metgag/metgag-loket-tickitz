import { useState } from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  const [menu, setMenu] = useState("hidden");

  const authStyle = "p-2 px-3 rounded-md hover:opacity-[.8]";
  const menuStyle = "cursor-pointer font-medium hover:underline";
  const pages = [
    { to: "/", page: "Home" },
    { to: "/movie/list", page: "Movie" },
    { to: "/movie/order", page: "Buy Ticket" },
  ];

  function handleLogout() {
    window.localStorage.clear();
    console.log("logOut success");
    window.location.reload();
  }

  return (
    <header
      className="py-2 px-28 sticky top-0 border-[#DEDEDE] text-sm font-medium border-b bg-white z-9999">
      <nav className="flex items-center justify-between relative">
        <div className="logo"><img src="/tickitz-blu.svg" alt="" />
        </div>
        <div className="center flex gap-6">
          {pages.map((page, i) => {
            return <ListItem i={i} to={page.to} page={page.page} />
          })}
        </div>
        <div className="account relative flex gap-3">
          {(() => {
            if (localStorage.getItem("user")) {
              function openMenu() {
                if (menu === "hidden") {
                  setMenu("flex");
                } else {
                  setMenu("hidden");
                }
              }

              return (
                <>
                  <div onClick={openMenu}
                    className='bg-[url(/vite.svg)] border cursor-pointer rounded-full size-[2.25rem] hover:opacity-[.8]'>
                  </div>
                  <div className={`manage-usr absolute ${menu} flex-col gap-2 top-10 bg-blue-300 p-1`}>
                    <div className={menuStyle}>Preferences</div>
                    <div className={menuStyle} onClick={handleLogout}>LogOut</div>
                  </div>
                  <div className="burger hidden">
                    <i className="nf nf-md-menu"></i>
                  </div>
                  <div className="menu d-flex flex-col hidden">
                    <div className="page d-flex flex-col">
                      <a className="decoration-none" href="index.html">Home</a>
                      <a className="decoration-none" href="home-dua.html">Movie</a>
                      <a className="decoration-none" href="../ticket/order.html">
                      Buy Ticket</a>
                    </div>
                    <div className="profile d-flex flex-col">
                      <a className="decoration-none"
                        href="../sign/login.html">SignIn</a>
                      <a className="decoration-none" href="../sign/register.html">Sign
                        Up</a>
                    </div>
                  </div>
                </>
              )
            } else {
              return (
                <>
                  <Link
                    className={`${authStyle} border border-[#1D4ED8] text-[#1D4ED8]`}
                    to="/auth/login">
                    SignIn
                  </Link>
                  <Link
                    className={`${authStyle} bg-[#1D4ED8] text-white`}
                    to="/auth/register">
                    Sign Up
                  </Link>
                </>
              )
            }
          })()}
        </div>
        <div className="burger hidden"><i className="nf nf-md-menu"></i></div>
      </nav>
    </header>
  );
}

/**
 * Create list for navigation.
 * @param {string[]} props 
 */
function ListItem(props) {
  return (
    <Link key={props.i} to={`${props.to}`}
      className="text-[#0F172A] hover:font-semibold hover:text-blue-900">
      {props.page}
    </Link >
  );
}
