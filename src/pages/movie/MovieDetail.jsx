import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { format } from 'date-fns'
import { getCredit, getDetail } from "../../redux/slices/detailSlice.js"
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { orderContext as OrderContext } from "../../context/order/orderContext"
import { addSchedule } from "../../redux/slices/detailSlice.js"

function MovieDetail() {
  // const { selected, crew } = useSelector((state) => state.selectedMovie);
  const { movie, crew } = useSelector((state) => state.currDetail);
  const dispatch = useDispatch();
  const { movieId } = useParams();
  // const [detail, setDetail] = useState({});
  // const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState({});
  const { mkOrder } = useContext(OrderContext);
  const { isLogged } = useSelector((state) => state.whoami);

  useEffect(() => {
    dispatch(getDetail(movieId));
    dispatch(getCredit(movieId));

    // setSelectedMovie(selected);
  }, [dispatch, movieId]);

  const hGray = "text-md text-[#8692A6]";
  const tBlk = "text-md text-[#121212]";
  const selGray = "bg-[#EFF0F6] rounded-md p-3 px-4 text-[#4E4B66]";
  const btnBlu = "bg-[#1D4ED8] py-3 text-white rounded-sm hover:opacity-[.7] hover:cursor-pointer";
  const pgStyle = "border border-[#DEDEDE] text-[#4E4B66] size-8 flex items-center justify-center rounded-sm hover:bg-[#1D4ED8] hover:text-white hover:border-none hover:cursor-pointer hover:[#FFFFFF]";
  const cinemaStyle = "grid place-content-center border-2 border-[#DEDEDE] rounded-md py-8 hover:border-[#1D4ED8] hover:cursor-pointer";

  const times = [
    "08 : 30 AM", "10 : 30 AM", "01 : 30 PM", "03 : 30 PM",
  ];
  const locations = [
    "Bandung", "Bogor", "Surabaya", "Purwokerto"
  ];

  function handleSubmit(e) {
    e.preventDefault();
    let result = {};

    for (let i = 0; i < 3; i++) {
      Object.assign(result, {
        [e.target[i].name]: e.target[i].value
      });
    }

    for (const cinema of e.target.cinema) {
      if (cinema.checked) {
        Object.assign(result, { cinema: cinema.id });
      }
    }

    // dispatch(addOrderDetail(result));
    if (!isLogged) {
      toast('Harap melakukan login terlebih dahulu.', {
        style: {
          color: 'darkred',
        },
        icon: '⚠️',
      });
    } else {
      dispatch(addSchedule(result));
      mkOrder({ movie, schedule: result });
      navigate("/movie/order");
    }
  }

  return (
    <main className="flex flex-col items-center relative gap-12">
      <Toaster />
      <img
        className="rounded-b-lg md:rounded-b-4xl absolute object-cover shadow-md md:w-screen md:h-96"
        src={movie.backdrop_path ?
          `${import.meta.env.VITE_POSTER_URL}${movie.backdrop_path}` :
          `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/No-Image-Placeholder-landscape.svg/1280px-No-Image-Placeholder-landscape.svg.png`
        }
      />

      <section className="mov-detail relative mt-24 px-6 md:mt-76 md:self-start md:px-28">
        <div
          className="detail-wrapper flex flex-col md:flex-row gap-6 items-center md:items-start"
        >
          <img
            className="w-3/4 md:w-1/6 rounded-lg shadow-lg"
            src={`${import.meta.env.VITE_POSTER_URL}${movie.poster_path}`}
            alt=""
          />
          <div className="right-items flex flex-col items-center md:items-start md:self-end gap-4">
            <h2 className="text-3xl font-semibold">{movie.title}</h2>
            <div className="genre flex gap-3">
              {movie.genresName ?
                movie.genresName.map((e, i) => {
                  return <p
                    key={i}
                    className="text-[#A0A3BD] bg-[#f5f6f8] rounded-xl px-4 py-1 text-sm">
                    {e}
                  </p>
                }) :
                <p>Loading...</p>
              }
            </div>
            <div className="grid-child grid grid-cols-4 gap-y-4 md:gap-x-12">
              <div className="release">
                <h5 className={hGray}>Release Date</h5>
                <p className={tBlk}>
                  {movie.release_date &&
                    format(new Date(movie.release_date), "LLLL dd, yyyy")}
                </p>
              </div>
              <div className="director col-span-3">
                <h5 className={hGray}>Directed by</h5>
                <p className={tBlk}>
                  {crew.director ?
                    crew.director[0].name :
                    "-"
                  }
                </p>
              </div>
              <div className="duration">
                <h5 className={hGray}>Duration</h5>
                <p className={tBlk}>
                  {`${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes`}
                </p>
              </div>
              <div className="casts col-span-3">
                <h5 className={hGray}>Casts</h5>
                <div className={`${tBlk} flex gap-4`}>
                  <p className={tBlk}>
                    {crew.cast &&
                      crew.cast.map((e) => {
                        return e.name;
                      }).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="synopsis-wrapper md:w-[70%] md:mt-6 col-span-3">
          <h3 className="font-semibold text-lg">Synopsis</h3>
          <p className="text-[#A0A3BD]">{movie.overview}</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 px-6 md:px-28">
        <h2 className="text-2xl text-[#121212]">Book Tickets</h2>
        <div className="grid-cont grid md:grid-cols-4 gap-4">
          <h4 className="hidden md:block font-semibold">Choose Date</h4>
          <h4 className="hidden md:block font-semibold">Choose Time</h4>
          <h4 className="hidden md:block font-semibold col-span-2">Choose Location</h4>
          <input type="date" className={selGray} name="date"
            onChange={(e) => {
              const selected = new Date(e.target.value);
              const today = new Date(new Date().toISOString().slice(0, 10));
              const daysDiff = (selected - today) / (1000 * 60 * 60 * 24);

              if (daysDiff < 0) {
                toast.error("Tanggal tidak bisa kurang dari hari ini");
              }
            }}
          />
          <select name="time" className={selGray}>
            {times &&
              times.map((e, i) => {
                return <option key={i} value={e}>{e}</option>
              })}
          </select>
          <select name="location" className={selGray}>
            {locations &&
              locations.map((e, i) => {
                return <option key={i} value={e}>{e}</option>
              })}
          </select>
          <button disabled className={btnBlu}>Filter</button>
        </div>
        <div className="choose-cinema flex flex-col gap-6">
          <div className="title flex gap-8">
            <h4 className="font-semibold">Choose Cinema</h4>
            <h4 className="text-[#8692A6] font-bold">39 Result</h4>
          </div>
          <ul className="cinema-icon grid grid-cols-2 md:grid-cols-4 gap-4">
            {["ebv", "hif", "cine", "cinee"].map((e, i) => {
              return (
                <li key={i}>
                  <input type="radio" id={e} name="cinema" className="hidden peer" />
                  <label htmlFor={e} className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100">
                    <img src={`/sponsor/${e}.svg`} className="max-w-56" alt="" />
                  </label>
                </li>
              )
            })}
          </ul>
          <div className="cinema-num flex justify-center gap-2">
            <div className={pgStyle}>1</div>
            <div className={pgStyle}>2</div>
            <div className={pgStyle}>3</div>
            <div className={pgStyle}>4</div>
          </div>
          <button className={`${btnBlu} w-max self-center p-2 px-12`}
            type="submit"
          >
            Book Now
          </button>
        </div>
      </form>
    </main>
  );
}

export default MovieDetail