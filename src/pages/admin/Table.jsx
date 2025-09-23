import { format } from "date-fns";
import { useSelector } from "react-redux";

function Table() {
  const { histories } = useSelector((state) => state);
  const tHead = [
    "No",
    "Thumbnail",
    "Movie Name",
    "Category",
    "Released Date",
    "Duration",
    "Action",
  ];

  return (
    <main className="bg-[#f5f6f8] overflow-hidden md:overflow-auto max-w-screen px-8 md:px-28 grid py-12 min-h-screen">
      <section className="bg-white rounded-2xl p-5 md:px-8 w-full h-max overflow-hidden md:overflow-auto md:flex md:flex-col md:gap-8">
        <div className="top grid grid-cols-5 md:grid-cols-4 gap-3 items-center">
          <h3 className="text-2xl text-[#14142B] col-span-4 md:col-span-2 font-bold">List Movie</h3>
          <select name="" id=""
            className="bg-[#EFF0F6] w-full md:py-4 px-5 text-[#4E4B66] rounded-md hidden md:block"
          >
            <option value="">November 2023</option>
          </select>
          <button
            className="w-full md:py-4 ms-auto bg-[#1D4ED8] p-2 px-5 text-sm rounded-md text-white font-medium hover:opacity-80 hover:cursor-pointer md:after:content-['_Movies'] before:content-['+_'] md:before:content-none"
          >Add</button>
          <select name="" id=""
            className="col-span-full bg-[#EFF0F6] py-4 md:py-3 px-5 text-[#4E4B66] rounded-md md:hidden"
          >
            <option value="">November 2023</option>
          </select>
        </div>
        <div className="overflow-x-scroll md:overflow-auto w-full">
          <table className="table-auto w-max md:w-full">
            <thead className="border-b border-[#E6EAF0]">
              <tr className="">
                {tHead.map((e, i) => {
                  return <THead content={e} key={i} />
                })}
              </tr>
            </thead>
            <tbody className="border-b border-[#E6EAF0]">
              {histories.map((e, i) => {
                return <TItem key={i}
                  title={e.currOrder.movie.title}
                  genres={e.currOrder.movie.genresName.join(', ')}
                  release={format(e.currOrder.movie.release_date, "dd/MM/yyyy")}
                  poster={e.currOrder.movie.poster_path}
                  duration={`${Math.floor(e.currOrder.movie.runtime / 60)} Hours ${e.currOrder.movie.runtime % 60} Minute`} i={i} />
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function TItem({ title, genres, release, duration, poster, i }) {
  const actionStyle = "p-2 rounded-md hover:cursor-pointer hover:opacity-[.8]";

  return (
    <tr className="text-[#1F4173] text-center">
      <td className="">{i + 1}</td>
      <td>
        <img
          className="w-16 h-12 object-cover object-bottom mx-auto rounded-md"
          src={`https://image.tmdb.org/t/p/w500${poster}`} alt="" />
      </td>
      <td className="px-4 py-4 text-[#1D4ED8]">{title}</td>
      <td className="px-4">{genres}</td>
      <td className="px-4">{release}</td>
      <td className="px-4">{duration}</td>
      <td className="flex text-white gap-2 border py-5">
        <i className={`bg-[#1D4ED8] ${actionStyle} nf nf-md-eye`}></i>
        <i className={`bg-[#5D5FEF] ${actionStyle} nf nf-md-pencil`}></i>
        <i className={`bg-[#E82C2C] ${actionStyle} nf nf-fa-trash`}></i>
      </td>
    </tr>
  )
}

function THead({ content }) {
  return (
    <th className="text-[#1F4173] text-left px-6 py-2 font-bold text-sm md:text-center">
      {content}
    </th>
  )
}

export default Table;
