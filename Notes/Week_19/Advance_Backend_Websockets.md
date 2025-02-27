# What is backend communication?

In the real world, you have various backend systems, not just one.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff1bed71f-6c31-48f1-8d3a-81b2f40ac9e1%2FScreenshot_2024-04-06_at_4.13.28_PM.png?table=block&id=057ad905-4ad8-4039-8dc8-9c668b726eda&cache=v2 "notion image")

For example, for a website like PayTM, whenever you do a transaction, the following might happen

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F014efb27-a4f5-4451-9533-da6989fa70e8%2FScreenshot_2024-04-06_at_4.19.58_PM.png?table=block&id=4bd46405-25f8-41bc-b1ce-6e758c6997ea&cache=v2 "notion image")

For leetcode, whenever the user submits a problem, the following might happen -&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F16a6d47d-200a-44e3-aef4-25ed19046bde%2FScreenshot_2024-04-06_at_4.22.46_PM.png?table=block&id=99445547-1b3c-4848-9007-16768e85e92e&cache=v2 "notion image")

# Types of communication

#### Synchronous (Strong coupling)

1. HTTP (REST/GraphQL)

1) Websocket (debatable if sync or async)

#### Asynchronous (Weak coupling)

1. Messaging queues

1) Pub subs

1. **Server-Sent Events**&#x20;

1) Websocket (debatable if sync or async)

# Websockets

WebSockets provide a way to establish a persistent, full-duplex communication channel over a single TCP connection between the client (typically a web browser) and the server.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9542e210-145e-44b7-b58d-bc4cd859da32%2FScreenshot_2024-04-06_at_4.38.37_PM.png?table=block&id=fac06f62-9d69-4d4d-8da8-8a9b9fda43d7&cache=v2 "notion image")

#### **Use Cases for WebSockets:**

- **Real-Time Applications**: Chat applications, live sports updates, real-time gaming, and any application requiring instant updates can benefit from WebSockets.

* **Live Feeds**: Financial tickers, news feeds, and social media updates are examples where WebSockets can be used to push live data to users.

- **Interactive Services**: Collaborative editing tools, live customer support chat, and interactive webinars can use WebSockets to enhance user interactio

Good example - <https://www.binance.com/en/trade/SOL_USDT?type=spot>

#### Why not use HTTP/REST? Why do you need ws?

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F337fdfd4-982f-4476-b225-c9b705344a54%2FScreenshot_2024-04-06_at_4.43.39_PM.png?table=block&id=c1b393de-60bc-4c09-8143-ae3d34e240ad&cache=v2 "notion image")

1. Network Handshake happens for every request

1) No way to push server side events (You can use polling but not the best approach)

💡

Leetcode uses polling when you submit a problem

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F5fada07d-ef88-4927-b5f0-a3daa52fbc6b%2FScreenshot_2024-04-06_at_4.55.10_PM.png?table=block&id=f3dea888-ab96-4813-9e71-c31bd9979955&cache=v2 "notion image")

# Websockets in Node.js

There are various libraries that let you create a ws server (similar to how `express` lets you create an HTTP server)

1. <https://www.npmjs.com/package/websocket>

1) <https://github.com/websockets/ws>

1. <https://socket.io/>

We’ll be using the `ws` library today.&#x20;

💡

Problems with [socket.io](http://socket.io/) - Even though socket.io is great (it gives you constructs like `rooms` to make the API much cleaner), it’s harder to support multiple platforms in it (Android, IOS, Rust) There are implementations in most platforms but not very up to date <https://socket.io/blog/native-socket-io-and-android/> <https://github.com/1c3t3a/rust-socketio>

# Ws in Node.js (Code)

- Initialize an empty Node.js project

```
npm init -y
```

- Add tsconfig to it

```
npx tsc --init
```

- Update tsconfig

```
"rootDir": "./src",
"outDir": "./dist",
```

- Install ws

```
npm i ws @types/ws
```

#### Code using http library

```
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
```

#### Code using express

```
npm install express @types/express
```

```
import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});
```

# Client side code

`Websocket` is a browser API that you can access (very similar to fetch)

Will work in a `raw project` , `React project` and `Next project` (needs to be client side)

- Create a React project

```
npm create vite@latest
```

- Create a websocket connection to the server

```
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      hi there
    </>
  )
}

export default App
```

💡

Can you convert it to a custom hook called `useSocket` ?

# Next.js

- Create a fresh next project

* Update `page.tsx` to be a client component

- Add the code to create a socket connection

```
"use client"
import { useEffect, useState } from 'react'

export default function() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      hi there
    </>
  )
}




```

# Scaling ws servers

In the real world, you’d want more than one websocket servers (Especially as your website gets more traffic)

The way to scale websocket servers usually happens by creating a `ws fleet`

There is usually a central layer behind it that `orchestrates` messages

ws servers are kept `stateless`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb44488cf-22da-4480-ad1c-402d93799e62%2FScreenshot_2024-04-06_at_6.06.53_PM.png?table=block&id=4f0ed422-3897-4b48-8eea-925ab9118f18&cache=v2 "notion image")
