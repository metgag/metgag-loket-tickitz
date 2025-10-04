import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { clearUser } from "../redux/slices/authSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { avatar } = useSelector((state) => state.info);

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
                // console.log(result.result);
                dispatch(clearUser());
                navigate("/auth/login");
            }
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    // Navigation links
    const navLinks = [
        { to: "/admin/chart", label: "Dashboard" },
        { to: "/admin/table", label: "Movie" },
    ];

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
                <div className={menuItemStyle} onClick={handleLogout}>
                    Log Out
                </div>
            </div>
        );

    return (
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
                </div>

                {/* Account Section */}
                <div className="relative flex items-center gap-3">
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
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = "/fallback-avatar.jpg";
                            }}
                        />
                        {/* <img
                            src="/vite.svg"
                            alt="User avatar"
                            className="size-[2.25rem] cursor-pointer rounded-full object-cover shadow-lg hover:opacity-80"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        /> */}
                        <UserDropdown />
                        <div
                            className={`md:hidden text-lg ${menuItemStyle} hover:opacity-40`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <i className="nf nf-md-menu"></i>
                        </div>
                        <MobileMenu />
                    </div>
                </div>
            </nav>
        </header>
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