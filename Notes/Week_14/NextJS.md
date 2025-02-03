### **NextJS Introduction**

NextJS was a framework that was introduced because of some `minor inconviniences` in React

1. In a React project, you have to maintain a separate Backend project for your API routes

1) React does not provide out of the box routing (you have to use react-router-dom)&#x20;

1. React is not SEO Optimised&#x20;

   1. not exactly true today because of React Server components
   2. we’ll discuss soon why

1) Waterfalling problem

## SEO Optomisation&#x20;

Google/Bing has a bunch of `crawlers` that hit websites and figure out what the website does.&#x20;

It ranks it on `Google` based on the HTML it gets back

The crawlers `DONT` usually run your JS and render your page to see the final output.&#x20;

#### Try visiting a react website

What does the `Googlebot` get back when they visit a website written in react?

Try visiting <https://blog-six-tan-47.vercel.app/signup>

Googlebot has no idea on what the project is. It only sees `Vite + React + TS` in the original HTML response.

Ofcourse when the JS file loads eventually, things get rendered but the `Googlebot` doesn’t discover this content very well.

## Waterfalling Problem&#x20;

Let’s say you built a blogging website in react, what steps do you think the `request cycle` takes?

1. Fetching the index.html from the CDN

1) Fetching script.js from CDN

1. Checking if user is logged in (if not, redirect them to /login page)

1) Fetching the actual blogs

There are 4 round trips that happen one after the other (sequentially)

💡

The "waterfalling problem" in React, and more broadly in web development, refers to a scenario where data fetching operations are chained or dependent on each other in a way that leads to inefficient loading behavior.

# **Official Offering of NextJS**

Next.js provides you the following `upsides` over React

1. Server side rendering - Get’s rid of SEO problems

1) API routes - Single codebase with frontend and backend

1. File based routing (no need for react-router-dom)

1) Bundle size optimisations, Static site generation

1. Maintained by the Vercel team

Downsides -&#x20;

1. Can’t be distributed via a CDN, always needs a server running that does `server side rendering` and hence is expensive

1) Very opinionated, very hard to move out of it

## Let's BootStrap a Simple Next app.

```
npx create-next-app@latest
```

1. next.config.mjs - Nextjs configuration file

1) tailwind.config.js - Tailwind configuration file

1. app - Contains all your code/components/layouts/routes/apis

#### Bootstrap the project

1. Remove everything from `app/page.tsx` and return an empty div

1) Remove the css bits (not the tailwind headers) from the `global.css` file

# Step 6 - Understanding routing in Next

### Routing in React

<https://blog-six-tan-47.vercel.app/signup>

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc8f2b98f-bea9-48d8-842d-b08c53b4e247%2FScreenshot_2024-03-02_at_1.37.50_PM.png?table=block&id=29d75677-986c-4442-8e10-6d9e625d5e45&cache=v2 "notion image")

### Routing in Next.js

Next.js has a `file based router` (<https://nextjs.org/docs/app/building-your-application/routing/defining-routes>)

This means that the way you create your files, describes what renders on a route

1. Let’s add a new folder in `app` called `signup`&#x20;

1) Let’s add a file called `page.tsx` inside `app/signup`

page.tsx

```

```

1. Start the application locally

