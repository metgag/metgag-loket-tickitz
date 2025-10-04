import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { setInfo } from "../../redux/slices/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputType, setInputType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState("nf-fa-eye");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setInputType((prev) => {
      if (prev === "password") {
        setEyeIcon("nf-fa-eye_slash");
        return "text";
      }
      setEyeIcon("nf-fa-eye");
      return "password";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email?.value.trim();
    const password = form.pwd?.value.trim();

    let validEmail = false;
    let validPassword = false;

    // Email validation
    if (!email) {
      setEmailError("Field email belum diisi");
    } else {
      setEmailError("");
      validEmail = true;
    }

    // Password validation
    if (!password) {
      setPasswordError("Field password belum diisi");
    } else {
      setPasswordError("");
      validPassword = true;
    }

    // If both valid → proceed to login
    if (!validEmail || !validPassword) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        toast.error(data.error || "Login gagal. Coba lagi.");
        return;
      }

      if (!data.success) {
        toast.error(data.error || "Email atau password salah.");
        return;
      }

      toast.success(data.message || "Login berhasil!");

      dispatch(setUser({ token: data.token }));

      // Decode token safely
      let role = "user";
      try {
        const decoded = jwtDecode(data.token);
        role = decoded?.role || "user";
      } catch (decodeErr) {
        console.error("JWT decode error:", decodeErr);
      }

      // If admin → go to admin dashboard
      if (role === "admin") {
        setTimeout(() => navigate("/admin/table"), 1500);
        return;
      }

      // Fetch user profile (optional)
      try {
        const userResp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/users/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${data.token}` },
        });

        const userData = await userResp.json();

        if (userResp.ok && userData.success) {
          const { result } = userData;
          const {
            avatar, first_name, last_name, phone_number, point_count,
          } = result;
          dispatch(setInfo({
            first_name,
            last_name,
            phone_number,
            point_count,
            avatar,
          }));
        } else {
          console.warn("Failed to load user profile:", userData);
        }
      } catch (userErr) {
        console.error("User fetch failed:", userErr);
        toast.error("Gagal mengambil data pengguna.");
      }

      // Navigate to home after success
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      console.error("Login request failed:", err);
      toast.error("Terjadi kesalahan jaringan. Coba lagi.");
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="bg-[url(/avenger-bg.png)] bg-center bg-zinc-800 bg-blend-overlay 
        flex flex-col items-center justify-center pb-[4rem] bg-cover w-screen h-screen text-sm"
      >
        {/* Logo */}
        <div className="d-flex justify-center">
          <img src="/tickitz-logo.png" width="192" alt="Tickitz Logo" />
        </div>

        {/* Card */}
        <div
          className="card bg-white flex flex-col gap-[1rem] justify-between 
          rounded-md p-[2rem] w-[384px]"
        >
          {/* Title */}
          <div className="title flex flex-col gap-[.375rem]">
            <h2 className="text-2xl text-[#121212] font-bold">
              Welcome Back 👋
            </h2>
            <p className="text-[#A0A3BD]">
              Sign in with your data that you entered during your registration
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-[.5rem]" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-[.375rem]">
              <label
                htmlFor="email"
                className="gray-primary cursor-pointer hover:opacity-80"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="placeholder:text-[#A0A3BD] rounded-[3px] p-3 ps-4 border 
                  border-[#DEDEDE] bg-[#FCFDFE]"
              />
              <p className="text-red-800 text-xs font-semibold">{emailError}</p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[.375rem]">
              <label
                htmlFor="pwd"
                className="gray-primary cursor-pointer hover:opacity-80"
              >
                Password
              </label>
              <div className="flex flex-col">
                <div className="relative flex items-end">
                  <input
                    type={inputType}
                    id="pwd"
                    name="pwd"
                    placeholder="Enter your password"
                    className="w-full placeholder:text-[#A0A3BD] rounded-[3px] p-3 ps-4 border 
                      border-[#DEDEDE] bg-[#FCFDFE]"
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className={`nf ${eyeIcon} absolute right-0 pe-[.875rem] 
                      translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]`}
                  ></i>
                </div>
                <p className="text-red-800 text-xs font-semibold">
                  {passwordError}
                </p>
              </div>
            </div>

            {/* Links */}
            <Link
              to="/auth/register"
              className="text-[#1D4ED8] self-end cursor-pointer underline w-max"
            >
              Sign Up
            </Link>
            <Link
              to="/auth/forget"
              className="text-[#1D4ED8] self-end cursor-pointer underline w-max"
            >
              Forgot your password?
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] 
                py-[.875rem] font-semibold hover:opacity-[.8] cursor-pointer"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex justify-center">
              <p className="text-[#AAAAAA]">Or</p>
            </div>
          </form>

          {/* Social Buttons */}
          <div className="flex justify-between">
            <button
              className="flex items-center shadow-md cursor-pointer gap-[12px] 
                p-[12px] bg-white rounded-[4px] w-[8rem] justify-center"
            >
              <img src="/social/google.svg" width="20" alt="Google" />
              <p>Google</p>
            </button>
            <button
              className="flex items-center shadow-md cursor-pointer gap-[12px] 
                p-[12px] bg-white rounded-[4px] w-[8rem] justify-center"
            >
              <img src="/social/fb.png" width="20" alt="Facebook" />
              <p>Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
