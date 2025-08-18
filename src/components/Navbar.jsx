import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { rmCurrUser } from '../redux/slices/loginSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const [vMenu, setVMenu] = useState(false);
  const [menu, setMenu] = useState("hidden");
  const navigate = useNavigate();
  const { isLogged, email } = useSelector((state) => state.whoami);

  const authStyle = "p-2 px-3 rounded-md hover:opacity-[.8]";
  const menuStyle = "cursor-pointer";
  const pages = [
    { to: "/", page: "Home" },
    { to: "/movie/list", page: "Movie" },
    // { to: "/movie/order", page: "Buy Ticket" },
  ];

  // function handleLogout() {
  // dispatch(removeUser(currUser));
  // window.localStorage.clear();
  // console.log("logOut success");
  // window.location.reload();
  // }

  return (
    <header
      className="py-2 px-6 md:px-28 sticky top-0 border-[#DEDEDE] text-sm 
        font-medium border-b bg-white z-9999">
      <Toaster />
      <nav className="flex items-center justify-between relative">
        <div className="logo flex items-center relative gap-2">
          <img src="/tickitz-blu.svg" alt=""
            className=''
          />
          {isLogged &&
            <p
              className='text-[#A0A3BD] inset-0 top-3/4 absolute text-sm'
            >Hello, {email.split("@")[0]}</p>
          }
        </div>
        <div className="center gap-6 hidden md:flex">
          {pages.map((page, i) => {
            return <ListItem key={i} to={page.to} page={page.page} />
          })}
          <div
            className='text-[#0F172A] font-semibold hover:text-blue-900 cursor-pointer'
            onClick={() => {
              if (!isLogged) {
                toast.error("Login terlebih dahulu untuk memesan tiket.")
                return;
              }
              navigate("/movie/order");
            }}
          >Buy Ticket</div>
        </div>
        <div className="account relative flex gap-3">
          {(() => {
            if (isLogged) {
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
                    <div
                      className={menuStyle}
                      onClick={() => {
                        // localStorage.removeItem('whoami')
                        // window.location.reload();
                        dispatch(rmCurrUser());
                      }
                      }>LogOut</div>
                  </div>
                  <div className={`burger md:hidden ${menuStyle}
                    text-lg hover:opacity-40`}
                    onClick={() => setVMenu(!vMenu)}
                  >
                    <i className="nf nf-md-menu"></i>
                  </div>
                  {
                    vMenu &&
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
                <div
                  className='flex items-center justify-end gap-2 relative'>
                  <div className='flex gap-2'>
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
