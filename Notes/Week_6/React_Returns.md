## **React Deeper Dive**

Things to Study:&#x20;

**`React returns, re-rendering, key, wrapper components, useEffect, useMemo, useCallback, useRef`**

### React Component Returns.&#x20;

**A Component can only return a single top level xml. Why?**

*   Make it easy to reconciliation. (what component needs to change when a dom update is caalled reconciliation)

**React.Fragment**

to fight with this problem we can use either `<React.Fragment> </React.Fragment>`. or `<></>`  both works absolutely fine.&#x20;

### Re-Render in React.Js

**A Re-render means that**&#x20;

*   React did some work to calculate what all should updat ein this component.

*   The component actually got called (you can put a log to confirm this)

*   The inspector shows you a bounding box around the component.

**It happens when**&#x20;

*   A state variable that is being used inside a component changes.&#x20;

*   A parent component re-render triggeres all children re-rendering.

`Anytime If parent re-renders it's child will also re-renders.`&#x20;

if you want to minimise the rumber of re-renders to make a hightly optimal react app. The more the components that are getting re-rendered, the worse.&#x20;

**To Avoid thsi we can push the state down :**&#x20;

```javascript
import { useState } from "react"

function App() {
  return (
    <div>
      <HeaderWithButton />
      <Header title="My name is raman" />
    </div>
  )
}

function HeaderWithButton() {
  const [firstTitle, setFirstTitle] = useState("my name is harkirat");

  function changeTitle() {
    setFirstTitle("My name is " + Math.random())
  }

  return <>
    <button onClick={changeTitle}>Click me to change the title</button>
    <Header title={firstTitle} />
  </>
}

function Header({title}) {
  return <div>
    {title}
  </div>
}

export default App
```

## Memo (memoization)

*   **Purpose:**

    *   Optimizes performance by preventing unnecessary re-renders.

    *   Re-renders only when props actually change.

*   **Usage:**

    *   `const MyComponent = React.memo(function MyComponent({ prop1, prop2 }) { ... });`

*   **Example 1 (Simple):**

    ```javascript
    const MyButton = React.memo(function MyButton({ label }) { 
      console.log('MyButton rendered!'); 
      return <button>{label}</button>; 
    });
    ```

    *   `MyButton` only re-renders if the `label` prop changes.

*   **Example 2 (With State):**

    ```javascript
    function Parent() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <button onClick={() => setCount(count + 1)}>Click</button>
          <MyComponent name="John" /> 
        </div>
      );
    }
    ```

    *   `MyComponent` won't re-render when `count` changes, as its props (`name`) remain the same.

*   **Key Points:**

    *   Uses shallow prop comparison by default.

    *   Consider custom `compare` function for complex props.

    *   Overuse can sometimes hinder debugging.

### Keys in react.&#x20;

Error: Each child in a list should have a unique "key" prop. You nedd to give each array item a key - string or a number that uniquely identified it among other items in that array.&#x20;

> JSX Elements directly inside a map() call always need keys!

keys tell react which array item each component corresponds to, so that it can match them up later. This becomes important if your array itemscan move eg: due to sorting, get inserted or get deleted. A well-chosed key helps React infer what exactly has happened, and make the correct updates to the DOM.

