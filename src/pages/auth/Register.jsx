import { Fragment } from 'react'

export default function register() {
  return (
    <Fragment>
      <div className="bg-[url(../../public/avenger-bg.png)] bg-center bg-zinc-800 bg-blend-overlay flex flex-col items-center justify-center pb-[4rem] bg-cover w-screen h-screen">
        <div class="d-flex justify-center">
          <div class="logo">
            <img src="../../../public/tickitz-logo.png" width="192" alt="" />
          </div>
        </div>
        <div className="card bg-white flex flex-col justify-between rounded-md p-[2rem] w-[384px] h-[70vh]">
          <div className="steps flex items-center justify-between">
            <div className="step step-1 gap-[8px] flex flex-col items-center">
              <div className="dot w-[32px] h-[32px] bg-[#1D4ED8] rounded-full grid place-items-center text-white">1</div>
              <p className="how">Fill Form</p>
            </div>
            <div className="dash-line">
              <img src="/assets/images/dash-line.svg" alt="" />
            </div>
            <div className="step step-2 gap-[8px] flex flex-col items-center">
              <div className="dot w-[32px] h-[32px] rounded-full bg-[#A0A3BD] grid place-items-center text-white">
                <p>2</p>
              </div>
              <p className="how">Activate</p>
            </div>
            <div className="dash-line">
              <img src="/assets/images/dash-line.svg" alt="" />
            </div>
            <div className="step step-3 gap-[8px] flex flex-col items-center">
              <div className="dot w-[32px] h-[32px] rounded-full bg-[#A0A3BD] grid place-items-center text-white">
                <p>3</p>
              </div>
              <p className="how">Done</p>
            </div>
          </div>

          <form className="reg flex flex-col">
            <div className="flex flex-col">
              <label className="gray-primary" htmlFor="email">Email</label>
              <input className="text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type="text" name="" id="email"
                placeholder="Enter your email" />
              <p id="erremail"></p>
            </div>
            <div className="flex flex-col">
              <label className="gray-primary" htmlFor="pwd">Password</label>
              <div className="pwd relative flex items-end">
                <input className="w-full text-[#A0A3BD] rounded-[3px] p-3 ps-4 border border-[#DEDEDE] bg-[#FCFDFE]" type="password" name="" id="pwd"
                  placeholder="Enter your password" />
                <i className="nf nf-fa-eye absolute right-0 pe-[.875rem] translate-y-[-75%] hover:cursor-pointer hover:opacity-[.6]"></i>
              </div>
              <p id="errpwd"></p>
            </div>
            <div className="flex items-center">
              <input className="me-[12px] accent-[#1D4ED8]" type="checkbox" name="" id="terms" />
              <label className="text-[#696F79]" htmlFor="terms">I agree to terms & condition</label>
            </div>
            <button className="bg-[#1D4ED8] text-[#F7F7FC] rounded-[2px] py-[.875rem] font-semibold hover:opacity-[.8] cursor-pointer" type="submit">Join For Free
              Now</button>
            <p id="already" className="mx-auto font-medium text-[#696F79]">
              Already have an account? <a className="text-[#1D4ED8]" href="login.html">Log in</a></p>
            <div id="or" className="flex justify-center">
              <p className="text-[#AAAAAA]">Or</p>
            </div>
          </form>

          <div id="social" className="flex justify-between">
            <button className="flex flex-row items-center shadow-md cursor-pointer gap-[12px] p-[12px] bg-white rounded-[4px] w-[8rem] justify-center">
              <img src="../../../public/social/google.svg" width="20" alt="" />
              <p>Google</p>
            </button>
            <button className="flex flex-row items-center shadow-md cursor-pointer gap-[12px] p-[12px] bg-white rounded-[4px] w-[8rem] justify-center">
              <img src="../../../public/social/fb.png" width="20" />
              <p>Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
