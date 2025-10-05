import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";

import MovieCard from "../../components/MovieCard.jsx";
import ChooseItem from "../../components/ChooseItem.jsx";
import Subscription from "../../components/Subscription.jsx";

export default function Index() {
  const [upcomings, setUpcomings] = useState([]);
  const [populars, setPopulars] = useState([]);
  const popularRef = useRef(null);
  const upcomingRef = useRef(null);

  useEffect(() => {
    const fetchPopulars = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/movies/popular`
        );
        if (!resp.ok) throw new Error(resp.statusText);
        const { result } = await resp.json();
        setPopulars(result);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
      }
    };
    const fetchUpcomings = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/movies/upcoming`
        );
        if (!resp.ok) throw new Error(resp.statusText);
        const { result } = await resp.json();
        setUpcomings(result);
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err);
      }
    };
    fetchPopulars();
    fetchUpcomings();
  }, []);

  const handleScroll = (ref, dir) => {
    if (!ref.current) return;
    const scrollAmount = dir === "left" ? -300 : 300;
    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
  };

  return (
    <main className="flex px-6 flex-col md:px-28 gap-12">
      {/* WHY CHOOSE US */}
      <section id="choose" className="flex flex-col gap-6 items-center md:items-start">
        <h4 className={styles.hBlu}>WHY CHOOSE US</h4>
        <h3 className={`${styles.hBlk} md:w-[40%]`}>
          Unleashing the Ultimate Movie Experience
        </h3>
        <div id="point" className="flex flex-col gap-8 md:flex-row">
          {whyChoose.map((choose, i) => (
            <ChooseItem key={i} {...choose} />
          ))}
        </div>
      </section>

      {/* POPULAR MOVIES */}
      <section id="watch-today" className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className={styles.hBlu}>MOVIES</h4>
            <h3 className={styles.hBlk}>Exciting Movies That Should Be Watched Today</h3>
          </div>
          {/* Arrows only on desktop */}
          <div className="hidden md:flex gap-1">
            <i
              onClick={() => handleScroll(popularRef, "left")}
              className={`nf nf-oct-arrow_left ${styles.rounded}`}
            ></i>
            <i
              onClick={() => handleScroll(popularRef, "right")}
              className={`nf nf-oct-arrow_right ${styles.rounded}`}
            ></i>
          </div>
        </div>

        <div
          ref={popularRef}
          className="
    flex gap-4 overflow-x-auto scroll-smooth no-scrollbar
    md:gap-6 md:flex-nowrap
  "
        >
          {populars.map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              poster={movie.poster_path}
              genres={movie.genres}
            />
          ))}
        </div>
      </section>

      {/* UPCOMING MOVIES */}
      <section id="coming-soon" className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className={styles.hBlu}>UPCOMING MOVIES</h4>
            <h3 className={styles.hBlk}>Exciting Movie Coming Soon</h3>
          </div>
          {/* Arrows only on desktop */}
          <div className="hidden md:flex gap-1">
            <i
              onClick={() => handleScroll(upcomingRef, "left")}
              className={`nf nf-oct-arrow_left ${styles.rounded}`}
            ></i>
            <i
              onClick={() => handleScroll(upcomingRef, "right")}
              className={`nf nf-oct-arrow_right ${styles.rounded}`}
            ></i>
          </div>
        </div>

        <div
          ref={upcomingRef}
          className="
            flex gap-4 overflow-x-auto scroll-smooth no-scrollbar
            md:gap-6
          "
        >
          {upcomings.map((movie, i) => (
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
