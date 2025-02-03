### NextJS Intro

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





