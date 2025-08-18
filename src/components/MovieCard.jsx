function MovieCard(props) {
  return (
    <div className={`thumbnail thumbnail-${props.i} flex flex-col gap-3 w-[100%]`}>
      <img
        src={`${props.poster ?
          `https://image.tmdb.org/t/p/w500${props.poster}` :
          `https://upload.wikimedia.org/wikipedia/commons/8/8d/ERR0R_NO_IMAGE_FOUND.jpg`
          }`}
        // src={`${import.meta.env.VITE_POSTER_URL}${props.poster}`}
        alt="" className="rounded-[6px] aspect-3/5" />
      <div className="detail flex flex-col gap-2">
        <h4 className="text-[#14142B] text-xl font-semibold">{props.title}</h4>
        {props.release && <p className="text-[#1D4ED8] font-semibold">{props.release}</p>}
        <div className="genre gap-2 flex flex-wrap">
          {props.genre instanceof Array &&
            props.genre.map((genre, i) => {
              return <p key={i} className="bg-[#A0A3BD1A] text-sm rounded-[28px] p-1 px-3 text-[#A0A3BD]">{genre}</p>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MovieCard