# What are monorepos&#x20;

As the name suggests, a single repository (on github lets say) that holds all your frontend, backend, devops code.

Few repos that use monorepos are -&#x20;

1. <https://github.com/code100x/daily-code>

#### Do you need to know them very well as a full stack engineer

Not exactly. Most of the times they are setup in the project already by the `dev tools` guy and you just need to follow the right practises

Good to know how to set one up from scratch though

# Why Monorepos?

#### Why not Simple folders?

Why cant I just store services (backend, frontend etc) in various top level folders?

You can, and you should if your

1. Services are highly decoupled (dont share any code)

1) Services don’t depend on each other.

For eg - A codebase which has a Golang service and a JS service

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F457b1c41-8f8c-47c7-881a-814ae54898b2%2FScreenshot_2024-03-16_at_2.54.08_AM.png?table=block&id=46bc3f63-54f9-4749-87ff-42722c34de81&cache=v2 "notion image")

#### Why monorepos?

1. **Shared Code Reuse**

1) **Enhanced Collaboration**

1. **Optimized Builds and CI/CD**: Tools like TurboRepo offer smart caching and task execution strategies that can significantly reduce build and testing times.

1) **Centralized Tooling and Configuration**: Managing build tools, linters, formatters, and other configurations is simpler in a monorepo because you can have a single set of tools for the entire project.&#x20;

# Common monorepo framework in Node.js

1. Lerna - <https://lerna.js.org/>

1) nx - <https://github.com/nrwl/nx>

1. Turborepo - <https://turbo.build/> — Not exactly a monorepo framework

1) Yarn/npm workspaces - <https://classic.yarnpkg.com/lang/en/docs/workspaces/>

We’ll be going through turborepo since it’s the most relevant one today and provides more things (like build optimisations) that others don’t

# History of Turborepo

1. Created by `Jared Palmer`

1) In December 2021 Acquired/aqui-hired by `Vercel`

1. Mild speculation/came from a random source - Pretty hefty dealp

1) They’ve built a bunch of products, Turborepo is the most used one

# Build system vs Build system orchestrator vs Monorepo framework

#### **Build System**

A build system automates the process of transforming source code written by developers into binary code that can be executed by a computer. For JavaScript and TypeScript projects, this process can include transpilation (converting TS to JS), bundling (combining multiple files into fewer files), minification (reducing file size), and more. A build system might also handle running tests, linting, and deploying applications.

#### **Build System Orchestrator**

TurboRepo acts more like a build system orchestrator rather than a direct build system itself. It doesn't directly perform tasks like transpilation, bundling, minification, or running tests. Instead, TurboRepo allows you to define tasks in your monorepo that call other tools (which are the actual build systems) to perform these actions.&#x20;

These tools can include anything from tsc, vite etc

#### **Monorepo Framework**

A monorepo framework provides tools and conventions for managing projects that contain multiple packages or applications within a single repository (monorepo). This includes dependency management between packages, workspace configuration.

# Turborepo as a build system orchestrator

Turborepo is a `build system orchestrator` .&#x20;

The key feature of TurboRepo is its ability to manage and optimize the execution of these tasks across your monorepo. It does this through:

1. **Caching**: TurboRepo caches the outputs of tasks, so if you run a task and then run it again without changing any of the inputs (source files, dependencies, configuration), TurboRepo can skip the actual execution and provide the output from the cache. This can significantly speed up build times, especially in continuous integration environments.

1) **Parallelization**: It can run independent tasks in parallel, making efficient use of your machine's resources. This reduces the overall time needed to complete all tasks in your project.

1. **Dependency Graph Awareness**: TurboRepo understands the dependency graph of your monorepo. This means it knows which packages depend on each other and can ensure tasks are run in the correct order.

# Let’s initialize a simple Turborepo

Ref <https://turbo.build/repo/docs>

1. Initialize a Turborepo

```
npx create-turbo@latest
```

1. Select `npm workspaces` as the monorepo framework

💡

If it is taking a long time for you, you can close this starter from <https://github.com/100xdevs-cohort-2/week-16-1> and run `npm install` inside the root folder

By the end, you will notice a folder structure that looks like this -&#x20;

# Explore the folder structure

There are 5 modules in our project

#### End user apps (websites/core backend)

1. `apps/web` - A Next.js website

1) `apps/docs` - A Docs website that has all the documentation related to your project

#### Helper packages

1. `packages/ui` - UI packages&#x20;

1) `packages/typescript-config` - Shareable TS configuration

1. `packages/eslint-config` - Shareable ESLine configuration&#x20;

# Let’s try to run the project

In the root folder, run&#x20;

```
npm run dev
```

💡

You might have to upgrade your node.js version

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fab9d29bd-df80-48ea-9e7e-f3c4b2ca4590%2FScreenshot_2024-03-16_at_1.26.45_PM.jpg?table=block&id=720478c3-18ef-44c0-ba6c-9ea29300a52f&cache=v2 "notion image")

You will notice two websites running on&#x20;

1. localhost:3000

1) localhost:3001

This means we have a single `repo` which has multiple `projects` which share code from `packages/ui`

# Exploring root package.json

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F09802be9-a935-4449-b77e-5de61e3cca0a%2FScreenshot_2024-03-16_at_1.31.42_PM.jpg?table=block&id=eb33a25e-6122-4a21-b834-065a0c98f97f&cache=v2 "notion image")

#### scripts

This represents what command runs when you run&#x20;

1. npm run build

1) npm run dev

1. npm run lint

`turbo build` goes into all packages and apps and runs `npm run build` inside them (provided they have it)

Same for `dev` and `lint`

# Exploring packages/ui

