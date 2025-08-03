import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { format } from 'date-fns'

function MovieDetail() {
  const { movieId } = useParams();
  const [detail, setDetail] = useState({});
  const [genres, setGenres] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
  };
  const hGray = "text-md text-[#8692A6]";
  const tBlk = "text-md text-[#121212]";
  const selGray = "bg-[#EFF0F6] rounded-md p-3 px-4 text-[#4E4B66]";
  const btnBlu = "bg-[#1D4ED8] text-white rounded-sm hover:opacity-[.7] hover:cursor-pointer";
  const pgStyle = "border border-[#DEDEDE] text-[#4E4B66] size-8 flex items-center justify-center rounded-sm hover:bg-[#1D4ED8] hover:text-white hover:border-none hover:cursor-pointer hover:[#FFFFFF]";
  const cinemaStyle = "grid place-content-center border-2 border-[#DEDEDE] rounded-md py-8 hover:border-none hover:bg-[#1D4ED8] hover:cursor-pointer";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DETAIL_URL}${movieId}`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const { runtime, title, release_date, overview, genres, backdrop_path, poster_path } = res;
        const fDate = format(new Date(release_date), "MMMM dd, yyyy");
        const result = {
          title,
          fDate,
          overview,
          backdrop_path,
          poster_path,
          runtime
        };

        setDetail(result);
        setGenres(genres);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="flex flex-col relative gap-12">
      <img
        className="w-screen h-94 rounded-b-2xl object-cover object-[0_-6rem] absolute"
        src={`${import.meta.env.VITE_POSTER_URL}${detail.backdrop_path}`}
      />

      <section className="mov-detail relative top-[13rem] mb-[13rem] px-28 flex flex-col gap-6">
        <div className="detail-wrapper flex gap-4">
          <img
            className="h-80 rounded-lg"
            src={`${import.meta.env.VITE_POSTER_URL}${detail.poster_path}`}
            alt=""
          />
          <div className="right-items self-end flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">{detail.title}</h2>
            <div className="genre flex gap-2">
              {genres.map((genre) => {
                return (
                  <p className="px-3 rounded-full bg-[#f5f6f8] text-[#A0A3BD]">
                    {genre.name}
                  </p>
                )
              })}
            </div>
            <div className="grid-child flex gap-6">
              <div className="release">
                <h5 className={hGray}>Release Date</h5>
                <p className={tBlk}>{detail.fDate}</p>
              </div>
              <div className="duration">
                <h5 className={hGray}>Duration</h5>
                <p className={tBlk}>
                  {`${Math.floor(detail.runtime / 60)} hours ${detail.runtime % 60} minutes`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="synopsis-wrapper w-[70%] col-span-3">
          <h3 className="font-semibold text-lg">Synopsis</h3>
          <p className="text-[#A0A3BD]">{detail.overview}</p>
        </div>
      </section>

      <section id="book" className="flex flex-col gap-6 px-28">
        <h2 className="text-2xl text-[#121212]">Book Tickets</h2>
        <div className="grid-cont grid grid-cols-4 gap-4">
          <h4 className="font-semibold">Choose Date</h4>
          <h4 className="font-semibold">Choose Time</h4>
          <h4 className="font-semibold col-span-2">Choose Location</h4>
          <select name="" className={selGray}>
            <option value="">21/07/20</option>
          </select>
          <select name="" className={selGray}>
            <option value="">08 : 30 AM</option>
          </select>
          <select name="" className={selGray}>
            <option value="">Purwokerto</option>
          </select>
          <button className={btnBlu}>Filter</button>
        </div>
        <div className="choose-cinema flex flex-col gap-6">
          <div className="title flex gap-8">
            <h4 className="font-semibold">Choose Cinema</h4>
            <h4 className="text-[#8692A6] font-bold">39 Result</h4>
          </div>
          <div className="cinema-icon grid grid-cols-4 gap-4">
            <div id="cinema-1" className={cinemaStyle}>
              <img src="/sponsor/ebv.png" alt="" />
            </div>
            <div id="cinema-2" className={cinemaStyle}>
              <img src="/sponsor/hif.svg" alt="" />
            </div>
            <div id="cinema-3" className={cinemaStyle}>
              <img src="/sponsor/cine.svg" alt="" />
            </div>
            <div id="cinema-4" className={cinemaStyle}>
              <img src="/sponsor/ebv.png" alt="" />
            </div>
          </div>
          <div className="cinema-num flex justify-center gap-2">
            <div className={pgStyle}>1</div>
            <div className={pgStyle}>2</div>
            <div className={pgStyle}>3</div>
            <div className={pgStyle}>4</div>
          </div>
          <button className={`${btnBlu} w-max self-center p-2 px-12`}>Book Now</button>
        </div>
      </section>
    </main>
  )
}

export default MovieDetail