import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue = "") => {
  const [value, setValue] = useState(() => {
    const currStorageValue = localStorage.getItem(key);
    if (currStorageValue !== null) {
      return JSON.parse(currStorageValue);
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
