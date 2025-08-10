import PaymOutput from '../../components/PaymOutput'
import InputItem from '../../components/InputItem'
import PaymMethod from '../../components/PaymMethod'
import Step from '../../components/Step'
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/slices/detailSlice';
import { useNavigate } from 'react-router';

function Payment() {
  const { detail, result, seat } = useSelector((state) => state.detail.detail);
  // const user = useSelector((state) => state.currUser.currUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const whoami = JSON.parse(localStorage.getItem('whoami'));

  const paymResult = [
    { head: "DATE & TIME", content: `${result.date} at ${result.time}` },
    { head: "MOVIE TITLE", content: `${detail.title}` },
    { head: "CINEMA NAME", content: "CineOne21 Cinema" },
    { head: "NUMBER OF TICKETS", content: `${seat.length} pcs` },
  ];
  const formItems = [
    { label: "Full Name", id: "fname", type: "text" },
    { label: "Email", id: "email", type: "email", value: whoami.email },
    { label: "Phone Number", id: "pnumber", type: "text" },
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

  // const stepItem = [
  //   { how: "Dates and Time", bg:"#008000", color: "#1D4ED8" },
  //   { how: "Seat", bg:"#008000", color: "#1D4ED8" },
  //   { how: "Seat", bg:"#1D4ED8", color: "#FFFFFF" },
  // ];

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const info = {};

    for (let i = 0; i < 3; i++) {
      Object.assign(info, {
        [form[i].id]: form[i].value
      });
    }

    dispatch(getDetail({ info: info }));
  }

  return (
    <main className="bg-[#A0A3BD33] flex flex-col items-center pt-[2rem] pb-[7rem]">
      <div className="steps flex items-center">
      </div>

      <div className="payment-card flex flex-col w-[32rem] bg-white rounded-[6px] p-[1.75rem]">
        <div className="pay-info flex flex-col gap-[1rem]">
          <h3 className="text-[#14142B] text-2xl font-semibold">Payment Info</h3>
          <div className="output flex flex-col gap-4">
            {paymResult.map((paym, i) => {
              return <PaymOutput key={i} head={paym.head} content={paym.content} />
            })}
            <div className="total flex flex-col">
              <h5>TOTAL PAYMENT</h5>
              <p className="text-[#1D4ED8] font-bold">
                {`$${seat.length * 10},00`}
              </p>
            </div>
          </div>
        </div>
        <div className="personal-info flex flex-col gap-[1rem]">
          <h3 className="text-[#14142B] text-2xl font-semibold mt-6">Personal Information</h3>
          <form onSubmit={handleSubmit}>
            {formItems.map((item, i) => {
              return <InputItem key={i} label={item.label} id={item.id} name={item.id} type={item.type} value={item.value} />
            })}
            <div className="pay-method flex flex-col gap-[1rem]">
              <h3 className="text-[#14142B] text-2xl font-semibold mt-4">Payment Method</h3>
              <div className="grid-method grid w-full grid-cols-4 gap-[1rem]">
                {paymMethod.map((method, i) => {
                  return <PaymMethod key={i} src={method} />
                })}
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#1D4ED8] p-[.75rem] rounded-[2px] font-semibold text-white hover:cursor-pointer hover:opacity-[.8]" type="submit"
              onClick={() => navigate('/movie/ticket')}
            >
              Pay your order
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Payment