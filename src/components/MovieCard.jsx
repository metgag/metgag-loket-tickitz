function MovieCard(props) {
  return (
    <div className={`thumbnail thumbnail-${props.i}`}>
      <img src={`${import.meta.env.VITE_POSTER_URL}${props.poster}`}
        alt="" />
      <div className="detail">
        <h4>{props.title}</h4>
        {props.release && <p>{props.release}</p>}
        <div className="genre">
          {props.genres.map((genre, i) => {
            return <p key={i}>{genre}</p>
          })}
        </div>
      </div>
    </div>
  )
}

export default MovieCard