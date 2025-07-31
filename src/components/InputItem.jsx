function InputItem(props) {
  return (
    <div key={props.i} className="flex flex-col gap-[.625rem]">
      <label className="text-[#696F79]" htmlFor={props.id}>{props.label}</label>
      <input className="w-full p-[.75rem] border-[#DEDEDE] border-1 rounded-[2px] text-[#4E4B66]" value={props.value} type={props.type}
        id={props.id} />
    </div>
  )
}

export default InputItem
