function Preferences() {
  return (
    <>
      <div
        className="account p-[1.5rem_2rem] rounded-2xl px-[2rem] py-[1.5rem] account-2 bg-white">
        <h5
          className="text-[#14142B] font-semibold border-b border-[#DEDEDE] pb-[.75rem] mb-[2rem]">
          Details Information</h5>
        <div className="grid grid-cols-2 gap-[1.5rem] grid-details">
          <div className="detail flex flex-col gap-[.75rem] detail-1">
            <label className="text-sm text-[#4E4B66]" htmlFor="">First
              Name</label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="text" />
          </div>
          <div className="detail flex flex-col gap-[.75rem] detail-2">
            <label className="text-sm text-[#4E4B66]" htmlFor="">Last
              Name</label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="text" />
          </div>
          <div className="detail flex flex-col gap-[.75rem] detail-3">
            <label className="text-sm text-[#4E4B66]" htmlFor="">E-mail</label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="email" name="" id="" />
          </div>
          <div className="detail flex flex-col gap-[.75rem] detail-4">
            <label className="text-sm text-[#4E4B66]" htmlFor="">
              Phone Number
              </label>
            <input
              className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
              type="text" />
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
