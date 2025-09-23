import { useState } from "react"
import { historyContext as HistoryContext } from "./historyContext";

const HistoryProvider = ({ children }) => {
  const localHistories = JSON.parse(localStorage.getItem("history"));
  const [histories, setHistories] = useState(localHistories ?
    [...localHistories] :
    []
  );

  const addHistoryContext = (input) => {
    setHistories((curr) => {
      return [...curr, input];
    });
  };

  return (
    <HistoryContext.Provider value={{
      histories, addHistoryContext
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
