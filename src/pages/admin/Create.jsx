import { format, parse } from "date-fns";
import { convLocations, fixGenres } from "../../utils/movieUtil";
import { useState } from "react";

const inputStyle = `
    border border-[#DEDEDE] text-[#4E4B66] h-11 ps-6 bg-[#FCFDFE] rounded-sm
`;

const Create = () => {
    const [selectedTime, setSelectedTime] = useState([]);
    // const [backdrop, setBackdrop] = useState("");

    const times = [
        {id: 1, time: "03:40pm"}, 
        {id: 2, time: "08:30pm"}, 
        {id: 3, time: "01:15pm"}
    ];

    function handleAddTime() {
        const nextTime = times[selectedTime.length];
        if (nextTime) {
            setSelectedTime([...selectedTime, nextTime]);
        }
    }
    function handleRemove(idx) {
        setSelectedTime(selectedTime.filter((_, i) => i !== idx));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        // console.log(form.poster.value.split("\\")[2])
        const genresInput = form.genre.value.split(",")
            .map(e => e.trim()).filter(e => e)
        const genres = fixGenres(genresInput)
        const parseRelease =
            parse(form.release_date.value, "dd/MM/yyyy", new Date());
        const timeIds = selectedTime.map((e) => {
            return e.id;
        });
        const locationIds = convLocations(form.location.value);

        const body = {
            poster_path: form.poster.files,
            title: form.title.value,
            genres,
            release_date: format(parseRelease, "yyyy-MM-dd"),
            runtime:
                parseInt(form.hour.value * 60) + parseInt(form.minute.value),
            director_name: form.director.value,
            casts: form.cast.value.split(",")
                .map(e => e.trim()).filter(e => e),
            overview: form.overview.value,
            location: locationIds,
            schedule_date: form.schedule_date.value,
            schedule_time: timeIds,
        };

        console.log(body);
        const url = `${import.meta.env.VITE_BASE_API_URL}/admin/movies/`;
        const options = {
            method: "POST",
        };
        const formdat = new FormData();

        for (const prop in body) {
            if (prop === "poster_path") {
                const file = body[prop];
                formdat.append(prop, file[0])
                continue;
            }
            if (prop == "schedule_time") {
                timeIds.forEach((e) => {
                    formdat.append(prop, e);
                });
                continue;
            }
            if (prop == "location") {
                locationIds.forEach((e) => {
                    formdat.append(prop, e);
                });
                continue;
            }

            formdat.append(prop, body[prop])
        }
        const request = new Request(url, options)
        fetch(request, {
            body: formdat,
        })
            .then((resp) => {
                if (!resp.ok) throw resp.statusText;
                return resp.json();
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    return (
        <main
            className="bg-[#f5f6f8] h-full py-12"
        >
            <form
                className="w-2/5 mx-auto bg-white p-12 rounded-xl shadow-2xs flex flex-col gap-3"
                onSubmit={handleSubmit}
            >
                <h2
                    className="text-2xl font-bold"
                >Add New Movie</h2>
                <div
                    className="flex gap-3"
                >
                    <div
                        className="flex flex-col gap-1.5"
                    >
                        <p
                            className="text-[#696F79]"
                        >Upload Image</p>
                        <label
                            className="w-min bg-[#1D4ED8] font-bold text-[#F7F7FC] px-8 py-1.5 rounded-lg cursor-pointer hover:opacity-80 inline-block"
                        >
                            Upload
                            <input type="file" name="poster" id="" className="hidden"
                            />
                        </label>
                    </div>
                    {/* <div
                        className="flex items-end"
                    >
                        <div
                            className="flex items-center gap-1"
                        >
                        <h4
                            className="border border-[#DEDEDE] text-[#4e4b66] rounded-md px-1 text-sm"
                        >upload.jpg</h4>
                        <i
                            className="nf nf-md-close_circle text-red-700"
                        ></i>
                        </div>
                    </div> */}
                </div>
                <InputItem fill={"Movie Name"} forId={"title"} />
                <InputItem fill={"Category"} forId={"genre"} />
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
                                type="text" name="hour" />
                            <input
                                className={`${inputStyle} w-full`}
                                type="text" name="minute" />
                        </div>
                    </div>
                </div>
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
                <InputItem fill={"Add Location"} forId={"location"} />
                <div
                    className="flex flex-col"
                >
                    <label htmlFor="schedule-date"
                        className="text-[#4E4B66]"
                    >Set Date & Time</label>
                    <input type="date" name="schedule_date" id="schedule-date"
                        className="w-min h-11 bg-[#eff0f6] p-4 rounded-md text-[#4E4B66]"
                    />
                </div>
                <div
                    className="flex items-center gap-4"
                >
                    <div
                        onClick={handleAddTime}
                        className="border border-[#5F2EEA] text-[#5F2EEA] w-min px-6 text-xl rounded-sm font-extralight cursor-pointer hover:opacity-60"
                    >
                        <i className="nf nf-oct-plus"></i>
                    </div>
                    {selectedTime.map((e, i) => {
                        return <TimeItem
                            key={i}
                            time={e.time}
                            handleRemove={handleRemove}
                            idx={i}
                        />
                    })}
                </div>
                <hr
                    className="py-2 text-[#DEDEDE]"
                />
                <button
                    className="w-full bg-[#1D4ED8] text-[#F7F7FC] font-bold text-lg py-2 rounded-sm shadow-sm hover:opacity-85 cursor-pointer"
                >Save Movie</button>
            </form>
        </main>
    );
};

function TimeItem({ time, handleRemove, idx }) {
    return <p
        onClick={() => handleRemove(idx)}
        className="text-[#4E4B66] text-sm hover:cursor-pointer hover:text-red-800"
    >{time}</p>
}

function InputItem({ fill, forId }) {
    return (
        <div
            className="flex flex-col gap-1.5"
        >
            <label htmlFor={forId}
                className="text-[#4E4B66]"
            >{fill}</label>
            <input type="text" id={forId} name={forId}
                className={inputStyle}
            />
        </div>
    );
};

export default Create;