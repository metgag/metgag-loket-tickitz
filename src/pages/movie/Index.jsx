import { useState, useEffect } from 'react'
import MovieCard from '../../components/MovieCard.jsx'
import ChooseItem from '../../components/ChooseItem.jsx'
import Subscription from '../../components/Subscription.jsx'
import { format } from 'date-fns'

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [sliceLen, setSliceLen] = useState([0, 4]);

  const whyChoose = [
    { title: "Guaranteed", img: "/icon/shield-done.svg" },
    { title: "Affordable", img: "/icon/check-circle.svg" },
    { title: "24/7 Customer Support", img: "/icon/speech-bubble.svg" },
  ];
  const hBlu = "text-[#1D4ED8] text-lg font-bold";
  const hBlk = "text-[#121212] text-3xl";
  const rounded = `rounded-full text-xl size-[2.5rem] bg-[#A0A3BD] 
    hover:bg-[#1D4ED8] hover:cursor-pointer flex items-center justify-center
    text-white`;
  const rSect = "text-center items-center md:text-left";

  const apiToken = import.meta.env.VITE_API_TOKEN;
  const urlMovies = import.meta.env.VITE_MOVIES_URL;
  const urlGenres = import.meta.env.VITE_GENRES_URL;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  };

  useEffect(() => {
    (async () => {
      const promises = [fetch(urlMovies, options), fetch(urlGenres, options)];
      const [moviesResp, genresResp] = await Promise.all(promises);
      const { results: movieResults } = await moviesResp.json();
      const { genres } = await genresResp.json();
      const genresMap = new Map();
      genres.forEach((genre) => {
        genresMap.set(genre.id, genre.name);
      });

      const movies = movieResults.map((movie) => {
        const { id, title, release_date, genre_ids, poster_path } = movie;
        const fDate = format(new Date(release_date), "MMMM yyyy");
        const result = {
          id,
          title,
          poster_path,
          fDate
        };
        const genres = genre_ids.map((genreId) => {
          return genresMap.get(genreId);
        });
        Object.assign(result, { genres });
        return result;
      });

      setMovies(movies);
    })();
  }, []);

  function handlePage(e) {
    if (e.target.className.includes("right")) {
      setSliceLen((e) => {
        if (e[0] == 16 && e[1] == 20) return e;
        return e.map((f) => f + 1);
      });
    } else {
      setSliceLen((e) => {
        if (e[0] == 0 && e[1] == 4) return e;
        return e.map((f) => f - 1);
      });
    }
  }

  return (
    <main className="flex px-6 flex-col md:px-28 gap-12">
      <section id="hero"
        className={`flex flex-col h-[88vh] md:flex-row ${rSect}`}>
        <div className="l-items flex flex-col gap-4 justify-center text-center md:text-left">
          <h4 className={hBlu}>MOVIE TICKET PURCHASES #1 IN INDONESIA</h4>
          <h1 className="text-5xl text-[#121212]">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
          <p className="text-[#A0A3BD]">
            Sign up and get the ticket with a lot of discount
          </p>
        </div>
        <div className="r-items grid w-full h-[28rem] grid-cols-2 gap-4">
          <div
            className="bg-[url(/thumbnail/thumb-babayaga.png)] bg-cover 
              rounded-t-3xl">
          </div>
          <div
            className="bg-[url(/thumbnail/thumb-lion-king.png)] row-span-2 
              bg-cover rounded-t-3xl">
          </div>
          <div
            className="bg-[url(/thumbnail/thumb-spidermen.png)] row-span-2 
              bg-cover rounded-b-3xl">
          </div>
          <div
            className="bg-[url(/thumbnail/thumb-robloxx.jpg)]
              bg-cover rounded-b-3xl">
          </div>
        </div>
      </section>

      <section id="choose" className={`flex flex-col gap-6 items-center md:items-start`}>
        <h4 className={hBlu}>WHY CHOOSE US</h4>
        <h3 className={`${hBlk} md:w-[40%]`}>
          Unleashing the Ultimate Movie Experience
        </h3>
        <div id="point" className="flex flex-col gap-8 md:flex-row">
          {whyChoose.map((choose, i) => {
            return <ChooseItem i={i} title={choose.title} img={choose.img} />
          })}
        </div>
      </section>

      <section id="watch-today" className="flex flex-col gap-4 items-center">
        <h4 className={hBlu}>MOVIES</h4>
        <h3 className={`${hBlk} text-center w-[40%]`}>
          Exciting Movies That Should Be Watched Today
        </h3>
        <div className="movies flex gap-4 px">
          {movies.slice(0, 4).map((movie, i) => {
            return <MovieCard i={i} title={movie.title}
              poster={movie.poster_path} genres={movie.genres} />
          })}
        </div>
        <div
          className={`flex flex-row ${hBlu} mt-8 items-center gap-2 
            hover:cursor-pointer hover:opacity-[.7]`}>
          <h5>View All</h5><i className="nf nf-fa-arrow_right_long"></i>
        </div>
      </section>

      <section id="coming-soon"
        className="flex flex-col gap-4 md:items-start"
      >
        <h4 className={`${hBlu} text-center`}>UPCOMING MOVIES</h4>
        <div className="soon flex items-center justify-between w-full">
          <h3 className={hBlk}>Exciting Movie Coming Soon</h3>
          <div onClick={handlePage}
            className="btn-right flex gap-1">
            <i className={`nf nf-oct-arrow_left ${rounded}`}></i>
            <i className={`nf nf-oct-arrow_right ${rounded}`}></i>
          </div>
        </div>
        <div className="movies flex gap-4 self-center">
          {movies.slice(sliceLen[0], sliceLen[1]).map((movie, i) => {
            return <MovieCard i={i} title={movie.title}
              poster={movie.poster_path} genres={movie.genres}
              release={movie.fDate} />
          })}
        </div>
      </section>

      <Subscription />

    </main>

  )
}
