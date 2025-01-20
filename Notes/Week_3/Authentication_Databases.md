## **Databases and Authentication with Examples**

This document provides an overview of Fetch API, authentication methods, databases, and a sample project for building an authentication system with MongoDB.

**1. Fetch API Overview**

**What is the Fetch API?**

The Fetch API is a browser feature that simplifies making HTTP requests (GET, POST, etc.) from JavaScript code. It enables fetching data from APIs and dynamically displaying it on web pages.

**Example Use Case:**

Imagine you want to retrieve and display the names of 10 people on an HTML page.

*   **API to fetch:** Faker API

*   **HTML + JavaScript example:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Fetch API Example</title>
</head>
<body>
  <h1>People List</h1>
  <ul id="people"></ul>

  <script>
    fetch('https://fakerapi.it/api/v1/persons?_quantity=10')
      .then(response => response.json())
      .then(data => {
        const peopleList = document.getElementById('people');
        data.data.forEach(person => {
          const li = document.createElement('li');
          li.textContent = `${person.firstname} ${person.lastname}`;
          peopleList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  </script>
</body>
</html>
```

**2. Authentication Overview**

Authentication ensures only authorized users can access specific features or data within an application.

**Common Authentication Methods:**

1.  **Hashing:**

    *   Hashing is a one-way process that converts data (like passwords) into a fixed-length, unreadable string.

    *   Even minor changes to the input data result in a completely different hash value.

    *   This makes it suitable for securely storing passwords because the original password cannot be retrieved from the hash.

    **Code Example (using Node.js and bcrypt):**

    ```javascript
    const bcrypt = require('bcrypt');
    const password = "mypassword";

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      console.log("Hashed password:", hash);

      // Verify the password
      bcrypt.compare("mypassword", hash, (err, result) => {
        console.log("Password match:", result); // true
      });
    });
    ```

2.  **Encryption:**

    *   Encryption is a two-way process that transforms data into an unreadable format using a secret key.

    *   The encrypted data can be decrypted back to its original form using the same key.

    *   Encryption is useful for storing sensitive information like credit card numbers on the server-side.

    **Code Example (using Node.js and Crypto):**

    ```javascript
    const crypto = require('crypto');
    const secret = "mySecretKey";
    const data = "Sensitive data";

    // Encrypt the data
    const cipher = crypto.createCipher('aes-256-cbc', secret);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log("Encrypted data:", encrypted);

    // Decrypt the data
    const decipher = crypto.createDecipher('aes-256-cbc', secret);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log("Decrypted data:", decrypted);
    ```

3.  **JSON Web Tokens (JWT):**

    *   JWTs are tokens used for authorization and session management.

    *   After successful login, the server generates a JWT containing user information.

    *   The client includes this JWT in subsequent requests to verify the user's identity.

    **Code Example:**

    ```javascript
    const jwt = require('jsonwebtoken');
    const secretKey = "mySecret";

    // Create a token
    const token = jwt.sign({ username: "user1" }, secretKey, { expiresIn: "1h" });
    console.log("Generated Token:", token);

    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token:", decoded);
    ```

4.  **Local Storage:**

    *   Local storage is a browser API for storing small amounts of

