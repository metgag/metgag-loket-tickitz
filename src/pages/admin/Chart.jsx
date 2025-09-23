import { useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
// import { dat } from "../../utils/Chart.jsx";
import LineChart from "../../utils/Chart.jsx";
import { useState } from "react";

function Chart() {
  const { movies, genres } = useSelector((state) => state.tmdb);
  const [datasA, setDatasA] = useState();
  const [datasB, setDatasB] = useState();

  function getRandom() {
    const result = [];
    let i = 0;
    while (i < 6) {
      result.push(Math.floor(Math.random() * 200) + 400);
      i++;
    }

    return result;
  }

  const hover = "cursor-pointer hover:opacity-60";
  const selStyle = `bg-[#EFF0F6] text-[#4E4B66] text-sm p-[.5rem_1rem] font-semibold rounded-md ${hover}`;
  const btnStyle = `bg-[#1D4ED8] text-sm p-[.5rem_1.5rem] rounded-md text-white font-bold ${hover}`;

  return (
    <main className="flex flex-col gap-[2rem] px-28 py-[2rem]">
      <section id="sect-a"
        className="flex flex-col gap-4 bg-white rounded-2xl">
        <h1 className="text-2xl font-bold text-[#14142B]">Sales Chart</h1>
        <form id="movie"
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setDatasA(getRandom());
          }}
        >
          <div id="mov-sales">
            <select
              className={selStyle}
              name="" id="">
              {movies.map((e, i) => {
                return <MkOption content={e.title} key={i} />
              })}
            </select>
          </div>
          <div>
            <select
              className={selStyle}
              name="" id="">
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <button
            className={btnStyle}>Filter</button>
        </form>
        <LineChart datas={datasA} />
      </section>

      <section id="sect-b"
        className="flex flex-col gap-4 bg-white rounded-2xl">
        <h1 className="text-2xl font-bold text-[#14142B]">Ticket Sales</h1>
        <form id="ticket" 
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setDatasB(getRandom());
        }}
        >
          <div id="">
            <select id="category"
              className={selStyle}
              name="">
              <option value="">Category</option>
              {genres.map((e, i) => {
                return <MkOption content={e.name} key={i} />
              })}
            </select>
          </div>
          <div>
            <select
              className={selStyle}
              name="" id="">
              <option>Location</option>
              <option value="Bandung">Bandung</option>
              <option value="Bogor">Bogor</option>
              <option value="Jakarta">Jakarta</option>
            </select>
          </div>
          <button type="submit" id="ticket-submit"
            className={btnStyle}>Filter</button>
        </form>
        <div id="sales-chart">
          <h3 id="sales-header" className="text-[#151522] font-semibold"></h3>
          <LineChart datas={datasB} />
        </div>
      </section>
    </main>
  );
}

function MkOption({ content }) {
  return <option value={content}>{content}</option>
}

export default Chart;
