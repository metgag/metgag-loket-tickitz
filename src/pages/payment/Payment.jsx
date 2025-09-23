import PaymOutput from '../../components/PaymOutput'
import InputItem from '../../components/InputItem'
import PaymMethod from '../../components/PaymMethod'
// import Step from '../../components/Step'
import { useDispatch, useSelector } from 'react-redux';
// import { addToStore, getDetail } from '../../redux/slices/detailSlice';
import { useNavigate } from 'react-router';
import { format, set } from 'date-fns';
import { useContext, useState } from 'react';
import { orderContext as OrderContext } from '../../context/order/orderContext';
import { historyContext as HistoryContext } from '../../context/history/historyContext';
import { addInfo } from '../../redux/slices/personalSlice';
import { addHistory } from '../../redux/slices/historySlice';
import useLocalStorage from '../../hooks/useLocalStorage';

function Payment() {
  const { schedule, movie, seat } = useSelector((state) => state.currDetail);
  const [pop, setPop] = useState(false);
  const { email } = useSelector((state) => state.whoami);
  // const { mkOrder, currOrder } = useContext(OrderContext);
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state);

  const paymResult = [
    { head: "DATE & TIME", content: `${format(schedule.date, "EEEE, dd LLLL yyyy")} at ${schedule.time.replaceAll(" ", "").toLowerCase()}` },
    { head: "MOVIE TITLE", content: `${movie.title}` },
    { head: "CINEMA NAME", content: "CineOne21 Cinema" },
    { head: "NUMBER OF TICKETS", content: `${seat.length} pcs` },
  ];
  const formItems = [
    { label: "Full Name", id: "fname", type: "text" },
    { label: "Email", id: "email", type: "email", value: email },
    { label: "Phone Number", id: "pnumber", type: "text" },
  ];
  const paymMethod = [
    "gpay",
    "visa",
    "gopay",
    "paypal",
    "dana",
    "bca",
    "bri",
    "ovo",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const info = {};

    for (let i = 0; i < 4; i++) {
      if (i === 3) {
        for (const method of e.target.method) {
          if (method.checked) {
            Object.assign(info, {
              method: method.id
            });
          }
        }
        continue;
      };

      Object.assign(info, {
        [form[i].id]: form[i].value
      });
    }
    // console.log(info);

    dispatch(addInfo({
      fname: info.fname,
      pnumber: info.pnumber
    }));
    // dispatch(addHistory())
    // mkOrder({ ...currOrder, info });
    // console.log(info);
    // dispatch(getDetail({ info: info }));
    // dispatch(addToStore({ selected, orderDetail }));
  }

  return (
    <main className={`flex justify-center ${pop && "bg-black/60"}`}>
      <section className="bg-[#A0A3BD33] flex flex-col items-center pt-[2rem] pb-[7rem] w-screen">
        <div className="steps flex items-center">
        </div>

        <div className={`payment-card flex flex-col w-[32rem] bg-white rounded-[6px] p-[1.75rem]
          ${pop && "brightness-50"}
          `}>
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
            <form
              // onSubmit={(e) => e.preventDefault()}
              onSubmit={handleSubmit}
            >
              {formItems.map((item, i) => {
                return <InputItem key={i} label={item.label} id={item.id} name={item.id} type={item.type} value={item.value} />
              })}
              <div className="pay-method flex flex-col gap-[1rem]">
                <h3 className="text-[#14142B] text-2xl font-semibold mt-4">Payment Method</h3>
                <ul className="grid-method grid w-full grid-cols-4 gap-[1rem]">
                  {paymMethod.map((method, i) => {
                    return <PaymMethod key={i} method={method} i={i} />
                  })}
                </ul>
              </div>
              <button
                className="w-full mt-6 bg-[#1D4ED8] p-[.75rem] rounded-[2px] font-semibold text-white hover:cursor-pointer hover:opacity-[.8]" type="submit"
                onClick={() => setPop(!pop)}
              >
                Pay your order
              </button>
            </form>
          </div>
        </div>
      </section>

      <Modal pop={pop} onClose={() => setPop(!pop)} />

    </main>
  )
}

function Modal({ pop, onClose }) {
  const navigate = useNavigate();
  const { schedule } = useSelector((state) => state.currDetail);
  const { currOrder, mkOrder } = useContext(OrderContext)

  const endPaym = parseInt(schedule.date.split("-")[2]) + 2;
  const endDate = set(new Date(schedule.date), { date: endPaym })

  return (
    <div className={`paym-info flex flex-col w-9/10 absolute z-9998 md:w-3/10 h-min self-center bg-white rounded-xl p-6 gap-7 shadow-xl transition-all
      ${pop ? "visible scale-100 opacity-100" : "invisible scale-105 opacity-0"}
    `}>
      <h3 className='self-center text-[#14142B] text-xl font-bold'>Payment Info</h3>
      <div className="no-rek flex flex-col md:flex-row md:items-center justify-between">
        <p className='text-[#8692A6] text-sm'>No. Rekening Virtual</p>
        <div className="side flex items-center gap-3.5 justify-between md:justify-start">
          <p className='font-bold text-[#14142B] text-lg'>12321328913829724</p>
          <button className='border border-[#1d4ed8] rounded-sm bg-transparent p-2.5 px-4 text-[#1d4ed8] hover:opacity-60 cursor-pointer'
            onClick={(e) => {
              e.target.textContent = "Copied";
              setTimeout(() => {
                e.target.textContent = "Copy";
              }, 1800);
            }}
          >Copy</button>
        </div>
      </div>
      <div className="total flex justify-between flex-col md:flex-row">
        <p className='text-[#8692A6] text-sm'>Total Payment</p>
        <h4 className='text-[#1d4ed8] text-xl font-bold mt-3 md:mt-0'>$30</h4>
      </div>
      <p className='text-[#8692A6] text-justify'>Pay this payment bill before it is due, <span className='text-[#D00707] font-medium'>on {format(endDate, "LLLL dd, yyyy")}</span>. If the bill has not been paid by the
        specified
        time, it will be forfeited</p>
      <div className="btn flex items-center text-center flex-col gap-2.5 mb-8">
        <button className='w-full py-3.5 text-white bg-[#1d4ed8] rounded-md font-bold shadow-lg cursor-pointer hover:opacity-90'
          onClick={() => {
            mkOrder({ ...currOrder, isPaid: true });

            navigate("/movie/ticket");
            // rmOrder();
          }}
        >
          Check Payment
        </button>
        <button id="pay-later"
          onClick={() => {
            mkOrder({ ...currOrder, isPaid: false });

            navigate("/movie/ticket");
            // rmOrder();
          }}
          className='w-max py-3.5 font-bold text-[#1d4ed8] cursor-pointer hover:opacity-60'
        >Pay Later</button>
      </div>
    </div>
  );
}

export default Payment