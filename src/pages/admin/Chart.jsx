import { useSelector } from "react-redux";

function Chart() {
  const movies = useSelector((state) => state.movies.movies.movies);
  const genres = useSelector((state) => state.movies.movies.genreList);

  return (
    <main className="flex flex-col gap-[2rem] px-[8rem] py-[2rem]">
      <section id="sect-a"
        className="flex flex-col gap-4 bg-white p-[1.25rem_2rem] rounded-2xl">
        <h1 className="text-2xl font-bold text-[#14142B]">Sales Chart</h1>
        <form id="movie" className="flex gap-3">
          <div id="mov-sales">
            <select
              className="bg-[#EFF0F6] text-[#4E4B66] text-sm p-[.5rem_1rem] font-semibold rounded-md"
              name="" id="">
                {movies.map((e, i) => {
                  return <MkOption content={e.title} key={i} />
                })}
            </select>
          </div>
          <div>
            <select
              className="bg-[#EFF0F6] text-[#4E4B66] text-sm p-[.5rem_1rem] font-semibold rounded-md"
              name="" id="">
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <button
            className="bg-[#1D4ED8] text-sm p-[.5rem_1.5rem] rounded-md text-white font-bold">Filter</button>
        </form>
        <div id="mov-chart">
          <h3 id="mov-header" className="text-[#151522] font-semibold"></h3>
          <canvas className="canvasChart"></canvas>
        </div>
      </section>

      <section id="sect-b"
        className="flex flex-col gap-4 bg-white p-[1.25rem_2rem] rounded-2xl">
        <h1 className="text-2xl font-bold text-[#14142B]">Ticket Sales</h1>
        <form id="ticket" className="flex gap-3">
          <div id="">
            <select id="category"
              className="bg-[#EFF0F6] text-[#4E4B66] text-sm p-[.5rem_1rem] font-semibold rounded-md"
              name="">
              <option value="">Category</option>
              {genres.map((e, i) => {
                return <MkOption content={e.name} key={i} />
              })}
            </select>
          </div>
          <div>
            <select
              className="bg-[#EFF0F6] text-[#4E4B66] text-sm p-[.5rem_1rem] font-semibold rounded-md"
              name="" id="">
              <option>Location</option>
              <option value="Bandung">Bandung</option>
              <option value="Bogor">Bogor</option>
              <option value="Jakarta">Jakarta</option>
            </select>
          </div>
          <button type="submit" id="ticket-submit"
            className="bg-[#1D4ED8] text-sm p-[.5rem_1.5rem] rounded-md text-white font-bold">Filter</button>
        </form>
        <div id="sales-chart">
          <h3 id="sales-header" className="text-[#151522] font-semibold"></h3>
          <canvas className="canvasChart"></canvas>
        </div>
      </section>
    </main>
  )
}

function MkOption({ content }) {
  return <option value={content}>{content}</option>
}

export default Chart;
