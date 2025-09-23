import { useEffect, useState } from "react";
import { format } from "date-fns";

import MovieCard from "../../components/MovieCard.jsx";
import ChooseItem from "../../components/ChooseItem.jsx";
import Subscription from "../../components/Subscription.jsx";

export default function Index() {
  const [upcomings, setUpcomings] = useState([]);
  const [populars, setPopulars] = useState([]);
  const [sliceLen, setSliceLen] = useState([0, 4]);

  // Fetch popular and upcoming movies directly
  useEffect(() => {
    const fetchPopulars = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/movies/popular`);
        if (!resp.ok) throw new Error(resp.statusText);

        const { result } = await resp.json();
        setPopulars(result);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
      }
    };
    const fetchUpcomings = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/movies/upcoming`);
        if (!resp.ok) throw new Error(resp.statusText);

        const { result } = await resp.json();
        setUpcomings(result);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
      }
    };

    fetchPopulars();
    fetchUpcomings();
  }, []);

  // Pagination for upcoming movies
  const handlePage = (e) => {
    setSliceLen(([start, end]) => {
      if (e.target.className.includes("right")) {
        if (end >= upcomings.length) return [start, end];
        return [start + 1, end + 1];
      } else {
        if (start === 0) return [start, end];
        return [start - 1, end - 1];
      }
    });
  };

  const whyChoose = [
    { title: "Guaranteed", img: "/icon/shield-done.svg" },
    { title: "Affordable", img: "/icon/check-circle.svg" },
    { title: "24/7 Customer Support", img: "/icon/speech-bubble.svg" },
  ];

  const styles = {
    hBlu: "text-[#1D4ED8] text-lg font-bold",
    hBlk: "text-[#121212] text-3xl",
    rounded:
      "rounded-full text-xl size-[2.5rem] bg-[#A0A3BD] hover:bg-[#1D4ED8] hover:cursor-pointer flex items-center justify-center text-white",
    rSect: "text-center items-center md:text-left",
  };

  return (
    <main className="flex px-6 flex-col md:px-28 gap-12">
      {/* HERO SECTION */}
      <section id="hero" className={`flex flex-col h-[88vh] md:flex-row ${styles.rSect}`}>
        <div className="l-items flex flex-col gap-4 justify-center text-center md:text-left">
          <h4 className={styles.hBlu}>MOVIE TICKET PURCHASES #1 IN INDONESIA</h4>
          <h1 className="text-5xl text-[#121212]">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
          <p className="text-[#A0A3BD]">Sign up and get the ticket with a lot of discount</p>
        </div>
        <div className="r-items grid w-full h-[28rem] grid-cols-2 gap-4">
          {[
            "/thumbnail/thumb-babayaga.png",
            "/thumbnail/thumb-lion-king.png",
            "/thumbnail/thumb-spidermen.png",
            "/thumbnail/thumb-robloxx.jpg",
          ].map((img, i) => (
            <div
              key={i}
              className={`bg-[url(${img})] bg-cover ${i === 0
                ? "rounded-t-3xl"
                : i === 1 || i === 2
                ? "row-span-2 rounded-t-3xl"
                : "rounded-b-3xl"
              }`}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="choose" className="flex flex-col gap-6 items-center md:items-start">
        <h4 className={styles.hBlu}>WHY CHOOSE US</h4>
        <h3 className={`${styles.hBlk} md:w-[40%]`}>Unleashing the Ultimate Movie Experience</h3>
        <div id="point" className="flex flex-col gap-8 md:flex-row">
          {whyChoose.map((choose, i) => (
            <ChooseItem key={i} {...choose} />
          ))}
        </div>
      </section>

      {/* POPULAR MOVIES */}
      <section id="watch-today" className="flex flex-col gap-4 items-center">
        <h4 className={styles.hBlu}>MOVIES</h4>
        <h3 className={`${styles.hBlk} text-center w-[40%]`}>
          Exciting Movies That Should Be Watched Today
        </h3>
        <div className="movies flex gap-4 px">
          {populars.slice(0, 4).map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              poster={movie.poster_path}
              genres={movie.genres}
            />
          ))}
        </div>
        <div
          className={`flex flex-row ${styles.hBlu} mt-8 items-center gap-2 hover:cursor-pointer hover:opacity-[.7]`}
        >
          <h5>View All</h5>
          <i className="nf nf-fa-arrow_right_long"></i>
        </div>
      </section>

      {/* UPCOMING MOVIES */}
      <section id="coming-soon" className="flex flex-col gap-4 md:items-start">
        <h4 className={`${styles.hBlu} text-center`}>UPCOMING MOVIES</h4>
        <div className="soon flex items-center justify-between w-full">
          <h3 className={styles.hBlk}>Exciting Movie Coming Soon</h3>
          <div onClick={handlePage} className="btn-right flex gap-1">
            <i className={`nf nf-oct-arrow_left ${styles.rounded}`}></i>
            <i className={`nf nf-oct-arrow_right ${styles.rounded}`}></i>
          </div>
        </div>
        <div className="movies flex gap-4 self-center">
          {upcomings.slice(sliceLen[0], sliceLen[1]).map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              poster={movie.poster_path}
              genres={movie.genres}
              release={format(new Date(movie.release_date), "MMMM yyyy")}
            />
          ))}
        </div>
      </section>

      <Subscription />
    </main>
  );
}

