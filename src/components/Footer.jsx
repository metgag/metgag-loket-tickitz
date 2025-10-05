export default function Footer() {
  const headingStyle = "font-semibold mt-8 mb-2 md:mb-6 md:mt-0";
  const itemGroupStyle = "flex items md:flex-col gap-4";

  const exploreLinks = ["Cinemas", "Movies List", "My Ticket", "Notification"];
  const socialLinks = [
    { icon: "/social/fb.svg", label: "Tickitz Cinema id" },
    { icon: "/social/ig.svg", label: "tickitz.id" },
    { icon: "/social/tw.svg", label: "tickitz.id" },
    { icon: "/social/yt.svg", label: "Tickitz Cinema id" },
  ];

  return (
    <footer className="flex flex-col px-8 md:px-28 py-8 mt-16">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Logo & Tagline */}
        <div>
          <img src="/tickitz-blu.svg" alt="Tickitz Logo" className="mb-6" />
          <p className="text-[#6E7191]">
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </div>

        {/* Explore Section */}
        <div>
          <h4 className={headingStyle}>Explore</h4>
          <div className={itemGroupStyle}>
            {exploreLinks.map((link, i) => (
              <ExploreItem key={i} name={link} />
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div>
          <h4 className={headingStyle}>Our Sponsor</h4>
          <div className={itemGroupStyle}>
            <img src="/sponsor/ebv.png" alt="EBV Sponsor" width="88" />
            <img src="/sponsor/cine.svg" alt="CineOne Sponsor" width="124" />
            <img src="/sponsor/hif.svg" alt="Hiflix Sponsor" width="72" />
          </div>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className={headingStyle}>Follow us</h4>
          <div className={itemGroupStyle}>
            {socialLinks.map((social, i) => (
              <SocialItem key={i} icon={social.icon} label={social.label} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-[#6E7191] md:text-center mt-12">
        &copy; 2020 Tickitz. All Rights Reserved.
      </p>
    </footer>
  );
}

/* Sub Components */
function ExploreItem({ name }) {
  return <p className="text-[#6E7191]">{name}</p>;
}

function SocialItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-[#6E7191]">
      <img src={icon} alt={label} className="size-6" />
      <p
        className="hidden md:block"
      >{label}</p>
    </div>
  );
}

// export default function Footer() {
//   const hStyle = "font-bold mt-8 mb-2 md:mb-6 md:mt-0";
//   const itmStyle = "flex md:flex-col gap-3";
//   const explores = [
//     "Cinemas", "Movies List", "My Ticket", "Notification"
//   ];
//   const socials = [
//     { ico: "/social/fb.svg", sname: "Tickitz Cinema id" },
//     { ico: "/social/ig.svg", sname: "tickitz.id" },
//     { ico: "/social/tw.svg", sname: "tickitz.id" },
//     { ico: "/social/yt.svg", sname: "Tickitz Cinema id" },
//   ];

//   return (
//     <footer className="flex px-8 md:px-28 flex-col py-8 mt-16">
//       <div className="top flex justify-between md:flex-row flex-col">
//         <div className="foo-logo md:block">
//           <img src="/tickitz-blu.svg"
//             className='mb-6' />
//           <p className='text-[#6E7191]'>Stop waiting in line. Buy tickets
//             conveniently, watch movies quietly.</p>
//         </div>
//         <div className="explore">
//           <h4 className={hStyle}>Explore</h4>
//           <div className={itmStyle}>
//             {explores.map((exp, i) => {
//               return <Explore key={i} ename={exp} />
//             })}
//           </div>
//         </div>
//         <div className="sponsor">
//           <h4 className={hStyle}>Our Sponsor</h4>
//           <div className={itmStyle}>
//             <img src="/sponsor/ebv.png" alt="" width="88" />
//             <img src="/sponsor/cine.svg" alt=""
//               width="124" />
//             <img src="/sponsor/hif.svg" alt="" width="72" />
//           </div>
//         </div>
//         <div className="follow">
//           <h4 className={hStyle}>Follow us</h4>
//           <div className={itmStyle}>
//             {socials.map((social, i) => {
//               return <SocialLink key={i} sname={social.sname} ico={social.ico} />
//             })}
//           </div>
//         </div>
//       </div>
//       <p className='text-[#4E4B66] text-center mt-12'>&copy; 2020 Tickitz. All
//         Rights Reserved.</p>
//     </footer>
//   )
// }

// function Explore(props) {
//   return <p className="text-[#4E4B66]">{props.ename}</p>;
// }

// function SocialLink(props) {
//   return (
//     <div key={props.i} className="flex text-[#6E7191] gap-2 items-center">
//       <img className={`size-6`} src={props.ico} alt="" />
//       <p>{props.sname}</p>
//     </div>
//   )
// }
