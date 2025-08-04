function Subscription(props) {
  return (
    <section id="newsletter"
      className={`bg-[#2563EB] ${props.mx} flex flex-col items-center rounded-3xl px-12 py-20 gap-8`}>
      <h1 className="text-5xl text-white">Subscribe to our newsletter</h1>
      <form className="flex gap-3 flex-col w-full  md:flex-row md:justify-center" action="">
        <Input type={"text"} pder={"First name"} />
        <Input type={"email"} pder={"Email address"} />
        <button
          className="p-3 bg-white text-[#1D4ED8] rounded-md font-semibold px-12"
        >
          Subscribe Now
        </button>
      </form>
      <div className="circle"></div>
    </section>
  )
}

function Input(props) {
  return (
    <input type={props.type} placeholder={props.pder} className={
      `border border-white rounded-md p-3 text-white`
    } />
  );
}

export default Subscription
