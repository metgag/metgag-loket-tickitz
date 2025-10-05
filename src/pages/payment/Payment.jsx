import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PaymOutput from "../../components/PaymOutput";
import InputItem from "../../components/InputItem";
import PaymMethod from "../../components/PaymMethod";
import { getIdFromPos } from "../../utils/convSeat";
import { convertTime } from "../../utils/convertTime";
import { addDays, format, parseISO } from "date-fns";

function Payment() {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { token, email } = useSelector((state) => state.auth);
  const { movie, schedule, seats } = useSelector((state) => state.order);

  const { title } = movie;
  const { showDate, scheduleId, showCinemaName } = schedule;

  const [fullName, setFullName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const [cinemaInfo, setCinemaInfo] = useState({
    time: "",
  });

  const seatsId = seats.map((e) => getIdFromPos(e));

  const [paymentBody, setPaymentBody] = useState({
    schedule_id: Number(scheduleId),
    payment_method: null,
    total: seats.length * 10,
    seats: seatsId,
    paid_at: false,
  });

  // Fetch user info
  useEffect(() => {
    const url = `${import.meta.env.VITE_BASE_API_URL}/users/`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(new Request(url, requestOptions))
      .then((res) => {
        if (!res.ok) throw res.statusText;
        return res.json();
      })
      .then((data) => {
        const { first_name, last_name, phone_number } = data.result;
        if (first_name && last_name) setFullName(`${first_name} ${last_name}`);
        if (phone_number) setPhoneNum(phone_number);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // Fetch cinema info
  useEffect(() => {
    if (!scheduleId) return;

    const fetchCinemaData = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_API_URL}/cinemas/${scheduleId}/selected`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(response.statusText);

        const { result } = await response.json();
        setCinemaInfo({
          time: convertTime(result.time),
        });
      } catch (error) {
        console.error("Error fetching cinema info:", error);
      }
    };

    fetchCinemaData();
  }, [scheduleId, token]);

  const parsedDate = parseISO(showDate);

  // Format: Weekday, dd MMMM yyyy
  const formattedDate = format(parsedDate, "EEEE, dd MMMM yyyy");

  const showTime = cinemaInfo.time.split(" ").join("").toLowerCase();

  const paymentSummary = [
    { head: "DATE & TIME", content: `${formattedDate} at ${showTime}` },
    { head: "MOVIE TITLE", content: title },
    { head: "CINEMA NAME", content: showCinemaName },
    { head: "NUMBER OF TICKETS", content: `${seats.length} pcs` },
  ];

  const personalFormFields = [
    { label: "Full Name", id: "fname", type: "text", value: fullName },
    { label: "Email", id: "email", type: "email", value: email },
    { label: "Phone Number", id: "pnumber", type: "text", value: phoneNum },
  ];

  const availableMethods = [
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
        for (const method of form.method) {
          if (method.checked) {
            setPaymentBody((prev) => ({
              ...prev,
              payment_method: method.id,
            }));
          }
        }
        continue;
      }
      Object.assign(info, { [form[i].id]: form[i].value });
    }
  }

  return (
    <main className={`flex justify-center ${showModal && "bg-black/60"}`}>
      <section className="bg-[#A0A3BD33] flex flex-col items-center pt-8 pb-28 w-screen">
        <div className="steps flex items-center" />

        <div
          className={`payment-card flex flex-col w-[32rem] bg-white rounded-[6px] p-7 ${showModal && "brightness-50"
            }`}
        >
          {/* Payment Info */}
          <div className="pay-info flex flex-col gap-4">
            <h3 className="text-[#14142B] text-2xl font-semibold">
              Payment Info
            </h3>
            <div className="output flex flex-col gap-4">
              {paymentSummary.map((item, i) => (
                <PaymOutput key={i} head={item.head} content={item.content} />
              ))}
              <div className="total flex flex-col">
                <h5>TOTAL PAYMENT</h5>
                <p className="text-[#1D4ED8] font-bold">
                  {`$${seats.length * 10},00`}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="personal-info flex flex-col gap-4">
            <h3 className="text-[#14142B] text-2xl font-semibold mt-6">
              Personal Information
            </h3>
            <form onSubmit={handleSubmit}>
              {personalFormFields.map((field, i) => (
                <InputItem
                  key={i}
                  label={field.label}
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={field.value}
                />
              ))}

              {/* Payment Method */}
              <div className="pay-method flex flex-col gap-4">
                <h3 className="text-[#14142B] text-2xl font-semibold mt-4">
                  Payment Method
                </h3>
                <ul className="grid grid-cols-4 gap-4">
                  {availableMethods.map((method, i) => (
                    <PaymMethod key={i} method={method} i={i} />
                  ))}
                </ul>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-[#1D4ED8] p-3 rounded-sm font-semibold text-white hover:cursor-pointer hover:opacity-80"
                onClick={() => setShowModal(!showModal)}
              >
                Pay your order
              </button>
            </form>
          </div>
        </div>
      </section>

      <Modal
        pop={showModal}
        onClose={() => setShowModal(!showModal)}
        paymentBody={paymentBody}
        setPaymentBody={setPaymentBody}
        parsedDate={parsedDate}
      />
    </main>
  );
}

function Modal({ pop, paymentBody, setPaymentBody, parsedDate }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const modalRef = useRef(null);

  const dueDate = addDays(parsedDate, 2);
  const formattedDate = format(dueDate, "EEEE, dd MMMM yyyy");

  // Scroll to modal when it pops up
  useEffect(() => {
    if (pop && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pop]);

  function handlePayment(body) {
    const url = `${import.meta.env.VITE_BASE_API_URL}/orders`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw res.statusText;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // navigate("/movie/ticket"); // optional redirect
      })
      .catch((err) => console.error(err));
  }

  return (
    <div
      ref={modalRef}
      className={`paym-info flex flex-col w-9/10 absolute z-9998 md:w-3/10 h-min self-center bg-white rounded-xl p-6 gap-7 shadow-xl transition-all ${pop
          ? "visible scale-100 opacity-100"
          : "invisible scale-105 opacity-0"
        }`}
    >
      <h3 className="self-center text-[#14142B] text-xl font-bold">
        Payment Info
      </h3>

      {/* Virtual Account */}
      <div className="no-rek flex flex-col md:flex-row md:items-center justify-between">
        <p className="text-[#8692A6] text-sm">No. Rekening Virtual</p>
        <div className="side flex items-center gap-3.5 justify-between md:justify-start">
          <p className="font-bold text-[#14142B] text-lg">12321328913829724</p>
          <button
            className="border border-[#1d4ed8] rounded-sm bg-transparent p-2.5 px-4 text-[#1d4ed8] hover:opacity-60 cursor-pointer"
            onClick={(e) => {
              e.target.textContent = "Copied";
              setTimeout(() => {
                e.target.textContent = "Copy";
              }, 1800);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="total flex justify-between flex-col md:flex-row">
        <p className="text-[#8692A6] text-sm">Total Payment</p>
        <h4 className="text-[#1d4ed8] text-xl font-bold mt-3 md:mt-0">$30</h4>
      </div>

      <p className="text-[#8692A6] text-justify">
        Pay this payment bill before it is due,{" "}
        <span className="text-[#D00707] font-medium">{formattedDate}</span>
        . If the bill has not been paid by the specified time, it will be
        forfeited
      </p>

      {/* Actions */}
      <div className="btn flex items-center text-center flex-col gap-2.5">
        <button
          className="w-full py-3.5 text-white bg-[#1d4ed8] rounded-md font-bold shadow-lg cursor-pointer hover:opacity-90"
          onClick={() => {
            const updated = { ...paymentBody, paid_at: true };
            setPaymentBody(updated);
            handlePayment(updated);
            navigate("/movie/ticket");
          }}
        >
          Check Payment
        </button>

        <button
          id="pay-later"
          onClick={() => {
            const updated = { ...paymentBody, paid_at: false };
            setPaymentBody(updated);
            handlePayment(updated);
            navigate("/movie/ticket");
          }}
          className="w-max py-3.5 font-bold text-[#1d4ed8] cursor-pointer hover:opacity-60"
        >
          Pay Later
        </button>
      </div>
    </div>
  );
}

// function Modal({ pop, paymentBody, setPaymentBody }) {
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);

//   function handlePayment(body) {
//     const url = `${import.meta.env.VITE_BASE_API_URL}/orders`;
//     const options = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     };

//     fetch(url, options)
//       .then((res) => {
//         if (!res.ok) throw res.statusText;
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         // navigate("/movie/ticket"); // optional redirect
//       })
//       .catch((err) => console.error(err));
//   }

//   return (
//     <div
//       className={`paym-info flex flex-col w-9/10 absolute z-9998 md:w-3/10 h-min self-center bg-white rounded-xl p-6 gap-7 shadow-xl transition-all ${
//         pop
//           ? "visible scale-100 opacity-100"
//           : "invisible scale-105 opacity-0"
//       }`}
//     >
//       <h3 className="self-center text-[#14142B] text-xl font-bold">
//         Payment Info
//       </h3>

//       {/* Virtual Account */}
//       <div className="no-rek flex flex-col md:flex-row md:items-center justify-between">
//         <p className="text-[#8692A6] text-sm">No. Rekening Virtual</p>
//         <div className="side flex items-center gap-3.5 justify-between md:justify-start">
//           <p className="font-bold text-[#14142B] text-lg">12321328913829724</p>
//           <button
//             className="border border-[#1d4ed8] rounded-sm bg-transparent p-2.5 px-4 text-[#1d4ed8] hover:opacity-60 cursor-pointer"
//             onClick={(e) => {
//               e.target.textContent = "Copied";
//               setTimeout(() => {
//                 e.target.textContent = "Copy";
//               }, 1800);
//             }}
//           >
//             Copy
//           </button>
//         </div>
//       </div>

//       {/* Total */}
//       <div className="total flex justify-between flex-col md:flex-row">
//         <p className="text-[#8692A6] text-sm">Total Payment</p>
//         <h4 className="text-[#1d4ed8] text-xl font-bold mt-3 md:mt-0">$30</h4>
//       </div>

//       <p className="text-[#8692A6] text-justify">
//         Pay this payment bill before it is due,{" "}
//         <span className="text-[#D00707] font-medium">{/* due date here */}</span>
//         . If the bill has not been paid by the specified time, it will be
//         forfeited
//       </p>

//       {/* Actions */}
//       <div className="btn flex items-center text-center flex-col gap-2.5 mb-8">
//         <button
//           className="w-full py-3.5 text-white bg-[#1d4ed8] rounded-md font-bold shadow-lg cursor-pointer hover:opacity-90"
//           onClick={() => {
//             const updated = { ...paymentBody, paid_at: true };
//             setPaymentBody(updated);
//             handlePayment(updated);
//             navigate("/movie/ticket");
//           }}
//         >
//           Check Payment
//         </button>

//         <button
//           id="pay-later"
//           onClick={() => {
//             const updated = { ...paymentBody, paid_at: false };
//             setPaymentBody(updated);
//             handlePayment(updated);
//             navigate("/movie/ticket");
//           }}
//           className="w-max py-3.5 font-bold text-[#1d4ed8] cursor-pointer hover:opacity-60"
//         >
//           Pay Later
//         </button>
//       </div>
//     </div>
//   );
// }

export default Payment;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import PaymOutput from "../../components/PaymOutput";
// import InputItem from "../../components/InputItem";
// import PaymMethod from "../../components/PaymMethod";
// import { getIdFromPos } from "../../utils/convSeat";
// import { convertTime } from "../../utils/convertTime";

// function Payment() {
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);

//   const { token, email } = useSelector((state) => state.auth);
//   const { movie, schedule, seats } = useSelector((state) => state.order);

//   const { title } = movie;
//   const { showDate, scheduleId, showCinemaName } = schedule;

//   const [fullName, setFullName] = useState("");
//   const [phoneNum, setPhoneNum] = useState("");

//   const [cinemaInfo, setCinemaInfo] = useState({
//     time: "",
//   });
//   // const [paymentMethod, setPaymentMethod] = useState("");
//   const seatsId = seats.map((e) => getIdFromPos(e));
//   const [paymentBody, setPaymentBody] = useState({
//     schedule_id: Number(scheduleId),
//     payment_method: null,
//     total: seats.length * 10,
//     seats: seatsId,
//     paid_at: false,
//   });

//   // Fetch user info
//   useEffect(() => {
//     const url = `${import.meta.env.VITE_BASE_API_URL}/users/`;
//     const requestOptions = {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     fetch(new Request(url, requestOptions))
//       .then((res) => {
//         if (!res.ok) throw res.statusText;
//         return res.json();
//       })
//       .then((data) => {
//         const { first_name, last_name, phone_number } = data.result;
//         if (first_name && last_name) setFullName(`${first_name} ${last_name}`);
//         if (phone_number) setPhoneNum(phone_number);
//       })
//       .catch((err) => console.error(err));
//   }, [token]);

//   // Fetch cinema info
//   useEffect(() => {
//     if (!scheduleId) return;

//     const fetchCinemaData = async () => {
//       try {
//         const url = `${import.meta.env.VITE_BASE_API_URL}/cinemas/${scheduleId}/selected`;
//         const response = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error(response.statusText);

//         const { result } = await response.json();
//         setCinemaInfo({
//           time: convertTime(result.time),
//         });
//       } catch (error) {
//         console.error("Error fetching cinema info:", error);
//       }
//     };

//     fetchCinemaData();
//   }, [scheduleId, token]);

//   const paymentSummary = [
//     { head: "DATE & TIME", content: `${showDate} at ${cinemaInfo.time}` },
//     { head: "MOVIE TITLE", content: title },
//     { head: "CINEMA NAME", content: showCinemaName },
//     { head: "NUMBER OF TICKETS", content: `${seats.length} pcs` },
//   ];

//   const personalFormFields = [
//     { label: "Full Name", id: "fname", type: "text", value: fullName },
//     { label: "Email", id: "email", type: "email", value: email },
//     { label: "Phone Number", id: "pnumber", type: "text", value: phoneNum },
//   ];

//   const availableMethods = [
//     "gpay",
//     "visa",
//     "gopay",
//     "paypal",
//     "dana",
//     "bca",
//     "bri",
//     "ovo",
//   ];

//   function handleSubmit(e) {
//     e.preventDefault();
//     const form = e.target;
//     const info = {};

//     for (let i = 0; i < 4; i++) {
//       if (i === 3) {
//         for (const method of form.method) {
//           if (method.checked) {
//             setPaymentBody((prev) => ({
//               ...prev,
//               payment_method: method.id,
//             }));
//             // dispatch(setPayment(
//             //   method.id
//             // ));
//           }
//         }
//         continue;
//       }
//       Object.assign(info, { [form[i].id]: form[i].value });
//     }
//     // console.log(info);
//   }

//   return (
//     <main className={`flex justify-center ${showModal && "bg-black/60"}`}>
//       <section className="bg-[#A0A3BD33] flex flex-col items-center pt-8 pb-28 w-screen">
//         <div className="steps flex items-center" />

//         <div
//           className={`payment-card flex flex-col w-[32rem] bg-white rounded-[6px] p-7 ${showModal && "brightness-50"
//             }`}
//         >
//           {/* Payment Info */}
//           <div className="pay-info flex flex-col gap-4">
//             <h3 className="text-[#14142B] text-2xl font-semibold">
//               Payment Info
//             </h3>
//             <div className="output flex flex-col gap-4">
//               {paymentSummary.map((item, i) => (
//                 <PaymOutput key={i} head={item.head} content={item.content} />
//               ))}
//               <div className="total flex flex-col">
//                 <h5>TOTAL PAYMENT</h5>
//                 <p className="text-[#1D4ED8] font-bold">
//                   {`$${seats.length * 10},00`}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Personal Info */}
//           <div className="personal-info flex flex-col gap-4">
//             <h3 className="text-[#14142B] text-2xl font-semibold mt-6">
//               Personal Information
//             </h3>
//             <form onSubmit={handleSubmit}>
//               {personalFormFields.map((field, i) => (
//                 <InputItem
//                   key={i}
//                   label={field.label}
//                   id={field.id}
//                   name={field.id}
//                   type={field.type}
//                   value={field.value}
//                 />
//               ))}

//               {/* Payment Method */}
//               <div className="pay-method flex flex-col gap-4">
//                 <h3 className="text-[#14142B] text-2xl font-semibold mt-4">
//                   Payment Method
//                 </h3>
//                 <ul className="grid grid-cols-4 gap-4">
//                   {availableMethods.map((method, i) => (
//                     <PaymMethod key={i} method={method} i={i} />
//                   ))}
//                 </ul>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full mt-6 bg-[#1D4ED8] p-3 rounded-sm font-semibold text-white hover:cursor-pointer hover:opacity-80"
//                 onClick={() => setShowModal(!showModal)}
//               >
//                 Pay your order
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       <Modal
//         pop={showModal}
//         onClose={() => setShowModal(!showModal)}
//         paymentBody={paymentBody}
//         setPaymentBody={setPaymentBody}
//       />
//     </main>
//   );
// }

// function Modal({ pop, paymentBody, setPaymentBody }) {
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);

//   function handlePayment() {
//     const url = `${import.meta.env.VITE_BASE_API_URL}/orders`;
//     const options = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json", // missing before ✅
//       },
//       body: JSON.stringify(paymentBody),
//     };

//     fetch(url, options)
//       .then((res) => {
//         if (!res.ok) throw res.statusText;
//         return res.json();
//       })
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//     // const url = `${import.meta.env.VITE_BASE_API_URL}/orders`;
//     // const options = {
//     //   method: "POST",
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //     "Content-Type": "application/json", // missing before ✅
//     //   },
//     // };

//     // fetch(new Request(url, options), {
//     //   body: JSON.stringify(paymentBody),
//     // })
//     //   .then((res) => {
//     //     if (!res.ok) throw res.statusText;
//     //     return res.json();
//     //   })
//     //   .then((data) => console.log(data))
//     //   .catch((err) => console.error(err));
//   }

//   return (
//     <div
//       className={`paym-info flex flex-col w-9/10 absolute z-9998 md:w-3/10 h-min self-center bg-white rounded-xl p-6 gap-7 shadow-xl transition-all ${pop ? "visible scale-100 opacity-100" : "invisible scale-105 opacity-0"
//         }`}
//     >
//       <h3 className="self-center text-[#14142B] text-xl font-bold">
//         Payment Info
//       </h3>

//       {/* Virtual Account */}
//       <div className="no-rek flex flex-col md:flex-row md:items-center justify-between">
//         <p className="text-[#8692A6] text-sm">No. Rekening Virtual</p>
//         <div className="side flex items-center gap-3.5 justify-between md:justify-start">
//           <p className="font-bold text-[#14142B] text-lg">12321328913829724</p>
//           <button
//             className="border border-[#1d4ed8] rounded-sm bg-transparent p-2.5 px-4 text-[#1d4ed8] hover:opacity-60 cursor-pointer"
//             onClick={(e) => {
//               e.target.textContent = "Copied";
//               setTimeout(() => {
//                 e.target.textContent = "Copy";
//               }, 1800);
//             }}
//           >
//             Copy
//           </button>
//         </div>
//       </div>

//       {/* Total */}
//       <div className="total flex justify-between flex-col md:flex-row">
//         <p className="text-[#8692A6] text-sm">Total Payment</p>
//         <h4 className="text-[#1d4ed8] text-xl font-bold mt-3 md:mt-0">$30</h4>
//       </div>

//       <p className="text-[#8692A6] text-justify">
//         Pay this payment bill before it is due,{" "}
//         <span className="text-[#D00707] font-medium">{/* due date here */}</span>
//         . If the bill has not been paid by the specified time, it will be
//         forfeited
//       </p>

//       {/* Actions */}
//       <div className="btn flex items-center text-center flex-col gap-2.5 mb-8">
//         <button
//           className="w-full py-3.5 text-white bg-[#1d4ed8] rounded-md font-bold shadow-lg cursor-pointer hover:opacity-90"
//           onClick={() => {
//             setPaymentBody((prev) => ({ ...prev, paid_at: true }));
//             handlePayment();
//             // navigate("/movie/ticket");
//           }}
//         >
//           Check Payment
//         </button>

//         <button
//           id="pay-later"
//           onClick={() => {
//             setPaymentBody((prev) => ({ ...prev, paid_at: false }));
//             handlePayment();
//             // navigate("/movie/ticket");
//           }}
//           className="w-max py-3.5 font-bold text-[#1d4ed8] cursor-pointer hover:opacity-60"
//         >
//           Pay Later
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Payment;