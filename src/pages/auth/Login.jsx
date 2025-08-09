import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { addUser } from '../../redux/slices/currUserSlice';

export default function Login() {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailErr, setEmailErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [vpwd, setVpwd] = useState("password");
  const [eye, setEye] = useState("nf-fa-eye");

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

    const emailIdx = users.findIndex((user) => {
      return user.email === email.value;
    });

    if (emailIdx === -1) {
      setEmailErr("Email tidak terdaftar")
      setPwdErr(null);
    } else {
      setEmailErr(null);

      if (users[emailIdx].pwd !== pwd.value) {
        setPwdErr("Password tidak cocok");
      } else {
        setPwdErr(null);
        dispatch(addUser(users[emailIdx]));
        navigate('/');
      }
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
          <div className="title flex flex-col gap-[.375rem]">
            <h2 className="text-2xl text-[#121212] font-bold">Welcome Back👋</h2>
            <p className="text-[#A0A3BD]">Sign in with your data that you entered during your registration</p>
          </div>

          <form className="reg flex flex-col gap-[.5rem]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[.375rem]">
              <label className="gray-primary" htmlFor="email">Email</label>
              <input className="text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type="text" name="" id="email"
                placeholder="Enter your email" />
              <p id="erremail" className="text-red-800 text-xs">{emailErr}</p>
            </div>
            <div className="flex flex-col gap-[.375rem]">
              <label className="gray-primary" htmlFor="pwd">Password</label>
              <div className="pwd relative flex items-end">
                <input className="w-full text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type={vpwd} name="" id="pwd"
                  placeholder="Enter your password" />
                <i onClick={handleVpwd}
                  className={`nf ${eye} absolute right-0 pe-[.875rem] 
                translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]`}></i>
              </div>
              <p id="errpwd" className="text-red-800 text-xs">{pwdErr}</p>
            </div>
            <Link className="text-[#1D4ED8] text-end 
              cursor-pointer underline"
              to='/auth/register'
            >
              Sign Up
            </Link>
            <button className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] 
            py-[.875rem] font-semibold hover:opacity-[.8] cursor-pointer"
              type="submit">
              Login
            </button>
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
