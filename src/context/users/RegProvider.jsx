import { useState } from "react"
import { regContext as RegContext } from "./regContext";

const RegProvider = ({ children }) => {
  const localUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(localUsers ?
    [...localUsers] :
    []
  );

  const addUsr = (input) => {
    setUsers((curr) => {
      return [...curr, input];
    });
  };

  return (
    <RegContext.Provider value={{
      users, addUsr
    }}>
      {children}
    </RegContext.Provider>
  );
};

export default RegProvider;