// import { useEffect, useState } from 'react'
// import MovieCard from '../../components/MovieCard.jsx'
// import ChooseItem from '../../components/ChooseItem.jsx'
// import Subscription from '../../components/Subscription.jsx'
// import { format } from 'date-fns'
// import { useDispatch, useSelector } from 'react-redux'
// import { getDiscoverMovie, getGenres, getMovie, getUpcoming } from '../../redux/slices/movieSlice.js'

// export default function Index() {
//   // const movieState = useSelector((state) => state.movies.movies);
//   const { upcoming, genres } = useSelector((state) => state.tmdb);
//   const [sliceLen, setSliceLen] = useState([0, 4]);
//   const dispatch = useDispatch();
//   const [populars, setPopulars] = useState([]);

//   // useEffect(() => { dispatch(getDiscoverMovie({genre: [99, 10751]})); }, [dispatch]);
//   useEffect(() => { dispatch(getGenres()); }, [dispatch])
//   useEffect(() => { dispatch(getUpcoming()); }, [dispatch]);
//   useEffect(() => {
//     const url = `${import.meta.env.VITE_BASE_API_URL}/movies/popular`;
//     const options = {
//       method: "GET",
//     };

//     const request = new Request(url, options);
//     fetch(request)
//       .then((resp) => {
//         if (!resp.ok) throw resp.statusText;
//         return resp.json();
//       })
//       .then(res => {
//         const { result } = res;
//         setPopulars(result);
//       })
//       .catch(err => console.log(err))
//   }, []);

//   // useEffect(() => {
//   //   const url = `${import.meta.env.VITE_BASE_API_URL}/movies/upcoming`;
//   //   const options = {
//   //     method: "GET",
//   //   };

//   //   const request = new Request(url, options);
//   //   fetch(request)
//   //     .then((resp) => {
//   //       if (!resp.ok) throw resp.statusText;
//   //       return resp.json();
//   //     })
//   //     .then(res => {
//   //       const { result } = res;
//   //       console.log(result)
//   //     })
//   //     .catch(err => console.log(err))
//   // });

//   // const { movies } = movieState;
//   const whyChoose = [
//     { title: "Guaranteed", img: "/icon/shield-done.svg" },
//     { title: "Affordable", img: "/icon/check-circle.svg" },
//     { title: "24/7 Customer Support", img: "/icon/speech-bubble.svg" },
//   ];
//   const hBlu = "text-[#1D4ED8] text-lg font-bold";
//   const hBlk = "text-[#121212] text-3xl";
//   const rounded = `rounded-full text-xl size-[2.5rem] bg-[#A0A3BD] 
//     hover:bg-[#1D4ED8] hover:cursor-pointer flex items-center justify-center
//     text-white`;
//   const rSect = "text-center items-center md:text-left";

//   // useEffect(() => {
//   //   const baseUrl = import.meta.env.VITE_BASE_API_URL
//   //   const req = new Request(`${baseUrl}/movies/13`, {
//   //     method: "GET",
//   //     headers: {
//   //       "Content-Type": "application/json"
//   //     },
//   //   });

//   //   fetch(req)
//   //     .then((res) => {
//   //       if (!res.ok) throw res.statusText;
//   //       return res.json();
//   //     })
//   //     .then((dat) => console.log(dat))
//   //     .catch(err => console.log(err))
//   // }, []);

//   // const apiToken = import.meta.env.VITE_API_TOKEN;
//   // const urlMovies = import.meta.env.VITE_MOVIES_URL;
//   // const urlGenres = import.meta.env.VITE_GENRES_URL;
//   // const options = {
//   //   method: 'GET',
//   //   headers: {
//   //     accept: 'application/json',
//   //     Authorization: `Bearer ${apiToken}`
//   //   }
//   // };

//   // useEffect(() => {
//   //   (async () => {
//   //     const promises = [fetch(urlMovies, options), fetch(urlGenres, options)];
//   //     const [moviesResp, genresResp] = await Promise.all(promises);
//   //     const { results: movieResults } = await moviesResp.json();
//   //     const { genres } = await genresResp.json();
//   //     const genresMap = new Map();
//   //     genres.forEach((genre) => {
//   //       genresMap.set(genre.id, genre.name);
//   //     });

