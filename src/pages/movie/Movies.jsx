import { Fragment, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import Subscription from '../../components/Subscription'

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams,] = useSearchParams({ page: 1 });
  // const [urlMov, setUrlMov] = useState(
  //   `${import.meta.env.VITE_MOVIES_URL}&${searchParams.toString()}`
  // );

  const apiToken = import.meta.env.VITE_API_TOKEN;
  const urlMovies = `${import.meta.env.VITE_MOVIES_URL}&${searchParams.toString()}`;
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
  }, [searchParams]);

  function handleSearch(e) {
    const input = (e.target.value);
    setSearch(() => input);
  }

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-12">
        <section id="hero-bg"
          className="px-8 md:px-28 gap-6 mb-3 flex relative flex-col justify-center 
          bg-[url(/avenger-bg.png)] bg-blend-overlay bg-zinc-600 h-[56vh] 
          bg-cover w-screen bg-center"
        >
          <h4 className='text-white text-lg font-bold'>
            LIST MOVIE OF THE WEEK
          </h4>
          <h1 className='text-white w-[80%] text-5xl md:w-156'>
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
          <div id="pg-num" className="flex">
            <div className="pg pg-1"></div>
            <div className="pg pg-2"></div>
            <div className="pg pg-3"></div>
          </div>
        </section>

        <section id="event" className="flex px-8 md:px-28 gap-6">
          <form
            className='flex flex-col gap-4'>
            <label htmlFor="find" className='text-[#4E4B66] w-max'>
              Cari Movie
            </label>
            <div className='flex'>
              <input onChange={handleSearch} type="text" name="" id="find"
                placeholder="New Born Expert"
                className='p-3 border border-[#DEDEDE] rounded-sm 
              placeholder:text-[#A0A3BD]' />
            </div>
          </form>

          <div id="filter" className='flex flex-col gap-4'>
            <label htmlFor="" className='text-[#4E4B66]'>Filter</label>
            <div className='flex flex-wrap'>
              {genres.splice(0, 7).map((genre) => {
                return (
                  <button className='p-2 px-4 hover:bg-[#1D4ED8] 
                  hover:cursor-pointer hover:text-white rounded-xl'>
                    {genre.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section id="watch-today" className="flex px-8 md:px-28 flex-col items-center">
          <div className="movies-grid grid grid-cols-2 md:grid-cols-4 gap-8">
            {movies.length > 0 &&
              movies
                .filter(({ title }) => {
                  if (!search) return true;
                  return title.toLowerCase().includes(search.toLowerCase());
                })
                .sort(({ title: a }, { title: b }) => {
                  if (a < b) return -1;
                  if (a > b) return 1;
                  return 0;
                })
                .map((movie) => {
                  return (
                    <div key={movie.id} className={`thumbnail-${movie.id} 
                  flex flex-col gap-3`}>
                      <Link to={`/movie/detail/${movie.id}`}>
                        <img className="hover:opacity-[.8] hover:cursor-pointer 
                    rounded-md"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                        />
                      </Link>
                      <h4 className='text-[#14142B] font-bold text-lg'>
                        {movie.title}
                      </h4>
                      <div className="genre flex flex-wrap gap-3">
                        {movie.genres.map((genre, id) => {
                          return <p key={id} className='px-3 rounded-full 
                      text-[#A0A3BD] bg-[#A0A3BD1A]'>
                            {genre}
                          </p>
                        })}
                      </div>
                    </div>
                  )
                })}
          </div>
          <div id="pg-nav" className="flex mt-6 items-center gap-4">
            {[1, 2, 3, 4].map((e, i) => {
              return <button key={i}
                className="text-[#4E4B66] size-8 flex items-center 
                  justify-center rounded-full hover:bg-[#1D4ED8] 
                  hover:text-white hover:border-none hover:cursor-pointer 
                  hover:[#FFFFFF]"
              >
                {e}
              </button>
            })}
            <i
              className="nf nf-oct-arrow_right p-2 rounded-full 
              hover:bg-[#1D4ED8] hover:text-white hover:cursor-pointer">
            </i>
          </div>
        </section>

        <Subscription mx={"mx-8 md:mx-28"} />
      </div>
    </main>
  )
}
