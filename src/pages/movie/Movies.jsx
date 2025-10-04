import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Subscription from "../../components/Subscription";
import { useDispatch } from "react-redux";
import { clearOrder } from "../../redux/slices/orderSlice";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [_, setLoading] = useState(false);

  // const { movies } = useSelector((state) => state.tmdb);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [genres, setGenres] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentGenre = searchParams.get("genre") || "";
  const currentQuery = searchParams.get("q") || ""; // 👈 read from URL, not local state
  // const [currentQuery, setCurrentQuery] = useState("");

  useEffect(() => {
    dispatch(clearOrder());
  }, [dispatch]);

  // Fetch genres once
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_API_URL}/movies/genres`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setGenres(data.result || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovieFilter = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        if (currentQuery) params.append("q", currentQuery);
        if (currentGenre) params.append("genre", currentGenre);
        if (currentPage) params.append("page", currentPage);

        // if no filter → fetch plain /movies (backend should default to all movies)
        const url = params.toString()
          ? `${import.meta.env.VITE_BASE_API_URL}/movies?${params.toString()}`
          : `${import.meta.env.VITE_BASE_API_URL}/movies`;

        console.log("Fetching:", url);

        const res = await fetch(url);
        const data = await res.json();
        // console.log(data)

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch movies");
        }

        setMovies(data.result || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieFilter();
  }, [currentQuery, currentGenre, currentPage]);

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-12">
        {/* Hero Section */}
        <section
          id="hero-bg"
          className="px-8 md:px-28 gap-6 mb-3 flex flex-col justify-center 
            relative bg-[url(/avenger-bg.png)] bg-blend-overlay bg-zinc-600 
            h-[56vh] bg-cover w-screen bg-center"
        >
          <h4 className="text-white text-lg font-bold">
            LIST MOVIE OF THE WEEK
          </h4>
          <h1 className="text-white w-[80%] text-5xl md:w-156">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
          <div id="pg-num" className="flex">
            <div className="pg pg-1"></div>
            <div className="pg pg-2"></div>
            <div className="pg pg-3"></div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section id="event" className="flex px-8 md:px-28 gap-6">
          {/* Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.search.value.trim();

              const params = {};
              if (currentGenre) params.genre = currentGenre;
              if (query) params.q = query;
              // don't add page if it's 1
              setSearchParams(params);
            }}
            className="flex flex-col gap-4"
          >
            <label htmlFor="find" className="text-[#4E4B66] w-max">Cari Movie</label>
            <div className="flex items-center relative">
              <input
                type="text"
                name="search"
                id="find"
                defaultValue={currentQuery} // 👈 keep input in sync
                placeholder="New Born Expert"
                className="p-3 border border-[#DEDEDE] rounded-sm placeholder:text-[#A0A3BD]"
              />
              <button
                type="submit"
                className="absolute right-0 text-[#a0a3bd] h-full w-12 flex 
        items-center justify-center cursor-pointer hover:opacity-65"
              >
                <i className="nf nf-fa-search"></i>
              </button>
            </div>
          </form>

          {/* Filter Form */}
          <form id="filter" className="flex flex-col gap-4">
            <h4 className="text-[#4E4B66]">Filter</h4>
            <div className="flex flex-wrap gap-4">
              {genres.map(({ id, name }) => {
                const lowerName = name.toLowerCase();
                const isActive = currentGenre === lowerName;

                return (
                  <div key={id}>
                    <input type="checkbox" id={id} className="hidden" />
                    <label
                      htmlFor={id}
                      onClick={() => {
                        const params = {};
                        if (currentQuery) params.q = currentQuery;
                        if (!isActive) params.genre = lowerName;
                        // don't set page=1
                        setSearchParams(params);
                      }}
                      className={`p-2 px-3 rounded-lg cursor-pointer 
                        ${isActive
                          ? "bg-[#1D4ED8] text-white"
                          : "text-black hover:bg-[#1D4ED8] hover:text-white"
                        }`}
                    >
                      {name}
                    </label>
                  </div>
                );
              })}
            </div>
          </form>
        </section>

        {/* Movies Grid */}
        <section
          id="watch-today"
          className="flex px-8 md:px-28 flex-col items-center"
        >
          {movies.length === 0 ? (
            <p className="text-gray-500 text-lg my-12">
              Nothing here but crickets
            </p>
          ) : (
            <div className="movies-grid grid grid-cols-2 md:grid-cols-4 gap-8">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className={`thumbnail-${movie.id} flex flex-col gap-3`}
                >
                  <div className="flex flex-col justify-center relative">
                    <img
                      onClick={() => navigate(`/movie/detail/${movie.id}`)}
                      className="hover:opacity-80 rounded-md aspect-3/5 object-cover cursor-pointer"
                      src={
                        movie.poster_path
                          ? `${import.meta.env.VITE_BASE_API_URL}/poster/${movie.poster_path}`
                          : `https://upload.wikimedia.org/wikipedia/commons/8/8d/ERR0R_NO_IMAGE_FOUND.jpg`
                      }
                      alt={movie.title}
                    />
                  </div>
                  <h4 className="text-[#14142B] font-bold text-lg">
                    {movie.title}
                  </h4>
                  <div className="genre flex flex-wrap gap-3">
                    {movie.genres.map((g) => (
                      <p
                        key={g.id}
                        className="px-3 rounded-full text-[#A0A3BD] bg-[#A0A3BD1A]"
                      >
                        {g.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div id="pg-nav" className="flex mt-6 items-center gap-4">
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => {
                  const params = {};
                  if (currentGenre) params.genre = currentGenre;
                  if (currentQuery) params.q = currentQuery;
                  if (num !== 1) params.page = num; // 👈 only add if not 1
                  setSearchParams(params);
                }}
                className={`... ${currentPage === num ? "bg-[#1d4ed8] text-white" : "text-[#A0A3BD] bg-[#F9FAFB]"} size-8 rounded-full cursor-pointer hover:opacity-70`}
              >
                {num}
              </button>
            ))}
            <i
              className="nf nf-oct-arrow_left p-2 rounded-full 
                hover:bg-[#1D4ED8] hover:text-white cursor-pointer"
              onClick={() =>
                setPageNumbers((prev) =>
                  prev[0] > 1 ? prev.map((n) => n - 5) : prev
                )
              }
            />
            <i
              className="nf nf-oct-arrow_right p-2 rounded-full 
                hover:bg-[#1D4ED8] hover:text-white cursor-pointer"
              onClick={() =>
                setPageNumbers((prev) =>
                  prev[4] < 20 ? prev.map((n) => n + 5) : prev
                )
              }
            />
          </div>
        </section>

        <Subscription mx="mx-8 md:mx-28" />
      </div>
    </main>
  );
}
