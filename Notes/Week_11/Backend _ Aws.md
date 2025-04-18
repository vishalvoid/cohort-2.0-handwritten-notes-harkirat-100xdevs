## **What are Backend Servers**

&#x20;You might have used express to create Backend server. The way it usually is node index.js which starts a process on a certain port ( 3000 ) for example.&#x20;

**When you have to deploy it on Internet, There are few ways :**&#x20;

1.  Go to Aws, GCP, Azure, Cloudflare.

    1.  &#x20;Renat a VM (Virtual Machine) and deploy your app.

    2.  Put it in a n autoscaling group

    3.  Deploy it in a Kubernates cluster.&#x20;

2.  There are some downsides of doing that -

    1.  Taking care or how/when to scale

    2.  Base cost even if no one is visiting your website.&#x20;

    3.  Monitoring various servers to make sure no server is down.&#x20;

**What is you write a code and someone else could take care of all these problems ?**&#x20;

### What are Serverless Backends.&#x20;

"Serverless" is a backend deployment in which the cloud provider dynamically manages the allocation and provisioning of servers. The term "serverless" doesn't mean there is no server involved. Instread, it means that developers and operators do not have to worry about the servers.

**Easier Defination :**&#x20;

What if you could just write your express routes and run a command. The app would automatically.&#x20;

*   Deploy

*   Autoscale

*   Charge you on a per request basis (rather than you paying for vms)

**Problems with this approach :**&#x20;

1.  More exprensive at scale&#x20;

2.  cold start problem

### Famous Serverless Providers.&#x20;

*   AWS Lambda

*   Google Cloud Functions

*   Cloudflare Workers

### When Should you sue a Serverless architecture ?

1.  When you have to get off the ground fast and don't want to worry about deployments.

2.  When you can't anticipate the traffic and don't want to worry about autoscaling.

3.  if you have very low traffic and want to optimise for costs.&#x20;

### How does Cloudflare workers Work ?

> Cloudflare workers Don't use the Node.js runtime. They have created their own runtime. There are a lot of things that Node.js has.&#x20;

Though Cloudflare Workers behave similarly to `Javascript` in the browser or in Node.js, there ar a few differences in how you have to think about your code. Under the hood. the workers runtime uses the `V8 engine` -- the same engine used by chromium and node.js the workers runtime also implements many of stands `API` available in most modern browsers.&#x20;

The differences between JavaScript written for the browser or Node.js happen at runtime Rather than running or an individual's machine. for example : `a browser application or on centralized server. workers`, functions run on `Cloudflare's Edge Network`-- a growing global network of thousands of machines distributed across hundred of locations.&#x20;

each of these machines host an instance of the workers runtime, and each of those runtime is capable of running thousands of user-defined applications. Thi9s guide will review some of those differences.&#x20;

### Isolates vs Containers.&#x20;

**What are Isolates?**

Isolates are lightweight execution environments inside a shared V8 engine, which is the JavaScript engine used by Chrome and Node.js.

**Key Features of Isolates:**

✅ **Ultra-Fast Startup** → Starts in **under 5ms** (almost instant)

✅ **Low Overhead** → Uses only a few KB of memory

✅ **Secure Sandboxing** → Each isolate runs in a separate memory space

✅ **Multi-Tenant Architecture** → Multiple isolates share the same process

**How Isolates Work in Cloudflare Workers:**

&#x20;       • Each Worker runs as an **isolate** inside a single **V8 engine**.

&#x20;       • Unlike traditional containers, which need a full OS, isolates only need the V8 runtime.

&#x20;       • Cloudflare can run thousands of isolates on the same physical machine.

```typescript
Traditional Architecture
┌───┬───┬───┬───┐
│ ↻ │ {}│ ↻ │ {}│
├───┼───┼───┼───┤
│ {}│ ↻ │ {}│ ↻ │
├───┼───┼───┼───┤
│ ↻ │ {}│ ↻ │ {}│
├───┼───┼───┼───┤
│ {}│ ↻ │ {}│ ↻ │
└───┴───┴───┴───┘

Workers V8 Isolates
┌────────────────────────┐
│ {} {} {} {} {} {} {} {}│
│ {} {} {} {} {} {} {} {}│
│ {} {} {} {} {} {} {} {}│
│ {} {} {} {} {} {} {} {}│
│ {} {} {} {} {} {} {} {}│
│ {} {} {} {} {} {} {} {}│
│ {} {} {} {} {} {} {} ↻ │
└────────────────────────┘

Legend:
{} = User Code
↻ = Process Overhead

Explanation
	•	Traditional Architecture
	        •	Each process has significant overhead (↻), limiting the number of applications that can run on a single machine.
	        •	User code {} shares space with separate runtime instances.
	•	Workers V8 Isolates
	        •	Many more user code instances {} can run inside a single process with minimal overhead (↻).
	        •	Much more efficient than traditional architecture since isolates share a single runtime (V8 engine).

