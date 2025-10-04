import { format, parse } from "date-fns";
import { convLocations, fixGenres } from "../../utils/movieUtil";
import { useState } from "react";
import { toast } from "react-hot-toast";

const inputStyle =
  "border border-[#DEDEDE] text-[#4E4B66] h-11 ps-6 bg-[#FCFDFE] rounded-sm";

const Create = () => {
  const [selectedTime, setSelectedTime] = useState([]);
  const [resetKey, setResetKey] = useState(Date.now()); // unique key to reset form
  const [posterPreview, setPosterPreview] = useState(null);
  const [backdropPreview, setBackdropPreview] = useState(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === "poster") setPosterPreview(previewUrl);
    if (type === "backdrop") setBackdropPreview(previewUrl);
  };

  const times = [
    { id: 1, time: "03:40pm" },
    { id: 2, time: "08:30pm" },
    { id: 3, time: "01:15pm" },
  ];

  const handleAddTime = () => {
    const nextTime = times[selectedTime.length];
    if (nextTime) {
      setSelectedTime([...selectedTime, nextTime]);
    }
  };

  const handleRemove = (idx) => {
    setSelectedTime(selectedTime.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Build request body
    const genresInput = form.genre.value
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const genres = fixGenres(genresInput);

    const parseRelease = parse(form.release_date.value, "dd/MM/yyyy", new Date());
    const timeIds = selectedTime.map((e) => e.id);
    const locationIds = convLocations(form.location.value);

    const body = {
      poster_path: form.poster.files,
      backdrop_path: form.backdrop.files,
      title: form.title.value,
      genres,
      release_date: format(parseRelease, "yyyy-MM-dd"),
      runtime:
        parseInt(form.hour.value || 0) * 60 + parseInt(form.minute.value || 0),
      director_name: form.director.value,
      casts: form.cast.value.split(",").map((e) => e.trim()).filter(Boolean),
      overview: form.overview.value,
      location: locationIds,
      schedule_date: form.schedule_date.value,
      schedule_time: timeIds,
    };

    const formData = new FormData();

    for (const prop in body) {
      if (prop === "poster_path") {
        const file = body[prop];
        if (file?.[0]) formData.append(prop, file[0]);
      } else if (prop === "backdrop_path") {
        const file = body[prop];
        if (file?.[0]) formData.append(prop, file[0]);
      } else if (prop === "schedule_time") {
        timeIds.forEach((id) => formData.append(prop, id));
      } else if (prop === "location") {
        locationIds.forEach((id) => formData.append(prop, id));
      } else {
        formData.append(prop, body[prop]);
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/admin/movies/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();

      toast.success("Movie created successfully!");
      console.log(result);

      // ✅ Reset form & state
      setSelectedTime([]);
      setPosterPreview(null);   // clear poster preview
      setBackdropPreview(null); // clear backdrop preview
      setResetKey(Date.now()); // force re-render to clear inputs
    } catch (err) {
      console.error(err);
      toast.error("Failed to create movie!");
    }
  };

  return (
    <main className="bg-[#f5f6f8] h-full py-12">
      <form
        key={resetKey} // force form reset when key changes
        className="w-2/5 mx-auto bg-white p-12 rounded-xl shadow-2xs flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Add New Movie</h2>

        {/* Poster */}
        <div className="flex gap-4">

          <div className="flex flex-col gap-1.5">
            <p className="text-[#696F79]">Poster</p>
            {posterPreview && (
              <img
                src={posterPreview}
                alt="Poster Preview"
                className="mt-2 max-h-40 rounded-md shadow-md w-min"
              />
            )}
            <label className={`${posterPreview ? "w-full" : "w-max px-8"} text-center bg-[#1D4ED8] font-bold text-[#F7F7FC] py-1.5 rounded-lg cursor-pointer hover:opacity-80 inline-block`}>
              Upload
              <input
                type="file"
                name="poster"
                className="hidden"
                onChange={(e) => handleFileChange(e, "poster")}
              />
            </label>
          </div>

          {/* Backdrop */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[#696F79]">Backdrop</p>
            {backdropPreview && (
              <img
                src={backdropPreview}
                alt="Backdrop Preview"
                className="mt-2 max-h-40 rounded-md shadow-md w-min"
              />
            )}
            <label className="w-min bg-[#1D4ED8] font-bold text-[#F7F7FC] px-8 py-1.5 rounded-lg cursor-pointer hover:opacity-80 inline-block">
              Upload
              <input
                type="file"
                name="backdrop"
                className="hidden"
                onChange={(e) => handleFileChange(e, "backdrop")}
              />
            </label>
          </div>
        </div>

        {/* Poster */}
        {/* <div className="flex gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="text-[#696F79]">Poster</p>
            <label className="w-min bg-[#1D4ED8] font-bold text-[#F7F7FC] px-8 py-1.5 rounded-lg cursor-pointer hover:opacity-80 inline-block">
              Upload
              <input type="file" name="poster" className="hidden" />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-[#696F79]">Backdrop</p>
            <label className="w-min bg-[#1D4ED8] font-bold text-[#F7F7FC] px-8 py-1.5 rounded-lg cursor-pointer hover:opacity-80 inline-block">
              Upload
              <input type="file" name="backdrop" className="hidden" />
            </label>
          </div>
        </div> */}

        <InputItem label="Movie Name" name="title" />
        <InputItem label="Category" name="genre" />

        {/* Release date & duration */}
        <div className="flex gap-7">
          <div className="flex flex-col w-1/2">
            <label htmlFor="release_date" className="text-[#4e4b66]">
              Release date
            </label>
            <input
              type="text"
              name="release_date"
              id="release_date"
              placeholder="dd/MM/yyyy"
              className={inputStyle}
            />
          </div>
          <div className="w-1/2">
            <label className="text-[#4E4B66]">
              Duration (hour / minute)
            </label>
            <div className="flex gap-4">
              <input
                className={`${inputStyle} w-full`}
                type="number"
                name="hour"
                placeholder="hr"
              />
              <input
                className={`${inputStyle} w-full`}
                type="number"
                name="minute"
                placeholder="min"
              />
            </div>
          </div>
        </div>

        <InputItem label="Director Name" name="director" />
        <InputItem label="Cast" name="cast" />

        {/* Synopsis */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="overview" className="text-[#4E4B66]">
            Synopsis
          </label>
          <textarea
            name="overview"
            rows="4"
            className="border border-[#DEDEDE] text-[#4E4B66] p-6 bg-[#FCFDFE] rounded-sm"
          ></textarea>
        </div>

        <InputItem label="Add Location" name="location" />

        {/* Schedule */}
        <div className="flex flex-col">
          <label htmlFor="schedule-date" className="text-[#4E4B66]">
            Set Date & Time
          </label>
          <input
            type="date"
            name="schedule_date"
            className="w-min h-11 bg-[#eff0f6] p-4 rounded-md text-[#4E4B66]"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAddTime}
            className="border border-[#5F2EEA] text-[#5F2EEA] w-min px-6 text-xl rounded-sm font-extralight hover:opacity-60"
          >
            <i className="nf nf-oct-plus"></i>
          </button>
          {selectedTime.map((e, i) => (
            <TimeItem key={i} time={e.time} handleRemove={() => handleRemove(i)} />
          ))}
        </div>

        <hr className="py-2 text-[#DEDEDE]" />

        <button
          type="submit"
          className="w-full bg-[#1D4ED8] text-[#F7F7FC] font-bold text-lg py-2 rounded-sm shadow-sm hover:opacity-85 cursor-pointer"
        >
          Save Movie
        </button>
      </form>
    </main>
  );
};

function TimeItem({ time, handleRemove }) {
  return (
    <p
      onClick={handleRemove}
      className="text-[#4E4B66] text-sm hover:cursor-pointer hover:text-red-800"
    >
      {time}
    </p>
  );
}

function InputItem({ label, name }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[#4E4B66]">
        {label}
      </label>
      <input type="text" id={name} name={name} className={inputStyle} />
    </div>
  );
}

export default Create;