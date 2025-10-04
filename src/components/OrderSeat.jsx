function OrderSeat(props) {
  return (
    <input key={props.i} type="checkbox" id={`${props.row}${props.i}`} className="seat seat-1" />
  );
}

export default OrderSeat
