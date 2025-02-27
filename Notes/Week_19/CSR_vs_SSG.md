# Client Side rendering

Client-side rendering (CSR) is a modern technique used in web development where the rendering of a webpage is performed in the browser using JavaScript. Instead of the server sending a fully rendered HTML page to the client

Good example of CSR - React&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff7813ee0-6e5a-415a-a8a4-e9b9b8aceca1%2FScreenshot_2024-04-05_at_9.14.58_PM.png?table=block&id=a5fda757-8cae-4a51-9733-a6de02e4c1cd&cache=v2 "notion image")

Let’s see a react project in action

- Initialise a react project

```
npm create vite@latest
```

- Add dependencies

```
npm i
```

- Start the project

```
npm run build
```

- Serve the project

```
cd dist/
serve
```

Open the network tab and notice how the inital HTML file deosn’t have any content

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4611fa82-f337-4a35-901c-8a2eb1ab7cee%2FScreenshot_2024-04-05_at_9.22.57_PM.png?table=block&id=71bb352f-ddaf-47dd-8f08-8f9a68ff5a31&cache=v2 "notion image")

This means that the JS runs and actually `populates` / `renders` the contents on the page

React (or CSR) makes your life as a developer easy. You write components, JS renders them to the DOM.

#### Downsides?

1. Not SEO optimised

1) User sees a `flash` before the page renders

1. Waterfalling problem

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F14e94b35-2af0-4d4d-a498-651cdc4b0ae1%2FScreenshot_2024-04-05_at_9.26.44_PM.png?table=block&id=8ba94d9a-2843-4aa1-875d-56aca7e746b4&cache=v2 "notion image")

# Server side rendering

When the `rendering` process (converting JS components to HTML) happens on the server, it’s called SSR.&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F43cdeaa8-c2e9-4421-815c-838160cb637f%2FScreenshot_2024-04-05_at_9.38.40_PM.png?table=block&id=116ccc50-2b20-4080-b9af-efb9596993a0&cache=v2 "notion image")

#### Why SSR?

1. SEO Optimisations

1) Gets rid of the waterfalling problem

1. No white flash before you see content

Try creating a NextJS app and notice the HTML file you receive is populated

- Create next app `npx create-next-app`

* Build the project

```
npm run build
```

- Start the NEXT Server

```
npm run start
```

Notice the initial HTML page is populated&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fcb57fca4-8640-46c5-8f4c-ab1d023b3043%2FScreenshot_2024-04-05_at_9.41.59_PM.png?table=block&id=cf121f4a-8c4e-4789-916a-fab0b45c694e&cache=v2 "notion image")

#### Downsides of SSR?

1. Expensive since every request needs to `render` on the server

1) Harder to scale, you can’t cache to CDNs

# Static site generation

Ref <https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating>

If a page uses **Static Generation**, the page HTML is generated at **build time**. That means in production, the page HTML is generated when you run `next build`. This HTML will then be reused on each request. It can be cached by a CDN.

### Why?

If you use static site generation, you can defer the `expensive` operation of rendering a page to the `build time` so it only happens once.&#x20;

#### How?

Let’s say you have an endpoint that gives you all the `global` todos of an app.

By `global todos` we mean that they are the same for all users, and hence this page can be statically generated.

<https://sum-server.100xdevs.com/todos>

- Create a fresh next project

* Create `todos/page.tsx`

```TSX
export default async function Blog() {
    const res = await fetch('https://sum-server.100xdevs.com/todos')

    const data = await res.json();
    const todos = data.todos;

    console.log("todos", );
    return <div>
        {todos.map((todo: any) => <div key={todo.id}>
            {todo.title}
            {todo.description}
        </div>)}
    </div>

}
```

- Try updating the `fetch` requests&#x20;

#### Clear cache every 10 seconds

```TSX
const res = await fetch('https://sum-server.100xdevs.com/todos', {
    next: { revalidate: 10 }
});
```

#### Clear cache in a next action

```TSX
import { revalidateTag } from 'next/cache'

const res = await fetch('https://sum-server.100xdevs.com/todos', { next: { tags: ['todos'] } })
```

```TSX
'use server'

import { revalidateTag } from 'next/cache'

export default async function revalidate() {
  revalidateTag('todos')
}
```
