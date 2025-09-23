function Step(props) {
  return (
    <div key={props.i} className={`step-${props.i + 1} gap-[8px] flex flex-col items-center`}>
      <div className={`w-[32px] h-[32px] bg-[${props.bg}] rounded-full flex items-center justify-center text-white`}>
        {props.i + 1}
      </div>
      <p className={`how text-[${props.color}]`}>{props.how}</p>
    </div>
  )
}

export default Step