```

here instread of each code. it runs a node server. that is the traditional architecture. but what workers does with isolates. is it just runs one pronecc overheads (node server) and runs all the code on that. and made sure that no two application codes interact with each other.&#x20;

**2. What are Containers?**

Containers (e.g., Docker) are **lightweight virtualized environments** that package code along with dependencies, ensuring consistent execution across different environments.

**Key Features of Containers:**

✅ **Portable** → Can run anywhere (AWS, Google Cloud, etc.)

✅ **Encapsulated** → Each container has its own **file system, network, and dependencies**

✅ **Slow Startup Time** → Can take **hundreds of milliseconds**

✅ **Higher Overhead** → Needs **OS dependencies**, so it consumes more memory

**How Containers Work:**

• Each **application instance** runs inside its own container.

• Containers run on a shared **host OS kernel** but have isolated processes.

• Compared to isolates, containers require more system resources and take longer to start.

**3. Differences: Isolates vs. Containers**

| **Feature**       | **Isolates (Cloudflare Workers)** | **Containers (Docker, Kubernetes)** |
| :---------------- | :-------------------------------- | :---------------------------------- |
| **Startup Time**  | \~1-5ms (Near Instant)            | \~100ms to a few seconds            |
| **Memory Usage**  | Very Low (KBs)                    | Higher (MBs or GBs)                 |
| **OS Overhead**   | None (Runs inside V8)             | Requires OS dependencies            |
| **Scalability**   | Very High (Thousands per VM)      | Limited (Fewer per VM)              |
| **Security**      | Sandboxed V8 execution            | Isolated at OS level                |
| **Best Use Case** | Serverless, Edge Computing        | Microservices, Stateful Apps        |

# Initializing a worker

To create and deploy your application, you can take the following steps -

```typescript
npm create cloudflare -- my-app
```

Select `no` for `Do you want to deploy your application`

### Question - Where is the express code? HTTP Server?

Cloudflare expects you to just write the logic to handle a request. Creating an HTTP server on top is handled by cloudflare

### Question - How can I do `routing` ?

In express, routing is done as follows -

```typescript
import express from "express"
const app = express();

app.get("/route", (req, res) => {
	// handles a get request to /route
});
```

How can you do the same in the Cloudflare environment?

```typescript
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers);
		
		if (request.method === "GET") {
			return Response.json({
				message: "you sent a get request"
			});
		} else {
			return Response.json({
				message: "you did not send a get request"
			});
		}
	},
};
```

Cloudflare does not expect a routing library/http server out of the box. You can write a full application with just the constructs available above.

We will eventually see how you can use other HTTP frameworks (like express) in cloudflare workers.

# Deploying a worker

Now that you have written a basic HTTP server, let’s get to the most interesting bit — `Deploying it on the internet`

Commands to Follow :&#x20;

```typescript
npx wrangler login 

// then it will give a link you need to paste it in the logged in website. and then approve. 
// once approved. you can deploy it . 

npm run deploy 

// which internally deploys the website through cloudflare cli. that is wrangler. 
```

### Downside of this.

Either you need to purchase the domain form them. or transfet from godaddy to cloudflare. then only we can assign to out custom domains.&#x20;

### Adding Express to It

Why can’t we use express? Why does it cloudflare doesn’t start off with a simple express boiler plate?

1.  Reason 1 : Express Heavily Rely on Node.js

2.  You can split all your handlers in a file

    Create a generic `handler` that you can forward requests to from either `express` or `hono` or `native cloudflare handler`

3.  Easiest way to fix : `honojs/hono`, `lukeed/worktop`, `kwhitley/itty-router`

## **Hono is a option to work with cloudflare workers.**&#x20;

**Working with Cloudflare workers :**&#x20;

At first, I just wanted to create a web application on Cloudflare Workers. But, there was no good framework that works on Cloudflare Workers. So, I started building Hono.

I thought it would be a good opportunity to learn how to build a router using Trie trees. Then a friend showed up with ultra crazy fast router called "RegExpRouter". And I also have a friend who created the Basic authentication middleware.

Using only Web Standard APIs, we could make it work on Deno and Bun. When people asked "is there Express for Bun?", we could answer, "no, but there is Hono". (Although Express works on Bun now.)

We also have friends who make GraphQL servers, Firebase authentication, and Sentry middleware. And, we also have a Node.js adapter. An ecosystem has sprung up.

In other words, Hono is damn fast, makes a lot of things possible, and works anywhere. We might imagine that Hono could become the **Standard for Web Standards**.

### Working with cloudflare workers -

1.  Initialize a new app

```typescript
npm create hono@latest my-app
```

1.  Move to `my-app` and install the dependencies.

```typescript
cd my-app
npm i
```

 

1.  Hello World

```typescript
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

export default app
```



### Getting inputs from user in Hono

```typescript
import { Hono } from 'hono'

const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})

export default app
```

// here for post request to get the body in backend use post not get. wrong in video.&#x20;

### Middlewares :&#x20;

> <https://hono.dev/guides/middleware>

```typescript
import { Hono, Next } from 'hono'
import { Context } from 'hono/jsx';

const app = new Hono()

app.use(async (c, next) => {
  if (c.req.header("Authorization")) {
    // Do validation
    await next()
  } else {
    return c.text("You dont have acces");
  }
})

app.get('/', async (c) => {
  const body = await c.req.parseBody()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({msg: "as"})
})

export default app
```

