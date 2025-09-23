import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { orderContext as OrderContext } from '../../context/order/orderContext';
// import { addSeat } from '../../redux/slices/detailSlice';
import { convertTime } from '../../utils/convertTime';
import { format, parseISO } from 'date-fns';
import { bookTicket } from '../../redux/slices/orderSlice';

function Order() {
  // const { schedule } = useSelector((state) => state.currDetail);
  const dispatch = useDispatch();
  // const { movie } = useSelector((state) => state.currDetail);
  const [seat, setSeat] = useState([]);
  const navigate = useNavigate();
  // const { mkOrder, currOrder } = useContext(OrderContext);
  const { order } = useSelector((state => state));
  const { token } = useSelector((state) => state.auth);
  const [movieDetail, setMovieDetail] = useState({
    title: "",
    backdrop_path: "",
    genres: [],
  });
  const [cinemaAndTime, setCinemaAndTime] = useState({
    cinemaName: "",
    time: "",
    cinemaImg: "",
  });

  useEffect(() => {
    if (!order.scheduleId) return;

    const url = `${import.meta.env.VITE_BASE_API_URL}/cinemas/${order.scheduleId}/selected`;

    fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token.token}` },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((res) => {
        const {
          cinema_name: cinemaName, time, cinema_img: cinemaImg
        } = res.result;
        setCinemaAndTime({ cinemaName, time: convertTime(time), cinemaImg });
      })
      .catch((err) => console.error("Fetch cinemaAndTime error:", err));
  }, [order.scheduleId, token]);

  useEffect(() => {
    if (!order.movieId) return;

    const url = `${import.meta.env.VITE_BASE_API_URL}/movies/${order.movieId}`;

    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((res) => {
        const { backdrop_path, genres, title } = res.result;
        setMovieDetail({ title, backdrop_path, genres });
      })
      .catch((err) => console.error("Fetch movieDetail error:", err));
  }, [order.movieId]);

  const btnBlu = "btn-change h-min px-5 py-1 self-end rounded-md bg-[#1D4ED8] text-white font-medium hover:opacity-[.8] hover:cursor-pointer";
  const hBlk = "text-[#14142B] text-2xl font-semibold";
  const hLeft = "text-xl font-semibold";

  const seats = (init, end) => {
    const result = [];
    const charId = ["A", "B", "C", "D", "E", "F", "G"];

    for (let i = 0; i < charId.length; i++) {
      for (let j = init; j <= end; j++) {
        result.push(`${charId[i]}${j}`);
      }
    }
    return result;
  };

  return (
    <main className="bg-[#ECEDF2] py-20 px-6 md:px-0">
      <div className="steps flex items-center justify-center">
      </div>
      <div className="flex-container flex flex-col justify-center gap-4
          md:flex-row
        ">
        <div className="flex shadow-sm flex-col gap-6 bg-white p-6 md:p-4 py-6 rounded-lg">
          <div className="movie-detail flex border p-4 gap-4 border-[#DEDEDE] rounded-md">
            <img
              src={`${import.meta.env.VITE_BASE_API_URL}/backdrop/${movieDetail.backdrop_path}`}
              className="object-cover rounded-sm h-28 w-48" />
            <div className="detail flex flex-col justify-between">
              <h3 className={hBlk}>{movieDetail.title.length > 24 ?
                `${movieDetail.title.slice(0, 26)}...` :
                `${movieDetail.title}`
              }</h3>
              <div className="genre flex flex-wrap gap-2">
                {movieDetail.genres.map((e) => {
                  return <p
                    key={e.id}
                    className='bg-[#A0A3BD1A] text-[#A0A3BD] px-2 rounded-full'>{e.name}</p>
                })}
                {/* <p className='bg-[#A0A3BD1A] text-[#A0A3BD] px-2 rounded-full'>Adventure</p> */}
              </div>
              {cinemaAndTime.time &&
                <p>{`Regular - ${cinemaAndTime.time}`}</p>
              }
            </div>
            <button
              className={`${btnBlu} ms-auto`}
              onClick={() => navigate('/movie/list')}
            >
              Change
            </button>
          </div>
          <div className="seat flex flex-col gap-2">
            <h3 className={hLeft}>Choose Your Seat</h3>
            <p className='self-center mb-8 ps-8'>Screen</p>
            <form
              className="flex gap-x-16"
            >
              <div className='flex gap-8'>
                <div className="flex flex-col gap-y-5 text-lg font-semibold text-[#4E4B66]">
                  {["A", "B", "C", "D", "E", "F", "G"].map((e, i) => {
                    return <p
                      className='h-8 flex items-center' key={i}
                    >
                      {e}
                    </p>
                  })}
                </div>
                <div className="flex flex-col gap-6">
                  <div className='seat-a grid grid-cols-7 gap-3'>
                    {seats(1, 7).map((e, i) => {
                      return <Seat
                        key={i}
                        id={e}
                        name={e}
                        selected={seat}
                        onChange={(e) => {
                          setSeat((curr) => {
                            if (curr.includes(e.target.name)) {
                              return curr.filter((update) => {
                                return update !== e.target.name;
                              })
                            }
                            return [...curr, e.target.name];
                          })
                        }}
                      />
                    })}
                  </div>
                  <div className='grid grid-cols-7 text-center gap-x-2 text-lg font-semibold text-[#4E4B66]'>
                    {[1, 2, 3, 4, 5, 6, 7].map((e) => <p key={e}>{e}</p>)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className='seat-b grid grid-cols-7 gap-3'>
                  {seats(8, 14).map((e, i) => {
                    return <Seat
                      key={i}
                      id={e}
                      name={e}
                      selected={seat}
                      onChange={(e) => {
                        setSeat((curr) => {
                          if (curr.includes(e.target.name)) {
                            return curr.filter((update) => {
                              return update !== e.target.name;
                            })
                          }
                          return [...curr, e.target.name];
                        })
                      }}
                    />
                  })}
                </div>
                <div className='grid grid-cols-7 text-center gap-x-2 text-lg font-semibold text-[#4E4B66]'>
                  {[8, 9, 10, 11, 12, 13, 14].map((e) => <p key={e}>{e}</p>)}
                </div>
              </div>
            </form>
            <div className="seat-key flex flex-col gap-4">
              <h5 className='text-lg font-medium'>Seating key</h5>
              <div className="legend flex justify-center gap-12">
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] border border-[#D6D8E7] rounded-sm bg-[#FCFDFE]`}></div>
                  <p className='text-[#4E4B66]'>Available</p>
                </div>
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] rounded-sm bg-[#1D4ED8]`}></div>
                  <p className='text-[#4E4B66]'>Selected</p>
                </div>
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] rounded-sm bg-[#F589D7]`}></div>
                  <p className='text-[#4E4B66]'>Love nest</p>
                </div>
                <div className="key flex items-center gap-3">
                  <div className={`square size-[1.5rem] rounded-sm bg-[#6E7191]`}></div>
                  <p className='text-[#4E4B66]'>Sold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="flex flex-col h-min gap-8 min-w-sm">
          <div className="cinema bg-white flex p-6 py-6 flex-col gap-6 rounded-lg shadow-md">
            <div className="cinema-name flex flex-col items-center gap-2">
              <img src={cinemaAndTime.cinemaImg} alt=""
                className='w-42'
              />
              <h3 className={`${hBlk}`}>
                {cinemaAndTime.cinemaName}
              </h3>
            </div>
            <div className="details flex flex-col gap-3">
              <div className="title flex justify-between gap-[1.5rem]">
                <p className="text-[#6B6B6B]">Movie Selected</p>
                <p className="text-[#14142B] font-semibold">
                  {movieDetail.title.length > 22 ?
                    `${movieDetail.title.slice(0, 20)}...` :
                    `${movieDetail.title}`
                  }
                </p>
              </div>
              <div className="date flex justify-between gap-[1.5rem]">
                <p className="text-[#6B6B6B]">
                  {format(parseISO(order.date), "EEEE, dd LLLL yyyy")}
                </p>
                <p className="text-[#14142B] font-semibold">
                  {cinemaAndTime.time}
                </p>
              </div>
              <div className="price flex justify-between gap-[1.5rem]">
                <p className="text-[#6B6B6B]">One ticket price</p>
                <p className="text-[#14142B] font-semibold">
                  $10
                </p>
              </div>
              <div className="seat flex justify-between gap-[1.5rem] mb-3">
                <p className="text-[#6B6B6B]">Seat choosed</p>
                {seat.length > 0 &&
                  <p className="text-[#14142B] font-semibold">
                    {seat &&
                      seat.join(", ").length > 20 ?
                      `${seat.join(", ").slice(0, 24)}...` :
                      `${seat.join(", ")}`
                    }
                  </p>}
              </div>
            </div>
            <div
              className="total pt-5 flex justify-between items-center border-t border-[#E6E6E6]">
              <h4 className="font-medium text-lg">Total Payment</h4>
              <h3 className='text-[#1D4ED8] text-2xl font-semibold'>
                {`$${seat.length * 10}`}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              if (seat.length > 0) {
                dispatch(bookTicket({
                  seats: seat,
                  selectedCinema: cinemaAndTime,
                  selectedMovie: movieDetail,
                }));
                navigate("/movie/payment");
              }
              // dispatch(addOrderDetail({ ...orderDetail, seat }));
              // dispatch(addSeat(seat));
              // mkOrder({ ...currOrder, seat});
              // navigate("/movie/payment")
            }}
            className={`${btnBlu} w-full py-3 shadow-lg rounded-sm`}>
            Checkout now
          </button>
        </aside>
      </div>
    </main>
  );
}

function Seat({ id, name, selected, onChange }) {
  return (
    <div className='size-10'>
      <label htmlFor={id}
        className={`h-full block ${selected.includes(name) ?
          "bg-[#1D4ED8]" : "bg-[#D6D8E7]"
          } rounded-sm cursor-pointer hover:opacity-[.6]`}
      >
      </label>
      <input type="checkbox" name={name} id={id}
        onChange={onChange} className="hidden"
      />
    </div>
  );
}

function MkLegend(props) {
  return (
    <div key={props.i} className="key flex">
      <div className={`square size-[1.25rem] rounded-sm bg-[${props.bg}]`}></div>
      <p className='text-[#4E4B66]'>{props.legend}</p>
    </div>
  );
}

export default Order