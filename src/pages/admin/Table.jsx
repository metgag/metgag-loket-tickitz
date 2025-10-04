import { format, parse, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Table() {
  // const { histories } = useSelector((state) => state);
  const [movies, setMovies] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/admin/movies/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error(resp.statusText);
        const data = await resp.json();
        if (data.success) setMovies(data.result);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    if (token) fetchMovies();
  }, [token]);

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
      <Toaster />
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
              {movies.map((movie, i) => (
                <TItem
                  key={movie.id}
                  movie={movie} // ✅ Pass the whole movie object
                  i={i}
                  pop={pop}
                  setPop={setPop}
                  setSelected={setSelected}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selected !== null && movies[selected] && (
        <EditModal
          key={movies[selected].id} // ✅ forces new mount
          pop={pop}
          setPop={setPop}
          currMovie={movies[selected]}
        />
      )}
    </main>
  );
}

function EditModal({ pop, setPop, currMovie }) {
  const modalRef = useRef(null);
  const { token } = useSelector((state) => state.auth);

  // 🔥 When modal pops open, scroll smoothly into view
  useEffect(() => {
    if (pop && modalRef.current) {
      modalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [pop]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formBody = {};

    // getValue helper
    const getValue = (name) => form[name]?.value?.trim();

    // TITLE
    const newTitle = getValue("title");
    if (newTitle && newTitle !== currMovie.title) {
      formBody.title = newTitle;
    }

    // RUNTIME (hour + minute → total minutes)
    const hour = parseInt(getValue("hour") || 0, 10);
    const minute = parseInt(getValue("minute") || 0, 10);
    const newRuntime = hour * 60 + minute;

    if (newRuntime && newRuntime !== currMovie.runtime) {
      formBody.runtime = newRuntime;
    }

    // OVERVIEW
    const newOverview = getValue("overview");
    if (newOverview && newOverview !== currMovie.overview) {
      formBody.overview = newOverview;
    }

    // RELEASE DATE
    const newReleaseDate = getValue("release_date");
    if (newReleaseDate && newReleaseDate !== currMovie.release_date) {
      // Convert from DD/MM/YYYY → YYYY-MM-DD
      const parsedDate = parse(newReleaseDate, "dd/MM/yyyy", new Date());
      formBody.release_date = format(parsedDate, "yyyy-MM-dd");
    }

    const formData = new FormData();
    Object.entries(formBody).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${currMovie.id}`;
      const options = {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      };

      const response = await fetch(url, options);
      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const editPoster = async (e) => {
    if (!e) return;

    const formData = new FormData();
    formData.append("poster_path", e);

    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${currMovie.id}`;
      const options = {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      };

      const response = await fetch(url, options);
      const result = await response.json();

      if (result.success) {
        toast.success("Poster updated succesfully!");
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const editBackdrop = async (e) => {
    if (!e) return;

    const formData = new FormData();
    formData.append("backdrop_path", e);

    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${currMovie.id}`;
      const options = {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      };

      const response = await fetch(url, options);
      const result = await response.json();

      if (result.success) {
        toast.success("Backdrop updated succesfully!");
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  if (!currMovie) return null;

  return (
    <form
      ref={modalRef}
      onSubmit={handleUpdate}
      className={`paym-info flex flex-col w-9/10 absolute z-9998 md:w-[90vw] h-min justify-self-center bg-white rounded-xl p-6 gap-3 shadow-lg transition-all
        ${pop ? "visible scale-100 opacity-100" : "invisible scale-105 opacity-0"}
      `}
    >
      <div
        className="w-5 h-5 rounded-full bg-red-700 self-end cursor-pointer hover:opacity-65"
        onClick={() => setPop(!pop)}
      ></div>

      <div
        className="flex gap-6"
      >
        <label htmlFor="posterUpload"
          className="cursor-pointer hover:opacity-70"
        >Poster <i className="nf nf-fa-file_image"></i>
        </label>
        <input
          type="file"
          id="posterUpload"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              editPoster(file);
            }
          }}
        />

        <label htmlFor="backdropUpload"
          className="cursor-pointer hover:opacity-70"
        >Backdrop <i className="nf nf-fa-file_image"></i>
        </label>
        <input
          type="file"
          id="backdropUpload"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              editBackdrop(file);
            }
          }}
        />
      </div>

      <InputItem fill={"Movie Name"} forId={"title"} val={currMovie.title} />
      <InputItem fill={"Category"} forId={"genre"} val={currMovie.genres.map(g => g.name).join(', ')} />
      <InputDateDuration
        date={format(new Date(currMovie.release_date), "dd/MM/yyyy")}
        runtime={currMovie.runtime}
      />
      <InputItem fill={"Director Name"} forId={"director"} val={currMovie.director} />
      <InputItem fill={"Cast"} forId={"cast"} val={currMovie.casts} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="overview" className="text-[#4E4B66]">Synopsis</label>
        <textarea
          defaultValue={currMovie.overview}
          name="overview"
          id="overview"
          rows="4"
          className="border border-[#DEDEDE] text-[#4E4B66] p-6 bg-[#FCFDFE] rounded-sm"
        ></textarea>
      </div>

      <button
        className="w-full mt-3 bg-[#1D4ED8] text-[#F7F7FC] font-bold text-lg py-2 rounded-sm shadow-sm hover:opacity-85 cursor-pointer"
      >
        Save Movie
      </button>
    </form>
  );
}

function TItem({ movie, i, setPop, setSelected }) {
  const actionStyle = "p-2 rounded-md hover:cursor-pointer hover:opacity-[.8]";
  const { title, genres, release_date, runtime, poster_path } = movie;

  return (
    <tr className="text-[#1F4173] text-center">
      <td>{i + 1}</td>
      <td>
        <img
          className="w-16 h-12 object-cover mx-auto rounded-lg"
          src={`${import.meta.env.VITE_BASE_API_URL}/poster/${poster_path}`}
          alt={title}
        />
      </td>
      <td className="px-4 py-4 text-[#1D4ED8]">{title}</td>
      <td className="px-4">{genres.map(g => g.name).join(', ')}</td>
      <td className="px-4">{format(parseISO(release_date), "dd/MM/yyyy")}</td>
      <td className="px-4">{`${Math.floor(runtime / 60)}h ${runtime % 60}m`}</td>
      <td className="flex text-white gap-2 border py-5 justify-center">
        <i className={`bg-[#1D4ED8] ${actionStyle} nf nf-md-eye`}></i>

        <i
          className={`bg-[#5D5FEF] ${actionStyle} nf nf-md-pencil`}
          onClick={() => {
            setSelected(i);
            setPop(true);
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
            defaultValue={Math.floor(runtime / 60)}
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
