import { useState } from 'react'
import { useNavigate } from 'react-router';

function Order() {
  const [seat, setSeat] = useState([]);
  const [detail,] = useState(
    JSON.parse(localStorage.getItem("detail"))
  );
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  console.log(detail)

  const details = [
    { head: "Movie Selected", content: "Spider-Man: Homecoming" },
    { head: "Tuesday, 07 July 2020", content: "13:00pm" },
    { head: "One ticket price", content: "$10" },
    { head: "Seat choosed", content: "C4, C5, C6" },
    { head: "Total Payment", content: "$30" },
  ];
  const orderSeats = [
    { init: 1, end: 7, row: "A" },
  ];
  const legend = [
    { id: "Available", bg: "#FCFDFE" },
    { id: "Selected", bg: "#1D4ED8" },
    { id: "Love nest", bg: "#F589D7" },
    { id: "Sold", bg: "#6E7191" },
  ];
  const btnBlu = "btn-change h-min px-5 py-1 self-end rounded-md bg-[#1D4ED8] text-white font-medium hover:opacity-[.8] hover:cursor-pointer";
  const hBlk = "text-[#14142B] text-2xl font-semibold";
  const hLeft = "text-xl font-semibold";

  function handleChange(e) {
    e.preventDefault();

    if (e.target.type === "checkbox") {
      setSeat((arrSeat) => {
        if (!arrSeat.includes(e.target.id)) {
          setTotal((total) => total + .5);
          return [...arrSeat, e.target.id];
        } else {
          if (arrSeat.length > 0) {
            setTotal((total) => total - .5);
            return arrSeat.filter((seat) => seat !== e.target.id);
          }
        }
      });
    }
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const foo = [];
  //   console.log(e.target.length);

  //   for (let i = 0; i < e.target.length; i++) {
  //     if (e.target[i].checked) {
  //       foo.push(e.target[i].id);
  //     }
  //   }

  //   setSeat(foo);
  // }

  return (
    <main className="bg-[#ECEDF2] py-20">
      <div className="steps flex items-center justify-center">
      </div>
      <div className="flex-container flex justify-center gap-4">
        <div className="flex flex-col gap-6 bg-white p-4 py-6 rounded-lg">
          <div className="movie-detail flex border justify-between p-4 gap-4 border-[#DEDEDE] rounded-md">
            <img
              src={`${import.meta.env.VITE_POSTER_URL}${detail.backdrop_path}`}
              className="object-cover rounded-sm h-28 w-48" />
            <div className="detail flex flex-col justify-between">
              <h3 className={hBlk}>{detail.title}</h3>
              <div className="genre flex flex-wrap gap-2">
                <p className='bg-[#A0A3BD1A] text-[#A0A3BD] px-2 rounded-full'>Action</p>
                <p className='bg-[#A0A3BD1A] text-[#A0A3BD] px-2 rounded-full'>Adventure</p>
              </div>
              <p>{`Regular - ${detail.time}`}</p>
            </div>
            <button
              className={`${btnBlu}`}>
              Change
            </button>
          </div>
          <div className="seat flex flex-col gap-2">
            <h3 className={hLeft}>Choose Your Seat</h3>
            <p className='self-center mb-8'>Screen</p>
            <form onMouseDown={handleChange} className="grid grid-cols-2" action="">
              <div className="grid-seat-a grid grid-cols-8 gap-[.5rem]">
                <div>A</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A7" /><div>B</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B7" /><div>C</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C7" /><div>D</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D7" /><div>E</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E7" /><div>F</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F7" /><div>G</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G1" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G2" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G3" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G4" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G5" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G6" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G7" />
                <div className="seat seat-char-7 invisible">_</div>
                <div className="seat seat-num-1 text-center">1</div>
                <div className="seat seat-num-2 text-center">2</div>
                <div className="seat seat-num-3 text-center">3</div>
                <div className="seat seat-num-4 text-center">4</div>
                <div className="seat seat-num-5 text-center">5</div>
                <div className="seat seat-num-6 text-center">6</div>
                <div className="seat seat-num-7 text-center">7</div>
              </div>
              <div className="grid-seat-b grid grid-cols-8 gap-[.5rem]">
                <div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="A14" /><div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="B14" /><div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="C14" /><div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="D14" /><div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="E14" /><div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="F14" /><div className="invisible">_</div><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G8" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G9" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G10" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G11" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G12" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G13" /><input className="accent-[#1D4ED8] hover:cursor-pointer" type="checkbox" id="G14" />
                <div className="invisible">_</div>
                <div className="seat seat-num-1 text-center">8</div>
                <div className="seat seat-num-2 text-center">9</div>
                <div className="seat seat-num-3 text-center">10</div>
                <div className="seat seat-num-4 text-center">11</div>
                <div className="seat seat-num-5 text-center">12</div>
                <div className="seat seat-num-6 text-center">13</div>
                <div className="seat seat-num-7 text-center">14</div>
              </div>
            </form>
            <div className="seat-key flex flex-col gap-4">
              <h5 className='text-lg font-medium'>Seating key</h5>
              <div className="legend flex justify-center gap-12">
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] border border-[#D6D8E7] rounded-sm bg-[#FCFDFE]`}></div>
                  <p className='text-[#4E4B66]'>Available</p>
                </div>
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] rounded-sm bg-[#1D4ED8]`}></div>
                  <p className='text-[#4E4B66]'>Selected</p>
                </div>
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] rounded-sm bg-[#F589D7]`}></div>
                  <p className='text-[#4E4B66]'>Love nest</p>
                </div>
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] rounded-sm bg-[#6E7191]`}></div>
                  <p className='text-[#4E4B66]'>Sold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="flex flex-col h-min gap-8 min-w-md">
          <div className="cinema bg-white flex p-4 py-6 flex-col gap-6 rounded-lg shadow-md">
            <div className="cinema-name flex flex-col items-center gap-2">
              <img src="/sponsor/cine.svg" alt="" />
              <h3 className={`${hBlk}`}>
                CineOne21 Cinema
              </h3>
            </div>
            <div className="details flex flex-col gap-3">
              <div className="title flex justify-between gap-[1.5rem]">
                <p className="text-[#6B6B6B]">Movie Selected</p>
                <p className="text-[#14142B] font-semibold">
                  {detail.title}
                </p>
              </div>
              <div className="date flex justify-between gap-[1.5rem]">
                <p className="text-[#6B6B6B]">
                  {detail.date}
                </p>
                <p className="text-[#14142B] font-semibold">
                  {detail.time}
                </p>
              </div>
              <div className="price flex justify-between gap-[1.5rem]">
                <p className="text-[#6B6B6B]">One ticket price</p>
                <p className="text-[#14142B] font-semibold">
                  $10
                </p>
              </div>
              <div className="seat flex justify-between gap-[1.5rem] mb-3">
                <p className="text-[#6B6B6B]">Seat choosed</p>
                {seat.length > 0 && <p className="text-[#14142B] font-semibold">
                  {seat.join(", ")}
                </p>}
                {/* <p>{seat.join(", ")}</p> */}
              </div>
            </div>
            <div
              className="total pt-5 flex justify-between items-center border-t border-[#E6E6E6]">
              <h4 className="font-medium text-lg">Total Payment</h4>
              <h3 className='text-[#1D4ED8] text-2xl font-semibold'>
                {`$${total * 10}`}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/movie/payment")
            }}
            className={`${btnBlu} w-full py-3 shadow-lg rounded-sm`}>
            Checkout now
          </button>
        </aside>
      </div>
    </main>
  )
}

function MkLegend(props) {
  return (
    <div key={props.i} className="key flex">
      <div className={`square size-[1.25rem] rounded-sm bg-[${props.bg}]`}></div>
      <p className='text-[#4E4B66]'>{props.legend}</p>
    </div>
  );
}

export default Order