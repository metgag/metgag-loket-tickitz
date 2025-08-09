import { useState } from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  const [vMenu, setVMenu] = useState(false);
  const [menu, setMenu] = useState("hidden");

  const authStyle = "p-2 px-3 rounded-md hover:opacity-[.8]";
  const menuStyle = "cursor-pointer";
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
      className="py-2 px-6 md:px-28 sticky top-0 border-[#DEDEDE] text-sm font-medium border-b bg-white z-9999">
      <nav className="flex items-center justify-between relative">
        <div className="logo"><img src="/tickitz-blu.svg" alt="" />
        </div>
        <div className="center gap-6 hidden md:flex">
          {pages.map((page, i) => {
            return <ListItem key={i} to={page.to} page={page.page} />
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
                <div
                  className='flex items-center gap-4'
                >
                  <img onClick={openMenu}
                    className='object-cover shadow-lg cursor-pointer
                    rounded-full size-[2.25rem] hover:opacity-[.8]'
                    src="/vite.svg"
                  >
                  </img>
                  <div
                    className={`manage-usr absolute ${menu} flex-col top-11 
                      border-b border-[#DEDEDE] right-8 md:right-0
                      bg-white`}>
                    <Link to="/profile">
                      <div className={`${menuStyle} border-[#DEDEDE] border-b`}>
                        Preferences
                      </div>
                    </Link>
                    <div className={menuStyle} onClick={handleLogout}>LogOut</div>
                  </div>
                  <div className={`burger md:hidden ${menuStyle}
                    text-lg hover:opacity-40`}
                    onClick={() => setVMenu(!vMenu)}
                  >
                    <i className="nf nf-md-menu"></i>
                  </div>
                  {vMenu &&
                    <div
                      className='flex flex-col absolute text-right top-11 bg-white
                      w-max'
                    >
                      {pages.map((e, i) => {
                        return (
                          <Link to={e.to} key={i}
                            className='border-b border-[#DEDEDE]'
                          >
                            {e.page}
                          </Link>
                        )
                      })}
                    </div>
                  }
                </div>
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
      </nav>
    </header >
  );
}

/**
 * Create list for navigation.
 * @param {string[]} props 
 */
function ListItem(props) {
  return (
    <Link key={props.i} to={`${props.to}`}
      className="text-[#0F172A] font-semibold hover:text-blue-900">
      {props.page}
    </Link >
  );
}
