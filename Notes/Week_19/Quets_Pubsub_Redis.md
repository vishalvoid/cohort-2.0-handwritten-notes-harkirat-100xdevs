# What are we learning

💡

Pre-requisites - You need to have docker installed on your machine

1. Queues

1) Pub subs

1. Redis

More specifically, we’re learning how we would build a system like leetcode

#### Part 1 - Queues

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1a563dff-974c-4442-bcca-732b4b17a17f%2FScreenshot_2024-04-07_at_5.41.38_PM.png?table=block\&id=1deded56-46a6-4185-b309-36dd27a8c384\&cache=v2 "notion image")

#### Part 2 (Assignment) - Pub subs

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff0f87503-6a54-44f4-b5da-cad536fac51c%2FScreenshot_2024-04-07_at_5.42.49_PM.png?table=block\&id=275e7cc4-ded8-4fb6-bc5f-7daaf5b4fa21\&cache=v2 "notion image")

 

## Final Architecture

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa19ddc6b-fe53-4df3-9166-76e4da9f3f45%2FScreenshot_2024-04-07_at_5.45.42_PM.png?table=block\&id=28cb2e3e-0f9b-4741-937f-82dffb19d820\&cache=v2 "notion image")



# Redis

Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker

One of the key features of Redis is its ability to keep all data in memory, which allows for high performance and low latency access to data.&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F869853ef-8e8c-4b49-b17e-d0ef85f52eb1%2FScreenshot_2024-04-07_at_11.27.27_AM.png?table=block\&id=10d57a53-5435-4041-be3f-64cef41445da\&cache=v2 "notion image")

### In memory data structure store

Very similar to a DB, only it is in memory. That doesn’t mean it doesn’t have persistence

* **RDB (Redis Database File):** The RDB persistence performs point-in-time snapshots of your dataset at specified intervals. It creates a compact single-file representation of the entire Redis dataset. The snapshotting process can be configured to run at specified intervals, such as every X minutes if Y keys have changed.

```TSX
save 900 1       # Save the dataset every 900 seconds if at least 1 key changed
save 300 10      # Save the dataset every 300 seconds if at least 10 keys changed
save 60 10000    # Save the dataset every 60 seconds if at least 10000 keys changed
```

* **AOF (Append Only File):** The AOF persistence logs every write operation received by the server, appending each operation to a file. This file can then be replayed on startup to reconstruct the dataset.&#x20;



# Starting redis locally

Let’s start redis locally and start using it as a DB

```TSX
docker run --name my-redis -d -p 6379:6379 redis
```

Connecting to your container

```TSX
docker exec -it container_id /bin/bash
```

Connecting to the redis cli

```TSX
redis-cli
```



# Redis as a DB

### SET/GET/DEL

* Setting data

```
SET mykey "Hello" 
```

* Getting data

```
GET mykey
```

* Deleting data

```
DEL mykey
```

 

### HSET/HGET/HDEL (H = Hash)

```TSX
HSET user:100 name "John Doe" email "user@example.com" age "30"
HGET user:100 name
HGET user:100 email
```

 

💡

You should never use redis as your primary database

Very nice video -&#x20;

<https://www.youtube.com/watch?v=WQ61RL1GpEE>



# Redis as a queue

You can also push to a `topic` / `queue` on Redis and other processes can `pop` from it.

Good example of this is Leetcode submissions that need to be processed asynchronously

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fe671776f-58e2-4b1b-a9f8-32ef466c3840%2FScreenshot_2024-04-07_at_4.31.24_PM.png?table=block\&id=867c4f9f-d537-47b0-bb0c-e0f44db4524d\&cache=v2 "notion image")

 

#### Pushing to a queue

```TSX
LPUSH problems 1
LPUSH problems 2
```

 

#### Popping from a queue

```TSX
RPOP problems
RPOP problems 
```

 

#### Blocked pop

```
BRPOP problems 0
BRPOP problems 30
```

The last argument represents the timeout before the blocking should be stopped



# Talking to redis via Node.js

There are various `clients` that exist that let you talk to `redis` via Node.js

<https://www.npmjs.com/package/redis>

 

Let’s initialize a simple Node.js express server that takes a `problem submission` (very similar to leetcode) as input and sends it to the queue

Let’s also create a `worker` service that picks up a problem, waits for 2 seconds and then proceeds to pick the next one

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffe4355d5-b9ca-4671-8a72-825123f9c124%2FScreenshot_2024-04-07_at_4.39.59_PM.png?table=block\&id=97d9f40d-e54f-4a18-b749-539397806a4e\&cache=v2 "notion image")

 

### Code

* Create an empty Node.js project

- Initialize 2 folders inside it

  * express-server
  * worker

* Initialize an empty Node.js typescript project in both of them

```
npm init -y
npx tsc --init
```

* Install dependencies in `express-server`

```
npm i express @types/express redis
```

* Install dependencies in `worker`

```
npm i redis
```

* Create `index.ts` in `express-server`

```TSX
import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

app.post("/submit", async (req, res) => {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;

    try {
        await client.lPush("problems", JSON.stringify({ code, language, problemId }));
        // Store in the database
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();
```

* Create `index.ts` in worker

```TSX
import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                const submission = await client.brPop("problems", 0);
                // @ts-ignore
                await processSubmission(submission.element);
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();
```

💡

Can u figure out why I had to add a `ts-ignore` ? Why is the type of `submission` string?



# Pub subs

Publish-subscribe (pub-sub) is a messaging pattern where messages are published to a topic without the knowledge of what or if any subscribers there might be. Similarly, subscribers listen for messages on topics of interest without knowing which publishers are sending them. This decoupling of publishers and subscribers allows for highly scalable and flexible communication systems.

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7f446917-e063-4a1c-8d16-632cc6fca0a2%2FScreenshot_2024-04-07_at_5.26.51_PM.png?table=block\&id=e81e64d8-32c3-40a8-b791-450a5465629b\&cache=v2 "notion image")

 

Subscribe to a topic

```
SUBSCRIBE problems_done
```

 

Publishing to a topic

```
PUBLISH problems_done "{id: 1, ans: 'TLE'}"
```



# Pub subs in Node.js

 

Let’s update the `worker` code to `publish` the final submission from the worker to the redis pub sub

```TSX
import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`);
    client.publish("problem_done", JSON.stringify({ problemId, status: "TLE" }));
}

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                const submission = await client.brPop("problems", 0);
                // @ts-ignore
                await processSubmission(submission.element);
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();

```

 

 

Try subscribing to it from the `redis-cli`

```
SUBSCRIBE problem_done
```

