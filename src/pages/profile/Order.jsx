import { addDays, format, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { convertTime } from "../../utils/convertTime";

function Order() {
  const { token } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/users/orders`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        const { order_history } = data.result;
        setHistory(order_history);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };

    if (token) fetchOrderHistory();
  }, [token]);

  return (
    <section className="flex flex-col gap-7 rounded-2xl">
      <div className="history-wrapper flex flex-col gap-5">
        {history.map((order, index) => (
          <HistoryItem
            key={index}
            title={order.title}
            date={order.date}
            time={order.time}
            seat={order.seats}
            cinema={order.cinema_name}
            isActive={!order.paid_at}
            isPaid={order.paid_at}
          />
        ))}
      </div>
    </section>
  );
}

function HistoryItem({ title, date, time, seat, cinema, isActive, isPaid }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = format(parseISO(date), "EEEE, dd LLLL yyyy");

  return (
    <div className="history bg-white rounded-2xl">
      <div className="flex items-center justify-between border-b border-[#DEDEDE] p-[1.5rem_2rem] md:border-none">
        <div className="flex flex-col gap-2">
          <p className="text-[#AAAAAA]">
            {formattedDate} - {convertTime(time)}
          </p>
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <img src={`${cinema}`} alt={cinema} />
      </div>

      <div className="flex flex-col p-[1.5rem_2rem] md:flex-row md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row">
          {isActive ? <BtnActive /> : <BtnUsed />}
          {isPaid ? <BtnPaid /> : <BtnNotPaid />}
        </div>
        <h4
          className="mt-6 flex items-center justify-center gap-3.5 text-[#AAAAAA] hover:cursor-pointer hover:opacity-60"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Show Details
          <i className={`nf nf-cod-chevron_${isExpanded ? "up" : "down"}`}></i>
        </h4>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-5 p-[.375rem_2rem_1.5rem]">
          {isPaid ? (
            <TicketQR title={title} seat={seat} time={time} date={date} />
          ) : (
            <TicketInfo seat={seat} date={date} />
          )}
        </div>
      )}
    </div>
  );
}

const h3Style = "fw-md text-[#14142B]";

function TicketQR({ time, seat, title, date }) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd LLL");

  const parsedTime = parse(time, "HH:mm:ss.SSSSSS", new Date());
  const formattedTime = format(parsedTime, "h:mmaaa");

  const details = [
    { title: "Category", content: "PG-13" },
    { title: "Time", content: formattedTime },
    { title: "Seats", content: seat.join(", ") },
    { title: "Movie", content: title },
    { title: "Date", content: formattedDate },
    { title: "Count", content: `${seat.length} pcs` },
  ];

  return (
    <>
      <h3 className={`${h3Style} text-xl font-semibold`}>Ticket Information</h3>
      <div className="ticket-card md:flex items-center gap-8">
        <img width="160" src="/qr.png" alt="QR Code" />
        <div className="grid grid-cols-3 gap-4 gap-x-6 md:w-max">
          {details.map((item, idx) => (
            <QrItem key={idx} title={item.title} content={item.content} />
          ))}
        </div>
        <div className="mt-6 md:ms-auto md:me-16">
          <h4 className="flex flex-col font-semibold">
            <p>Total</p>
            <p className="text-2xl">{`$${seat.length * 10}.00`}</p>
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
      <p className="text-wrap font-semibold text-[#14142B]">{content}</p>
    </div>
  );
}

function TicketInfo({ seat, date }) {
  const navigate = useNavigate();
  const dueDate = format(addDays(parseISO(date), 2), "LLLL dd, yyyy");

  return (
    <>
      <h3 className={`${h3Style} text-xl font-semibold`}>Ticket Information</h3>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8692A6]">No. Rekening Virtual</p>
        <div className="flex items-center gap-3.5">
          <p className="font-bold text-[#14142B]">12321328913829724</p>
          <button
            className="rounded-sm border border-[#1d4ed8] bg-transparent p-1.5 px-3 text-[#1d4ed8] hover:cursor-pointer hover:opacity-40"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-[#8692A6]">Total Payment</p>
        <h4 className="text-lg font-bold text-[#1d4ed8]">{`$${seat.length * 10}`}</h4>
      </div>

      <p className="text-[#8692A6]">
        Pay this bill before it is due,{" "}
        <span className="text-[#D00707]">on {dueDate}</span>. If not paid by
        then, it will be forfeited.
      </p>

      <button
        className="cursor-pointer rounded-sm bg-[#1d4ed8] p-[.625rem_3rem] text-sm font-medium text-white hover:opacity-80 md:w-max"
        onClick={() => navigate("/movie/ticket")}
      >
        Cek Pembayaran
      </button>
    </>
  );
}

const BtnActive = () => (
  <button
    disabled
    className="md:w-48 rounded-md bg-[#00BA8833] py-1.5 font-semibold text-[#00BA88]"
  >
    Ticket in active
  </button>
);

const BtnUsed = () => (
  <button
    disabled
    className="md:w-48 rounded-md bg-[#e2e3e9] py-1.5 font-semibold text-[#6E7191]"
  >
    Ticket used
  </button>
);

const BtnPaid = () => (
  <button
    disabled
    className="md:w-36 rounded-md bg-[#d2dcf7] py-1.5 font-semibold text-[#1D4ED8]"
  >
    Paid
  </button>
);

const BtnNotPaid = () => (
  <button
    disabled
    className="md:w-36 rounded-md bg-[#E82C2C33] py-1.5 font-semibold text-[#E82C2C]"
  >
    Not Paid
  </button>
);

export default Order;