# What are middlewares?

Middlewares are code that runs before / after your request handler.

It’s commonly used for things like

1. Analytics

1) Authentication

1. Redirecting the user

\
Code

```TSX

import express from "express";

const app = express();

let requestCount = 0;

app.use(
  function middleware(req, res, next) {
    requestCount++;
    next()
  }
);

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.get("/requestCount", (req, res) => {
  res.json({
    requestCount
  })
})

app.listen(3000);
```

Code

```TSX

import express from "express";
import jwt from "jsonwebtoken";

const app = express();

//@ts-ignore
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret");
  if (decoded) {
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
}

app.get("/", authMiddleware, (req, res) => {
  res.send("You are logged in");
})

app.listen(3000);
```

# middlewares + Next

Ref - <https://nextjs.org/docs/app/building-your-application/routing/middleware>

Middleware allows you to run code before a request is completed.&#x20;

Then, based on the incoming request, you can modify the response by&#x20;

1. rewriting

1) redirecting

1. modifying the request or response headers

1) or responding directly.

#### Use cases

- Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.

* Logging and Analytics: Capture and analyze request data for insights before processing by the page or API.

# Code

### Create a request count middleware

- Create an empty NextJS project

```TSX
 npx create-next-app
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4292f3c2-af9a-4340-a9b5-fa0228521224%2FScreenshot_2024-04-05_at_7.53.11_PM.png?table=block&id=0059cb64-62a7-4a11-8149-981750c55608&cache=v2 "notion image")

- Create middleware.ts in the root folder

  - ![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F79b8dc3a-cbd0-4a33-87d1-85b18937f2e7%2FScreenshot_2024-04-05_at_7.55.01_PM.png?table=block&id=a9003347-f348-47dd-847f-a0749e86cc1b&cache=v2 "notion image")

- Add code to track the number of requests

```TSX
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let requestCount = 0;
export function middleware(request: NextRequest) {
  requestCount++;
  console.log("number of requests is " + requestCount);
  return  NextResponse.next()
}
```

- Try visiting the website

# Code #2

Create a request count middleware to track only requests that start with `/api`

- Add a dummy API route (`api/user/route.ts`)

```TSX
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        message: "Hi there"
    })
}
```

- Update `middleware.ts`

```TSX
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let requestCount = 0;
export function middleware(request: NextRequest) {
  requestCount++;
  console.log("number of requests is " + requestCount);
  return  NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
```

# Selectively running middlewares

```TSX
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }
}

```

Ref - <https://github.com/code100x/cms/blob/main/src/middleware.ts>
