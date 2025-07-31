function PaymMethod(props) {
  return (
    <div key={props.i} className={`method method-${props.i} w-full h-[2rem] border-[#DEDEDE] border-1 flex items-center justify-center p-[1.5rem] rounded-[4px]`}><img
      src={props.src}
      alt="" /></div>
  )
}

export default PaymMethod
