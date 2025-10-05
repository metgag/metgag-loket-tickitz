function MovieCard(props) {
  return (
    <div
      className={`
        flex flex-col gap-3 
        flex-shrink-0
        w-[10rem]             /* mobile small cards */
        md:w-[calc(25%-1rem)] /* exactly 4 per row on md+ */
        max-w-[16rem]
      `}
    >
      <div className="w-full aspect-[2/3]">
        <img
          src={
            props.poster
              ? `${import.meta.env.VITE_BASE_API_URL}/poster/${props.poster}`
              : `/ERR0R_NO_IMAGE_FOUND-500-750.jpg`
          }
          alt={props.title}
          className="w-full h-full object-cover rounded-[6px]"
        />
      </div>

      <div className="detail flex flex-col gap-2">
        <h4 className="text-[#14142B] text-lg font-semibold truncate">
          {props.title}
        </h4>
        {props.release && (
          <p className="text-[#1D4ED8] font-semibold">{props.release}</p>
        )}
        <div className="genre gap-2 flex flex-wrap">
          {props.genres instanceof Array &&
            props.genres.map((genre, i) => (
              <p
                key={i}
                className="bg-[#A0A3BD1A] text-sm rounded-[28px] py-1 px-3 text-[#A0A3BD]"
              >
                {genre.name}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

// function MovieCard(props) {
//   return (
//     <div
//       className={`
//         flex flex-col gap-3 
//         flex-shrink-0
//         w-[10rem]     /* mobile width */
//         md:w-[calc(35%-1rem)] /* exactly 4 per row on md+ */
//         max-w-[16rem]
//       `}
//     >
//       <div className="w-full aspect-[2/3]">
//         <img
//           src={
//             props.poster
//               ? `${import.meta.env.VITE_BASE_API_URL}/poster/${props.poster}`
//               : `https://upload.wikimedia.org/wikipedia/commons/8/8d/ERR0R_NO_IMAGE_FOUND.jpg`
//           }
//           alt={props.title}
//           className="w-full h-full object-cover rounded-[6px]"
//         />
//       </div>

//       <div className="detail flex flex-col gap-2">
//         <h4 className="text-[#14142B] text-lg font-semibold truncate">
//           {props.title}
//         </h4>
//         {props.release && (
//           <p className="text-[#1D4ED8] font-semibold">{props.release}</p>
//         )}
//         <div className="genre gap-2 flex flex-wrap">
//           {props.genres instanceof Array &&
//             props.genres.map((genre, i) => (
//               <p
//                 key={i}
//                 className="bg-[#A0A3BD1A] text-sm rounded-[28px] py-1 px-3 text-[#A0A3BD]"
//               >
//                 {genre.name}
//               </p>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MovieCard(props) {
//   return (
//     <div
//       className={`
//         flex flex-col gap-3 
//         flex-shrink-0
//         w-[10rem] md:w-1/4 md:max-w-[16rem]
//       `}
//     >
//       <div className="w-full aspect-[2/3]">
//         <img
//           src={
//             props.poster
//               ? `${import.meta.env.VITE_BASE_API_URL}/poster/${props.poster}`
//               : `https://upload.wikimedia.org/wikipedia/commons/8/8d/ERR0R_NO_IMAGE_FOUND.jpg`
//           }
//           alt={props.title}
//           className="w-full h-full object-cover rounded-[6px]"
//         />
//       </div>

//       <div className="detail flex flex-col gap-2">
//         <h4 className="text-[#14142B] text-lg font-semibold truncate">
//           {props.title}
//         </h4>
//         {props.release && (
//           <p className="text-[#1D4ED8] font-semibold">{props.release}</p>
//         )}
//         <div className="genre gap-2 flex flex-wrap">
//           {props.genres instanceof Array &&
//             props.genres.map((genre, i) => (
//               <p
//                 key={i}
//                 className="bg-[#A0A3BD1A] text-sm rounded-[28px] py-1 px-3 text-[#A0A3BD]"
//               >
//                 {genre.name}
//               </p>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default MovieCard;
