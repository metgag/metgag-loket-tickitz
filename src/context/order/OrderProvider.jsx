import { useState } from "react";
import { orderContext as OrderContext } from "./orderContext";

const OrderProvider = ({ children }) => {
  const [currOrder, setCurrOrder] = useState({});

  const mkOrder = (input) => {
    setCurrOrder(input);
  };
  const rmOrder = () => {
    setCurrOrder({});
  };

  return (
    <OrderContext.Provider value={{
      currOrder, mkOrder, rmOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
