## **Fetch vs Axios**

**Fetch**

- **Native to the browser:** Built-in JavaScript API, no external dependencies.

- **Promises-based:** Leverages the Promise API for asynchronous operations.

- **Modern approach:** Aligns with modern JavaScript standards.

- **Limited features:** Basic HTTP functionality, lacks built-in features like automatic JSON parsing, interceptors, and progress tracking.

- **Browser compatibility:** Generally good, but older browsers might require polyfills.

**Axios**

- **Third-party library:** Requires installation (npm/yarn).

- **Promise-based:** Built on top of Promises, providing a consistent API.

- **Rich feature set:**

  - Automatic JSON parsing

  - Request/response interceptors

  - Progress tracking

  - Cancellation of requests

  - Support for various request methods (GET, POST, PUT, DELETE, etc.)

  - Built-in support for different backends (Node.js, browsers)

- **Easier to use:** More concise and user-friendly API for many common use cases.

- **Active community and maintenance:** Strong community support and active development.

### **Key Differences Summarized:**

| Feature         | Fetch                                     | Axios                                               |
| --------------- | ----------------------------------------- | --------------------------------------------------- |
| Origin          | Native browser API                        | Third-party library                                 |
| Installation    | No installation required                  | Requires installation (npm/yarn)                    |
| Features        | Basic HTTP functionality                  | Rich feature set (interceptors, JSON parsing, etc.) |
| Ease of Use     | Can be more verbose for complex use cases | Often more concise and user-friendly                |
| Browser Support | Generally good, but might need polyfills  | Well-supported across browsers                      |

### **Examples:**

**Fetch**

- **Basic GET Request:**

```javascript
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Process the received data
    console.log(data);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
```

- **POST Request with JSON Body:**

```javascript
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John Doe", age: 30 }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Process the response data
    console.log(data);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
```

**Axios**

- **Basic GET Request:**

```javascript
axios
  .get("https://api.example.com/data")
  .then((response) => {
    // Process the received data
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

- **POST Request with JSON Body:**

```javascript
axios
  .post("https://api.example.com/data", {
    name: "John Doe",
    age: 30,
  })
  .then((response) => {
    // Process the response data
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

**Axios: Interceptors (Example)**

```javascript
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);
```

### **Choosing Between Fetch and Axios**

- **Choose Fetch if:**

  - You prioritize using native browser APIs.

  - Your project has minimal HTTP request requirements and does not need advanced features.

  - You prefer a smaller bundle size and want to avoid introducing dependencies.

- **Choose Axios if:**

  - You need a more feature-rich solution for making HTTP requests.

  - You value a concise and user-friendly API.

  - You require features like interceptors, automatic JSON parsing, or progress tracking.

  - You are working on a project that already utilizes the Axios library.
