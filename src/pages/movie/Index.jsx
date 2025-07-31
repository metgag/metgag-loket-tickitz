import { useState, useEffect } from 'react'
// import './global.css'
// import './index.css'
import MovieCard from '../../components/MovieCard.jsx'
import MovThumbnail from '../../components/MovThumbnail.jsx';
import ChooseItem from '../../components/ChooseItem.jsx';

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const thumbnails = [
    "/thumbnail/thumb-babayaga.png",
    "/thumbnail/thumb-lion-king.png",
    "/thumbnail/thumb-spiderman.png",
    "/thumbnail/thumb-robloxx.png",
  ];
  const whyChoose = [
    { title: "Guaranteed", img: "/icon/shield-done.svg" },
    { title: "Affordable", img: "/icon/check-circle.svg" },
    { title: "24/7 Customer Support", img: "/icon/speech-bubble.svg" },
  ];

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
        const result = {
          id,
          title,
          poster_path,
          release_date,
        };
        const genres = genre_ids.map((genreId) => {
          return genresMap.get(genreId);
        });
        Object.assign(result, { genres });
        return result;
      });

      setMovies(movies);
      setGenres(genres);
    })();
  }, []);

  return (
    <main className="flex flex-col gap-[6rem]">
      <section id="hero" className="flex mt-[2.5rem] gap-[2.5rem]">
        <div className="l-items flex flex-col justify-center gap-[1rem]">
          <h4 className="text-[#1D4ED8] text-lg">MOVIE TICKET PURCHASES #1 IN INDONESIA</h4>
          <h1 className="text-4xl text-[#121212]">Experience the Magic of Cinema: Book Your Tickets Today</h1>
          <p className="text-[#A0A3BD]">Sign up and get the ticket with a lot
            of discount</p>
        </div>
        <div className="r-items grid w-full h-[28rem] border grid-template-rows-3">
          {thumbnails.map((thumb, i) => {
            return <MovThumbnail i={i} img={thumb} />
          })}
        </div>
      </section>

      <section id="choose" className="flex flex-col gap-[1.5rem]">
        <h4 className="text-[#1D4ED8] text-lg">WHY CHOOSE US</h4>
        <h3 className="text-[#121212] text-xl">Unleashing the Ultimate Movie Experience</h3>
        <div id="point" className="flex flex-row gap-6">
          {whyChoose.map((choose, i) => {
            return <ChooseItem i={i} title={choose.title} img={choose.img} />
          })}
        </div>
      </section>

      <section id="watch-today" className="flex flex-col gap-[1rem] items-center">
        <h4 className="text-[#1D4ED8] text-lg">MOVIES</h4>
        <h3 className="text-[#121212] text-xl">Exciting Movies That Should Be Watched Today</h3>
        <div className="movies flex gap-[1rem] px-[1rem]">
          {movies.map((movie, i) => {
            return <MovieCard i={i} title={movie.title} poster={movie.poster_path} genres={movie.genres} />
          })}
        </div>
        <a href="home-dua.html"
          className="view flex flex-row items-center color-blue underline">
          <h5>View All</h5><i className="nf nf-fa-arrow_right_long"></i>
        </a>
      </section>

      <section id="coming-soon" className="flex flex-col gap-[1rem] items-center">
        <h4 className="text-[#1D4ED8] text-lg">UPCOMING MOVIES</h4>
        <div className="soon flex items-center justify-between">
          <h3 className="text-[#121212] text-xl">Exciting Movie Coming Soon</h3>
          <div className="btn-right flex">
            <a href="" className="dot">
              <i className="nf nf-oct-arrow_left"></i></a>
            <a href="" className="dot">
              <i className="nf nf-oct-arrow_right"></i></a>
          </div>
        </div>
        <div className="movies flex gap-[1rem] px-[1rem]">
          {movies.map((movie, i) => {
            return <MovieCard i={i} title={movie.title} poster={movie.poster_path} genres={movie.genres} release={movie.release_date} />
          })}
        </div>
      </section>

      <section className="bg-blue flex flex-col items-center" id="newsletter">
        <h1>Subscribe to our newsletter</h1>
        <form className="flex" action="">
          <input type="text" placeholder="First name" />
          <input type="email" placeholder="Email address" />
          <button>Subscribe Now</button>
        </form>
        <div className="circle"></div>
      </section>
    </main>

  )
}
