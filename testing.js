import React, { useRef } from "react";

const testing = () => {
  const [incomeTax, setincomeTax] = useState(20000);
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      console.log(divRef.current);
      divRef.current.innerHTML = 10;
    }, [5000]);
  }, [third]);

  return (
    <div>
      hi there, your income tax returns are <divv ref={divRef}>{incomeTax}</divv>
    </div>
  );
};

export default testing;
