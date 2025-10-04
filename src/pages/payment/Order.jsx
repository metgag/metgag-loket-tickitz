import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import { convertTime } from "../../utils/convertTime";
import { selectedSeats } from "../../redux/slices/orderSlice";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { movie, schedule } = useSelector((state) => state.order);

  const [seats, setSeats] = useState([]);
  const [cinemaInfo, setCinemaInfo] = useState({
    cinemaName: "",
    time: "",
    cinemaImg: "",
  });

  const { title, genres, poster } = movie;
  const { scheduleId, showDate } = schedule;

  /** Fetch cinema details */
  useEffect(() => {
    if (!scheduleId) return;

    const fetchCinemaInfo = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_API_URL}/cinemas/${scheduleId}/selected`;
        const resp = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error(resp.statusText);

        const { result } = await resp.json();
        setCinemaInfo({
          cinemaName: result.cinema_name,
          time: convertTime(result.time),
          cinemaImg: result.cinema_img,
        });
      } catch (err) {
        console.error("Error fetching cinema info:", err);
      }
    };

    fetchCinemaInfo();
  }, [scheduleId, token]);

  /** Generate seat labels like A1, A2... */
  const generateSeats = (start, end) => {
    const rows = ["A", "B", "C", "D", "E", "F", "G"];
    return rows.flatMap((row) =>
      Array.from({ length: end - start + 1 }, (_, i) => `${row}${start + i}`)
    );
  };

  /** UI constants */
  const btnBlu =
    "btn-change h-min px-5 py-1 self-end rounded-md bg-[#1D4ED8] text-white font-medium hover:opacity-[.8] hover:cursor-pointer";
  const hBlk = "text-[#14142B] text-2xl font-semibold";
  const hLeft = "text-xl font-semibold";

  /** Handle seat toggle */
  const toggleSeat = (seat) => {
    setSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <main className="bg-[#ECEDF2] py-20 px-6 md:px-0">
      <div className="flex-container flex flex-col md:flex-row gap-4 justify-center">
        {/* Left Section: Seat Selection */}
        <div className="flex flex-col gap-6 bg-white p-6 md:p-4 rounded-lg shadow-sm">
          {/* Movie Card */}
          <div className="flex gap-4 border border-[#DEDEDE] p-4 rounded-md">
            <img
              src={`${import.meta.env.VITE_BASE_API_URL}/poster/${poster}`}
              className="h-28 w-48 rounded-sm object-cover"
              alt={title}
            />
            <div className="flex flex-col justify-between">
              <h3 className={hBlk}>
                {title.length > 24 ? `${title.slice(0, 26)}...` : title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <p
                    key={g.id}
                    className="bg-[#A0A3BD1A] text-[#A0A3BD] px-3 py-1 rounded-full"
                  >
                    {g.name}
                  </p>
                ))}
              </div>
              {cinemaInfo.time && <p>Regular - {cinemaInfo.time}</p>}
            </div>
            <button className={`${btnBlu} ms-auto`} onClick={() => navigate("/movie/list")}>
              Change
            </button>
          </div>

          {/* Seat Selector */}
          <div className="flex flex-col gap-2">
            <h3 className={hLeft}>Choose Your Seat</h3>
            <p className="self-center mb-8 ps-8">Screen</p>

            {/* Seat Grid */}
            <form className="flex gap-x-16">
              {/* Left Grid */}
              <SeatGrid
                labelRows
                seats={generateSeats(1, 7)}
                selected={seats}
                onToggle={toggleSeat}
              />
              {/* Right Grid */}
              <SeatGrid
                seats={generateSeats(8, 14)}
                selected={seats}
                onToggle={toggleSeat}
              />
            </form>

            {/* Seat Key */}
            <div className="flex flex-col gap-4">
              <h5 className="text-lg font-medium">Seating key</h5>
              <div className="flex justify-center gap-12">
                <SeatLegend color="#FCFDFE" label="Available" border />
                <SeatLegend color="#1D4ED8" label="Selected" />
                <SeatLegend color="#F589D7" label="Love nest" />
                <SeatLegend color="#6E7191" label="Sold" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Summary */}
        <aside className="flex flex-col gap-8 h-min min-w-sm">
          <div className="bg-white flex flex-col gap-6 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center gap-2">
              <img src={cinemaInfo.cinemaImg} alt="" className="w-42" />
              <h3 className={hBlk}>{cinemaInfo.cinemaName}</h3>
            </div>

            <div className="flex flex-col gap-3">
              <DetailRow label="Movie Selected" value={title} max={22} />
              <DetailRow
                label={format(parseISO(showDate), "EEEE, dd LLLL yyyy")}
                value={cinemaInfo.time}
              />
              <DetailRow label="One ticket price" value="$10" />
              {seats.length > 0 && (
                <DetailRow
                  label="Seat chosen"
                  value={
                    seats.join(", ").length > 20
                      ? `${seats.join(", ").slice(0, 24)}...`
                      : seats.join(", ")
                  }
                />
              )}
            </div>

            <div className="flex justify-between items-center border-t border-[#E6E6E6] pt-5">
              <h4 className="font-medium text-lg">Total Payment</h4>
              <h3 className="text-[#1D4ED8] text-2xl font-semibold">
                ${seats.length * 10}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              if (seats.length > 0) {
                dispatch(selectedSeats(seats));
                navigate("/movie/payment");
              }
            }}
            className={`${btnBlu} w-full py-3 shadow-lg rounded-sm`}
          >
            Checkout now
          </button>
        </aside>
      </div>
    </main>
  );
}

/** Sub Components */
function Seat({ id, name, selected, onChange }) {
  return (
    <div className="size-10">
      <label
        htmlFor={id}
        className={`h-full block ${selected.includes(name) ? "bg-[#1D4ED8]" : "bg-[#D6D8E7]"
          } rounded-sm cursor-pointer hover:opacity-[.6]`}
      />
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

function SeatGrid({ labelRows = false, seats, selected, onToggle }) {
  return (
    <div className="flex gap-8">
      {labelRows && (
        <div className="flex flex-col gap-y-5 text-lg font-semibold text-[#4E4B66]">
          {["A", "B", "C", "D", "E", "F", "G"].map((row) => (
            <p key={row} className="h-8 flex items-center">
              {row}
            </p>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-7 gap-3">
          {seats.map((seatId) => (
            <Seat
              key={seatId}
              id={seatId}
              name={seatId}
              selected={selected}
              onChange={(e) => onToggle(e.target.name)}
            />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-x-2 text-center text-lg font-semibold text-[#4E4B66]">
          {seats
            .map((s) => parseInt(s.replace(/[A-Z]/, ""), 10))
            .filter((v, i, arr) => arr.indexOf(v) === i)
            .map((n) => (
              <p key={n}>{n}</p>
            ))}
        </div>
      </div>
    </div>
  );
}

function SeatLegend({ color, label, border }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-[1.5rem] rounded-sm"
        style={{
          backgroundColor: color,
          border: border ? "1px solid #D6D8E7" : "none",
        }}
      />
      <p className="text-[#4E4B66]">{label}</p>
    </div>
  );
}

function DetailRow({ label, value, max }) {
  return (
    <div className="flex justify-between gap-[1.5rem]">
      <p className="text-[#6B6B6B]">{label}</p>
      <p className="text-[#14142B] font-semibold">
        {max && value.length > max ? `${value.slice(0, max)}...` : value}
      </p>
    </div>
  );
}

export default Order;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { format, parseISO } from "date-fns";

// import { convertTime } from "../../utils/convertTime";
// // import { bookTicket } from "../../redux/slices/orderSlice";

// function Order() {
//   const navigate = useNavigate();

//   const { token } = useSelector((state) => state.auth);
//   // const { scheduleId, movieId, showDate } = useSelector((state) => state.schedule);

//   const [seats, setSeats] = useState([]);
//   const { movie, schedule } = useSelector((state) => state.order);
//   const [cinemaInfo, setCinemaInfo] = useState({
//     cinemaName: "",
//     time: "",
//     cinemaImg: "",
//   });
//   const { title, genres, backdrop } = movie;
//   const { scheduleId, showDate } = schedule;

//   // Fetch cinema info
//   useEffect(() => {
//     if (!scheduleId) return;

//     const fetchCinemaInfo = async () => {
//       try {
//         const url = `${import.meta.env.VITE_BASE_API_URL}/cinemas/${scheduleId}/selected`;
//         const resp = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!resp.ok) throw new Error(resp.statusText);

//         const { result } = await resp.json();
//         setCinemaInfo({
//           cinemaName: result.cinema_name,
//           time: convertTime(result.time),
//           cinemaImg: result.cinema_img,
//         });
//       } catch (err) {
//         console.error("Failed to fetch cinema info:", err);
//       }
//     };

//     fetchCinemaInfo();
//   }, [scheduleId, token]);

//   // Utility to generate seat labels
//   const generateSeats = (start, end) => {
//     const rows = ["A", "B", "C", "D", "E", "F", "G"];
//     return rows.flatMap((row) =>
//       Array.from({ length: end - start + 1 }, (_, i) => `${row}${start + i}`)
//     );
//   };

//   const btnBlu =
//     "btn-change h-min px-5 py-1 self-end rounded-md bg-[#1D4ED8] text-white font-medium hover:opacity-[.8] hover:cursor-pointer";
//   const hBlk = "text-[#14142B] text-2xl font-semibold";
//   const hLeft = "text-xl font-semibold";

//   return (
//     <main className="bg-[#ECEDF2] py-20 px-6 md:px-0">
//       <div className="flex-container flex flex-col justify-center gap-4 md:flex-row">
//         {/* Left: Seat Selection */}
//         <div className="flex flex-col gap-6 bg-white p-6 md:p-4 py-6 rounded-lg shadow-sm">
//           {/* Movie Info Card */}
//           <div className="movie-detail flex border p-4 gap-4 border-[#DEDEDE] rounded-md">
//             <img
//               src={`${import.meta.env.VITE_BASE_API_URL}/backdrop/${backdrop}`}
//               className="object-cover rounded-sm h-28 w-48"
//               alt={title}
//             />
//             <div className="detail flex flex-col justify-between">
//               <h3 className={hBlk}>
//                 {title.length > 24
//                   ? `${title.slice(0, 26)}...`
//                   : title}
//               </h3>
//               <div className="genre flex flex-wrap gap-2">
//                 {genres.map((g) => (
//                   <p
//                     key={g.id}
//                     className="bg-[#A0A3BD1A] text-[#A0A3BD] px-3 py-1 rounded-full"
//                   >
//                     {g.name}
//                   </p>
//                 ))}
//               </div>
//               {cinemaInfo.time && <p>{`Regular - ${cinemaInfo.time}`}</p>}
//             </div>
//             <button
//               className={`${btnBlu} ms-auto`}
//               onClick={() => navigate("/movie/list")}
//             >
//               Change
//             </button>
//           </div>

//           {/* Seat Selection */}
//           <div className="seat flex flex-col gap-2">
//             <h3 className={hLeft}>Choose Your Seat</h3>
//             <p className="self-center mb-8 ps-8">Screen</p>

//             {/* Seat Grid */}
//             <form className="flex gap-x-16">
//               {/* Left block */}
//               <div className="flex gap-8">
//                 <div className="flex flex-col gap-y-5 text-lg font-semibold text-[#4E4B66]">
//                   {["A", "B", "C", "D", "E", "F", "G"].map((row, i) => (
//                     <p className="h-8 flex items-center" key={i}>
//                       {row}
//                     </p>
//                   ))}
//                 </div>
//                 <div className="flex flex-col gap-6">
//                   <div className="seat-a grid grid-cols-7 gap-3">
//                     {generateSeats(1, 7).map((seatId) => (
//                       <Seat
//                         key={seatId}
//                         id={seatId}
//                         name={seatId}
//                         selected={seats}
//                         onChange={(e) =>
//                           setSeats((prev) =>
//                             prev.includes(e.target.name)
//                               ? prev.filter((s) => s !== e.target.name)
//                               : [...prev, e.target.name]
//                           )
//                         }
//                       />
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-7 text-center gap-x-2 text-lg font-semibold text-[#4E4B66]">
//                     {[1, 2, 3, 4, 5, 6, 7].map((n) => (
//                       <p key={n}>{n}</p>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Right block */}
//               <div className="flex flex-col gap-6">
//                 <div className="seat-b grid grid-cols-7 gap-3">
//                   {generateSeats(8, 14).map((seatId) => (
//                     <Seat
//                       key={seatId}
//                       id={seatId}
//                       name={seatId}
//                       selected={seats}
//                       onChange={(e) =>
//                         setSeats((prev) =>
//                           prev.includes(e.target.name)
//                             ? prev.filter((s) => s !== e.target.name)
//                             : [...prev, e.target.name]
//                         )
//                       }
//                     />
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-7 text-center gap-x-2 text-lg font-semibold text-[#4E4B66]">
//                   {[8, 9, 10, 11, 12, 13, 14].map((n) => (
//                     <p key={n}>{n}</p>
//                   ))}
//                 </div>
//               </div>
//             </form>

//             {/* Seat Key */}
//             <div className="seat-key flex flex-col gap-4">
//               <h5 className="text-lg font-medium">Seating key</h5>
//               <div className="legend flex justify-center gap-12">
//                 <SeatLegend color="#FCFDFE" label="Available" border />
//                 <SeatLegend color="#1D4ED8" label="Selected" />
//                 <SeatLegend color="#F589D7" label="Love nest" />
//                 <SeatLegend color="#6E7191" label="Sold" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right: Summary */}
//         <aside className="flex flex-col h-min gap-8 min-w-sm">
//           <div className="cinema bg-white flex p-6 flex-col gap-6 rounded-lg shadow-md">
//             <div className="cinema-name flex flex-col items-center gap-2">
//               <img src={cinemaInfo.cinemaImg} alt="" className="w-42" />
//               <h3 className={hBlk}>{cinemaInfo.cinemaName}</h3>
//             </div>

//             <div className="details flex flex-col gap-3">
//               <DetailRow label="Movie Selected" value={title} max={22} />
//               <DetailRow
//                 label={format(parseISO(showDate), "EEEE, dd LLLL yyyy")}
//                 value={cinemaInfo.time}
//               />
//               <DetailRow label="One ticket price" value="$10" />
//               {seats.length > 0 && (
//                 <DetailRow
//                   label="Seat chosen"
//                   value={
//                     seats.join(", ").length > 20
//                       ? `${seats.join(", ").slice(0, 24)}...`
//                       : seats.join(", ")
//                   }
//                 />
//               )}
//             </div>

//             <div className="total pt-5 flex justify-between items-center border-t border-[#E6E6E6]">
//               <h4 className="font-medium text-lg">Total Payment</h4>
//               <h3 className="text-[#1D4ED8] text-2xl font-semibold">
//                 ${seats.length * 10}
//               </h3>
//             </div>
//           </div>

//           <button
//             onClick={() => {
//               if (seats.length > 0) {
//                 // dispatch(
//                 //   bookTicket({
//                 //     seats: seats,
//                 //     selectedCinema: cinemaInfo,
//                 //     selectedMovie: movieDetail,
//                 //   })
//                 // );
//                 navigate("/movie/payment");
//               }
//             }}
//             className={`${btnBlu} w-full py-3 shadow-lg rounded-sm`}
//           >
//             Checkout now
//           </button>
//         </aside>
//       </div>
//     </main>
//   );
// }

// function Seat({ id, name, selected, onChange }) {
//   return (
//     <div className="size-10">
//       <label
//         htmlFor={id}
//         className={`h-full block ${selected.includes(name) ? "bg-[#1D4ED8]" : "bg-[#D6D8E7]"
//           } rounded-sm cursor-pointer hover:opacity-[.6]`}
//       />
//       <input
//         type="checkbox"
//         name={name}
//         id={id}
//         onChange={onChange}
//         className="hidden"
//       />
//     </div>
//   );
// }

// function SeatLegend({ color, label, border = false }) {
//   return (
//     <div className="key flex items-center gap-3">
//       <div
//         className={`square size-[1.5rem] rounded-sm`}
//         style={{
//           backgroundColor: color,
//           border: border ? "1px solid #D6D8E7" : "none",
//         }}
//       ></div>
//       <p className="text-[#4E4B66]">{label}</p>
//     </div>
//   );
// }

// function DetailRow({ label, value, max }) {
//   return (
//     <div className="flex justify-between gap-[1.5rem]">
//       <p className="text-[#6B6B6B]">{label}</p>
//       <p className="text-[#14142B] font-semibold">
//         {max && value.length > max ? `${value.slice(0, max)}...` : value}
//       </p>
//     </div>
//   );
// }

// export default Order;
