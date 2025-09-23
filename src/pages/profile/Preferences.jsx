// import { useSelector } from "react-redux"
// import { useContext } from 'react';
import { useSelector } from "react-redux";
import { orderContext as OrderContext } from "../../context/order/orderContext";

function Preferences() {
  // const user = useSelector((state) => state.currUser.currUser);
  const { email } = useSelector((state) => state.whoami);
  const { fname, pnumber } = useSelector((state) => state.userInfo);
  const splitName = fname && fname.split(" ");

  return (
    <>
      <div
        className="account p-[1.5rem_2rem] rounded-2xl px-[2rem] py-[1.5rem] account-2 bg-white">
        <h5
          className="text-[#14142B] font-semibold border-b border-[#DEDEDE] pb-[.75rem] mb-[2rem]">
          Details Information</h5>
        <div className="grid grid-cols-2 gap-[1.5rem] grid-details">
          <div className="frname flex flex-col gap-[.75rem] detail-1">
            <label className="text-sm text-[#4E4B66]" htmlFor="fname">First
              Name</label>
            <input
              id="fname"
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="text"
              defaultValue={splitName ? splitName[0] : ""}
            />
          </div>
          <div className="detail flex flex-col gap-[.75rem] detail-2">
            <label className="text-sm text-[#4E4B66]" htmlFor="lname">Last
              Name</label>
            <input
              id="lname"
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="text"
              defaultValue={splitName ? splitName[1] : ""}
            />
          </div>
          <div className="detail flex flex-col gap-[.75rem] detail-3">
            <label className="text-sm text-[#4E4B66]" htmlFor="">E-mail</label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="email" name="" id="" defaultValue={email} />
          </div>
          <div className="detail flex flex-col gap-[.75rem] detail-4">
            <label className="text-sm text-[#4E4B66]" htmlFor="pnumber">
              Phone Number
            </label>
            <input
              id="pnumber"
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="text"
              defaultValue={pnumber}
            />
          </div>
        </div>
      </div>
      <div className="account p-[1.5rem_2rem] rounded-2xl account-3 bg-white">
        <h5
          className="text-[#14142B] font-semibold border-b border-[#DEDEDE] 
            pb-[.75rem] mb-[2rem]">
          Account and Privacy</h5>
        <div className="grid grid-cols-2 gap-[1.5rem] ch-pass-grid">
          <div className="pass flex flex-col gap-[.75rem] pass-1">
            <label className="text-sm text-[#4E4B66]" htmlFor="">New
              Password</label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="password" name="" id=""
              placeholder="Write your password" />
          </div>
          <div className="pass flex flex-col gap-[.75rem] pass-2">
            <label className="text-sm text-[#4E4B66]" htmlFor="">Confirm
              Password</label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="password" name="" id=""
              placeholder="Confirm your password" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Preferences
