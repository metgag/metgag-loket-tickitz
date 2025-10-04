function ProfileCard() {
  return (
    <div
      className="flex gap-8 w-full flex-col"
    >
      <aside
        className="border
          flex flex-col bg-white text-[#4E4B66] rounded-3xl justify-self-start 
          md:w-fit">
        <div
          className="info flex flex-col p-[1.5rem_2.5rem] gap-[1.25rem] border-b border-[#DEDEDE]">
          <div className="btn flex items-end justify-between">
            <p>INFO</p>
            <i
              className="nf nf-oct-kebab_horizontal text-[#5F2EEA] hover:opacity-60"></i>
          </div>
          <div
            className="user-pic bg-[url(/vite.svg)] bg-center bg-cover shadow-lg rounded-full w-[7rem] h-[7rem] self-center">
          </div>
          <div className="whoami flex flex-col text-center gap-[.375rem]">
            <h3 className="font-semibold text-[#14142B]">Jonas El Rodriguez
            </h3>
            <p>Moviegoers</p>
          </div>
        </div>
        <div
          className="info-b flex flex-col py-[1.5rem] px-[2.5rem] gap-[1.25rem]">
          <div className="points flex flex-col gap-[1rem]">
            <h4>Loyalty Points</h4>
            <div
              className="point-count bg-[#1D4ED8] flex flex-col rounded-[.75rem] p-[.875rem] gap-[1.5rem] relative overflow-hidden shadow-[0_12px_0_-6px_rgba(29,78,216,0.5)]">
              <h4 className="text-white">Moviegoers</h4>
              <h3 className="text-white">320 <span
                className="text-xs">points</span></h3>
              <div
                className="circle w-[5rem] h-[5rem] rounded-full 
                bg-[#FFFFFF4D] absolute top-[-36px] right-[-6px] circle-1">
              </div>
              <div
                className="circle w-[5rem] h-[5rem] rounded-full 
                bg-[#FFFFFF4D] absolute top-[-14px] right-[-26px] circle-2">
              </div>
              <img className="star absolute w-[3rem] top-[-2px] right-[2px]"
                src="/assets/images/star.png" alt="" />
            </div>
          </div>
          <div className="bar-point flex flex-col items-center gap-[.625rem]">
            <h4 className="font-medium text-sm">180 points become a master
            </h4>
            <div
              className="bar w-[94%] md:w-[108%] bg-[#F5F6F8] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)] h-[.875rem] rounded-4xl bar-white">
              <div
                className="bar w-[45%] h-[.875rem] rounded-4xl bg-[#1D4ED8] bar-blu">
              </div>
            </div>
          </div>
        </div>
      </aside>

      <NavProfile />
    </div>
  )
}

function NavProfile() {
  return (
    <div
      className="account border p-[1.5rem_2rem] h-max rounded-2xl gap-[2.5rem] account-1 bg-white flex">
      <p>
        <h4
          className="text-[#14142B] font-semibold border-b 
          border-[#1D4ED8]">
          Account Settings
        </h4>
      </p>
      <p>
        <h4 className="text-[#AAAAAA] font-semibold yet-gray">
          Order History
        </h4>
      </p>
    </div>
  )
}

export default ProfileCard
