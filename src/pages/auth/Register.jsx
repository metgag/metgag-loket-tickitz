import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router'
import Step from '../../components/Step'

export default function Register() {
  const [eye, setEye] = useState("nf-fa-eye");
  const [emailErr, setEmailErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [vpwd, setVpwd] = useState("password");
  const navigate = useNavigate();

  const stepItem = [
    { how: "Fill Form", bg: "#1D4ED8", color: "#4E4B66" },
    { how: "Activate", bg: "#A0A3BD", color: "#A0A3BD" },
    { how: "Done", bg: "#A0A3BD", color: "#A0A3BD" },
  ];

  function handleVpwd() {
    setVpwd(() => {
      if (vpwd === "password") {
        setEye("nf-fa-eye_slash");
        return "text";
      }
      setEye("nf-fa-eye");
      return "password";
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // destructure Array
    const [email, pwd] = e.target;
    const storeForm = {};
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
        Object.assign(storeForm, {
          email: email.value
        });
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
          Object.assign(storeForm, {
            password: pwd.value
          });
          isPwd = true;
        }
      }
    }

    if (isEmail && isPwd) {
      localStorage.setItem("user", JSON.stringify(storeForm));
      // console.log("Data berhasil disimpan ke localStorage");
      navigate("/auth/login");
    }
  }

  return (
    <Fragment>
      <div className="bg-[url(/avenger-bg.png)] bg-center bg-zinc-800 bg-blend-overlay flex flex-col items-center justify-center pb-[4rem] bg-cover w-screen h-screen text-sm">
        <div className="d-flex justify-center">
          <div className="logo">
            <img src="tickitz-logo.png" width="192" alt="" />
          </div>
        </div>
        <div className="card bg-white flex gap-[1rem] flex-col justify-between rounded-md p-[2rem] w-[384px]">
          <div className="steps flex items-center justify-between">
            {stepItem.map((item, i) => {
              return <Step i={i} how={item.how} bg={item.bg} color={item.color} />
            })}
          </div>

          <form className="reg flex flex-col gap-[.5rem]"
            onSubmit={handleSubmit}
          // onChange={handleChange}
          >
            <div className="flex flex-col gap-[.375rem]">
              <label className="gray-primary" htmlFor="email">Email</label>
              <input className="text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type="text" name="email" id="email"
                placeholder="Enter your email" />
              <p id="erremail" className="text-red-800 text-xs font-semibold">{emailErr}</p>
            </div>
            <div className="flex flex-col gap-[.375rem]">
              <label className="gray-primary" htmlFor="pwd">Password</label>
              <div className="pwd relative flex items-end">
                <input className="w-full text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type={vpwd} name="pwd" id="pwd"
                  placeholder="Enter your password" />
                <i onClick={handleVpwd} className={`nf ${eye} absolute right-0 pe-[.875rem] translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]`}></i>
              </div>
              <p id="errpwd" className="text-red-800 text-xs font-semibold">{pwdErr}</p>
            </div>
            <div className="flex items-center">
              <input required className="me-[12px] accent-[#1D4ED8]" type="checkbox" name="" id="terms" />
              <label className="text-[#696F79]" htmlFor="terms">I agree to terms & condition</label>
            </div>
            <button className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] py-[.875rem] font-semibold hover:opacity-[.8] cursor-pointer" type="submit">Join For Free
              Now</button>
            <p id="already" className="mx-auto font-medium text-[#696F79]">
              Already have an account? <a className="text-[#1D4ED8] underline" href="login.html">Log in</a></p>
            <div id="or" className="flex justify-center">
              <p className="text-[#AAAAAA]">Or</p>
            </div>
          </form>

          <div id="social" className="flex justify-between">
            <button className="flex flex-row items-center shadow-md cursor-pointer gap-[12px] p-[12px] bg-white rounded-[4px] w-[8rem] justify-center">
              <img src="/social/google.svg" width="20" alt="" />
              <p>Google</p>
            </button>
            <button className="flex flex-row items-center shadow-md cursor-pointer gap-[12px] p-[12px] bg-white rounded-[4px] w-[8rem] justify-center">
              <img src="/social/fb.png" width="20" />
              <p>Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
