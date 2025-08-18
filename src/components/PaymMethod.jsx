function PaymMethod({ method, i }) {
  return (
    <li>
      <input type="radio" id={method} name="method" className="hidden peer" />
      <label htmlFor={method} className="inline-flex items-center justify-center py-1 w-full h-12 border-2 border-[#DEDEDE] rounded-md cursor-pointer peer-checked:border-[#1D4ED8] hover:bg-gray-100">
        <img src={`/payment-method/${method}.png`} className={`w-12 ${i == 3 && "scale-50"} ${i == 6 && "scale-75"}`} alt="" />
      </label>
    </li>
    // <div key={props.i} className={`method method-${props.i} w-full h-[2rem] border-[#DEDEDE] border-1 flex items-center justify-center p-[1.5rem] rounded-[4px]`}><img
    //   src={props.src}
    //   alt="" /></div>
  );
}

export default PaymMethod
