## **React Deep Dive**&#x20;

> Jargons that are important to learn : Jsx, class vs className, static vs dynamic websites, state, components, re-rendering.

**Why do we need React ?**

For dynamic Websites, these libraries make it easier to do DOM Manipulation.

React is just an esaier way to write normal HTML/CSS/JS, it's a new syntac, that under the hood gets converted to HTML/CSS/JS.&#x20;

    React ---------npm run build------------> HTML/CSS/JS

People realised it's harder to do DOM manipulation the conventational way. there were libraries that came into the picture that made it slightly easy, but still for a very big app it's very hard (JQuery) Eventually, VueJs/React created a new syntax to do frontends. Under the hood. the react compiler convert your code to HTML/CSS/JS.

To Create a React app. you usually need to worry about two things. Creators of frontend frameworks realised that all websites can effictively be divided into two parts.&#x20;

    State  & Components & Re-rendering

`What is State. `

An object that represents the current state of the app. it represents the dynamic things in your app. (things that change. ) for example the value of the counter.&#x20;

`What is a component.`&#x20;

How a Dom element should rneder, given a stae. it is a re-usable, dynamic, HTML snippet that change given the state.&#x20;

`What is Re-render`

A state change triggers a re-render. A re-render represents the actual dom manipulated when the state changes.&#x20;

> You usually have to define all your components once. And then all you have to do is update the state of your app, React takes care of re-rendering your app.&#x20;

### **React useState Hook and Spreading**

The `useState` hook in React allows you to manage and update state within functional components.

**Spreading in useState**

*   **What it is:**

    *   Spreading (using the `...` operator) allows you to easily update parts of a state object without having to reassign the entire object.

*   **Example:**

JavaScript

```javascript
import React, { useState } from 'react';

function MyComponent() {
  const [person, setPerson] = useState({
    name: 'John',
    age: 30,
    city: 'New York'
  });

  const handleNameChange = (newName) => {
    setPerson({ ...person, name: newName }); // Spread existing state and update name
  };

  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>City: {person.city}</p>
      <button onClick={() => handleNameChange('Jane')}>Change Name</button>
    </div>
  );
}

export default MyComponent;

```

*   **Explanation:**

    *   `setPerson({ ...person, name: newName });`

        *   Creates a new object by spreading the existing `person` state.

        *   Overwrites the `name` property with the `newName` value.

        *   This ensures that the component re-renders with the updated state while preserving the values of other properties.

**Benefits:**

*   **Immutability:** Spreading promotes immutability by creating a new state object instead of directly modifying the existing one. This can lead to better predictability and easier debugging.

*   **Conciseness:** It provides a concise and efficient way to update specific parts of the state.

*   **Readability:** The code becomes more readable as it clearly shows which properties are being updated.

**Key Points:**

*   Always use spreading when updating parts of a state object to ensure proper state management and prevent unexpected side effects.

*   Remember that `useState` returns an array with two elements: the current state value and a function to update the state.

> Anytime the parent re-renders then the child re-renders also.&#x20;

```javascript
const zod = require("zod")

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
})

const updateTogo = zod.object({
    id: zod.string()
})

module.exports = { 
createTodo: createTodo,
updateTodo: updateTodo
}
```

## Todo App : in React - Click Here
