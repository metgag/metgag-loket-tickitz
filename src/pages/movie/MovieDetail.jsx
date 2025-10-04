import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { format, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { convertTime } from "../../utils/convertTime.js";
import { convLocation, convTime } from "../../utils/movieUtil.js";
import { selectedMovie, selectedSchedule } from "../../redux/slices/orderSlice.js";

function MovieDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [movie, setMovie] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [query, setQuery] = useState({});
  const [isFiltered, setIsFiltered] = useState(false);

  const [showTime, setShowTime] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 48, left: 0, behavior: "auto" });
  }, [movieId]);

  /** Fetch movie details */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const { result } = await res.json();
        setMovie(result);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [movieId]);

  /** Fetch all schedules for this movie */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}/schedules`
        );
        if (!res.ok) throw new Error("Failed to fetch schedules");
        const { result, success } = await res.json();

        if (success && Array.isArray(result.schedule)) {
          setSchedules(
            result.schedule.map((s) => ({ ...s, time: convertTime(s.time) }))
          );
        } else {
          setSchedules([]);
        }
      } catch (err) {
        console.error(err);
        setSchedules([]);
      }
    })();
  }, [movieId]);

  /** Fetch schedules with filters */
  useEffect(() => {
    if (!query.date && !query.time && !query.location) return;

    (async () => {
      try {
        const params = new URLSearchParams(query).toString();
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/movies/${movieId}/schedule?${params}`
        );
        if (!res.ok) throw new Error("Failed to fetch filtered schedules");
        const { result, success } = await res.json();

        setFilteredSchedules(success && Array.isArray(result) ? result : []);
      } catch (err) {
        console.error(err);
        setFilteredSchedules([]);
      }
    })();
  }, [query, movieId]);

  /** Unique filter options */
  const cinemaLocations = [...new Set(schedules.map((s) => s.location))];
  const cinemaTimes = [...new Set(schedules.map((s) => s.time))];
  const cinemaDates = [...new Set(schedules.map((s) => s.date))];

  /** Handle booking */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, location, time } = query;
    console.log(movie);

    if (!token) {
      toast("Please log in first!", { icon: "⚠️", style: { color: "darkred" } });
      return;
    }

    const chosenRadio = Array.from(e.target.cinema).find((r) => r.checked);
    if (!chosenRadio) {
      toast("Please select a cinema!", { icon: "⚠️" });
      return;
    }

    dispatch(
      selectedMovie({
        movieId,
        title: movie?.title,
        genres: movie?.genres,
        poster: movie?.poster_path,
      })
    );

    dispatch(
      selectedSchedule({
        scheduleId: chosenRadio.value,
        showDate: date,
        showLocationId: location,
        showTimeId: time,
        showTime: showTime,
        showCinemaName: chosenRadio.dataset.cinemaName,
      })
    );

    navigate("/movie/order");
  };

  /** Handle schedule filtering */
  const handleFilter = (e) => {
    e.preventDefault();
    const { date, time, location } = e.target;

    if (!date.value && !time.value && !location.value) {
      setQuery({});
      setIsFiltered(false);
      return;
    }

    setQuery({
      ...(date.value && { date: format(parseISO(date.value), "yyyy-MM-dd") }),
      ...(time.value && { time: convTime(time.value) }),
      ...(location.value && { location: convLocation(location.value) }),
    });
    setShowTime(time.value);
    setIsFiltered(true);
  };

  /** Styles */
  const hGray = "text-md text-[#8692A6]";
  const tBlk = "text-md text-[#121212]";
  const selGray = "bg-[#EFF0F6] rounded-md p-3 px-4 text-[#4E4B66]";
  const btnBlu =
    "bg-[#1D4ED8] py-3 text-white rounded-sm hover:opacity-[.7] hover:cursor-pointer";
  const pgStyle =
    "border border-[#DEDEDE] text-[#4E4B66] size-8 flex items-center justify-center rounded-sm hover:bg-[#1D4ED8] hover:text-white hover:border-none hover:cursor-pointer";

  return (
    <main className="flex flex-col items-center relative gap-12">
      <Toaster />

      {/* Banner */}
      <img
        className="rounded-b-lg md:rounded-b-4xl absolute object-cover shadow-md md:w-screen md:h-96"
        src={
          movie?.backdrop_path
            ? `${import.meta.env.VITE_BASE_API_URL}/backdrop/${movie.backdrop_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/f/f5/No-Image-Placeholder-landscape.svg"
        }
        alt={movie?.title || "Movie banner"}
      />

      {/* Movie Info */}
      <section className="mov-detail relative mt-24 px-6 md:mt-76 md:self-start md:px-28">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
          <img
            className="w-3/4 md:w-1/6 rounded-lg shadow-lg"
            src={
              movie?.poster_path
                ? `${import.meta.env.VITE_BASE_API_URL}/poster/${movie.poster_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/8/8d/ERR0R_NO_IMAGE_FOUND.jpg"
            }
            alt={movie?.title || "Movie poster"}
          />
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-3xl font-semibold">{movie?.title}</h2>

            {/* Genres */}
            <div className="flex gap-3 flex-wrap">
              {movie?.genres?.length ? (
                movie.genres.map((g) => (
                  <p
                    key={g.id}
                    className="text-[#A0A3BD] bg-[#f5f6f8] rounded-xl px-4 py-1 text-sm"
                  >
                    {g.name}
                  </p>
                ))
              ) : (
                <p className="text-[#A0A3BD]">No genres</p>
              )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-4 gap-y-4 md:gap-x-12">
              <div>
                <h5 className={hGray}>Release Date</h5>
                <p className={tBlk}>
                  {movie?.release_date &&
                    format(new Date(movie.release_date), "LLLL dd, yyyy")}
                </p>
              </div>
              <div className="col-span-3">
                <h5 className={hGray}>Directed by</h5>
                <p className={tBlk}>{movie?.director_name || "-"}</p>
              </div>
              <div>
                <h5 className={hGray}>Duration</h5>
                <p className={tBlk}>
                  {movie?.runtime &&
                    `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                </p>
              </div>
              <div className="col-span-3">
                <h5 className={hGray}>Casts</h5>
                <p className={tBlk}>
                  {movie?.cast?.map((c) => c.name).join(", ") || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="md:w-[70%] mt-6">
          <h3 className="font-semibold text-lg">Synopsis</h3>
          <p className="text-[#A0A3BD]">{movie?.overview || "-"}</p>
        </div>
      </section>

      {/* Booking Section */}
      <div className="flex flex-col w-full gap-6 px-6 md:px-28">
        <h2 className="text-2xl text-[#121212]">Book Tickets</h2>

        {/* Filter */}
        <form onSubmit={handleFilter} className="grid md:grid-cols-4 gap-4">
          <h4 className="hidden md:block font-semibold">Choose Date</h4>
          <h4 className="hidden md:block font-semibold">Choose Time</h4>
          <h4 className="hidden md:block font-semibold col-span-2">
            Choose Location
          </h4>

          <select name="date" className={selGray}>
            <option value="">--</option>
            {cinemaDates.map((d, i) => (
              <option key={i} value={d}>
                {format(parseISO(d), "dd/MM/yy")}
              </option>
            ))}
          </select>
          <select name="time" className={selGray}>
            <option value="">--</option>
            {cinemaTimes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select name="location" className={selGray}>
            <option value="">--</option>
            {cinemaLocations.map((l, i) => (
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-8">
            <h4 className="font-semibold">Choose Cinema</h4>
            <h4 className="text-[#8692A6] font-bold">
              {(isFiltered ? filteredSchedules : schedules).length} Result
            </h4>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(isFiltered ? filteredSchedules : schedules).slice(0, 4).map((c) => (
              <li key={c.schedule_id}>
                <input
                  type="radio"
                  id={c.schedule_id}
                  name="cinema"
                  value={c.schedule_id}
                  className="hidden peer"
                  data-cinema-name={c.cinema_name}
                />
                <label
                  htmlFor={c.schedule_id}
                  className="inline-flex items-center justify-center w-full h-full py-5 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100"
                >
                  <img src={c.cinema_img} className="max-w-56" alt={c.cinema_name} />
                </label>
                <p>{c.cinema_name}</p>
              </li>
            ))}
          </ul>

          {/* Pagination placeholder */}
          <div className="flex justify-center gap-2 mt-9">
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