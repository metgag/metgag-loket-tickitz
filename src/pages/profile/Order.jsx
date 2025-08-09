import { useState } from "react";

function Order() {
  const items = [
    {
      title: "Spider-Man: Homecoming", time: "Tuesday, 07 July 2020 - 04:30pm",
      isActive: true, isPaid: false
    },
    {
      title: "Avengers: End Game", time: "Monday, 14 June 2020 - 02:00pm",
      isActive: false, isPaid: true
    },
  ];

  return (
    <section className="flex rounded-2xl flex-col gap-7">
      <div className="history-wrapper gap-5 flex flex-col">
        {items.map((item, i) => {
          return <HistoryItem title={item.title} time={item.time}
            isActive={item.isActive} isPaid={item.isPaid} i={i} />
        })}
      </div>
    </section>
  );
}

function HistoryItem(props) {
  const [menu, setMenu] = useState(false);

  return (
    <div key={props.i}
      className="history history-1 bg-white rounded-2xl">
      <div className="history-a flex p-[1.5rem_2rem] justify-between 
      items-center border-b border-[#DEDEDE] md:border-none">
        <div className="date-title flex flex-col gap-2">
          <p className="text-[#AAAAAA]">{props.time}</p>
          <h3 className="font-semibold text-2xl">{props.title}</h3>
        </div>
        <img src="/sponsor/cine.svg" alt="" />
      </div>
      <div className="history-b flex flex-col md:flex-row p-[1.5rem_2rem] md:justify-between">
        <div className="btn flex gap-3 flex-col md:flex-row">
          {props.isActive ?
            <BtnActive /> : <BtnUsed />
          }
          {props.isPaid ?
            <BtnPaid /> : <BtnNotPaid />
          }
        </div>
        <h4 className="text-[#AAAAAA] flex gap-3.5 items-center
          hover:cursor-pointer hover:opacity-[.6] justify-center mt-6"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          Show Details <i
            className={`nf nf-cod-chevron_${menu ? "up" : "down"}`}>
          </i></h4>
      </div>
      {menu &&
        <div className="paym-info flex flex-col p-[.375rem_2rem_1.5rem] gap-5">
          {props.isPaid ?
            <TicketQR /> : <TicketInfo />
          }
        </div>
      }
    </div>
  );
}

const h3Style = "fw-md text-[#14142B]";

function TicketQR() {
  const items = [
    { title: "Category", content: "PG-13" },
    { title: "Time", content: "2:00 pm" },
    { title: "Seats", content: "C4, C5, C6" },
    { title: "Movie", content: "Spider-Man: .." },
    { title: "Date", content: "07 Jul" },
    { title: "Count", content: "3pcs" },
  ];

  return (
    <>
      <h3 className={h3Style}>Ticket Information</h3>
      <div className="ticket-card flex items-center gap-8">
        <img width="160" src="/qr.png" alt="" />
        <div className="grid-detail grid grid-cols-3 gap-4">
          {items.map((e, i) => {
            return <QrItem title={e.title} content={e.content} key={i} />
          })}
        </div>
        <div className="">
          <h4 className="flex flex-col font-semibold">
            <p>Total</p>
            <p className="text-xl">$30.00</p>
          </h4>
        </div>
      </div>
    </>
  );
}

function QrItem({ title, content }) {
  return (
    <div className="item">
      <h5 className="text-[#aaaaaa]">{title}</h5>
      <p className="text-[#14142B]">{content}</p>
    </div>
  );
}

function TicketInfo() {
  return (
    <>
      <h3 className={h3Style}>Ticket Information</h3>
      <div className="no-rek flex items-center justify-between">
        <p className="text-[#8692A6] text-sm">No. Rekening Virtual</p>
        <div className="side flex items-center gap-3.5">
          <p className="text-[#14142B] font-bold">12321328913829724</p>
          <button
            className="border border-[#1d4ed8] rounded-sm p-1.5 px-3 
              bg-transparent text-[#1d4ed8] hover:cursor-pointer
              hover:opacity-[.4]"
          >Copy</button>
        </div>
      </div>
      <div className="total flex justify-between">
        <p className="text-[#8692A6] text-sm">Total Payment</p>
        <h4 className="text-[#1d4ed8]">$30</h4>
      </div>
      <p className="text-[#8692A6]"
      >Pay this payment bill before it is due,
        <span className="text-[#D00707]"> on June
          23, 2023</span>. If the bill has not been paid by
        the specified time, it will be forfeited
      </p>
      <button
        className="bg-[#1d4ed8] text-white rounded-sm font-medium 
      p-[.625rem_3rem] text-sm"
      >Cek Pembayaran</button>
    </>
  );
}

function BtnActive() {
  return (
    <button disabled
      className="py-1.5 md:w-48 rounded-md font-semibold bg-[#00BA8833] text-[#00BA88]">
      Ticket in active
    </button>
  );
}

function BtnUsed() {
  return (
    <button disabled
      className="py-1.5 md:w-48 rounded-md font-semibold bg-[#e2e3e9] text-[#6E7191]">
      Ticket used
    </button>
  );
}

function BtnPaid() {
  return (
    <button disabled
      className="py-1.5 md:w-36 rounded-md font-semibold bg-[#d2dcf7] text-[#1D4ED8]">
      Paid
    </button>
  );
}

function BtnNotPaid() {
  return (
    <button disabled
      className="py-1.5 md:w-36 rounded-md font-semibold bg-[#E82C2C33] text-[#E82C2C]">
      Not Paid
    </button>
  );
}

export default Order;
