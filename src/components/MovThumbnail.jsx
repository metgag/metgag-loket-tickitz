import { useState } from 'react'

function MovThumbnail(props) {
  // const [span, setSpan] = useState("row-span-1");
  // props.i % 2 == 0 && setSpan("row-span-2")

  return (
    <div key={props.i}
      className={
        `thumb thumb-${props.i + 1} bg-[url(${props.img})] bg-cover`
      }>
    </div>
  )
}

export default MovThumbnail
