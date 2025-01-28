import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyComponent />
      <MyComponent2 />
    </>
  );
}

export default App;

function MyComponent() {
  const [count, setcount] = useState(0);

  const incrementCount = () => {
    setcount(count + 1);
  };

  return (
    <div>
      {count}
      <br></br>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

class MyComponent2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <>
        <p>{this.state.count}</p>

        <button onClick={this.incrementCount}>Increment</button>
      </>
    );
  }
}
