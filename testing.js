import React, { useEffect } from "react";

const testing = () => {
  const [counter, SetCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  // const [count, setCount] = useState(0) just to use in useEffect

  // using useMemo
  let count = useMemo(() => {
    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      finalCount = finalCount + 1;
    }
    return finalCount;
  }, [inputValue]);

// 
  return <div></div>;
};

export default testing;
