import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    let currValue;

    try {
      currValue = JSON.parse(
        localStorage.getItem(key) || String(initialValue)
      );

    } catch (err) {
      currValue = initialValue;
    }

    return currValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
