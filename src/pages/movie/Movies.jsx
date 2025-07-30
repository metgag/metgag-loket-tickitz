import { Fragment, useState, useEffect } from 'react'
import './global.css'
import './style.css'

export default function Movies() {
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
        const { id, title, genre_ids, poster_path } = movie;
        const result = {
          id,
          title,
          poster_path,
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
    <Fragment>
      <main className="d-flex flex-col">
        <div className="d-flex flex-col">
          <section id="hero-bg" className="d-flex flex-col justify-center">
            {/* <!-- <div class="hero-bg"></div> --> */}
            <h4>LIST MOVIE OF THE WEEK</h4>
            <h1>Experience the Magic of Cinema: Book Your Tickets Today</h1>
            <div id="pg-num" className="d-flex flex-row">
              <div className="pg pg-1"></div>
              <div className="pg pg-2"></div>
              <div className="pg pg-3"></div>
            </div>
          </section>

          <section id="event" className="d-flex">
            <form action="">
              <label htmlFor="f-event">Cari Event</label>
              <input type="text" name="" id="f-event"
                placeholder="New Born Expert" />
            </form>

            <div id="filter">
              <label htmlFor="">Filter</label>
              <br />
              {genres.map((genre) => {
                return (
                  <button>{genre.name}</button>
                )
              })}
            </div>
          </section>

          <section id="watch-today" className="d-flex flex-col align-center">
            <div className="movies-grid">
              {/* <div className="thumbnail thumbnail-1">
                <img src="/assets/images/thumbnail/thumb-bl-widow.png"
                  alt="" />
                <h4>Black Widow</h4>
                <div className="genre">
                  <p>Action</p>
                  <p>Adventure</p>
                </div>
              </div> */}
              {movies.length > 0 && movies.map((movie) => {
                return (
                  <div key={movie.id} className={`thumbnail-${movie.id} thumbnail`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                    <h4>{movie.title}</h4>
                    <div className="genre">
                      {movie.genres.map((genre, id) => {
                        return <p key={id}>{genre}</p>
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <div id="pg-nav" className="d-flex">
              <button>1</button><button>2</button><button>3</button><button>4</button>
              <button><i className="nf nf-oct-arrow_right"></i></button>
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
        </div>
      </main>
    </Fragment>
  )
}
