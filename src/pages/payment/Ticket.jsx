import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { historyContext as HistoryContext } from "../../context/history/historyContext";
import { orderContext as OrderContext } from "../../context/order/orderContext";

function Ticket() {
  const { movie, schedule, seats } = useSelector((state) => state.order);
  const { title } = movie;
  const { showDate, showTime } = schedule;

  // const { movie, schedule, seat } = useSelector((state) => state.currDetail);
  // const { history, addHistory } = useContext(HistoryContext);
  // const { currOrder } = useContext(OrderContext)
  // const [_, setLocalHistory] = useLocalStorage("history", []);

  // useEffect(() => {
  //   addHistory(currOrder);
  // }, [currOrder]);

  // useEffect(() => {
  //   setLocalHistory(history);
  // }, [history]);

  const items = [
    { title: "Movie", content: `${title.slice(0, 11)}...` },
    { title: "Category", content: "PG-13" },
    { title: "Date", content: `${format(parseISO(showDate), "dd LLL")}` },
    { title: "Time", content: `${showTime}` },
    { title: "Count", content: `${seats.length}pcs` },
    { title: "Seats", content: `${seats.join(", ").slice(0, 12)}...` },
  ];

  return (
    <main className="bg-[#ecedf2] flex flex-col md:flex-row items-center">
      <div
        className="bg-[url(/avenger-bg.png)] h-[80vh] md:h-[140vh] gap-[1.25rem] px-[10rem] 
          justify-center md:w-[60%] text-white bg-center bg-zinc-800 
          bg-blend-overlay flex flex-col text-center md:text-left"
      >
        <img className="w-[14rem] self-center md:self-start" src="/tickitz-logo.png" alt="" />
        <h1 className="text-5xl font-bold">Thankyou For Purchasing</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur. Quam pretium pretium tempor integer sed magna et.
        </p>
        <p className="text-lg font-semibold">
          Please Download Your Ticket
          <i className="nf nf-fa-long_arrow_right ms-4"></i>
        </p>
        <i className="nf nf-fa-long_arrow_down hidden"></i>
      </div>
      <aside className="h-full p-[4rem_0_2rem] w-[80%] md:w-max mx-auto">
        <div
          className="ticket-card flex flex-col relative p-[0_1.5rem_2rem] rounded-lg bg-white items-center">
          <img className="p-[2rem_0]" width="160" src="/qr.png" alt="" />
          {["flex-end translate-x-76 md:translate-x-34",
            "flex-start -translate-x-76 md:-translate-x-34"].map((item, i) => {
              return <DotSide pos={item} key={i} />
            })}
          <div
            className="grid-detail border-t w-full text-center md:text-left 
              md:w-max border-[#DEDEDE] pt-[3rem] grid grid-cols-2 gap-[1.25rem]"
          >
            {items.map((item, i) => {
              return <Item title={item.title} content={item.content} key={i} />
            })}
            <div className="item col-span-2">
              <div className="flex justify-between rounded-sm items-center px-6 py-2 border border-[#DEDEDE]">
                <p>Total</p><p className="font-semibold text-lg">
                  {`$${seats.length * 10}.00`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="btn flex flex-col items-center mt-4 gap-2">
          <button
            className="py-2.5 flex items-center justify-center gap-7 text-[#1D4ED8] rounded-sm font-medium border border-[#1D4ED8] w-[calc(100%+2.75rem)]">
            <i className="nf nf-oct-download"></i>Download
          </button>
          <button
            className="py-2.5 rounded-sm border w-[calc(100%+2.75rem)] bg-[#1D4ED8] text-white font-semibold">
            Done
          </button>
        </div>
      </aside>
    </main>
  );
}

function DotSide(props) {
  return (
    <div
      key={props.i}
      className={`${props.pos} absolute size-8 bg-[#ecedf2] rounded-full bottom-[320px]`}>
    </div>
  );
}

function Item(props) {
  return (
    <div key={props.i} className="item flex flex-col gap-[.375rem]">
      <h5 className="text-[#AAAAAA] font-medium text-sm">{props.title}</h5>
      <p className="text-[#14142B] font-semibold">{props.content}</p>
    </div>
  );
}

export default Ticket
