function ChooseItem(props) {
  return (
    <div key={props.i}
      className="flex gap-2 items-center md:items-start flex-col"
    >
      <div className="rounded-full w-[32px] h-[32px] bg-[#1D4ED833] flex justify-center items-center">
        <img className="w-[1rem] h-[1rem]" src={props.img} alt="" />
      </div>
      <h5 className="text-[#18181B] font-semibold">{props.title}</h5>
      <p className="text-[#A0A3BD] text-center md:text-justify">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit
        enim nec, proin faucibus nibh et sagittis a. Lacinia
        purus ac amet.</p>
    </div>
  )
}

export default ChooseItem
