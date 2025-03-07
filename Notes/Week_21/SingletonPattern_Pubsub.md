# What we’re learning

1. Stateful vs Stateless Backends

1) State management in a Backned app

1. Singleton Pattern

1) Pub Subs + Singleton pattern

# Stateful vs Stateless Backends

Common interview question

## Stateless servers

Usually when you write HTTP servers, they dont hold any `state`

This means, they don’t have any in memory variables that they use

They usually rely on the `database` for `state`

#### Advantages

1. Users can connect to a random server, there is no need of stickiness

1) Can autoscale up and down easily and simply decide where to route traffic based on CPU usage.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Feba0b213-7fb0-4eb8-bc88-acd1542ca0ef%2FScreenshot_2024-04-21_at_4.17.50_PM.png?table=block&id=9ad4aeed-b780-4fe9-8ae3-742e03add2b4&cache=v2 "notion image")

## Stateful servers

A lot of times, you make servers hold `state` Good examples of this are

1. Creating an `in memory cache` - <https://github.com/code100x/cms/blob/e905c71eacf9d99f68db802b24b7b3a924ae27f1/src/db/Cache.ts#L3>

1) Storing the `state` of a Game in case of a realtime game - <https://github.com/code100x/chess/blob/main/apps/ws/src/Game.ts#L41-L47>

1. Storing a list of 10 most latest chats in memory for a `chat` application

In case `1`, there is no need of `stickiness`

In case of `2` and `3`, there is need of `stickiness`

#### Stickiness

Making sure that the user who is interested in a `specific` room, gets connected to a `specific` server.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Feee8417d-18e0-4f07-ad52-59605fc5c182%2FScreenshot_2024-04-21_at_4.41.59_PM.png?table=block&id=9afa1fd2-29e8-45bd-8614-ec7a7e3268ef&cache=v2 "notion image")

Good question to ask at this point is - How to store state in a JS project?

# State in JS process

How/where can you store `state` in a Javascript process

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd0373aa2-24cb-453d-a928-f17dd1b0bd31%2FScreenshot_2024-04-21_at_4.50.02_PM.png?table=block&id=647af916-8ea2-45dd-b00e-029cf5d066a6&cache=v2 "notion image")

This state might being used by multiple files, not just one, so the following approach might not work

Lets try the following -&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8160538f-0927-4d6d-af43-f8fb76b5a298%2FScreenshot_2024-04-21_at_5.00.34_PM.png?table=block&id=6cbb6f16-62ad-4c18-9ea0-e05c371b71cb&cache=v2 "notion image")

- index.ts - pushes to games array

```
import { games } from "./store";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
    games.push({
        "whitePlayer": "harkirat",
        "blackPlayer": "jaskirat",
        moves: []
    })
}, 5000)

```

- logger.ts - uses the games array

```
import { games } from "./store";

export function startLogger() {
    setInterval(() => {
        console.log(games);
    }, 4000)
}
```

- store.ts - Exports the game array

```
interface Game {
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}

export const games: Game[] = [];
```

This will work, but a lot of times you need to attach functionality to `state` as well.&#x20;

Let’s see how can we create a class called `GameManager` and expose some functions on it that can be called by files using it

💡

There are other ways of storing state in a TS project as well, redux being a popular one. Yes, you can use redux in the backend as well

# Classes and Singleton pattern

Let’s create a class that

1. Stores games

1) Exposes functions that let you mutate the state

```
interface Game {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}

export class GameManager {
    private games: Game[] = [];

    public addGame(game: Game) {
        this.games.push(game);
    }

    public getGames() {
        return this.games;
    }

    // e5e7
    public addMove(gameId: string, move: string) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }

    public logState() {
        console.log(this.games);
    }
}
```

### Bad approach

Create saparate instance of `GameManager` in every file that needs it

GameManager.ts

```
interface Game {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}

export class GameManager {
    private games: Game[] = [];

    public addGame(game: Game) {
        this.games.push(game);
    }

    public getGames() {
        return this.games;
    }

    // e5e7
    public addMove(gameId: string, move: string) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }
}
```

logger.ts

```
import { GameManager } from "./GameManager";

const gameManager = new GameManager();

export function startLogger() {
    setInterval(() => {
        gameManager.logState();
    }, 4000)
}

```

index.ts

