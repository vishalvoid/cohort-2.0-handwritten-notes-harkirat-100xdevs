## **React Deeper Dive**

Things to Study:&#x20;

**`React returns, re-rendering, key, wrapper components, useEffect, useMemo, useCallback, useRef`**

### React Component Returns.&#x20;

**A Component can only return a single top level xml. Why?**

*   Make it easy to reconciliation. (what component needs to change when a dom update is caalled reconciliation)

**React.Fragment**

to fight with this problem we can use either `<React.Fragment> </React.Fragment>`. or `<></>` both works absolutely fine.&#x20;

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
import { useState } from "react";

function App() {
  return (
    <div>
      <HeaderWithButton />
      <Header title="My name is raman" />
    </div>
  );
}

function HeaderWithButton() {
  const [firstTitle, setFirstTitle] = useState("my name is harkirat");

  function changeTitle() {
    setFirstTitle("My name is " + Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click me to change the title</button>
      <Header title={firstTitle} />
    </>
  );
}

function Header({ title }) {
  return <div>{title}</div>;
}

export default App;
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
      console.log("MyButton rendered!");
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

*   Example 3 (final)

    ```javascript
    import React, { memo } from "react";

    const testing = () => {
      const [count, setcount] = useState(0);

      return (
        <div>
          <ButtonComponent />
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

    const ButtonComponent = memo(() => {
      console.log("child Renders");

      return (
        <div>
          <button>Button Clicked</button>
        </div>
      );
    });

    export default testing;

    // here if we do not use memeo if the parent renders 
    //the child component that is button definaltely re-renders. after using memo only parent component renders and not child 

    ```

*   **Key Points:**

    *   Uses shallow prop comparison by default.

    *   Consider custom `compare` function for complex props.

    *   Overuse can sometimes hinder debugging.

### Keys in React.&#x20;

When rendering lists of elements in React, each child element **must** have a unique `key` prop.

**Purpose of Keys:**

*   **Identify Elements:** Keys help React efficiently track changes within the list.

*   **Performance:**

    *   When items are added, removed, or reordered, React uses keys to determine the minimum number of changes required to update the DOM.

    *   This significantly improves performance, especially with large lists.

**Example:**

```javascript
const numbers = [1, 2, 3];

const listItems = numbers.map((number) => <li key={number}>{number}</li>);
```

**Important Notes:**

*   Keys should be unique within the same list.

*   Ideal keys are stable and predictable, such as IDs from your data source.

*   Avoid using `index` as a key if items can be reordered or filtered.

## Wrapper Components

To improve code reusability and maintainability, create wrapper components for commonly used UI elements.

**Example:**

```javascript
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  {/* Any React component or elements can be placed here */}
  <h1>Card Title</h1>
  <p>Card content</p>
</Card>;
```

This `Card` component can now be used throughout your application, making your code more concise and easier to maintain.

**Key Benefits of Wrapper Components:**

*   **Increased Reusability:** Reduce code duplication by creating reusable components.

*   **Improved Maintainability:** Changes to the component's styling or behavior only need to be made in one place.

*   **Better Organization:** Encapsulate related logic and styling within a single component.

*   **Improved Readability:** Makes your code more modular and easier to understand.

### **Hooks in React**

Hooks are functions that let you "hook into" React state and lifecycle features from within functional components. They were introduced in React 16.8 to make functional components more flexible and easier to write.

**Key Hooks and Explanations:**

1.  **`useState`:**

    *   **Purpose:** Allows you to add state to a functional component.

    *   **Usage:** JavaScript

        ```javascript
        import React, { useState } from "react";

        function Counter() {
          const [count, setCount] = useState(0);

          return (
            <div>
              <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
          );
        }
        ```

    *   \*\*Explanation:\*\*1

        *   `useState(0)` initializes the state with an initial value of 0.

        *   `useState` returns an array with two elements:

            *   `count`: The current value of the state.

            *   `setCount`: A function to update the state.

        *   When you call `setCount`, React re-renders the component with the updated state.

2.  **`useEffect`:**

    *   **Purpose:** Handles side effects in functional components (e.g., fetching data, setting up subscriptions, DOM manipulations).

    *   **Usage:** JavaScript

        ```javascript
        useEffect(() => {
          // Code that runs after the component renders (or when dependencies change)
          const fetchData = async () => {
            const response = await fetch('/api/data');
            const data = await response.json();
            setData(data);
          };

          fetchData();

          // Cleanup function (optional)
          return () => {
            // Clean up any subscriptions or resources
          };
        }, [dependency1, dependency2, ...]);

        ```

    *   **Explanation:**

        *   The `dependency array`:

            *   If empty (`[]`), the effect runs only once after the initial render (similar to `componentDidMount`).

            *   If included, the effect runs again whenever a dependency changes.

        *   The optional return function is called during the unmount phase (similar to `componentWillUnmount`) to clean up any side effects.

3.  **`useContext`:**

    *   **Purpose:** Enables access to a shared context value within a component tree.

    *   **Usage:** JavaScript

        ```javascript
        const MyContext = createContext();

        function ComponentA() {
          return (
            <MyContext.Provider value={{ name: "Alice" }}>
              <ComponentB />
            </MyContext.Provider>
          );
        }

        function ComponentB() {
          const { name } = useContext(MyContext);
          return <div>Hello, {name}!</div>;
        }
        ```

    *   **Explanation:**

        *   `createContext` creates a context object.

        *   `Provider` makes the context value available to its children.

        *   `useContext` hooks into the context and retrieves the value.

4.  **`useReducer`:**

    *   **Purpose:** An alternative to `useState` for managing complex state logic.

    *   **Usage:** JavaScript

        ```javascript
        function reducer(state, action) {
          switch (action.type) {
            case "increment":
              return { count: state.count + 1 };
            case "decrement":
              return { count: state.count - 1 };
            default:
              throw new Error();
          }
        }

        function Counter() {
          const [state, dispatch] = useReducer(reducer, { count: 0 });

          return (
            <div>
              <p>Count: {state.count}</p>
              <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
              <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
            </div>
          );
        }
        ```

    *   \*\*Explanation:\*\*2

        *   `useReducer` takes a reducer function and an initial state as arguments.

        *   It returns an array with two elements:

            *   The current state.

            *   A `dispatch` function to update the state by sending actions to the reducer.

5.  **`useMemo`:**

    *   **Purpose:** Memoizes the result of an expensive function.

    *   **Usage:** JavaScript

        ```javascript
        const memoizedValue = useMemo(() => {
          // Expensive calculation here
        }, [dependency1, dependency2, ...]);

        Just like useEffect. but won't run on first render. where useEffect uses a extra state variable. useMemo Doesn't.

        Example : 

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

        //    useEffect(() => {
        //     let finalCount = 0;
        //     for (let i = 1; i <= inputValue; i++) {
        //       finalCount = finalCount + 1;
        //     }
        //     SetCounter(finalCount);
        //   }, [inputValue]);
        ```

        **Explanation:**

        *   `useMemo` remembers the result of the function call.

        *   If the dependencies haven't changed, it returns the cached result instead of recalculating it.

        *   This can improve performance by avoiding unnecessary re-renders.

        *   easy: it means remembering some output given an input and not computing it again.&#x20;

6.  **`useCallback`:**

    *   **Purpose:** Memoizes a function.

    *   **Defination** : useCallback is a hook in React, a popular Javascript library for building user interfaces. it is used to memoize functions, which can help in optimizing the performance of your application, especially in cases involving child components that rely on ***reference equally*** to prevent unnecessary renders.  &#x20;

    *   **Usage:** JavaScript

        ```javascript
        const memoizedCallback = useCallback(() => {
          // Function logic here
        }, [dependency1, dependency2, ...]);
        ```

    *   **Example One**&#x20;

        ```javascript
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
        ```

    *

    *   **Explanation:**

        *   `useCallback` returns a memoized version of the given function.

        *   If the dependencies haven't changed, it returns the same function reference.

        *   This can prevent unnecessary re-renders of child components that depend on the function.

7.  **`useRef`:**

    *   **Purpose:** Creates a mutable ref object that persists across renders.

    *   **Usage:** JavaScript

        ```javascript
        const inputRef = useRef(null);

        useEffect(() => {
          inputRef.current.focus();
        }, []);
        ```

    *   **Explanation:**

        *   `useRef` returns a ref object with a `current` property.

        *   The `current` property can be used to access DOM elements or store values that don't cause re-renders.

8.  **`useLayoutEffect`:**

    *   **Purpose:** Similar to `useEffect`, but runs after all DOM mutations have been applied.

    *   **Usage:** JavaScript

        ```javascript
        useLayoutEffect(() => {
          // Code that runs after all DOM mutations
        }, [dependency1, dependency2, ...]);

        ```

    *   **Explanation:**

        *   `useLayoutEffect` is useful for making DOM measurements or adjustments after the layout has been calculated.

        *   Should be used sparingly, as it can cause performance issues.

9.  **Custom Hooks:**

    *   **Purpose:** A custom React hook designed to execute logic similar to useEffect, but runs **after all DOM mutations** have been applied. This is useful for making DOM measurements or adjustments after the layout has been calculated.

    *   **Usage:** JavaScript

        ```javascript
        import { useLayoutEffect } from "react";

        /**
         * Custom hook to execute a callback after all DOM mutations.
         * @param {Function} callback - The function to execute.
         * @param {Array} dependencies - Array of dependencies for re-execution.
         */
        function useAfterDOMMutation(callback, dependencies) {
          useLayoutEffect(() => {
            if (typeof callback === "function") {
              callback();
            }
          }, dependencies);
        }

        export default useAfterDOMMutation;
        ```

    *   Example&#x20;

        ```javascript
        import React, { useState, useRef } from "react";
        import useAfterDOMMutation from "./useAfterDOMMutation";

        function ExampleComponent() {
          const [text, setText] = useState("Hello, world!");
          const divRef = useRef();

          useAfterDOMMutation(() => {
            if (divRef.current) {
              const rect = divRef.current.getBoundingClientRect();
              console.log("Bounding box of div:", rect);
            }
          }, [text]);

          return (
            <div>
              <div ref={divRef}>{text}</div>
              <button onClick={() => setText("Hello, React!")}>Change Text</button>
            </div>
          );
        }

        export default ExampleComponent;
        ```

    *   **Explanation:**

        *   **Custom Hook:**

            &#x20;   • The useAfterDOMMutation hook is built on top of useLayoutEffect.

            &#x20;   • It takes a callback function and an array of dependencies.

            &#x20;   • The callback runs **synchronously** after DOM updates, ensuring all layout changes are calculated.

        *   **When to Use:**

            &#x20;   • When you need precise DOM measurements, such as determining the size or position of elements after rendering.

            &#x20;   • When making DOM adjustments, like modifying styles based on layout.

        *   **Caution:**

            &#x20;   • **Performance**: useLayoutEffect blocks the browser’s painting process, which may lead to slower rendering.

            &#x20;   • \*\*Prefer \*\*useEffect: Use useEffect unless layout measurements or adjustments are absolutely required.

**Key Benefits of Hooks:**

*   **Increased Readability:** Makes functional components more concise and easier to understand.

*   **Improved Code Reusability:** Allows you to extract and reuse stateful logic across components.

*   **Better Code Organization:** Encourages breaking down components into smaller, more focused units.

### Side Effects.&#x20;

In react, the concept of side effects enxompasses any operations that react outside the functional scope of a React component. These operations can affect other components, interact with the browser, or perform asychronous data fetching. &#x20;

anything not a part of contemperary react rendering cycle eg: setTimeout, fetch, setInterval, document.getElementById("").innerHTML = "".