```
npm run dev
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F879c5fdc-0044-4565-9f3b-342c22a9dec6%2FScreenshot_2024-03-02_at_1.49.52_PM.png?table=block&id=51800b16-8f20-472e-9b76-a68412aaa021&cache=v2 "notion image")

#### Final folder structure

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2cb8d576-6ac2-48e5-92e5-6b6056c3fe5e%2FScreenshot_2024-03-02_at_1.51.48_PM.png?table=block&id=928c7092-5eb6-4628-b689-7bc18f355d12&cache=v2 "notion image")

#### Assignment - Can you add a `signin` route?

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F517e81a1-f286-4009-b2c0-27860fa0aa25%2FScreenshot_2024-03-02_at_1.54.58_PM.png?table=block&id=44aa8294-6c62-4639-9fe1-cfe8d9fe4d01&cache=v2 "notion image")

# Step 7 - Prettify the signin page

&#x20;Let’s replace the signup page with a prettier one

```
export default function Signin() {
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign in
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput label="Username" placeholder="harkirat@gmail.com" />
                        <LabelledInput label="Password" type={"password"} placeholder="123456" />
                        <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
                    </div>
                </div>
            </a>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
```

# Step 8 - Server side rendering

Let’s try exploring the response from the server on the `/signup` route

1. Run `npm run dev`

1) Visit `http://localhost:3000/signup`

1. Notice the response you get back in your HTML file&#x20;

\
Now if `GoogleBot` tries to scrape your page, it’ll understand that this is a `signup page` without running any Javascript.

The first `index.html` file it get’s back will have context about the page since it was `server side rendered`

# Step 9 - Layouts

You’ll notice a file in your `app` folder called `layout.tsx`

Let’s see what this does (Ref <https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts>)&#x20;

#### What are layouts

Layouts let you `wrap` all child `pages` inside some logic.

# Step 10 - Layouts in sub routes

What if you wan’t all routes that start with `/signin` to have a `banner` that says `Login now to get 20% off`

# Step 11 - Merging routes

What if you wan’t to get the banner in both `signup` and `signin`?

### Approach #1

Move both the `signin` and `signup` folder inside a `auth` folder where we have the layout

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3e7282fb-5bd0-4fc2-8704-13c0ca86d0f3%2FScreenshot_2024-03-02_at_4.06.41_PM.png?table=block&id=9fc88ce3-c520-43a3-b431-f30f816dd7be&cache=v2 "notion image")

You can access the routes at&#x20;

`http://localhost:3000/auth/signup` and `http://localhost:3000/auth/signin`

---

### Approach #2

You can use create a new folder with `()` around the name.&#x20;

This folder is `ignored` by the router.

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3e7624ce-20e0-459d-bea7-ee3b0f5b23f3%2FScreenshot_2024-03-02_at_4.09.56_PM.png?table=block&id=21e84824-4181-465d-9b02-40d08d210663&cache=v2 "notion image")

You can access the routes at&#x20;

`http://localhost:3000/signup` and `http://localhost:3000/signin`

# Step 12 - `components` directory

You should put all your `components` in a `components` directory and use them in the `app routes` rather than shoving everything in the route handler

1. Create a new folder called `components` in the root of the project

1) Add a new component there called `Signin.tsx`

1. Move the signin logic there

1) Render the `Signin` component in `app/(auth)signin/page.tsx`

Solution

`components/Signin.tsx`

```
export function Signin() {
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign in
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput label="Username" placeholder="harkirat@gmail.com" />
                        <LabelledInput label="Password" type={"password"} placeholder="123456" />
                        <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
                    </div>
                </div>
            </a>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
```

`app/(auth)/Signin.tsx`

```
import { Signin as SigninComponent } from "@/components/Signin";

export default function Signin() {
    return <SigninComponent />
}
```

# Step 13 - Add a button onclick handler

Now try adding a `onclick` handler to the `button` on the signin page

```
<button onClick={() => {
    console.log("User clicked on signin")
}} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>

```

You will notice an error when you open the page

# Step 14 - Client and server components

Ref - <https://nextjs.org/learn/react-foundations/server-and-client-components>

NextJS expects you to identify all your components as either `client` or `server`

As the name suggests

1. Server components are rendered on the server

1) Client components are `pre-rendered` and are pushed to the client to be rendered again

By default, all components are `server` components.

If you wan’t to mark a component as a `client` component, you need to add the following to the top of the component -&#x20;

```
"use client"
```

**When should you create** **`client components`** **?**

1. Whenever you get an error that tells you that you need to create a client component

1) Whenever you’re using something that the server doesn’t understand (useEffect, useState, onClick…)

**Rule of thumb is to defer the client as much as possible**

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fcfd5f7c3-15ef-410c-95c0-381a0bb2a17e%2FScreenshot_2024-03-02_at_4.29.13_PM.png?table=block&id=3b38e275-9cc3-4fa7-9be7-c3ce2a9da066&cache=v2 "notion image")

### Assignment

Try updating `components/Signin.tsx` to make it a client component

You will notice that the error goes away

Some nice readings -&#x20;

<https://github.com/vercel/next.js/discussions/43153>
