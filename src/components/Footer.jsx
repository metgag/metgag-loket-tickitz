export default function Footer() {
  const hStyle = "font-bold mt-8 mb-2 md:mb-6 md:mt-0";
  const itmStyle = "flex md:flex-col gap-3";
  const explores = [
    "Cinemas", "Movies List", "My Ticket", "Notification"
  ];
  const socials = [
    { ico: "/social/fb.svg", sname: "Tickitz Cinema id" },
    { ico: "/social/ig.svg", sname: "tickitz.id" },
    { ico: "/social/tw.svg", sname: "tickitz.id" },
    { ico: "/social/yt.svg", sname: "Tickitz Cinema id" },
  ];

  return (
    <footer className="flex px-8 md:px-28 flex-col py-8 mt-16">
      <div className="top flex justify-between md:flex-row flex-col">
        <div className="foo-logo md:block">
          <img src="/tickitz-blu.svg"
            className='mb-6' />
          <p className='text-[#6E7191]'>Stop waiting in line. Buy tickets
            conveniently, watch movies quietly.</p>
        </div>
        <div className="explore">
          <h4 className={hStyle}>Explore</h4>
          <div className={itmStyle}>
            {explores.map((exp, i) => {
              return <Explore key={i} ename={exp} />
            })}
          </div>
        </div>
        <div className="sponsor">
          <h4 className={hStyle}>Our Sponsor</h4>
          <div className={itmStyle}>
            <img src="/sponsor/ebv.png" alt="" width="88" />
            <img src="/sponsor/cine.svg" alt=""
              width="124" />
            <img src="/sponsor/hif.svg" alt="" width="72" />
          </div>
        </div>
        <div className="follow">
          <h4 className={hStyle}>Follow us</h4>
          <div className={itmStyle}>
            {socials.map((social, i) => {
              return <SocialLink key={i} sname={social.sname} ico={social.ico} />
            })}
          </div>
        </div>
      </div>
      <p className='text-[#4E4B66] text-center mt-12'>&copy; 2020 Tickitz. All
        Rights Reserved.</p>
    </footer>
  )
}

function Explore(props) {
  return <p className="text-[#4E4B66]">{props.ename}</p>;
}

function SocialLink(props) {
  return (
    <div key={props.i} className="flex text-[#6E7191] gap-2 items-center">
      <img className={`size-6`} src={props.ico} alt="" />
      <p>{props.sname}</p>
    </div>
  )
}
