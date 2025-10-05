import { useState } from "react"
import { historyContext as HistoryContext } from "./historyContext";

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    let histories;

    try {
      histories = JSON.parse(
        localStorage.getItem("history") || []
      );

    } catch (err) {
      histories = [];
    }
    return histories;
  });

  const addHistory = (input) => {
    setHistory((curr) => {
      return [...curr, input];
    });
  };

  return (
    <HistoryContext.Provider
      value={{
        history, addHistory
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
  // const localHistories = JSON.parse(localStorage.getItem("history"));
  // const [histories, setHistories] = useState(localHistories ?
  //   [...localHistories] :
  //   []
  // );

  // const addHistoryContext = (input) => {
  //   setHistories((curr) => {
  //     return [...curr, input];
  //   });
  // };

  // return (
  //   <HistoryContext.Provider value={{
  //     histories, addHistoryContext
  //   }}>
  //     {children}
  //   </HistoryContext.Provider>
  // );
};

export default HistoryProvider;