//   //     const movies = movieResults.map((movie) => {
//   //       const { id, title, release_date, genre_ids, poster_path } = movie;
//   //       const fDate = format(new Date(release_date), "MMMM yyyy");
//   //       const result = {
//   //         id,
//   //         title,
//   //         poster_path,
//   //         fDate
//   //       };
//   //       const genres = genre_ids.map((genreId) => {
//   //         return genresMap.get(genreId);
//   //       });
//   //       Object.assign(result, { genres });
//   //       return result;
//   //     });

//   //     setMovies(movies);
//   //   })();
//   // }, []);

//   function handlePage(e) {
//     if (e.target.className.includes("right")) {
//       setSliceLen((e) => {
//         if (e[0] == upcoming.length - 5 &&
//           e[1] == upcoming.length - 1) return e;
//         return e.map((f) => f + 1);
//       });
//     } else {
//       setSliceLen((e) => {
//         if (e[0] == 0 && e[1] == 4) return e;
//         return e.map((f) => f - 1);
//       });
//     }
//   }

//   return (
//     <main className="flex px-6 flex-col md:px-28 gap-12">
//       <section id="hero"
//         className={`flex flex-col h-[88vh] md:flex-row ${rSect}`}>
//         <div className="l-items flex flex-col gap-4 justify-center text-center md:text-left">
//           <h4 className={hBlu}>MOVIE TICKET PURCHASES #1 IN INDONESIA</h4>
//           <h1 className="text-5xl text-[#121212]">
//             Experience the Magic of Cinema: Book Your Tickets Today
//           </h1>
//           <p className="text-[#A0A3BD]">
//             Sign up and get the ticket with a lot of discount
//           </p>
//         </div>
//         <div className="r-items grid w-full h-[28rem] grid-cols-2 gap-4">
//           <div
//             className="bg-[url(/thumbnail/thumb-babayaga.png)] bg-cover 
//               rounded-t-3xl">
//           </div>
//           <div
//             className="bg-[url(/thumbnail/thumb-lion-king.png)] row-span-2 
//               bg-cover rounded-t-3xl">
//           </div>
//           <div
//             className="bg-[url(/thumbnail/thumb-spidermen.png)] row-span-2 
//               bg-cover rounded-b-3xl">
//           </div>
//           <div
//             className="bg-[url(/thumbnail/thumb-robloxx.jpg)]
//               bg-cover rounded-b-3xl">
//           </div>
//         </div>
//       </section>

//       <section id="choose" className={`flex flex-col gap-6 items-center md:items-start`}>
//         <h4 className={hBlu}>WHY CHOOSE US</h4>
//         <h3 className={`${hBlk} md:w-[40%]`}>
//           Unleashing the Ultimate Movie Experience
//         </h3>
//         <div id="point" className="flex flex-col gap-8 md:flex-row">
//           {whyChoose.map((choose, i) => {
//             return <ChooseItem key={i} title={choose.title} img={choose.img} />
//           })}
//         </div>
//       </section>

//       <section id="watch-today" className="flex flex-col gap-4 items-center">
//         <h4 className={hBlu}>MOVIES</h4>
//         <h3 className={`${hBlk} text-center w-[40%]`}>
//           Exciting Movies That Should Be Watched Today
//         </h3>
//         <div className="movies flex gap-4 px">
//           {populars.slice(0, 4).map((movie, i) => {
//             return <MovieCard key={i} title={movie.title}
//               poster={movie.poster_path}
//               genres={movie.genres}
//             />
//           })}
//         </div>
//         <div
//           className={`flex flex-row ${hBlu} mt-8 items-center gap-2 
//             hover:cursor-pointer hover:opacity-[.7]`}>
//           <h5>View All</h5><i className="nf nf-fa-arrow_right_long"></i>
//         </div>
//       </section>

//       <section id="coming-soon"
//         className="flex flex-col gap-4 md:items-start"
//       >
//         <h4 className={`${hBlu} text-center`}>UPCOMING MOVIES</h4>
//         <div className="soon flex items-center justify-between w-full">
//           <h3 className={hBlk}>Exciting Movie Coming Soon</h3>
//           <div onClick={handlePage}
//             className="btn-right flex gap-1">
//             <i className={`nf nf-oct-arrow_left ${rounded}`}></i>
//             <i className={`nf nf-oct-arrow_right ${rounded}`}></i>
//           </div>
//         </div>
//         <div className="movies flex gap-4 self-center">
//           {upcoming.slice(sliceLen[0], sliceLen[1]).map((movie, i) => {
//             return <MovieCard key={i} title={movie.title}
//               poster={movie.poster_path}
//               genres={movie.genres}
//               release={format(new Date(movie.release_date), "MMMM yyyy")}
//             />
//           })}
//         </div>
//       </section>

//       <Subscription />

//     </main>

//   )
// }
