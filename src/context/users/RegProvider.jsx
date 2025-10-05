import { useState } from "react"
import { regContext as RegContext } from "./regContext";

const RegProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    let users;

    try {
      users = JSON.parse(
        localStorage.getItem("users") || []
      );

    } catch (err) {
      users = [];
    }
    return users;
  });

  const addUser = (input) => {
    setUsers((curr) => {
      const idx = curr.findIndex((e) => {
        return e.email === input.email;
      });

      if (idx == -1) {
        return [...curr, input];
      }

      return [...curr];
    });
  };

  return (
    <RegContext.Provider
      value={{
        users, addUser
      }}
    >
      {children}
    </RegContext.Provider>
  );
  // const localUsers = JSON.parse(localStorage.getItem("users"));
  // const [users, setUsers] = useState(localUsers ?
  //   [...localUsers] :
  //   []
  // );

  // const addUsr = (input) => {
  //   setUsers((curr) => {
  //     return [...curr, input];
  //   });
  // };

  // return (
  //   <RegContext.Provider value={{
  //     users, addUsr
  //   }}>
  //     {children}
  //   </RegContext.Provider>
  // );
};

export default RegProvider;
