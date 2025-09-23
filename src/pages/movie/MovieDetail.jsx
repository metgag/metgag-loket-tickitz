import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { format, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { getDetail } from "../../redux/slices/movieSlice.js";
import { bookTicket } from "../../redux/slices/orderSlice.js";
import { convertTime } from "../../utils/convertTime.js";
import { convLocation, convTime } from "../../utils/movieUtil.js";

function MovieDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { detail: movie } = useSelector((state) => state.tmdb);
  const { token } = useSelector((state) => state.auth);

  const [schedules, setSchedules] = useState([]);
  const [scheduleFilter, setScheduleFilter] = useState([]);
  const [scheduleQuery, setScheduleQuery] = useState({});
  const [isFiltered, setIsFiltered] = useState(true);

  // Fetch movie detail
  useEffect(() => {
    dispatch(getDetail(movieId));
  }, [dispatch, movieId]);

  // Fetch all schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}/schedules`);
        if (!resp.ok) throw new Error(resp.statusText);

        const { result, success } = await resp.json();
        if (success && Array.isArray(result.schedule)) {
          const formatted = result.schedule.map((s) => ({
            ...s,
            time: convertTime(s.time),
          }));
          setSchedules(formatted);
        } else {
          setSchedules([]);
        }
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
        setSchedules([]);
      }
    };

    fetchSchedules();
  }, [movieId]);

  // Fetch filtered schedule
  useEffect(() => {
    if (!scheduleQuery.date) return;

    const fetchFiltered = async () => {
      try {
        const params = new URLSearchParams(scheduleQuery).toString();
        const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}/schedule?${params}`);
        if (!resp.ok) throw new Error(resp.statusText);

        const { result, success } = await resp.json();
        setScheduleFilter(success ? result : []);
      } catch (err) {
        console.error("Failed to fetch filtered schedule:", err);
        setScheduleFilter([]);
      }
    };

    fetchFiltered();
  }, [scheduleQuery, movieId]);

  // Unique options
  const cinemaLocs = [...new Set(schedules.map((s) => s.location))];
  const cinemaTimes = [...new Set(schedules.map((s) => s.time))];
  const cinemaDates = [...new Set(schedules.map((s) => s.date))];

  // Handle booking
  const handleSubmit = (e) => {
    e.preventDefault();
    const cinemaId = e.target.cinema.id;

    if (!token) {
      toast("Harap melakukan login terlebih dahulu.", {
        style: { color: "darkred" },
        icon: "⚠️",
      });
      return;
    }

    dispatch(
      bookTicket({
        scheduleId: scheduleFilter[0]?.schedule_id,
        movieId,
        ...scheduleQuery,
        cinemaId,
      })
    );

    navigate("/movie/order");
  };

  // Handle filter
  const handleCinemaFilter = (e) => {
    e.preventDefault();

    const { date, time, location } = e.target;
    const formattedDate = format(parseISO(date.value), "yyyy-MM-dd");

    setScheduleQuery({
      date: formattedDate,
      time: convTime(time.value),
      location: convLocation(location.value),
    });

    if (scheduleFilter.length > 0) setIsFiltered(false);
  };

  // Styles
  const hGray = "text-md text-[#8692A6]";
  const tBlk = "text-md text-[#121212]";
  const selGray = "bg-[#EFF0F6] rounded-md p-3 px-4 text-[#4E4B66]";
  const btnBlu =
    "bg-[#1D4ED8] py-3 text-white rounded-sm hover:opacity-[.7] hover:cursor-pointer";
  const pgStyle =
    "border border-[#DEDEDE] text-[#4E4B66] size-8 flex items-center justify-center rounded-sm hover:bg-[#1D4ED8] hover:text-white hover:border-none hover:cursor-pointer";
  // const cinemaStyle =
  //   "grid place-content-center border-2 border-[#DEDEDE] rounded-md py-8 hover:border-[#1D4ED8] hover:cursor-pointer";

  return (
    <main className="flex flex-col items-center relative gap-12">
      <Toaster />

      {/* Movie Banner */}
      <img
        className="rounded-b-lg md:rounded-b-4xl absolute object-cover shadow-md md:w-screen md:h-96"
        src={
          movie.backdrop_path
            ? `${import.meta.env.VITE_BASE_API_URL}/backdrop/${movie.backdrop_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/f/f5/No-Image-Placeholder-landscape.svg"
        }
        alt=""
      />

      {/* Movie Info */}
      <section className="mov-detail relative mt-24 px-6 md:mt-76 md:self-start md:px-28">
        <div className="detail-wrapper flex flex-col md:flex-row gap-6 items-center md:items-end">
          <img
            className="w-3/4 md:w-1/6 rounded-lg shadow-lg"
            src={`${import.meta.env.VITE_BASE_API_URL}/poster/${movie.poster_path}`}
            alt=""
          />
          <div className="right-items flex flex-col items-center md:items-start gap-4">
            <h2 className="text-3xl font-semibold">{movie.title}</h2>

            <div className="genre flex gap-3">
              {movie.genres ? (
                movie.genres.map((g) => (
                  <p
                    key={g.id}
                    className="text-[#A0A3BD] bg-[#f5f6f8] rounded-xl px-4 py-1 text-sm"
                  >
                    {g.name}
                  </p>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div className="grid grid-cols-4 gap-y-4 md:gap-x-12">
              <div>
                <h5 className={hGray}>Release Date</h5>
                <p className={tBlk}>
                  {movie.release_date &&
                    format(new Date(movie.release_date), "LLLL dd, yyyy")}
                </p>
              </div>
              <div className="col-span-3">
                <h5 className={hGray}>Directed by</h5>
                <p className={tBlk}>{movie.director_name || "-"}</p>
              </div>
              <div>
                <h5 className={hGray}>Duration</h5>
                <p className={tBlk}>
                  {movie.runtime &&
                    `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                </p>
              </div>
              <div className="col-span-3">
                <h5 className={hGray}>Casts</h5>
                <p className={tBlk}>
                  {movie.cast?.map((c) => c.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="synopsis-wrapper md:w-[70%] mt-6">
          <h3 className="font-semibold text-lg">Synopsis</h3>
          <p className="text-[#A0A3BD]">{movie.overview}</p>
        </div>
      </section>

      {/* Booking */}
      <div className="flex flex-col w-full gap-6 px-6 md:px-28">
        <h2 className="text-2xl text-[#121212]">Book Tickets</h2>

        {/* Filter */}
        <form onSubmit={handleCinemaFilter} className="grid md:grid-cols-4 gap-4">
          <h4 className="hidden md:block font-semibold">Choose Date</h4>
          <h4 className="hidden md:block font-semibold">Choose Time</h4>
          <h4 className="hidden md:block font-semibold col-span-2">
            Choose Location
          </h4>

          <select name="date" className={selGray}>
            {cinemaDates.map((d, i) => {
              const date = parseISO(d);
              return (
                <option key={i} value={d}>
                  {format(date, "dd/MM/yy")}
                </option>
              );
            })}
          </select>
          <select name="time" className={selGray}>
            {cinemaTimes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select name="location" className={selGray}>
            {cinemaLocs.map((l, i) => (
              <option key={i} value={l}>
                {l}
              </option>
            ))}
          </select>
          <button type="submit" className={btnBlu}>
            Filter
          </button>
        </form>

        {/* Cinema List */}
        <form onSubmit={handleSubmit} className="choose-cinema flex flex-col gap-6">
          <div className="title flex gap-8">
            <h4 className="font-semibold">Choose Cinema</h4>
            <h4 className="text-[#8692A6] font-bold">
              {isFiltered ? schedules.length : scheduleFilter.length} Result
            </h4>
          </div>

          <ul className="cinema-icon grid grid-cols-2 md:grid-cols-4 gap-4">
            {(isFiltered ? schedules : scheduleFilter)
              .slice(0, 4)
              .map((c, i) => (
                <li key={i}>
                  <input
                    type="radio"
                    id={c.schedule_id}
                    name="cinema"
                    className="hidden peer"
                  />
                  <label
                    htmlFor={c.schedule_id}
                    className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100"
                  >
                    <img src={c.cinema_img} className="max-w-56" alt="" />
                  </label>
                  <p>{c.cinema || c.cinema_name}</p>
                </li>
              ))}
          </ul>

          <div className="cinema-num flex justify-center gap-2 mt-9">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={pgStyle}>
                {n}
              </div>
            ))}
          </div>

          <button type="submit" className={`${btnBlu} w-max self-center p-2 px-12`}>
            Book Now
          </button>
        </form>
      </div>
    </main>
  );
}

export default MovieDetail;

// import { useContext, useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router"
// import { format, parseISO } from 'date-fns'
// // import { getCredit, getDetail } from "../../redux/slices/detailSlice.js"
// import { useDispatch, useSelector } from "react-redux"
// import toast, { Toaster } from 'react-hot-toast';
// import { orderContext as OrderContext } from "../../context/order/orderContext"
// import { addSchedule } from "../../redux/slices/detailSlice.js"
// import { getDetail } from "../../redux/slices/movieSlice.js";
// import { convLocation, convTime } from "../../utils/movieUtil.js";
// import { getSchedule } from "../../redux/slices/cinemaSlice.js";
// import { bookTicket } from "../../redux/slices/orderSlice.js";
// import { convertTime } from "../../utils/convertTime.js";

// function MovieDetail() {
//   // const { selected, crew } = useSelector((state) => state.selectedMovie);
//   // const { movie, crew } = useSelector((state) => state.currDetail);
//   const { detail: movie } = useSelector((state) => state.tmdb);
//   const { schedule } = useSelector((state) => state.cinema);
//   // const { scheduleFilter } = useSelector((state) => state.cinema);
//   const dispatch = useDispatch();
//   const { movieId } = useParams();
//   // const [detail, setDetail] = useState({});
//   // const [genres, setGenres] = useState([]);
//   const navigate = useNavigate();
//   // const [selectedMovie, setSelectedMovie] = useState({});
//   // const { mkOrder } = useContext(OrderContext);
//   // const { isLogged } = useSelector((state) => state.whoami);
//   const [scheduleQuery, setScheduleQuery] = useState({});
//   const [isFiltered, setIsFiltered] = useState(true);
//   const { token, isExpired } = useSelector((state) => state.auth);
//   const [scheduleFilter, setScheduleFilter] = useState([]);
//   const [schedules, setSchedules] = useState([]);
//   const [disable, setDisable] = useState("disabled");

//   console.log(movie)

//   useEffect(() => {
//     dispatch(getDetail(movieId));
//   }, [dispatch, movieId]);

//   useEffect(() => {
//     const url = `${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}/schedules`;

//     fetch(url, { method: "GET" })
//       .then((resp) => {
//         if (!resp.ok) throw new Error(resp.statusText);
//         return resp.json();
//       })
//       .then((res) => {
//         if (res.success && Array.isArray(res.result.schedule)) {
//           const formattedSchedules = res.result.schedule.map((item) => ({
//             ...item,
//             time: convertTime(item.time),
//           }));
//           setSchedules(formattedSchedules);
//         } else {
//           setSchedules([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch schedules:", err);
//         setSchedules([]);
//       });
//   }, [movieId]);

//   useEffect(() => {
//     let url = `${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}/schedule?`
//     url += `date=${scheduleQuery.date}&`
//     url += `time=${scheduleQuery.time}&`
//     url += `location=${scheduleQuery.location}`
//     const options = {
//       method: "GET",
//     };

//     const request = new Request(url, options);
//     fetch(request)
//       .then((resp) => {
//         if (!resp.ok) throw resp.statusText;
//         return resp.json();
//       })
//       .then(res => {
//         if (res.success) {
//           setScheduleFilter(res.result);
//         } else {
//           setScheduleFilter([]);
//         }
//       })
//       .catch(err => console.log(err))
//   }, [scheduleQuery, movieId]);

//   const cinemaLocs = [...new Set(schedules.map(e => e.location))];
//   const cinemaTimes = [...new Set(schedules.map(e => e.time))];
//   const cinemaDates = [...new Set(schedules.map(e => e.date))];
//   // useEffect(() => {
//   //   dispatch(getDetail(movieId));
//   //   dispatch(getCredit(movieId));

//   // }, [dispatch, movieId]);

//   const hGray = "text-md text-[#8692A6]";
//   const tBlk = "text-md text-[#121212]";
//   const selGray = "bg-[#EFF0F6] rounded-md p-3 px-4 text-[#4E4B66]";
//   const btnBlu = "bg-[#1D4ED8] py-3 text-white rounded-sm hover:opacity-[.7] hover:cursor-pointer";
//   const pgStyle = "border border-[#DEDEDE] text-[#4E4B66] size-8 flex items-center justify-center rounded-sm hover:bg-[#1D4ED8] hover:text-white hover:border-none hover:cursor-pointer hover:[#FFFFFF]";
//   const cinemaStyle = "grid place-content-center border-2 border-[#DEDEDE] rounded-md py-8 hover:border-[#1D4ED8] hover:cursor-pointer";

//   // const times = [
//   //   "08 : 30 AM", "10 : 30 AM", "01 : 30 PM", "03 : 30 PM",
//   // ];
//   // const locations = [
//   //   "Bandung", "Bogor", "Surabaya", "Purwokerto"
//   // ];

//   function handleSubmit(e) {
//     e.preventDefault();
//     let result = {};

//     // for (let i = 0; i < 3; i++) {
//     //   Object.assign(result, {
//     //     [e.target[i].name]: e.target[i].value
//     //   });
//     // }

//     // for (const cinema of e.target.cinema) {
//     //   if (cinema.checked) {
//     //     Object.assign(result, { cinema: cinema.id });
//     //   }
//     // }

//     const cinemaId = e.target.cinema.id;

//     // dispatch(addOrderDetail(result));
//     if (!token) {
//       toast('Harap melakukan login terlebih dahulu.', {
//         style: {
//           color: 'darkred',
//         },
//         icon: '⚠️',
//       });
//     } else {
//       dispatch(bookTicket({
//         scheduleId: scheduleFilter[0].schedule_id,
//         movieId,
//         date: scheduleQuery.date,
//         time: scheduleQuery.time,
//         location: scheduleQuery.location,
//         cinemaId,
//       }));
//       // dispatch(addSchedule(result));
//       // mkOrder({ movie, schedule: result });
//       navigate("/movie/order");
//     }
//   }

//   function handleCinemaFilter(e) {
//     e.preventDefault();

//     const form = e.target;
//     const unformatDate = form.date.value;
//     const formattedDate = format(parseISO(unformatDate), "yyyy-MM-dd");

//     const inputBody = {
//       date: formattedDate,
//       time: convTime(form.time.value),
//       location: convLocation(form.location.value),
//     };

//     setScheduleQuery(inputBody);
//     if (scheduleFilter.length == 0) {
//       return
//     }
//     setIsFiltered(!isFiltered)
//   }

//   return (
//     <main className="flex flex-col items-center relative gap-12">
//       <Toaster />
//       <img
//         className="rounded-b-lg md:rounded-b-4xl absolute object-cover shadow-md md:w-screen md:h-96"
//         src={movie.backdrop_path ?
//           `${import.meta.env.VITE_BASE_API_URL}/backdrop/${movie.backdrop_path}` :
//           `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/No-Image-Placeholder-landscape.svg/1280px-No-Image-Placeholder-landscape.svg.png`
//         }
//       />

//       <section className="mov-detail relative mt-24 px-6 md:mt-76 md:self-start md:px-28">
//         <div
//           className="detail-wrapper flex flex-col md:flex-row gap-6 items-center md:items-start"
//         >
//           <img
//             className="w-3/4 md:w-1/6 rounded-lg shadow-lg"
//             src={`${import.meta.env.VITE_BASE_API_URL}/poster/${movie.poster_path}`}
//             alt=""
//           />
//           <div className="right-items flex flex-col items-center md:items-start md:self-end gap-4">
//             <h2 className="text-3xl font-semibold">{movie.title}</h2>
//             <div className="genre flex gap-3">
//               {movie.genres ?
//                 movie.genres.map((e) => {
//                   return <p
//                     key={e.id}
//                     className="text-[#A0A3BD] bg-[#f5f6f8] rounded-xl px-4 py-1 text-sm">
//                     {e.name}
//                   </p>
//                 }) :
//                 <p>Loading...</p>
//               }
//             </div>
//             <div className="grid-child grid grid-cols-4 gap-y-4 md:gap-x-12">
//               <div className="release">
//                 <h5 className={hGray}>Release Date</h5>
//                 <p className={tBlk}>
//                   {movie.release_date &&
//                     format(new Date(movie.release_date), "LLLL dd, yyyy")}
//                 </p>
//               </div>
//               <div className="director col-span-3">
//                 <h5 className={hGray}>Directed by</h5>
//                 <p className={tBlk}>
//                   {movie.director_name ?
//                     movie.director_name :
//                     "-"
//                   }
//                 </p>
//               </div>
//               <div className="duration">
//                 <h5 className={hGray}>Duration</h5>
//                 <p className={tBlk}>
//                   {`${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes`}
//                 </p>
//               </div>
//               <div className="casts col-span-3">
//                 <h5 className={hGray}>Casts</h5>
//                 <div className={`${tBlk} flex gap-4`}>
//                   <p className={tBlk}>
//                     {movie.cast &&
//                       movie.cast.map((e) => {
//                         return e.name;
//                       }).join(", ")}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="synopsis-wrapper md:w-[70%] md:mt-6 col-span-3">
//           <h3 className="font-semibold text-lg">Synopsis</h3>
//           <p className="text-[#A0A3BD]">{movie.overview}</p>
//         </div>
//       </section>

//       <div className="flex flex-col w-full gap-6 px-6 md:px-28">
//         <h2 className="text-2xl text-[#121212]">Book Tickets</h2>
//         <form
//           onSubmit={handleCinemaFilter}
//           className="grid-cont grid md:grid-cols-4 gap-4"
//         >
//           <h4 className="hidden md:block font-semibold">Choose Date</h4>
//           <h4 className="hidden md:block font-semibold">Choose Time</h4>
//           <h4 className="hidden md:block font-semibold col-span-2">Choose Location</h4>
//           <select name="date" className={selGray}>
//             {cinemaDates &&
//               cinemaDates.map((e, i) => {
//                 const date = parseISO(e);
//                 const dateOnly = format(date, "dd/MM/yy")
//                 return <option key={i} value={e}>{dateOnly}</option>
//               })}
//           </select>
//           <select name="time" className={selGray}>
//             {cinemaTimes &&
//               cinemaTimes.map((e, i) => {
//                 return <option key={i} value={e}>{e}</option>
//               })}
//           </select>
//           <select name="location" className={selGray}>
//             {cinemaLocs &&
//               cinemaLocs.map((e, i) => {
//                 return <option key={i} value={e}>{e}</option>
//               })}
//           </select>
//           <button type="submit" className={btnBlu}>Filter</button>
//         </form>
//         <form
//           onSubmit={handleSubmit}
//           className="choose-cinema flex flex-col gap-6">
//           <div className="title flex gap-8">
//             <h4 className="font-semibold">Choose Cinema</h4>
//             <h4 className="text-[#8692A6] font-bold">{
//               isFiltered ?
//                 schedules.length :
//                 scheduleFilter.length
//             } Result</h4>
//           </div>
//           <ul className="cinema-icon grid grid-cols-2 md:grid-cols-4 gap-4">
//             {
//               isFiltered ? (
//                 schedules.length > 0 && schedules.slice(0, 4).map((e, i) => (
//                   <li key={i}>
//                     <input
//                       type="radio"
//                       id={e.schedule_id}
//                       name="cinema"
//                       className="hidden peer"
//                     />
//                     <label
//                       htmlFor={e.schedule_id}
//                       className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100"
//                     >
//                       <img src={e.cinema_img} className="max-w-56" alt="" />
//                     </label>
//                     <p>{e.cinema}</p>
//                   </li>
//                 ))
//               ) : (
//                 scheduleFilter.length != 0 &&
//                 scheduleFilter.slice(0, 4).map((e, i) => (
//                   <li key={i}>
//                     <input
//                       type="radio"
//                       id={e.schedule_id}
//                       name="cinema"
//                       className="hidden peer"
//                     />
//                     <label
//                       htmlFor={e.schedule_id}
//                       className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100"
//                     >
//                       <img src={e.cinema_img} className="max-w-56" alt="" />
//                     </label>
//                     <p>{e.cinema_name}</p>
//                   </li>
//                 ))
//               )
//             }

//             {/* {
//               isFiltered ?
//                 schedule.schedule.slice(0, 4).map((e, i) => (
//                   <li key={i}>
//                     <input
//                       type="radio"
//                       id={e.schedule_id}
//                       name="cinema"
//                       className="hidden peer"
//                     />
//                     <label
//                       htmlFor={e.schedule_id}
//                       className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100"
//                     >
//                       <img src={e.cinema_img} className="max-w-56" alt="" />
//                     </label>
//                     <p>{e.cinema}</p>
//                   </li>
//                 ))
//                 :
//                 scheduleFilter.slice(0, 4).map((e, i) => (
//                   <li key={i}>
//                     <input
//                       type="radio"
//                       id={e.schedule_id}
//                       name="cinema"
//                       className="hidden peer"
//                     />
//                     <label
//                       htmlFor={e.schedule_id}
//                       className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100"
//                     >
//                       <img src={e.cinema_img} className="max-w-56" alt="" />
//                     </label>
//                     <p>{e.cinema_name}</p>
//                   </li>
//                 ))
//             } */}
//           </ul>
//           <div className="cinema-num flex justify-center gap-2 mt-9">
//             <div className={pgStyle}>1</div>
//             <div className={pgStyle}>2</div>
//             <div className={pgStyle}>3</div>
//             <div className={pgStyle}>4</div>
//           </div>
//           <button className={`${btnBlu} w-max self-center p-2 px-12`}
//             type="submit"
//           >
//             Book Now
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default MovieDetail