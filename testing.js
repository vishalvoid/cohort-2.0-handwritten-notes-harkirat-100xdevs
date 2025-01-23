import React, { memo, useCallback } from "react";

const testing = () => {
  const [count, setcount] = useState(0);

  // what useCallbacks do it it rely on the dependencied. if it changes then only
  // the component will re-render. unlike react it re-renders the react js. basied on parsed by Reference not value.
  // here it stops child component unless and unitil the dependencies changed. 
  const inputFucntion = useCallback(() => {
    console.log("hi there");
  }, []);

  return (
    <div>
      <ButtonComponent inputFunction={inputFucntion} />
      <button
        onClick={() => {
          setcount((count = 1));
        }}
      >
        {" "}
        Click me{" "}
      </button>
    </div>
  );
};

const ButtonComponent = memo(({ inputFucntion }) => {
  console.log("child Renders");

  return (
    <div>
      <button>Button Clicked</button>
    </div>
  );
});

export default testing;
