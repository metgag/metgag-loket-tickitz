import { Fragment, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { resetPwd } from "../../redux/slices/authSlice";
import toast, { Toaster } from 'react-hot-toast';
import { regContext } from '../../context/users/regContext';

function Forget() {
  const { users } = useContext(regContext);
  const [vpwd, setVpwd] = useState("password");
  const [eye, setEye] = useState("nf-fa-eye");
  const [err, setErr] = useState(
    { email: false, pwd: false, emailMsg: "", pwdMsg: "", confirmMsg: "" }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const [email, pwd, confirm] = e.target;

    const isValid = users.some((e) => {
      return e.email === email.value;
    });

    if (isValid) {
      setErr({ ...err, email: true });
      email.disabled = true;
    } else {
      setErr({ ...err, emailMsg: "Tidak dapat menemukan email" });
    }

    if (pwd.value !== "" &&
      confirm.value !== "") {

      if (pwd.value !== confirm.value) {
        setErr({
          ...err, pwd: false, confirmMsg: "password tidak sesuai"
        });
      } else { setErr({ ...err, pwd: true, confirmMsg: "" }); }
    }

    if (err.email && err.pwd) {
      // dispatch(resetPwd({ email: email.value, pwd: pwd.value }));
      toast("mengalihkan ke halaman login");
      toast.success("Password berhasil diubah");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1800);
    }
  }

  function handlePwd(e) {
    const pwd = e.target.value;

    if (pwd.length < 8) {
      setErr({
        ...err,
        pwd: true,
        pwdMsg: "Password minimal 8 karakter"
      });
    } else {
      // validasi format
      const rePwd = /^(?=.*[a-z])(?=.+[A-Z])(?=.+[!@#$%^&*/><]).{8,}$/;
      if (!rePwd.test(pwd)) {
        setErr({
          ...err,
          pwd: true,
          pwdMsg: "Password harus memiliki minimal 8 karakter, huruf kecil, huruf besar, dan satu karakter spesial (!@#$%^&*/><)"
        });
      } else {
        setErr({ ...err, pwd: false, pwdMsg: "" });
      }
    }

    pwd === "" && setErr({ ...err, pwd: false, pwdMsg: "" });
  }

  return (
    <Fragment>
      <Toaster />
      <div className="bg-[url(/avenger-bg.png)] bg-center bg-zinc-800 bg-blend-overlay flex flex-col items-center justify-center pb-[4rem] bg-cover w-screen h-screen text-sm">
        <div className="d-flex justify-center">
          <div className="logo">
            <img src="/tickitz-logo.png" width="192" alt="" />
          </div>
        </div>
        <div className="card bg-white flex gap-[1rem] flex-col justify-between rounded-md p-[2rem] w-[384px]">
          <i className="nf nf-oct-arrow_left text-xl cursor-pointer hover:opacity-50"
            onClick={() => navigate("/auth/login")}
          ></i>
          <div className="title flex flex-col gap-[.375rem]">
            <h2 className="text-2xl text-[#121212] font-bold">Reset Password</h2>
            <p className="text-[#A0A3BD]">Reset your password if you forgot them,</p>
          </div>

          <form className="forg flex flex-col gap-[.5rem]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-[.375rem]">
              <label className="gray-primary" htmlFor="email">Email</label>
              <input className="placeholder:text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type="text" name="email" id="email"
                placeholder="Enter your email" />
              {!err.email &&
                <p id="erremail" className="text-red-800 text-xs">
                  {err.emailMsg}
                </p>
              }
            </div>
            {err.email &&
              <>
                <div className="flex flex-col gap-[.375rem]">
                  <label className="gray-primary" htmlFor="pwd">Password</label>
                  <div className="pwd relative flex items-end">
                    <input className="w-full placeholder:text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type={vpwd} name="pwd" id="pwd"
                      placeholder="Enter new password" onChange={handlePwd} />
                    <i onClick={handleVpwd}
                      className={`nf ${eye} absolute right-0 pe-[.875rem] 
                translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]`}></i>
                  </div>
                  {err.pwd &&
                    <p id="errpwd" className="text-red-800 text-xs">
                      {err.pwdMsg}
                    </p>
                  }
                </div>
                <div className="flex flex-col gap-[.375rem]">
                  <label className="gray-primary" htmlFor="confirm">Confirm Password</label>
                  <div className="pwd relative flex items-end">
                    <input className="w-full placeholder:text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type={vpwd} name="confirm" id="confirm"
                      placeholder="Confirm new password" />
                    <i onClick={handleVpwd}
                      className={`nf ${eye} absolute right-0 pe-[.875rem] 
                translate-y-[-120%] hover:cursor-pointer hover:opacity-[.6]`}></i>
                  </div>
                  {!err.pwd &&
                    <p id="errconfirm" className="text-red-800 text-xs">
                      {err.confirmMsg}
                    </p>
                  }
                </div>
              </>
            }
            <button className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] 
            py-2 font-semibold hover:opacity-[.8] cursor-pointer mt-4"
              type="submit">
              Reset
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Forget;
