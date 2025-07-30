import { useState, useEffect } from 'react'
import './global.css'
import './index.css'
import MovieCard from '../../components/MovieCard.jsx'

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

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
      console.log(movies);
    })();
  }, []);

  return (
    <main className="d-flex flex-col">
      <section id="hero" className="d-flex">
        <div className="l-items d-flex flex-col">
          <h4>MOVIE TICKET PURCHASES #1 IN INDONESIA</h4>
          <h1>Experience the Magic of Cinema: Book Your Tickets Today</h1>
          <p className="gray-tertiary">Sign up and get the ticket with a lot
            of discount</p>
        </div>
        <div className="r-items d-grid">
          <div className="thumb thumb-1"></div>
          <div className="thumb thumb-2"></div>
          <div className="thumb thumb-3"></div>
          <div className="thumb thumb-4"></div>
        </div>
      </section>

      <section id="choose" className="d-flex flex-col">
        <h4>WHY CHOOSE US</h4>
        <h3>Unleashing the Ultimate Movie Experience</h3>
        <div id="point" className="d-flex flex-row">
          <div id="guarantee">
            <div className="rounded">
              <img src="icon/shield-done.svg" alt="" />
            </div>
            <h5>Guaranteed</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit
              enim nec, proin faucibus nibh et sagittis a. Lacinia
              purus ac amet.</p>
          </div>
          <div id="afford">
            <div className="rounded">
              <img src="icon/check-circle.svg" alt="" />
            </div>
            <h5>Affordable</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit
              enim nec, proin faucibus nibh et sagittis a. Lacinia
              purus ac amet.</p>
          </div>
          <div id="support">
            <div className="rounded">
              <img src="icon/speech-bubble.svg" alt="" />
            </div>
            <h5>24/7 Customer Support</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit
              enim nec, proin faucibus nibh et sagittis a. Lacinia
              purus ac amet.</p>
          </div>
        </div>
      </section>

      <section id="watch-today" className="d-flex flex-col">
        <h4>MOVIES</h4>
        <h3>Exciting Movies That Should Be Watched Today</h3>
        <div className="movies">
          {movies.map((movie, i) => {
            return <MovieCard i={i} title={movie.title} poster={movie.poster_path} genres={movie.genres} />
          })}
        </div>
        <a href="home-dua.html"
          className="view d-flex flex-row align-center color-blue decoration-none">
          <h5>View All</h5><i className="nf nf-fa-arrow_right_long"></i>
        </a>
      </section>

      <section id="coming-soon" className="d-flex flex-col">
        <h4>UPCOMING MOVIES</h4>
        <div className="soon d-flex align-center">
          <h3>Exciting Movie Coming Soon</h3>
          <div className="btn-right d-flex">
            <a href="" className="dot">
              <i className="nf nf-oct-arrow_left"></i></a>
            <a href="" className="dot">
              <i className="nf nf-oct-arrow_right"></i></a>
          </div>
        </div>
        <div className="movies">
          {movies.map((movie, i) => {
            return <MovieCard i={i} title={movie.title} poster={movie.poster_path} genres={movie.genres} release={movie.release_date} />
          })}
        </div>
      </section>

      <section className="bg-blue d-flex flex-col align-center" id="newsletter">
        <h1>Subscribe to our newsletter</h1>
        <form className="d-flex" action="">
          <input type="text" placeholder="First name" />
          <input type="email" placeholder="Email address" />
          <button>Subscribe Now</button>
        </form>
        <div className="circle"></div>
      </section>
    </main>

  )
}
