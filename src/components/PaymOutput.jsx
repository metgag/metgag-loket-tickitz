function PaymOutput(props) {
  return (
    <div key={props.i} className="flex gap-[.625rem] flex-col border-b border-[#E6E6E6]">
      <h5 className="text-[#8692A6]">{props.head}</h5>
      <p className="text-[#000000]">{props.content}</p>
    </div>
  )
}

export default PaymOutput
