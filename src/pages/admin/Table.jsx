import { useSelector } from "react-redux";

function Table() {
  const movies = useSelector((state) => state.movies.movies.movies);
  console.log(movies)
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
    <main className="bg-[#f5f6f8] px-8 md:px-28 grid py-12">
      <section className="bg-white rounded-2xl mx-auto p-5 md:px-8 w-full h-max">
        <div className="top grid grid-cols-5 md:grid-cols-4 gap-3 items-end">
          <h3 className="text-2xl text-[#14142B] col-span-4 md:col-span-2 font-bold">List Movie</h3>
          <select name="" id=""
            className="bg-[#EFF0F6] w-full py-2 px-5 text-[#4E4B66] rounded-md hidden md:block"
          >
            <option value="">November 2023</option>
          </select>
          <button
            className="w-full ms-auto bg-[#1D4ED8] p-2 px-5 text-sm rounded-md text-white font-medium hover:opacity-80 hover:cursor-pointer md:after:content-['_Movies'] before:content-['+_'] md:before:content-none"
          >Add</button>
          <select name="" id=""
            className="col-span-full bg-[#EFF0F6] py-3 px-5 text-[#4E4B66] rounded-md md:hidden"
          >
            <option value="">November 2023</option>
          </select>
        </div>
        <table className="table-auto md:w-full">
          <thead className="border-b border-[#E6EAF0]">
            <tr className="">
              {tHead.map((e, i) => {
                return <THead content={e} key={i} />
              })}
            </tr>
          </thead>
          <tbody className="border-b border-[#E6EAF0]">
            {movies.map((e, i) => {
              return <TItem key={i} title={e.title} genres={e.genres.join(', ')} release={e.release_date} backdrop={e.backdrop} duration={e.runtime} i={i} />
            })}
          </tbody>
        </table>
      </section>
    </main>
  )
}

function TItem({ title, genres, release, duration, backdrop, i }) {
  const actionStyle = "p-2 rounded-md hover:cursor-pointer hover:opacity-[.8]";
  
  return (
    <tr className="">
      <td>{i + 1}</td>
      <td>
        <img
          className="w-12 h-8 object-cover rounded-md"
          src={`https://image.tmdb.org/t/p/w500${backdrop}`} alt="" />
      </td>
      <td className="py-4">{title}</td>
      <td className="">{genres}</td>
      <td className="">{release}</td>
      <td className="">{duration}</td>
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
    <th className="text-[#1F4173] py-2 font-bold text-sm md:text-left">
      {content}
    </th>
  )
}

export default Table;
