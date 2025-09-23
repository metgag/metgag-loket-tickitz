import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Table() {
  // const { histories } = useSelector((state) => state);
  const [movies, setMovies] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [selected, setSelected] = useState(null);

  console.log(movies[0])

  useEffect(() => {
    const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const request = new Request(url, options);
    fetch(request)
      .then((resp) => {
        if (!resp.ok) throw resp.statusText;
        return resp.json();
      })
      .then(res => {
        if (res.success) {
          const { result } = res
          setMovies(result);
        }
      })
      .catch(err => console.log(err))
  }, [token.token]);

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
    <main className={`bg-[#f5f6f8] overflow-hidden md:overflow-auto max-w-screen px-8 md:px-28 grid py-12 min-h-screen 
    ${pop && "bg-black/60"}`}
    >
      <section className={`bg-white rounded-2xl p-5 md:px-8 w-full h-max overflow-hidden md:overflow-auto md:flex md:flex-col md:gap-8
            ${pop && "brightness-50"}
      `}>
        <div className="top grid grid-cols-5 md:grid-cols-4 gap-3 items-center">
          <h3 className="text-2xl text-[#14142B] col-span-4 md:col-span-2 font-bold">List Movie</h3>
          <select name="" id=""
            className="bg-[#EFF0F6] w-full md:py-4 px-5 text-[#4E4B66] rounded-md hidden md:block"
          >
            <option value="">November 2023</option>
          </select>
          <button
            onClick={() => navigate("/admin/create")}
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
              {movies.map((e, i) => {
                return <TItem key={i}
                  title={e.title}
                  genres={e.genres.map(g => g.name).join(', ')}
                  release={format(parseISO(e.release_date), "dd/MM/yyyy")}
                  poster={e.poster_path}
                  duration={`${Math.floor(e.runtime / 60)} Hours ${e.runtime % 60} Minute`} i={i}
                  pop={pop}
                  setPop={setPop}
                  setSelected={setSelected}
                />
              })}
            </tbody>
          </table>
        </div>
      </section>
      {/* <section
        className="absolute bg-gray-600 w-[80vw] h-[88vh] z-9999"
      ></section> */}
      <EditModal
        pop={pop}
        setPop={setPop}
        currMovie={movies[selected]}
      />
    </main>
  );
}

function EditModal({ pop, setPop, currMovie }) {
  return (
    <form className={`paym-info flex flex-col w-9/10 absolute z-9998 md:w-[90vw] h-min justify-self-center bg-white rounded-xl p-6 gap-3 shadow-lg transition-all
      ${pop ? "visible scale-100 opacity-100" : "invisible scale-105 opacity-0"}
    `}>
      <div
        className="w-5 h-5 rounded-full bg-red-700 self-end cursor-pointer hover:opacity-65"
        onClick={() => setPop(!pop)}
      ></div>
      <InputItem fill={"Movie Name"} forId={"title"}
        val={currMovie.title}
      />
      <InputItem fill={"Category"} forId={"genre"}
        val={currMovie.genres.map(g => g.name).join(', ')}
      />
      <InputDateDuration 
        date={format(new Date(currMovie.release_date), "dd/MM/yyyy")}
        runtime={currMovie.runtime}
      />
      <InputItem fill={"Director Name"} forId={"director"} />
      <InputItem fill={"Cast"} forId={"cast"} />
      <div
        className="flex flex-col gap-1.5"
      >
        <label htmlFor="overview"
          className="text-[#4E4B66]"
        >Synopsis</label>
        <textarea name="overview" id="overview" rows="4"
          className="border border-[#DEDEDE] text-[#4E4B66] p-6 bg-[#FCFDFE] rounded-sm"
        ></textarea>
      </div>
      <button
        className="w-full mt-3 bg-[#1D4ED8] text-[#F7F7FC] font-bold text-lg py-2 rounded-sm shadow-sm hover:opacity-85 cursor-pointer"
      >Save Movie</button>
    </form>
  );
}

function TItem({ title, genres, release, duration, poster, i, setPop, pop, setSelected }) {
  const actionStyle = "p-2 rounded-md hover:cursor-pointer hover:opacity-[.8]";

  return (
    <tr className="text-[#1F4173] text-center">
      <td className="">{i + 1}</td>
      <td>
        <img
          className="w-16 h-12 object-cover mx-auto rounded-lg"
          src={`${import.meta.env.VITE_BASE_API_URL}/poster/${poster}`} alt="" />
      </td>
      <td className="px-4 py-4 text-[#1D4ED8]">{title}</td>
      <td className="px-4">{genres}</td>
      <td className="px-4">{release}</td>
      <td className="px-4">{duration}</td>
      <td className="flex text-white gap-2 border py-5">
        <i className={`bg-[#1D4ED8] ${actionStyle} nf nf-md-eye`}></i>
        <i className={`bg-[#5D5FEF] ${actionStyle} nf nf-md-pencil`}
          id={i}
          onClick={(e) => {
            setPop(!pop)
            setSelected(e.target.id);
            // console.log(e.target.id)
          }}
        ></i>
        <i className={`bg-[#E82C2C] ${actionStyle} nf nf-fa-trash`}></i>
      </td>
    </tr>
  );
}

function THead({ content }) {
  return (
    <th className="text-[#1F4173] text-left px-6 py-2 font-bold text-sm md:text-center">
      {content}
    </th>
  )
}

const inputStyle = `
  border border-[#DEDEDE] text-[#4E4B66] h-11 ps-6 bg-[#FCFDFE] rounded-sm
`;

function InputDateDuration({ runtime, date }) {
  return (
    <div
      className="flex gap-7"
    >
      <div
        className="flex flex-col w-1/2"
      >
        <label
          className="text-[#4e4b66]"
          htmlFor="release_date">Release date</label>
        <input type="text" name="release_date" id="release_date"
          defaultValue={date}
          className={inputStyle}
        />
      </div>
      <div
        className="w-1/2"
      >
        <label
          className="text-[#4E4B66]"
          htmlFor="">Duration (hour / minute)</label>
        <div
          className="flex gap-4"
        >
          <input
            className={`${inputStyle} w-full`}
            type="text" name="hour" 
            defaultValue={Math.floor(runtime/60)}
            />
          <input
            className={`${inputStyle} w-full`}
            type="text" name="minute" 
            defaultValue={Math.floor(runtime % 60)}
            />
        </div>
      </div>
    </div>
  );
};

function InputItem({ fill, forId, val }) {
  return (
    <div
      className="flex flex-col gap-1.5"
    >
      <label htmlFor={forId}
        className="text-[#4E4B66]"
      >{fill}</label>
      <input type="text" id={forId} name={forId}
        className={inputStyle} defaultValue={val}
      />
    </div>
  );
};

export default Table;
