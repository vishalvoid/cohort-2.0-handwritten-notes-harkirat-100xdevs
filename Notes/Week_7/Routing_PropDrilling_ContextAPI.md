## **Routing in ReactJS**

Routing in ReactJS is essential for building Single Page Applications (SPAs) where different components are rendered based on the URL, without reloading the page. Here's a detailed breakdown:

### **Jargons to Know**

*   **Single Page Application (SPA):**
    A web application that loads a single HTML page and dynamically updates the content as the user interacts with the app.

*   **Client-Side Bundle:**
    The JavaScript code that is sent to the browser, responsible for rendering the app and managing user interactions.

*   **Client-Side Routing:**
    Handling route changes in the browser without making a request to the server. This allows smooth navigation between pages.

### **React-Router-Dom**

The `react-router-dom` library is used for implementing routing in React applications. It provides components and hooks to define and navigate routes.

#### **Key Features:**

*   **Routes:** Define which components to render based on the path.

*   **Link Component:** Enables navigation without reloading the page.

*   **Hooks for Navigation:**

    *   `useNavigate()`: A hook to programmatically navigate between routes.

#### **Example:**

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => navigate('/')}>Go Back Home</button>
    </div>
  );
}

export default App;
```

### **Lazy Loading**

Lazy loading allows components to load only when they are needed, improving the performance of your application.

#### **How to Use Lazy Loading with `Suspense`:**

```javascript
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;
```

### **Default Exports**

Default exports allow you to export a single entity from a file. They are imported without curly braces.

#### **Example:**

```javascript
// In Component.js
export default function Component() {
  return <div>Default Exported Component</div>;
}

// In App.js
import Component from './Component';
```

### **Nested and Parameterized Routes**

Nested routes allow you to define child routes within a parent route. Parameterized routes let you pass dynamic data via the URL.

#### **Example:**

```javascript
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </Router>
  );
}

function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

### **Route Protection (Private Routes)**

Private routes allow access to certain parts of your app only if the user is authenticated.

#### **Example:**

```javascript
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = true; // Example authentication check
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
```

***

## **Prop Drilling**

Prop drilling refers to the process of passing data from a parent component to deeply nested child components through intermediate components.

### **Key Points:**

*   Prop drilling doesn’t mean re-rendering the entire component tree; it’s more about the complexity of passing props manually through multiple layers.

*   It becomes challenging when:

    *   The tree is deeply nested.

    *   Multiple components need access to the same prop.

#### **Example of Prop Drilling:**

```javascript
function App() {
  const user = 'John Doe';

  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <h1>Hello, {user}!</h1>;
}
```

In this example, the `user` prop is passed through the `Parent` component even though it is only needed in the `Child` component.

### **Alternatives to Prop Drilling:**

1.  **Context API:** Share state globally without passing props manually.

2.  **State Management Libraries:** Tools like Redux, Zustand, or Jotai can help manage complex state.

3.  **Component Composition:** Pass functions or components to handle specific behaviors.

***

## **Context API**

The Context API is a feature in React that allows you to share state and data across components without passing props manually through every level of the tree.

If you use the context Api, you're pushing your state management outside the code react components.&#x20;

### **Key Points:**

*   Useful for avoiding prop drilling.

*   Creates a "global" state accessible to any component.

*   Works well for themes, authentication, and localization.

### **Steps to Use Context API:**

1.  **Create a Context:**

    ```javascript
    import { createContext } from 'react';

    const UserContext = createContext();
    export default UserContext;
    ```

2.  **Provide the Context:**

    ```javascript
    import React from 'react';
    import UserContext from './UserContext';

    function App() {
      const user = 'John Doe';

      return (
        <UserContext.Provider value={user}>
          <Parent />
        </UserContext.Provider>
      );
    }

    export default App;
    ```

3.  **Consume the Context:**

    ```javascript
    import React, { useContext } from 'react';
    import UserContext from './UserContext';

    function Child() {
      const user = useContext(UserContext);
      return <h1>Hello, {user}!</h1>;
    }

    export default Child;
    ```

### **Optimizing Context Usage:**

1.  **Memoization:** Use `React.memo` or `useMemo` to prevent unnecessary re-renders of consumers.

2.  **Splitting Contexts:** Create separate contexts for unrelated data to avoid large re-renders.

3.  **Selector Libraries:** Use libraries like `react-context-selector` for fine-grained updates.

