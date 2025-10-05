import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { clearUser } from "../redux/slices/authSlice";
import { clearSchedule } from "../redux/slices/scheduleSlice";
import { clearInfo } from "../redux/slices/userSlice";
import { clearOrder } from "../redux/slices/orderSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.info);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handle user logout
  async function handleLogout() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/auth/logout`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      if (result.success) {
        dispatch(clearUser());
        dispatch(clearSchedule());
        dispatch(clearOrder());
        dispatch(clearInfo());
        toast.success("You have logged out.");
        navigate("/auth/login", { replace: true });
      }
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out.");
    }
  }

  // Navigation links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movie/list", label: "Movie" },
  ];

  const authButtonStyle = "p-2 px-3 rounded-md hover:opacity-80";
  const menuItemStyle = "cursor-pointer";

  const NavLinks = () =>
    navLinks.map((link, idx) => (
      <ListItem key={idx} to={link.to} label={link.label} />
    ));

  const MobileMenu = () =>
    isMenuOpen && (
      <div className="absolute top-11 flex flex-col w-max bg-white text-right">
        <NavLinks />
      </div>
    );

  const UserDropdown = () =>
    isDropdownOpen && (
      <div className="absolute top-11 right-8 md:right-0 flex-col bg-white border-b border-[#DEDEDE]">
        <Link to="/profile">
          <div className={`${menuItemStyle} border-b border-[#DEDEDE]`}>
            Preferences
          </div>
        </Link>
        <div
          className={menuItemStyle}
          onClick={() => setShowLogoutModal(true)} // open modal instead
        >
          Log Out
        </div>
      </div>
    );

  return (
    <>
      <header className="sticky top-0 z-9999 bg-white border-b border-[#DEDEDE] py-2 px-6 md:px-28 text-sm font-medium">
        <Toaster />
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/tickitz-blu.svg" alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
            {/* <div
              className="cursor-pointer font-semibold text-[#0F172A] hover:text-blue-900"
              onClick={() => {
                if (!token) {
                  toast.error("Login terlebih dahulu untuk memesan tiket.");
                  return;
                }
                navigate("/movie/order");
              }}
            >
              Buy Ticket
            </div> */}
          </div>

          {/* Account Section */}
          <div className="relative flex items-center gap-3">
            {token ? (
              // Logged-in state
              <div className="flex items-center gap-4">
                <img
                  src={
                    avatar
                      ? `${import.meta.env.VITE_BASE_API_URL}/user/${avatar}`
                      : "/fallback-avatar.jpg"
                  }
                  alt="User avatar"
                  className="size-[2.25rem] cursor-pointer rounded-full object-cover shadow-lg hover:opacity-80"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-avatar.jpg";
                  }}
                />
                <UserDropdown />
                <div
                  className={`md:hidden text-lg ${menuItemStyle} hover:opacity-40`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <i className="nf nf-md-menu"></i>
                </div>
                <MobileMenu />
              </div>
            ) : (
              // Guest state
              <div className="relative flex items-center gap-2">
                <div className="flex gap-2">
                  <Link
                    to="/auth/login"
                    className={`${authButtonStyle} border border-[#1D4ED8] text-[#1D4ED8]`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className={`${authButtonStyle} bg-[#1D4ED8] text-white`}
                  >
                    Sign Up
                  </Link>
                </div>
                <div
                  className={`md:hidden text-lg ${menuItemStyle} hover:opacity-40`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <i className="nf nf-md-menu"></i>
                </div>
                <MobileMenu />
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[10000]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[20rem]">
            <h2 className="text-lg font-semibold text-[#1F4173]">
              Confirm Logout
            </h2>
            <p className="mt-3 text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-md bg-[#EFF0F6] text-[#4E4B66] hover:opacity-75 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded-md bg-[#E82C2C] text-white hover:opacity-80 cursor-pointer font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Navigation List Item Component
 */
function ListItem({ to, label }) {
  return (
    <Link
      to={to}
      className="font-medium text-[#0F172A] hover:text-blue-900"
    >
      {label}
    </Link>
  );
}

// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// import { clearUser } from "../redux/slices/authSlice";
// import { clearSchedule } from "../redux/slices/scheduleSlice";
// import { clearInfo } from "../redux/slices/userSlice";
// import { clearOrder } from "../redux/slices/orderSlice";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const { avatar } = useSelector((state) => state.info);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Handle user logout
//   async function handleLogout() {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_API_URL}/auth/logout`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error(response.statusText);

//       const result = await response.json();

//       if (result.success) {
//         console.log(result.result);
//         dispatch(clearUser());
//         dispatch(clearSchedule());
//         dispatch(clearOrder());
//         dispatch(clearInfo());
//         navigate("/auth/login", { replace: true });
//       }
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   }

//   // Navigation links
//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/movie/list", label: "Movie" },
//   ];

//   const authButtonStyle = "p-2 px-3 rounded-md hover:opacity-80";
//   const menuItemStyle = "cursor-pointer";

//   const NavLinks = () =>
//     navLinks.map((link, idx) => (
//       <ListItem key={idx} to={link.to} label={link.label} />
//     ));

//   const MobileMenu = () =>
//     isMenuOpen && (
//       <div className="absolute top-11 flex flex-col w-max bg-white text-right">
//         <NavLinks />
//       </div>
//     );

//   const UserDropdown = () =>
//     isDropdownOpen && (
//       <div className="absolute top-11 right-8 md:right-0 flex-col bg-white border-b border-[#DEDEDE]">
//         <Link to="/profile">
//           <div className={`${menuItemStyle} border-b border-[#DEDEDE]`}>
//             Preferences
//           </div>
//         </Link>
//         <div className={menuItemStyle} onClick={handleLogout}>
//           Log Out
//         </div>
//       </div>
//     );

//   return (
//     <header className="sticky top-0 z-9999 bg-white border-b border-[#DEDEDE] py-2 px-6 md:px-28 text-sm font-medium">
//       <Toaster />
//       <nav className="relative flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <img src="/tickitz-blu.svg" alt="Logo" />
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-6">
//           <NavLinks />
//           <div
//             className="cursor-pointer font-semibold text-[#0F172A] hover:text-blue-900"
//             onClick={() => {
//               if (!token) {
//                 toast.error("Login terlebih dahulu untuk memesan tiket.");
//                 return;
//               }
//               navigate("/movie/order");
//             }}
//           >
//             Buy Ticket
//           </div>
//         </div>

//         {/* Account Section */}
//         <div className="relative flex items-center gap-3">
//           {token ? (
//             // Logged-in state
//             <div className="flex items-center gap-4">
//               <img
//                 src={
//                   avatar
//                     ? `${import.meta.env.VITE_BASE_API_URL}/user/${avatar}`
//                     : "/fallback-avatar.jpg"
//                 }
//                 alt="User avatar"
//                 className="size-[2.25rem] cursor-pointer rounded-full object-cover shadow-lg hover:opacity-80"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 onError={(e) => {
//                   e.target.onerror = null; // Prevent infinite loop
//                   e.target.src = "/fallback-avatar.jpg";
//                 }}
//               />
//               {/* <img
//                 src={`${import.meta.env.VITE_BASE_API_URL}/user/${avatar}`}
//                 alt="User avatar"
//                 className="size-[2.25rem] cursor-pointer rounded-full object-cover shadow-lg hover:opacity-80"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               /> */}
//               <UserDropdown />
//               <div
//                 className={`md:hidden text-lg ${menuItemStyle} hover:opacity-40`}
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 <i className="nf nf-md-menu"></i>
//               </div>
//               <MobileMenu />
//             </div>
//           ) : (
//             // Guest state
//             <div className="relative flex items-center gap-2">
//               <div className="flex gap-2">
//                 <Link
//                   to="/auth/login"
//                   className={`${authButtonStyle} border border-[#1D4ED8] text-[#1D4ED8]`}
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/auth/register"
//                   className={`${authButtonStyle} bg-[#1D4ED8] text-white`}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//               <div
//                 className={`md:hidden text-lg ${menuItemStyle} hover:opacity-40`}
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 <i className="nf nf-md-menu"></i>
//               </div>
//               <MobileMenu />
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// /**
//  * Navigation List Item Component
//  */
// function ListItem({ to, label }) {
//   return (
//     <Link
//       to={to}
//       className="font-medium text-[#0F172A] hover:text-blue-900"
//     >
//       {label}
//     </Link>
//   );
// }