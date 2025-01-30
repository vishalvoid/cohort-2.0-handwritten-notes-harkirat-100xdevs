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

# **Mono Repos**

## **Introduction to Mono Repos**

A monorepo is a software development strategy where multiple projects (or packages) are stored in a single repository. This approach simplifies dependency management and improves collaboration.

### **Key Tools for Managing Monorepos**

- **NPM Workspaces**: A built-in feature in NPM for managing multiple packages within a single repository.

- **Lerna**: A powerful tool to manage JavaScript/TypeScript monorepos efficiently.

- **Turborepo**: An advanced build system designed for JavaScript and TypeScript codebases.

---

## **Turborepo Quickstart**

Turborepo is an intelligent build system optimized for JavaScript and TypeScript codebases.

### **Why Use Turborepo?**

- Tasks like linting, building, and testing run faster.

- Caching significantly improves performance.

- Optimized execution of tasks in parallel.

### **Installation**

To get started with Turborepo, install it globally using NPM:

```bash
npx create-turbo@latest my-monorepo
cd my-monorepo
npm install
```

---

# **Installing Docker**

Docker provides an easy way to create, deploy, and run applications using containers.

### **Installation Guide**

`Docker GUI` is the easiest way to get started. Follow the installation instructions:
[Docker Installation Guide](https://docs.docker.com/engine/install/)

After installation, verify Docker is running by executing:

```bash
docker --version
```

---

## **Why Use Docker?**

Docker enables:

- **Containerization**: Encapsulating applications in lightweight containers.

- **Running External Code**: Executing other people's code and packages securely.

- **Running Common Software**: Easily deploying databases like MongoDB and PostgreSQL.

---

## **Where Can We Get Docker Packages?**

Similar to how GitHub hosts code, Docker registries store container images.
You can pull images from [Docker Hub](https://hub.docker.com/).

---

## **Common Docker Commands**

### **1. Running a Container**

```bash
docker run <image_name>
```

Example:

```bash
docker run mongo
```

### **2. Listing Running Containers**

```bash
docker ps
```

This will display all currently running containers.

### **3. Stopping a Container**

```bash
docker kill <container_id>
```

Stops the specified running container.

---

## **Running an Image**

### **1. Running a Simple Image**

To run MongoDB locally, use:

```bash
docker run mongo
```

By default, it won’t be accessible in MongoDB Compass.

### **2. Adding Port Mapping**

To make it accessible, map the ports:

```bash
docker run -p 27017:27017 mongo
```

### **3. Running in Detached Mode**

To run a container in the background, use `-d`:

```bash
docker run -d -p 27017:27017 mongo
```

### **4. Inspecting Running Containers**

```bash
docker ps
```

Lists all running containers.

### **5. Stopping a Running Container**

```bash
docker kill <container_id>
```

Stops the specified container.
