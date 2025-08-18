function MovThumbnail(props) {
  return (
    <div key={props.i}
      className={
        `thumb thumb-${props.i + 1} ${props.size}  bg-[url(${props.img})] bg-cover`
      }>
    </div>
  )
}

export default MovThumbnail
