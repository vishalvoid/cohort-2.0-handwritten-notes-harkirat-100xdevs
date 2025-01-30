# **Creating Your Own NPM Packages**

## **Introduction to NPM Packages**

NPM (Node Package Manager) is the default package manager for Node.js and allows developers to publish, share, and manage reusable code.

### **Why Create NPM Packages?**

- **Code Reusability**: Write once and use it in multiple projects.

- **Modular Development**: Organize code into separate modules for maintainability.

- **Team Collaboration**: Different teams can work on independent modules.

- **Open Source Contribution**: Share useful tools with the developer community.

## **How to Create and Publish an NPM Package**

### **Step 1: Initialize the Project**

1.  Create a new directory for your package:

    ```bash
    mkdir my-npm-package && cd my-npm-package
    ```

2.  Initialize the project with NPM:

    ```bash
    npm init -y
    ```

    This creates a `package.json` file with default values.

### **Step 2: Write Your Code**

- Create an `index.js` file and export a function:

  ```javascript
  function greet(name) {
    return `Hello, ${name}!`;
  }
  module.exports = greet;
  ```

### **Step 3: Add a README**

- Document your package for better usability.

- Include installation instructions, usage examples, and API details.

### **Step 4: Versioning**

- Update the version number following [Semantic Versioning (SemVer)](https://semver.org/).

  ```bash
  npm version patch # For small fixes
  npm version minor # For new features
  npm version major # For breaking changes
  ```

### **Step 5: Publish to NPM**

1.  Log in to NPM:

    ```bash
    npm login
    ```

2.  Publish your package:

    ```bash
    npm publish
    ```

    Now your package is available for others to install using `npm install your-package-name`.

---

## **How to Reuse and Manage Packages**

### **Installing and Using NPM Packages**

- Install a package:

  ```bash
  npm install package-name
  ```

- Import and use it in your code:

  ```javascript
  const packageName = require("package-name");
  ```

### **Updating and Removing Packages**

- Update a package:

  ```bash
  npm update package-name
  ```

- Uninstall a package:

  ```bash
  npm uninstall package-name
  ```

---

## **What are Monorepos?**

A **monorepo** is a single repository containing multiple related projects (or packages). It simplifies dependency management and code sharing.

### **Benefits of Monorepos**

- Shared dependencies across projects.

- Simplifies collaboration and versioning.

- Easier refactoring with a single source of truth.

### **Tools for Managing Monorepos**

- **Lerna**: Efficiently manages multiple packages in a monorepo.

- **Nx**: Offers powerful build and testing capabilities.

- **Turborepo**: Optimized for speed and caching.

---

## **Zod Inference**

Zod is a TypeScript-first schema declaration and validation library.

### **What is Zod Inference?**

- Inferring TypeScript types from Zod schemas to avoid redundancy.

- Example:

  ```typescript
  import { z } from "zod";

  const UserSchema = z.object({
    name: z.string(),
    age: z.number(),
  });

  type User = z.infer<typeof UserSchema>;
  ```

  Here, `User` is inferred from `UserSchema`, ensuring type safety.

---

## **Declaration Files (`.d.ts`)**

### **What is a Declaration File?**

- A `.d.ts` file provides TypeScript type definitions for JavaScript libraries.

- Helps TypeScript understand untyped JavaScript modules.

### **Creating a Declaration File**

Example of `my-package.d.ts`:

```typescript
declare module "my-package" {
  export function greet(name: string): string;
}
```

### **Using Declaration Files**

- Useful when working with JavaScript libraries in TypeScript projects.

- Enables IntelliSense support and type checking.
