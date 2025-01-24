## **Context, State Management, Recoil**

**Why do we need context API ?**&#x20;

*   Incorrect : To make rendering more performant.&#x20;

*   Correct : To make syntax cleaner/get rid of prop drilling.&#x20;

**Problem with Context API ?**

```javascript

                                    changing state
                   Component 1  ■■■■■■■■■■■■■■■■■■■■■■■■■  Context API
                       ∙                                   ■■       ■
                       ∙                                 ■■■        ■
                       ∙                                ■■          ■
                       ∙                              ■■            ■
    e-renders why? Component 2                    ■■■■              ■
                    ∙∙∙∙∙∙                     ■■■■                 ■
                ∙∙∙∙      ∙∙∙∙              ■■■■ changing state     ■ changing state.
           ∙∙∙∙∙              ∙∙∙∙        ■■■                       ■
        ∙∙∙                       ∙∙     ■■                         ■
    Component 3                  Component 4                        ■
        ■                                                           ■
        ■                                                           ■
        ■                                                           ■
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■



The real problem is if the state schanges in component 1, 3, and 4. technically component 2 should not re-render. but in context api it also does.
to get rid of this problem we useuse other state management tools.

```

### **State Management in React**

Recoil is a state management library designed specifically for React applications. It provides a simple and flexible way to manage state while solving common issues like **prop drilling** and **unnecessary re-renders** found in other methods like Context API. Here’s an enhanced overview, including additional concepts that may come up in interviews:

### **Why Choose Recoil Over Other Libraries?**

1\. **Efficient Re-renders**: Unlike Context API, Recoil avoids unnecessary re-renders by updating only the components subscribed to the affected state.

2\. **Fine-grained State Control**: Atoms and selectors allow granular control over shared and derived state.

3\. **React-first Design**: Built by ex-React developers, Recoil seamlessly integrates with React’s paradigms.

4\. **Concurrency Support**: Recoil is designed to handle React’s concurrent rendering mode efficiently.

5\. **Ease of Adoption**: Minimal boilerplate and intuitive API make it beginner-friendly.

**Core Concepts in Detail**

### **1. RecoilRoot**

The root component that initializes Recoil in your app. It must wrap the entire component tree where Recoil is used.

```javascript
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <YourComponent />
    </RecoilRoot>
  );
}
```

### **2. Atom**

Atoms are the building blocks of state in Recoil. They are:

• Globally accessible state containers.

• Reactively updated – any subscribed component re-renders when the atom value changes.

**Example**:

```javascript
import { atom } from "recoil";

const themeState = atom({
  key: "themeState", // Unique identifier
  default: "light", // Initial value
});
```

### **3. Selector**

Selectors compute **derived state** based on atoms or other selectors. They are pure functions and are recalculated only when their dependencies change.

**Example**:

```javascript
import { selector } from "recoil";
import { themeState } from "./atoms";

const themeDisplay = selector({
  key: "themeDisplay",
  get: ({ get }) => {
    const theme = get(themeState);
    return `Current theme: ${theme}`;
  },
});
```

### **4. Recoil Hooks**

These hooks allow interaction with atoms and selectors.

| **Hook**               | **Purpose**                                          | **Example**                               |
| :--------------------- | :--------------------------------------------------- | :---------------------------------------- |
| useRecoilState         | Read and update the atom state                       | \[state, setState]                        |
| useRecoilValue         | Read the atom/selector state (read-only)             | const value = useRecoilValue()            |
| useSetRecoilState      | Update the atom state (write-only)                   | setState(newValue)                        |
| useRecoilValueLoadable | Handle asynchronous selectors (e.g., pending states) | const loadable = useRecoilValueLoadable() |

## **Advanced Recoil Features**

### **1. Async Data queries**

Selectors can handle asynchronous operations, like API calls.

**Example**:

```javascript
export const notifications = atom({
  key: "networkAtom",
  default: selector({
    key: "networkAtomSelector",
    get: async () => {
      const res = await axios.get("https://sum-server.100xdevs.com/notifications");
      return res.data;
    },
  }),
});
```

### **2. AtomFamily**

Dynamic atom creation based on parameters. Ideal for lists or user-specific states.

Example : for each todo in the example i want to create saparate atom for multiple todos.&#x20;

**Example**:

