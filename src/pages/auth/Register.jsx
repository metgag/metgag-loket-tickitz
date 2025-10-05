import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router";
import Step from "../../components/Step";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [eyeIcon, setEyeIcon] = useState("nf-fa-eye");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate();

  const steps = [
    { label: "Fill Form", bg: "#1D4ED8", color: "#4E4B66" },
    { label: "Activate", bg: "#A0A3BD", color: "#A0A3BD" },
    { label: "Done", bg: "#A0A3BD", color: "#A0A3BD" },
  ];

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

    const [email, password, checkbox] = e.target;
    const payload = {};
    let validEmail = false;
    let validPassword = false;
    let validCheckbox = false;

    // Email Validation
    if (!email.value) {
      setEmailError("Field email tidak boleh kosong");
    } else {
      const emailPattern = /^[\w-.]+@[a-z]{4,}\.com$/;
      if (!emailPattern.test(email.value)) {
        setEmailError("Format email tidak sesuai");
      } else {
        setEmailError("");
        payload.email = email.value;
        validEmail = true;
      }
    }

    // Password Validation
    if (!password.value) {
      setPasswordError("Field password tidak boleh kosong");
    } else if (password.value.length < 8) {
      setPasswordError("Password minimal 8 karakter");
    } else {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*/><]).{8,}$/;
      if (!passwordPattern.test(password.value)) {
        setPasswordError(
          "Password harus memiliki minimal 8 karakter, huruf kecil, huruf besar, dan satu karakter spesial (!@#$%^&*/><)"
        );
      } else {
        setPasswordError("");
        payload.password = password.value;
        validPassword = true;
      }
    }

    // Checkbox Validation
    if (!checkbox.checked) {
      setCheckboxError("Tolong setujui perizinan");
    } else {
      setCheckboxError("");
      validCheckbox = true;
    }

    // Submit Form if Valid
    if (validEmail && validPassword && validCheckbox) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/auth/register`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();
        // console.log(result);

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        toast.success(result.result);

        setTimeout(() => navigate("/auth/login"), 1800);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div
        className="bg-[url(/avenger-bg.png)] bg-center bg-zinc-800 
        bg-blend-overlay flex flex-col items-center justify-center pb-[4rem] 
        bg-cover w-screen h-screen text-sm"
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
          {/* Steps */}
          <div className="steps flex items-center justify-between">
            {steps.map((step, i) => (
              <Step
                key={i}
                i={i}
                how={step.label}
                bg={step.bg}
                color={step.color}
              />
            ))}
          </div>

          {/* Form */}
          <form
            className="reg flex flex-col gap-[.5rem]"
            onSubmit={handleSubmit}
          >
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
              <p className="text-red-800 text-xs font-semibold">
                {emailError}
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[.375rem]">
              <label
                htmlFor="pwd"
                className="gray-primary cursor-pointer hover:opacity-80"
              >
                Password
              </label>
              <div className="relative flex items-end">
                <input
                  type={inputType}
                  id="pwd"
                  name="pwd"
                  placeholder="Enter your password"
                  className="w-full placeholder:text-[#A0A3BD] rounded-[3px] p-3 ps-4 
                    border border-[#DEDEDE] bg-[#FCFDFE]"
                />
                <i
                  onClick={togglePasswordVisibility}
                  className={`nf ${eyeIcon} absolute right-0 pe-[.875rem] translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]`}
                ></i>
              </div>
              <p className="text-red-800 text-xs font-semibold">
                {passwordError}
              </p>
            </div>

            {/* Terms & Conditions */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="me-[12px] accent-[#1D4ED8]"
                />
                <label
                  htmlFor="terms"
                  className="text-[#696F79] cursor-pointer hover:opacity-80"
                >
                  I agree to terms & condition
                </label>
              </div>
              <p className="text-red-800 text-xs font-semibold">
                {checkboxError}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] 
                py-[.875rem] font-semibold hover:opacity-[.8] cursor-pointer"
            >
              Join For Free Now
            </button>

            {/* Already have account */}
            <p className="mx-auto font-medium text-[#696F79]">
              Already have an account?
              <Link
                to="/auth/login"
                className="text-[#1D4ED8] ms-1 underline"
              >
                Login
              </Link>
            </p>

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
    </Fragment>
  );
}

export default Register;