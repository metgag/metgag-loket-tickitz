import { format, parse, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Table() {
  const [movies, setMovies] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);
  // useEffect(() => {
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
      toast.error("Failed to fetch movies.");
    }
  };

  // if (token) fetchMovies();
  // }, [token]);

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
    <main
      className={`bg-[#f5f6f8] overflow-hidden md:overflow-auto max-w-screen px-8 md:px-28 grid py-12 min-h-screen 
    ${pop && "bg-black/60"}`}
    >
      <Toaster />
      <section
        className={`bg-white shadow-sm rounded-2xl p-5 md:px-8 w-full h-max overflow-hidden md:overflow-auto md:flex md:flex-col md:gap-8
            ${pop && "brightness-50"}
      `}
      >
        <div className="top grid grid-cols-5 md:grid-cols-4 gap-3 items-center">
          <h3 className="text-2xl text-[#14142B] col-span-4 md:col-span-2 font-bold">
            List Movie
          </h3>
          <select
            className="bg-[#EFF0F6] w-full md:py-4 px-5 text-[#4E4B66] rounded-md hidden md:block"
          >
            <option value="">November 2023</option>
          </select>
          <button
            onClick={() => navigate("/admin/create")}
            className="w-full md:py-4 ms-auto bg-[#1D4ED8] p-2 px-5 text-sm rounded-md text-white font-medium hover:opacity-80 hover:cursor-pointer md:after:content-['_Movies'] before:content-['+_'] md:before:content-none"
          >
            Add
          </button>
          <select
            className="col-span-full bg-[#EFF0F6] py-4 md:py-3 px-5 text-[#4E4B66] rounded-md md:hidden"
          >
            <option value="">November 2023</option>
          </select>
        </div>
        <div className="overflow-x-scroll md:overflow-auto w-full">
          <table className="table-auto w-max md:w-full">
            <thead className="border-b border-[#E6EAF0]">
              <tr>
                {tHead.map((e, i) => {
                  return <THead content={e} key={i} />;
                })}
              </tr>
            </thead>
            <tbody className="border-b border-[#E6EAF0]">
              {movies.map((movie, i) => (
                <TItem
                  key={movie.id}
                  movie={movie}
                  i={i}
                  setPop={setPop}
                  setSelected={setSelected}
                  setDeleteTarget={setDeleteTarget}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected !== null && movies[selected] && (
        <EditModal
          key={movies[selected].id}
          pop={pop}
          setPop={setPop}
          currMovie={movies[selected]}
          fetchMovies={fetchMovies}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          movie={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async (id) => {
            try {
              const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${id}`;
              const options = {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              };

              const response = await fetch(url, options);
              const result = await response.json();

              if (response.ok && result.success !== false) {
                toast.success(result.message || "Movie deleted successfully!");
                setMovies((prev) => prev.filter((m) => m.id !== id));
                setDeleteTarget(null);
              } else {
                toast.error(result.message || "Failed to delete movie.");
              }
            } catch (err) {
              console.error(err);
              toast.error("Error deleting movie.");
            }
          }}
        />
      )}
    </main>
  );
}

function TItem({ movie, i, setPop, setSelected, setDeleteTarget }) {
  const actionStyle = "p-2 rounded-md hover:cursor-pointer hover:opacity-[.8]";
  const { title, genres, release_date, runtime, poster_path } = movie;

  return (
    <tr className="text-[#1F4173] text-center hover:bg-gray-50">
      <td>{i + 1}</td>
      <td>
        <img
          className="w-16 h-12 object-cover mx-auto rounded-lg"
          src={`${import.meta.env.VITE_BASE_API_URL}/poster/${poster_path}`}
          alt={title}
        />
      </td>
      <td className="px-4 py-4 text-[#1D4ED8]">{title}</td>
      <td className="px-4">{genres.map((g) => g.name).join(", ")}</td>
      <td className="px-4">{format(parseISO(release_date), "dd/MM/yyyy")}</td>
      <td className="px-4">{`${Math.floor(runtime / 60)}h ${runtime % 60}m`}</td>
      <td className="px-4">
        <div className="flex justify-center gap-2 text-white">
          <i className={`bg-[#1D4ED8] ${actionStyle} nf nf-md-eye`}></i>
          <i
            className={`bg-[#5D5FEF] ${actionStyle} nf nf-md-pencil`}
            onClick={() => {
              setSelected(i);
              setPop(true);
            }}
          ></i>
          <i
            className={`bg-[#E82C2C] ${actionStyle} nf nf-fa-trash`}
            onClick={() => setDeleteTarget(movie)}
          ></i>
        </div>
      </td>
    </tr>
  );
}

function THead({ content }) {
  return (
    <th className="text-[#1F4173] text-left px-6 py-2 font-bold text-sm md:text-center">
      {content}
    </th>
  );
}

const inputStyle = `
  border border-[#DEDEDE] text-[#4E4B66] h-11 ps-6 bg-[#FCFDFE] rounded-sm
`;

function InputDateDuration({ runtime, date }) {
  return (
    <div className="flex gap-7">
      <div className="flex flex-col w-1/2">
        <label className="text-[#4e4b66]" htmlFor="release_date">
          Release date
        </label>
        <input
          type="text"
          name="release_date"
          id="release_date"
          defaultValue={date}
          className={inputStyle}
        />
      </div>
      <div className="w-1/2">
        <label className="text-[#4E4B66]" htmlFor="">
          Duration (hour / minute)
        </label>
        <div className="flex gap-4">
          <input
            className={`${inputStyle} w-full`}
            type="text"
            name="hour"
            defaultValue={Math.floor(runtime / 60)}
          />
          <input
            className={`${inputStyle} w-full`}
            type="text"
            name="minute"
            defaultValue={Math.floor(runtime % 60)}
          />
        </div>
      </div>
    </div>
  );
}

function InputItem({ fill, forId, val }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={forId} className="text-[#4E4B66]">
        {fill}
      </label>
      <input
        type="text"
        id={forId}
        name={forId}
        className={inputStyle}
        defaultValue={val}
      />
    </div>
  );
}

function ConfirmDeleteModal({ movie, onClose, onConfirm }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold text-[#1F4173] mb-4">
          Delete Movie
        </h2>
        <p className="text-[#4E4B66] mb-6">
          Are you sure you want to delete <strong>{movie.title}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:opacity-75 cursor-pointer font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(movie.id)}
            className="px-4 py-2 rounded bg-[#E82C2C] text-white hover:opacity-85 cursor-pointer font-medium"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;

// import { format, parse, parseISO } from "date-fns";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import toast, { Toaster } from "react-hot-toast";

// function Table() {
//   const [movies, setMovies] = useState([]);
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [pop, setPop] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null); // store movie to delete

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const resp = await fetch(`${import.meta.env.VITE_BASE_API_URL}/admin/movies/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!resp.ok) throw new Error(resp.statusText);
//         const data = await resp.json();
//         if (data.success) setMovies(data.result);
//       } catch (err) {
//         console.error("Failed to fetch movies:", err);
//         toast.error("Failed to fetch movies.");
//       }
//     };
//     if (token) fetchMovies();
//   }, [token]);

//   const tHead = [
//     "No",
//     "Thumbnail",
//     "Movie Name",
//     "Category",
//     "Released Date",
//     "Duration",
//     "Action",
//   ];

//   return (
//     <main
//       className={`bg-[#f5f6f8] overflow-hidden md:overflow-auto max-w-screen px-8 md:px-28 grid py-12 min-h-screen 
//     ${pop && "bg-black/60"}`}
//     >
//       <Toaster />
//       <section
//         className={`bg-white shadow-sm rounded-2xl p-5 md:px-8 w-full h-max overflow-hidden md:overflow-auto md:flex md:flex-col md:gap-8
//             ${pop && "brightness-50"}
//       `}
//       >
//         <div className="top grid grid-cols-5 md:grid-cols-4 gap-3 items-center">
//           <h3 className="text-2xl text-[#14142B] col-span-4 md:col-span-2 font-bold">
//             List Movie
//           </h3>
//           <select
//             name=""
//             id=""
//             className="bg-[#EFF0F6] w-full md:py-4 px-5 text-[#4E4B66] rounded-md hidden md:block"
//           >
//             <option value="">November 2023</option>
//           </select>
//           <button
//             onClick={() => navigate("/admin/create")}
//             className="w-full md:py-4 ms-auto bg-[#1D4ED8] p-2 px-5 text-sm rounded-md text-white font-medium hover:opacity-80 hover:cursor-pointer md:after:content-['_Movies'] before:content-['+_'] md:before:content-none"
//           >
//             Add
//           </button>
//           <select
//             name=""
//             id=""
//             className="col-span-full bg-[#EFF0F6] py-4 md:py-3 px-5 text-[#4E4B66] rounded-md md:hidden"
//           >
//             <option value="">November 2023</option>
//           </select>
//         </div>
//         <div className="overflow-x-scroll md:overflow-auto w-full">
//           <table className="table-auto w-max md:w-full">
//             <thead className="border-b border-[#E6EAF0]">
//               <tr>
//                 {tHead.map((e, i) => {
//                   return <THead content={e} key={i} />;
//                 })}
//               </tr>
//             </thead>
//             <tbody className="border-b border-[#E6EAF0]">
//               {movies.map((movie, i) => (
//                 <TItem
//                   key={movie.id}
//                   movie={movie}
//                   i={i}
//                   setPop={setPop}
//                   setSelected={setSelected}
//                   setMovies={setMovies}
//                   setDeleteTarget={setDeleteTarget}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//       {selected !== null && movies[selected] && (
//         <EditModal
//           key={movies[selected].id}
//           pop={pop}
//           setPop={setPop}
//           currMovie={movies[selected]}
//         />
//       )}

//       {deleteTarget && (
//         <ConfirmDeleteModal
//           movie={deleteTarget}
//           onClose={() => setDeleteTarget(null)}
//           onConfirm={async (id) => {
//             try {
//               const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${id}`;
//               const options = {
//                 method: "DELETE",
//                 headers: { Authorization: `Bearer ${token}` },
//               };

//               const response = await fetch(url, options);
//               const result = await response.json();

//               if (response.ok && result.success !== false) {
//                 toast.success(result.message || "Movie deleted successfully!");
//                 setMovies((prev) => prev.filter((m) => m.id !== id));
//                 setDeleteTarget(null);
//               } else {
//                 toast.error(result.message || "Failed to delete movie.");
//               }
//             } catch (err) {
//               console.error(err);
//               toast.error("Error deleting movie.");
//             }
//           }}
//         />
//       )}

//     </main>
//   );
// }

function EditModal({ pop, setPop, currMovie, fetchMovies }) {
  const modalRef = useRef(null);
  const { token } = useSelector((state) => state.auth);

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
    const getValue = (name) => form[name]?.value?.trim();

    const newTitle = getValue("title");
    if (newTitle && newTitle !== currMovie.title) {
      formBody.title = newTitle;
    }

    const hour = parseInt(getValue("hour") || 0, 10);
    const minute = parseInt(getValue("minute") || 0, 10);
    const newRuntime = hour * 60 + minute;
    if (newRuntime && newRuntime !== currMovie.runtime) {
      formBody.runtime = newRuntime;
    }

    const newOverview = getValue("overview");
    if (newOverview && newOverview !== currMovie.overview) {
      formBody.overview = newOverview;
    }

    const newReleaseDate = getValue("release_date");
    if (newReleaseDate && newReleaseDate !== currMovie.release_date) {
      const parsedDate = parse(newReleaseDate, "dd/MM/yyyy", new Date());
      formBody.release_date = format(parsedDate, "yyyy-MM-dd");
    }

    const newDirector = getValue("director_name");
    if (newDirector && newDirector !== currMovie.director_name) {
      formBody.director_name = newDirector;
    }

    const newCasts = getValue("casts");
    if (newCasts && newCasts !== currMovie.casts) {
      formBody.casts = newCasts;
    }

    const newGenres = getValue("genres");
    if (newGenres && newGenres !== currMovie.genres?.join(", ")) {
      formBody.genres = newGenres;
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

      if (response.ok && (result.success !== false)) {
        toast.success(result.message || "Movie updated successfully!");

        fetchMovies();
        setPop(false);
      } else {
        toast.error(result.message || "Failed to update movie.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating movie.");
    }
  };

  const editPoster = async (e) => {
    if (!e) return;
    const formData = new FormData();
    formData.append("poster_path", e);

    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${currMovie.id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await response.json();
      if (response.ok && (result.success !== false)) {
        toast.success("Poster updated successfully!");
      } else {
        toast.error(result.message || "Failed to update poster.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating poster.");
    }
  };

  const editBackdrop = async (e) => {
    if (!e) return;
    const formData = new FormData();
    formData.append("backdrop_path", e);

    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${currMovie.id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await response.json();
      if (response.ok && (result.success !== false)) {
        toast.success("Backdrop updated successfully!");
      } else {
        toast.error(result.message || "Failed to update backdrop.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating backdrop.");
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

      <div className="flex gap-6">
        <label htmlFor="posterUpload" className="cursor-pointer hover:opacity-70">
          Poster <i className="nf nf-fa-file_image"></i>
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

        <label htmlFor="backdropUpload" className="cursor-pointer hover:opacity-70">
          Backdrop <i className="nf nf-fa-file_image"></i>
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
      <InputItem
        fill={"Category"}
        forId={"genres"}
        val={currMovie.genres.map((g) => g.name).join(", ")}
      />
      <InputDateDuration
        date={format(new Date(currMovie.release_date), "dd/MM/yyyy")}
        runtime={currMovie.runtime}
      />
      <InputItem
        fill={"Director Name"}
        forId={"director_name"}
        val={currMovie.director}
      />
      <InputItem fill={"Cast"} forId={"casts"} val={currMovie.casts} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="overview" className="text-[#4E4B66]">
          Synopsis
        </label>
        <textarea
          defaultValue={currMovie.overview}
          name="overview"
          id="overview"
          rows="4"
          className="border border-[#DEDEDE] text-[#4E4B66] p-6 bg-[#FCFDFE] rounded-sm"
        ></textarea>
      </div>

      <button className="w-full mt-3 bg-[#1D4ED8] text-[#F7F7FC] font-bold text-lg py-2 rounded-sm shadow-sm hover:opacity-85 cursor-pointer">
        Save Movie
      </button>
    </form>
  );
}

// function TItem({ movie, i, setPop, setSelected, setMovies, setDeleteTarget }) {
//   const actionStyle = "p-2 rounded-md hover:cursor-pointer hover:opacity-[.8]";
//   const { id, title, genres, release_date, runtime, poster_path } = movie;
//   const { token } = useSelector((state) => state.auth);

//   const handleDelete = async () => {
//     setDeleteTarget(movie.id);

//     try {
//       const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/${id}`;
//       const options = {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       };

//       const response = await fetch(url, options);
//       const result = await response.json();

//       console.log(result);
//       if (response.ok && result.success !== false) {
//         toast.success(result.message || "Movie deleted successfully!");
//         // Optionally remove from UI immediately without refreshing
//         setMovies(prev => prev.filter(m => m.id !== id));
//       } else {
//         toast.error(result.message || "Failed to delete movie.");
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <tr className="text-[#1F4173] text-center hover:bg-gray-50">
//       <td>{i + 1}</td>
//       <td>
//         <img
//           className="w-16 h-12 object-cover mx-auto rounded-lg"
//           src={`${import.meta.env.VITE_BASE_API_URL}/poster/${poster_path}`}
//           alt={title}
//         />
//       </td>
//       <td className="px-4 py-4 text-[#1D4ED8]">{title}</td>
//       <td className="px-4">{genres.map((g) => g.name).join(", ")}</td>
//       <td className="px-4">{format(parseISO(release_date), "dd/MM/yyyy")}</td>
//       <td className="px-4">{`${Math.floor(runtime / 60)}h ${runtime % 60}m`}</td>
//       <td className="px-4">
//         <div className="flex justify-center gap-2 text-white">
//           <i className={`bg-[#1D4ED8] ${actionStyle} nf nf-md-eye`}></i>
//           <i
//             className={`bg-[#5D5FEF] ${actionStyle} nf nf-md-pencil`}
//             onClick={() => {
//               setSelected(i);
//               setPop(true);
//             }}
//           ></i>
//           <i className={`bg-[#E82C2C] ${actionStyle} nf nf-fa-trash`}
//             onClick={handleDelete}
//           ></i>
//         </div>
//       </td>
//     </tr>
//   );
// }

// function THead({ content }) {
//   return (
//     <th className="text-[#1F4173] text-left px-6 py-2 font-bold text-sm md:text-center">
//       {content}
//     </th>
//   );
// }

// const inputStyle = `
//   border border-[#DEDEDE] text-[#4E4B66] h-11 ps-6 bg-[#FCFDFE] rounded-sm
// `;

// function InputDateDuration({ runtime, date }) {
//   return (
//     <div className="flex gap-7">
//       <div className="flex flex-col w-1/2">
//         <label className="text-[#4e4b66]" htmlFor="release_date">
//           Release date
//         </label>
//         <input
//           type="text"
//           name="release_date"
//           id="release_date"
//           defaultValue={date}
//           className={inputStyle}
//         />
//       </div>
//       <div className="w-1/2">
//         <label className="text-[#4E4B66]" htmlFor="">
//           Duration (hour / minute)
//         </label>
//         <div className="flex gap-4">
//           <input
//             className={`${inputStyle} w-full`}
//             type="text"
//             name="hour"
//             defaultValue={Math.floor(runtime / 60)}
//           />
//           <input
//             className={`${inputStyle} w-full`}
//             type="text"
//             name="minute"
//             defaultValue={Math.floor(runtime % 60)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function InputItem({ fill, forId, val }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label htmlFor={forId} className="text-[#4E4B66]">
//         {fill}
//       </label>
//       <input
//         type="text"
//         id={forId}
//         name={forId}
//         className={inputStyle}
//         defaultValue={val}
//       />
//     </div>
//   );
// }

// function ConfirmDeleteModal({ movie, onClose, onConfirm }) {
//   if (!movie) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] shadow-lg">
//         <h2 className="text-lg font-bold text-[#1F4173] mb-4">
//           Delete Movie
//         </h2>
//         <p className="text-[#4E4B66] mb-6">
//           Are you sure you want to delete <strong>{movie.title}</strong>?
//           This action cannot be undone.
//         </p>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:opacity-80"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => onConfirm(movie.id)}
//             className="px-4 py-2 rounded bg-[#E82C2C] text-white hover:opacity-85"
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Table;