```
import { GameManager } from "./GameManager";
import { startLogger } from "./logger";

const gameManager = new GameManager();

startLogger();

setInterval(() => {
    gameManager.addGame({
        id: Math.random().toString(),
        "whitePlayer": "harkirat",
        "blackPlayer": "jaskirat",
        moves: []
    })
}, 5000)

```

### Slightly Better approach

Export a single instance of `gameManager` from `GameManager.ts` and use it everywhere

### Even better approach - Singleton Pattern

Completely prevent any developer from ever creating a new instance of the `GameManager` class

#### Static attributes -

In JavaScript, the keyword **`static`** is used in classes to declare static methods or static properties. Static methods and properties belong to the class itself, rather than to any specific instance of the class. Here’s a breakdown of what this means

Example of a class with static attributes

```
class Example {
    static count = 0;

    constructor() {
        Example.count++;  // Increment the static property using the class name
    }
}

let ex1 = new Example();
let ex2 = new Example();
console.log(Example.count);  // Outputs: 2

```

```
interface Game {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}

export class GameManager {
    private static instance: GameManager; // Create a static instance of the class
    private games: Game[] = [];

    private constructor() {
        // Private constructor ensures that a new instance cannot be created from outside
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    // ... other methods
}

// Usage GameManager.getInstance().addGame()
```

GameManager.ts

```
interface Game {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}

export class GameManager {
    private static instance: GameManager; // Create a static instance of the class
    private games: Game[] = [];

    private constructor() {
        // Private constructor ensures that a new instance cannot be created from outside
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public addGame(game: Game) {
        this.games.push(game);
    }

    public getGames() {
        return this.games;
    }

    public addMove(gameId: string, move: string) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }

    public logState() {
        console.log(this.games);
    }
}

```

logger.ts

```
import { GameManager } from "./GameManager";

export function startLogger() {
    setInterval(() => {
        GameManager.getInstance().logState();
    }, 4000)
}

```

index.ts

```
import { GameManager } from "./GameManager";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
    GameManager.getInstance().addGame({
        id: Math.random().toString(),
        "whitePlayer": "harkirat",
        "blackPlayer": "jaskirat",
        moves: []
    })
}, 5000)

```

Try creating a new instance of the `GameManager` class. Notice it wont let you.

# Pub Sub + Singleton

What if You want to create a system where users can subscribe to the `feed` of stocks (prices)

This application will be used by >1Mn users

How would you build it?

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F47e1b7ac-417c-4ca7-bef0-96eb5f1aa856%2FScreenshot_2024-04-21_at_5.44.59_PM.png?table=block&id=f663fec0-89cb-4463-9cd8-a6c88b063875&cache=v2 "notion image")

- Create a PubSubManager class (singleton)

* It keeps track of what all stocks are users on `this server` interested in

- It tells the pub sub whenever a `new stock` is added or a stock is removed from the list of interested stocks on that server

* It relays the events to the right sockets whenever an event is received

# Pub Sub + Singleton (Implementation)

### Starting the pub sub

- Start a pub sub (redis is a decent one)

```
docker run -d -p 6379:6379 redis
```

- Try a simple publish subscribe in two terminals

```
 docker exec -it d1da6bcf089f /bin/bash
 redis-cli
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F130175ac-513b-42e6-a868-369f7992b2ab%2FScreenshot_2024-04-21_at_5.48.19_PM.png?table=block&id=97e4c988-c327-4593-bf3c-44759efddf15&cache=v2 "notion image")

### Creating the PubSubManager

- Init a simple node.js project

```
npm init -y
npx tsc --init
npm install redis
```

Create the Pub Sub Manager

```
// Import the necessary module from the 'redis' package
import { createClient, RedisClientType } from 'redis';

export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<string, string[]>;

    // Private constructor to prevent direct construction calls with the `new` operator
    private constructor() {
        // Create a Redis client and connect to the Redis server
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    // The static method that controls the access to the singleton instance
    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }

    public userSubscribe(userId: string, stock: string) {
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        this.subscriptions.get(stock)?.push(userId);

        if (this.subscriptions.get(stock)?.length === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribed to Redis channel: ${stock}`);
        }
    }


    public userUnSubscribe(userId: string, stock: string) {
        this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || []);

        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }

    // Define the method that will be called when a message is published to the subscribed channel
    private handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }

    // Cleanup on instance destruction
    public async disconnect() {
        await this.redisClient.quit();
    }
}


```

Create a simple index.ts file to simulate users

```
import { PubSubManager } from "./PubSubManager";

setInterval(() => {
    PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000)
```