```javascript
export const TODOS = [{
    id: 1,
    title: "Go to Gym",
    description: "Hit the gym from 7-9"
}, {
    id: 2,
    title: "Go to eat food",
    description: "Eat food from from 9-11"
},]



import { atomFamily } from "recoil";
import { TODOS } from "./todos";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: id => {
    return TODOS.find(x => x.id === id)
  },
});
```

### **3. SelectorFamily**

Dynamic selectors based on parameters.

**Example**:

```javascript
import { selectorFamily } from "recoil";

const itemDetailsSelector = selectorFamily({
  key: "itemDetailsSelector",
  get:
    (id) =>
    async ({ get }) => {
      const item = get(itemState(id));
      return { ...item, details: await fetchDetails(id) };
    },
});
```

### **4. useRecoilStateLodable & useRecoilValueLodable**

What happens when the value aren't loaded immediately. It's a way to show loader on the screen instread of empty state.&#x20;

**Example**:

```javascript
import React from "react";
import { atom, selectorFamily, useRecoilValueLoadable } from "recoil";

// Atom to store item IDs
const itemState = atom({
  key: "itemState",
  default: [1, 2, 3], // Example item IDs
});

// SelectorFamily to fetch item details based on the ID
const itemDetailsSelector = selectorFamily({
  key: "itemDetailsSelector",
  get: (id) => async () => {
    try {
      const response = await fetch(`https://api.example.com/items/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item details");
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
});

// Component to display item details
const ItemDetails = ({ id }) => {
  const itemDetailsLoadable = useRecoilValueLoadable(itemDetailsSelector(id));

  // Handle different loadable states: loading, hasValue, hasError
  switch (itemDetailsLoadable.state) {
    case "loading":
      return <div>Loading item {id}...</div>;

    case "hasValue":
      return (
        <div>
          <h3>Item {id} Details:</h3>
          <pre>{JSON.stringify(itemDetailsLoadable.contents, null, 2)}</pre>
        </div>
      );

    case "hasError":
      return <div>Error loading item {id}: {itemDetailsLoadable.contents.message}</div>;

    default:
      return null;
  }
};

// Main App Component
const App = () => {
  const itemIds = useRecoilValueLoadable(itemState);

  if (itemIds.state === "loading") return <div>Loading items...</div>;

  if (itemIds.state === "hasError")
    return <div>Error loading item list: {itemIds.contents.message}</div>;

  return (
    <div>
      <h1>Item List</h1>
      {itemIds.contents.map((id) => (
        <ItemDetails key={id} id={id} />
      ))}
    </div>
  );
};

export default App;
```

### **Interview-focused Topics in Recoil**

**1. How does Recoil handle re-renders?**

Recoil avoids unnecessary re-renders by using dependency tracking. Only components subscribed to a specific atom or selector re-render when its value changes.

**2. Concurrency in Recoil**

Recoil supports React’s concurrent mode, allowing it to handle partial updates and avoid UI freezes during heavy operations.

**3. Error Boundaries with Recoil**

Selectors can throw errors (e.g., during API calls), and these errors can be handled using React’s error boundaries.

**4. Comparison with Redux**

| **Feature** | **Recoil**           | **Redux**                     |
| :---------- | :------------------- | :---------------------------- |
| Setup       | Minimal              | Boilerplate-heavy             |
| Performance | Fine-grained control | Relies on reducers/middleware |
| Ease of Use | Simple API           | Steeper learning curve        |
| DevTools    | Limited              | Extensive tooling support     |

**5. Common Problems Solved by Recoil**

• Prop drilling.

• Unnecessary re-renders.

• Managing derived state without duplicating logic.

**Practical Example**

**Scenario**: Manage a theme switcher using Recoil.

```javascript
// atoms.js
import { atom } from "recoil";

export const themeState = atom({
  key: "themeState",
  default: "light",
});

// ThemeSwitcher.js
import { useRecoilState } from "recoil";
import { themeState } from "./atoms";

function ThemeSwitcher() {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
}
```

**Summary: Key Takeaways for Interviews**

• **Atoms**: Core building blocks for state.

• **Selectors**: Computed or derived state.

• **Recoil Hooks**: useRecoilState, useRecoilValue, etc.

• **Performance**: Fine-grained updates reduce unnecessary re-renders.

• **Advanced Features**: Atom families, selector families, and async selectors.

• **Comparison with Other Tools**: Understand how Recoil differs from Context API, Redux, and Zustand.

By mastering Recoil, you’ll be equipped to handle state management in modern React applications with ease and efficiency.

## See the Codebase Here to Understand Better : Click Here
