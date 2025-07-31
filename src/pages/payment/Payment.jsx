import PaymOutput from '../../components/PaymOutput'
import InputItem from '../../components/InputItem'
import PaymMethod from '../../components/PaymMethod'
import Step from '../../components/Step'

function Payment() {
  const paymResult = [
    { head: "DATE & TIME", content: "Tuesday, 07 July 2020 at 02:00pm" },
    { head: "MOVIE TITLE", content: "Spider-Man: Homecoming" },
    { head: "CINEMA NAME", content: "CineOne21 Cinema" },
    { head: "NUMBER OF TICKETS", content: "3 pieces" },
  ];
  const formItems = [
    { label: "Full Name", id:"fname", value: "Jonas El Rodriguez", type: "text" },
    { label: "Email", id:"email", value: "jonasrodri123@gmail.com", type: "email" },
    { label: "Phone Number", id:"pnumber", value: "81445687121", type: "text" },
  ];
  const paymMethod = [
    "/payment-method/gpay.png",
    "/payment-method/visa.png",
    "/payment-method/gopay.png",
    "/payment-method/paypal.png",
    "/payment-method/dana.png",
    "/payment-method/bca.png",
    "/payment-method/bri.png",
    "/payment-method/ovo.png",
  ];
  const stepItem = [
    { how: "Dates and Time", bg:"#008000", color: "#1D4ED8" },
    { how: "Seat", bg:"#008000", color: "#1D4ED8" },
    { how: "Seat", bg:"#1D4ED8", color: "#FFFFFF" },
  ];

  return (
    <main className="bg-[#A0A3BD33] flex flex-col items-center pt-[2rem] pb-[7rem]">
      <div className="steps flex items-center">
        {stepItem.map((item, i) => {
          return <Step i={i} how={item.how} bg={item.bg} color={item.color} />
        })}
      </div>

      <div className="payment-card flex flex-col w-[32rem] bg-white rounded-[6px] p-[1.75rem]">
        <div className="pay-info flex flex-col gap-[1rem]">
          <h3 className="text-[#14142B] text-2xl font-semibold">Payment Info</h3>
          <div className="output">
            {paymResult.map((paym, i) => {
              return <PaymOutput i={i} head={paym.head} content={paym.content} />
            })}
            <div className="total flex flex-col">
              <h5>TOTAL PAYMENT</h5>
              <p className="text-[#1D4ED8] font-bold">$30,00</p>
            </div>
          </div>
        </div>
        <div className="personal-info flex flex-col gap-[1rem]">
          <h3 className="text-[#14142B] text-2xl font-semibold">Personal Information</h3>
          <form action="">
            {formItems.map((item, i) => {
              return <InputItem i={i} label={item.label} id={item.id} value={item.value} type={item.type} />
            })}
            <div className="pay-method flex flex-col gap-[1rem]">
              <h3 className="text-[#14142B] text-2xl font-semibold">Payment Method</h3>
              <div className="grid-method grid w-full grid-cols-4 gap-[1rem]">
                {paymMethod.map((method, i) => {
                  return <PaymMethod i={i} src={method} />
                })}
              </div>
            </div>
            <button className="w-full bg-[#1D4ED8] p-[.75rem] rounded-[2px] font-semibold text-white" type="submit">Pay your order</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Payment