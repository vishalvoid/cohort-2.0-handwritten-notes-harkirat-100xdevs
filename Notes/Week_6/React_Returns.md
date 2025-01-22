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

const listItems = numbers.map((number) => (
  <li key={number}>
    {number}
  </li>
));

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
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
<Card>
  {/* Any React component or elements can be placed here */}
  <h1>Card Title</h1>
  <p>Card content</p>
</Card>

```

This `Card` component can now be used throughout your application, making your code more concise and easier to maintain.

**Key Benefits of Wrapper Components:**

*   **Increased Reusability:** Reduce code duplication by creating reusable components.

*   **Improved Maintainability:** Changes to the component's styling or behavior only need to be made in one place.

*   **Better Organization:** Encapsulate related logic and styling within a single component.

*   **Improved Readability:** Makes your code more modular and easier to understand.


### Hooks in React Js

Hooks in React are functions that allow you to "hook into" React state and lifecycle features from function components.&#x20;

**Some Examples (Types) of Hooks:**&#x20;

*   useEffect

*   useMemo

*   useCallback

*   useRef

*   useReducer

*   useContext

*   useLayoutEffect



