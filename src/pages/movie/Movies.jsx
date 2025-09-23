import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import Subscription from '../../components/Subscription'
import { useDispatch, useSelector } from 'react-redux';
import { getDiscoverMovie, getGenres, getSearch } from '../../redux/slices/movieSlice';
import toGenre from '../../utils/toGenre';
import { getCredit, getDetail } from '../../redux/slices/detailSlice';
// import { movieActions } from '../../redux/slices/movieSlice';

export default function Movies() {
  const { movies, genres } = useSelector((state) => state.tmdb);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNm, setPageNm] = useState([1, 2, 3, 4, 5]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const currPage = searchParams.get("page") || 1;
  const currGenre = searchParams.get("genre") || "";
  const [currQuery, setQuery] = useState("");

  // reset if there is no search params
  useEffect(() => {
    if (!currQuery &&
      !currGenre &&
      !currPage) setSearchParams("");
  },
    [currGenre, currPage, currQuery, setSearchParams]);

  useEffect(() => { dispatch(getGenres()); }, [dispatch]);

  useEffect(() => {
    if (!currQuery) {
      dispatch(getDiscoverMovie({
        page: currPage, genre: currGenre
      }));
    }
  }, [currGenre, currPage, currQuery, dispatch]);

  useEffect(() => {
    if (currQuery) {
      dispatch(getSearch(currQuery));
      setSearchParams({ query: currQuery });
      if (currPage) {
        dispatch(getSearch({ query: currQuery, page: currPage }));
        setSearchParams({ query: currQuery, page: currPage })
      }
    }
  }, [currPage, currQuery, dispatch, setSearchParams]);

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
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(e.target.search.value);
            }}
            className='flex flex-col gap-4'>
            <label htmlFor="find" className='text-[#4E4B66] w-max'>
              Cari Movie
            </label>
            <div className='flex items-center relative'>
              <input type="text" name="search" id="find"
                placeholder="New Born Expert"
                className='p-3 border border-[#DEDEDE] rounded-sm 
              placeholder:text-[#A0A3BD]' />
              <button className='absolute right-0 text-[#a0a3bd] h-full w-12 flex items-center justify-center cursor-pointer hover:opacity-65'
              >
                <i className="nf nf-fa-search"></i>
              </button>
            </div>
          </form>

          <form id="filter" className='flex flex-col gap-4'>
            <h4 className='text-[#4E4B66]'>Filter</h4>
            <div className='flex flex-wrap gap-4'>
              {genres &&
                genres.map(({ id, name }, i) => {
                  return (
                    <div key={i}>
                      <input type="checkbox" id={id}
                        className="hidden"
                      />
                      <label htmlFor={id}
                        onClick={() => {
                          if (currQuery) setQuery("");
                          setSearchParams({ genre: id });
                        }}
                        className={`p-2 px-3 hover:bg-[#1D4ED8] hover:cursor-pointer hover:text-white rounded-xl`}
                      >
                        {name}
                      </label>
                    </div>
                  );
                })}

              {/* {genres &&
                genres.map((genre) => {
                  return (
                    <button className='p-2 px-4 hover:bg-[#1D4ED8] hover:cursor-pointer hover:text-white rounded-xl'>
                      {genre.name}
                    </button>
                  )
                })} */}
            </div>
          </form>
        </section>

        <section id="watch-today" 
        className="flex px-8 md:px-28 flex-col items-center">
          <div className="movies-grid grid grid-cols-2 md:grid-cols-4 gap-8">
            {movies &&
              movies
                .map((movie) => {
                  return (
                    <div key={movie.id} className={`thumbnail-${movie.id} 
                  flex flex-col gap-3`}>
                      <div className='flex flex-col justify-center relative'>
                        <img
                          onClick={() => {
                            navigate(`/movie/detail/${movie.id}`);
                          }}
                          className="hover:opacity-[.8] rounded-md aspect-3/5 object-cover cursor-pointer"
                          src={`${movie.poster_path ?
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                            `https://upload.wikimedia.org/wikipedia/commons/8/8d/ERR0R_NO_IMAGE_FOUND.jpg`
                            }`}
                          alt=""
                        />
                        {/* <div className="btn absolute self-center flex flex-col gap-2 z-9998 border h-full w-full justify-center">
                          <button className='border border-white text-white rounded-md p-2 w-64 hover:opacity-[.8] cursor-pointer self-center'>
                            Details
                          </button>
                          <button className='text-white bg-[#1D4ED8] rounded-md w-64 p-2 hover:opacity-[.8] cursor-pointer self-center'>
                            Buy Ticket
                          </button>
                        </div> */}
                      </div>
                      <h4 className='text-[#14142B] font-bold text-lg'>
                        {movie.title}
                      </h4>
                      <div className="genre flex flex-wrap gap-3">
                        {movie.genre_ids.map((genre, id) => {
                          return <p key={id} className='px-3 rounded-full 
                      text-[#A0A3BD] bg-[#A0A3BD1A]'>
                            {toGenre(genre, genres)}
                          </p>
                        })}
                      </div>
                    </div>
                  )
                })}
          </div>
          <div id="pg-nav" className="flex mt-6 items-center gap-4">
            {pageNm.map((e, i) => {
              return <button key={i}
                onClick={() => {
                  if (currGenre) {
                    return setSearchParams({ page: e, genre: currGenre });
                  }
                  setSearchParams({ page: e });
                }}
                className={`text-[#4E4B66] size-8 flex border items-center 
                  justify-center rounded-full hover:bg-[#1D4ED8] 
                  hover:text-white hover:border-none hover:cursor-pointer 
                  hover:[#FFFFFF] ${currPage == e &&
                  `bg-[#1d4ed8] text-white border-none`
                  }`}
              >
                {e}
              </button>
            })}
            <i
              className="nf nf-oct-arrow_left p-2 rounded-full 
              hover:bg-[#1D4ED8] hover:text-white hover:cursor-pointer"
              onClick={() => {
                if (pageNm[0] == 1) return;
                setPageNm(pageNm.map((e) => e - 5))
              }}
            >
            </i>
            <i
              className="nf nf-oct-arrow_right p-2 rounded-full 
              hover:bg-[#1D4ED8] hover:text-white hover:cursor-pointer"
              onClick={() => {
                if (pageNm[4] == 20) return;
                setPageNm(pageNm.map((e) => e + 5))
              }}
            >
            </i>
          </div>
        </section>

        <Subscription mx={"mx-8 md:mx-28"} />
      </div>
    </main>
  )
}
