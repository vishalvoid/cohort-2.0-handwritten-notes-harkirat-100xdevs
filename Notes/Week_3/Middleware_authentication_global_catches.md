## Middlewares, Authentication, Global Catches, Zod.

Here's a simplified and easy-to-understand version of the concepts from the PDF you uploaded, focusing on middlewares, authentication, global error handling, and input validation (with Zod):

1.  What are Middlewares?

Imagine you're entering a hospital for a checkup:

```javascript
* At the entrance, your insurance details are checked.
* If valid, you proceed to the blood test area.
* If the blood test is fine, your BP is checked.
* Only after all these steps, you meet the doctor.
```

In programming terms, each of these steps is like a middleware.

```javascript
* Middlewares are functions that process requests step-by-step before they reach the final handler (doctor).
```

Why Use Middlewares?

```javascript
1. To check if the user has access (like checking insurance details).
2. To ensure the inputs provided are valid (like checking BP and blood test results).
3. To reduce code repetition for common tasks.
```

Code Example: Middleware for Validation

```javascript
const validateRequest = (req, res, next) => {
const { kidneyId } = req.query;
if (!kidneyId || kidneyId < 1 || kidneyId > 2) {
return res.status(400).send("Invalid kidneyId. It should be 1 or 2.");
}
next(); // Proceed to the next step if valid
};

app.get('/check', validateRequest, (req, res) => {
res.send("Request is valid!");
});

```

1.  Global Error Handling

Sometimes, errors occur in unexpected places. A global error handler ensures all errors are caught and a consistent response is sent to the user.

Why Use Global Error Handling?

```javascript
* To simplify error management.
* To ensure users get clear error messages.
```

Code Example: Centralized Error Handling

```javascript
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send("Something went wrong!");
});

app.get('/error', (req, res) => {
throw new Error("This is a demo error.");
});

```

1.  Input Validation (Zod)

In a hospital analogy:

```javascript
* Before entering, your insurance ID must match a certain format.
* Similarly, in programming, we validate inputs to ensure they follow the expected format.
```

Zod is a library that makes input validation easy and scalable.

Why Use Zod?

```javascript
* Simplifies validation logic.
* Handles complex input validation with clear error messages.
```

Code Example: Validating Input with Zod

```javascript
const { z } = require('zod');

const schema = z.object({
username: z.string().min(3),
age: z.number().min(18).max(60),
});

const validateInput = (req, res, next) => {
try {
schema.parse(req.body); // Validates the body of the request
next();
} catch (err) {
res.status(400).send({ errors: err.errors });
}
};

app.post('/signup', validateInput, (req, res) => {
res.send("Signup data is valid!");
});

```

1.  Authentication

Imagine you're at a hospital reception:

```bash
* You must show your ID to prove you're allowed inside.
* Once verified, you get a token (like a visitor pass).
* This token is shown at every step to continue.
```

Authentication Process in Code:

    1. Login: Generate a token for the user.
    2. Protected Routes: Validate the token to allow access.

Code Example: Authentication with JWT

```javascript
const jwt = require('jsonwebtoken');
const secretKey = "your\_secret\_key";

// Login route to generate token
app.post('/login', (req, res) => {
const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
res.send({ token });
});

// Middleware to validate token
const verifyToken = (req, res, next) => {
const token = req.headers\['authorization'];
if (!token) return res.status(403).send("Token is required.");

jwt.verify(token, secretKey, (err, decoded) => { if (err) return res.status(403).send("Invalid token.");&#x20;

req.user = decoded;
next();
});
};

app.get('/protected', verifyToken, (req, res) => {
res.send(`Welcome, ${req.user.username}`);
});

```

Key Notes:

```bash
1. Middlewares: Reusable functions to handle common tasks like authentication and input validation.
2. Global Error Handling: Catch errors in one place for a better user experience.
3. Zod Validation: Validate inputs in a clean, scalable way.
4. Authentication: Secure your routes using tokens like JWT.
```

