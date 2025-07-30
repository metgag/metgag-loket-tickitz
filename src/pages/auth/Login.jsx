import { Fragment, useState } from 'react'

export default function Login() {
  const [emailErr, setEmailErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [vpwd, setVpwd] = useState("password");

  function handleVpwd(e) {
    console.log(e.className);
    setVpwd(() => {
      if (vpwd === "password") return "text";
      else return "password";
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // destructure Array
    const [email, pwd] = e.target;
    let [isEmail, isPwd] = [false, false];

    // Validasi Email
    // field email tidak boleh kosong
    if (email.value === null || email.value === "") {
      setEmailErr(() => "Field email tidak boleh kosong");
    } else {
      // validasi format email
      const reMail = /^[\w-.]+@[a-z]{5,}.com$/;
      if (!reMail.test(email.value)) {
        setEmailErr(() => "Format email tidak sesuai");
      } else {
        setEmailErr("");
        isEmail = true;
      }
    }

    // Validasi Password
    // field password tidak boleh kosong
    if (pwd.value === null || pwd.value === "") {
      setPwdErr("Field password tidak boleh kosong");
    } else {
      // validasi minimal 8 karakter
      if (pwd.value.length < 8) {
        setPwdErr("Password minimal 8 karakter");
      } else {
        // validasi format
        const rePwd = /^(?=.*[a-z])(?=.+[A-Z])(?=.+[!@#$%^&*/><]).{8,}$/;
        if (!rePwd.test(pwd.value)) {
          setPwdErr("Password harus terdiri dari minimal 1 huruf besar dan kecil, dan 1 buah karakter spesial(!@#$%^&*/><)");
        } else {
          setPwdErr("");
          isPwd = true;
        }
      }
    }

    if (isEmail && isPwd) {
      console.log("Login berhasil");
    }
  }

  return (
    <Fragment>
      <div className="bg-[url(../../public/avenger-bg.png)] bg-center bg-zinc-800 bg-blend-overlay flex flex-col items-center justify-center pb-[4rem] bg-cover w-screen h-screen text-sm">
        <div className="d-flex justify-center">
          <div className="logo">
            <img src="tickitz-logo.png" width="192" alt="" />
          </div>
        </div>
        <div className="card bg-white flex flex-col justify-between rounded-md p-[2rem] w-[384px]">
          <div className="title">
            <h2>Welcome Back👋</h2>
            <p>Sign in with your data that you entered during your registration</p>
          </div>

          <form className="reg flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="gray-primary" htmlFor="email">Email</label>
              <input className="text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type="text" name="" id="email"
                placeholder="Enter your email" />
              <p id="erremail" className="text-red-800 text-xs">{emailErr}</p>
            </div>
            <div className="flex flex-col">
              <label className="gray-primary" htmlFor="pwd">Password</label>
              <div className="pwd relative flex items-end">
                <input className="w-full text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type={vpwd} name="" id="pwd"
                  placeholder="Enter your password" />
                <i onClick={handleVpwd} className="nf nf-fa-eye absolute right-0 pe-[.875rem] translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]"></i>
              </div>
              <p id="errpwd" className="text-red-800 text-xs">{pwdErr}</p>
            </div>
            <a href="">Forgot your password?</a>
            <button className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] py-[.875rem] font-semibold hover:opacity-[.8] cursor-pointer" type="submit">
              Login
            </button>
            <div id="or" className="flex justify-center">
              <p className="text-[#AAAAAA]">Or</p>
            </div>
          </form>

          <div id="social" className="flex justify-between">
            <button className="flex flex-row items-center shadow-md cursor-pointer gap-[12px] p-[12px] bg-white rounded-[4px] w-[8rem] justify-center">
              <img src="social/google.svg" width="20" alt="" />
              <p>Google</p>
            </button>
            <button className="flex flex-row items-center shadow-md cursor-pointer gap-[12px] p-[12px] bg-white rounded-[4px] w-[8rem] justify-center">
              <img src="social/fb.png" width="20" />
              <p>Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