#### 1. package.json

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdf96ee8e-8d2d-441a-82aa-fc757f8c0d1c%2FScreenshot_2024-03-16_at_1.39.59_PM.jpg?table=block&id=981b22a8-6a6d-42de-b385-bb30b3f06c8e&cache=v2 "notion image")

#### 2. src/button.tsx

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb9939eab-f74d-4648-8b09-19219dc96dd9%2FScreenshot_2024-03-16_at_1.43.13_PM.jpg?table=block&id=637f5492-356b-48b1-91e6-dcc7ca343913&cache=v2 "notion image")

#### 3. `turbo` folder

This is an interesting folder that was introduced recently. More details here - <https://turbo.build/repo/docs/core-concepts/monorepos/code-generation>

We’ll come back to this after a few slides

# Exploring `apps/web`

### 1. Dependencies

It is a simple next.js app. But it uses some `UI components` from the `packages/ui` module

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3c9232aa-82e1-4ec3-8852-9d0de0b89fe6%2FScreenshot_2024-03-16_at_1.23.06_PM.jpg?table=block&id=4325d478-2cbe-410c-8558-7e5f8a9ea881&cache=v2 "notion image")

### 2. Exploring package.json

If you explore package.json of `apps/web`, you will notice `@repo/ui` as a dependency

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fda7eab52-5b59-4d3e-92e5-c23e8bd25d0c%2FScreenshot_2024-03-16_at_3.46.44_PM.jpg?table=block&id=63480ab4-8e76-4eae-a46d-fccd481c68d1&cache=v2 "notion image")

### 3. Exploring page.tsx

This is a very big page, let’s try to see the import and usage of the `Button` component

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc525e50a-8a58-4402-818b-b10507c31285%2FScreenshot_2024-03-16_at_1.46.12_PM.jpg?table=block&id=707eaf56-407c-4eb1-96d6-2f1703f2b6d2&cache=v2 "notion image")

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F0ea269ea-e5bc-4355-92eb-0f20c321fbf7%2FScreenshot_2024-03-16_at_1.47.35_PM.jpg?table=block&id=2bb57b25-da69-41c3-b151-6c46144da12c&cache=v2 "notion image")

The same `Button` component can be used by the `apps/docs` website as well

# Let’s add a new page

Try adding a new page to `/admin` to the `apps/web` next.js website.

It should use a simple `Admin` component from `packages/ui`

Steps to follow -&#x20;

- Create a new file `admin.tsx` inside `packages/ui/src`

* Export a simple React component

Solution

```TSX
"use client";

export const Admin = () => {
  return (
    <h1>
        hi from admin component
    </h1>
  );
};

```

- Add the component to exports in `packages/ui/package.json`

* Create `apps/web/app/admin/page.tsx`

- Export a default component that uses the `@repo/ui/admin` component

* Run npm run dev (either in root or in `apps/web` ) and try to see the website

- Go to <http://localhost:3000/admin>

💡

You can also use the `packages/ui/turbo/generators` to quickly bootstrap a new component Try running `npx gen react-component` and notice it’ll do step 1, 2, 3 for you in one cli call

# Exploring turbo.json

Ref - <https://turbo.build/repo/docs/getting-started/create-new#3-understanding-turbojson>

References - <https://turbo.build/repo/docs/reference/configuration#globaldependencies>

# Adding React projects

1. Go to the apps folder

```
cd apps
```

2\. Create a fresh vite app

```
npm create vite@latest
```

1. Update package.json to include `@repo/ui` as a dependency

```
"@repo/ui": "*",
```

1. Run npm install in the root folder

```
cd ..
npm install
```

1. Run npm run dev

```
npm run dev
```

1. Try importing something from the `ui` package and rendering it

1) Add a `turbo.json` to the react folder to override the `outputs` object of this module.&#x20;

Ref <https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces>

```
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

# Caching in Turborepo

Ref - <https://turbo.build/repo/docs/getting-started/create-new#using-the-cache>

One of the big things that make turborepo fast and efficient is caching

It watches your files across builds and returns the cached response of builds if no files have changed.

Try running `npm run build` more than once and you’ll see the second times it happens extremely fast.

You can also explore the `node_modules/.cache/turbo` folder to see the zipped cache files and unzip them using

```
 tar --use-compress-program=unzstd -xvf name.tar.zst


```

# Adding a Node.js app

Everything else remains the same (Create a new project, add typescript, add express…)

The only thing that’s different is that `tsc` doesn’t perform great with turborepo

You can use either `tsup` or `esbuild` for building your backend application

1. Create `apps/backend`

1) Initialize empty ts repo

```
npm init -y
npx tsc --init
```

1. Use base tsconfig (Ref - <https://github.com/vercel/turbo/blob/main/examples/kitchen-sink/apps/api/tsconfig.json> )

```
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "lib": ["ES2015"],
    "module": "CommonJS",
    "outDir": "./dist",
  },
  "exclude": ["node_modules"],
  "include": ["."]
}
```

1. Add dependencies

```
npm i express @types/express
```

1. Add `src/index.ts`

```
import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.json({
        message: "hello world"
    });
})
```

1. Update turbo.json

```
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

1. Install esbuild

```
npm install esbuild
```

1. Add build script to package.json

```
"build": "esbuild src/index.ts --platform=node --bundle --outdir=dist"
```

# Adding a `common` module

A lot of times you need a module that can be shared by both frontend and backend apps

1. Initialize a `packages/common` module

```
cd packages
mkdir common
```

1. Initialize an empty node.js project

```
npm init -y
npx tsc --init
```

1. Change the name to `@repo/common`

1) Export a few things from `src/index.ts`

```
export const NUMBER = 1;
```

1. Add it to the `package.json` of various apps (next app/react app/node app)

```
"@repo/common": "*",
```

1. Import it in there and try to use it

1) Run npm install in root folder and see if it works as expected
