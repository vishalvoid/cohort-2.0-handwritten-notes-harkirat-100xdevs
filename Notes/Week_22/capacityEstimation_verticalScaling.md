

# Vertical scaling

Vertical scaling means increasing the size of your machine to support more load

#### Single threaded languages &#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fae98c9ad-e9b4-42ea-ad01-fbb78c82a0d6%2FScreenshot_2024-04-27_at_8.35.23_AM.png?table=block\&id=a7e4b92e-dcf1-440e-93ed-1d1f32cd4aac\&cache=v2 "notion image")

 

#### Multi threaded languages

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8e8edb94-37d5-4fe7-9047-7f950e0776c7%2FScreenshot_2024-04-27_at_8.36.13_AM.png?table=block\&id=b3a3c9ef-6873-4a6c-80cb-724a22f4ac14\&cache=v2 "notion image")

 

### Node.js

Let’s run an infinite loop in a JS project and see how our CPU is used

```
let c = 0;
while (1) {
  c++;
}
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F218b43db-7892-48fc-8231-c546cb0f8779%2FScreenshot_2024-04-27_at_8.39.00_AM.png?table=block\&id=020ff668-4a0f-4397-bf45-e404efedcc6b\&cache=v2 "notion image")

 

This confirms that only a single core of the machine is being used. We got 3 different processes using 100% CPU each.

## Rust

```
use std::thread;

fn main() {
    // Spawn three threads
    for _ in 0..3 {
        thread::spawn(|| {
            let mut counter: f64 = 0.00;
            loop {
                counter += 0.001;
            }
        });
    }

    loop {
        // Main thread does nothing but keep the program alive
    }
}
```

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F32f18ebe-cc63-4323-bbcd-12ec351583a9%2FScreenshot_2024-04-27_at_8.59.42_AM.png?table=block\&id=e264e07b-404d-4ea1-9a6b-5bb351623a77\&cache=v2 "notion image")



# Implementing horizontal scaling in Node.js project

You can start multiple node projects then? If there are 8 cores, then just start 8 projects?

```
node index.js
node index.js
node index.js
node index.js
node index.js
node index.js
node index.js
node index.js
```

This, ofcourse has a lot of problems

1. Just ugly to do this, keep track of the processes that are up and down

1) Processes will have port conflicts, you’ll have to run each process on a saparate port

 

This is where the `cluster module` comes into the picture

```
import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;

const port = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }

    res.send(`Final count is ${count} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

```

Notice different pids in different devices

Browser

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd89c4d68-ccd0-4d13-9b49-fe0bfc355541%2FScreenshot_2024-04-27_at_9.27.51_AM.png?table=block\&id=8fcc50be-8e7f-467e-b565-63a48d9f63e6\&cache=v2 "notion image")

Postman

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F18d1a288-7b10-4d31-a141-589970f61f03%2FScreenshot_2024-04-27_at_9.27.54_AM.png?table=block\&id=58a5e4e7-cd6b-4e2e-b138-f171db693a4a\&cache=v2 "notion image")

 

Curl

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F233adae1-92b1-4593-ab17-33d3372a3b6f%2FScreenshot_2024-04-27_at_9.28.01_AM.png?table=block\&id=2cb33d8a-5370-493e-b248-eb8e3acbca90\&cache=v2 "notion image")

 

💡

Try to figure out why there is `stickiness` in the browser. Why the request from the same browser goes to the same pid



# Capacity estimation

This is a common system design interview where they’ll ask you&#x20;

1. how would you scale your server

1) how do you handle spikes

1. How can you support a certain SLA given some traffic

 

Answer usually requires a bunch of&#x20;

1. paper math

1) Estimating requests/s

1. Assuming / monitoring how many requests a single machine can handle

1) Autoscaling machines based on the `load` that is estimated from time to time

#### Example #1 - PayTM app

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdff20844-e04e-48c3-a735-28c4cb505441%2FScreenshot_2024-04-27_at_9.38.51_AM.png?table=block\&id=673dc0b8-87b2-4b3f-a4ba-3ccfe0f005ec\&cache=v2 "notion image")

#### Example #2 - Chess app

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F611e5d41-e3af-48a0-aab9-f3abd0546c0a%2FScreenshot_2024-04-27_at_9.43.36_AM.png?table=block\&id=49d2fd64-67a7-4f43-8c65-d64886944115\&cache=v2 "notion image")



# Horizontal scaling

Horizontal scaling represents increasing the number of instances you have based on a metric to be able to support more load.

AWS has the concept of `Auto scaling groups`, which as the name suggests lets you autoscale the number of machines based on certain metrics.

 

### Buzz words

Images (AMI) - Snapshots of a machine from which you can create more machines Load balancer - An entrypoint that your users send requests to that forwards it to one of many machines (or more specifically, to a target group). Its a `fully managed` service which means you don’t have to worry about scaling it ever. AWS takes care of making it highly available.

Target groups - A group of EC2 instances that a load balancer can send requests to

Launch template - A template that can be used to start new machines

 

💡

Please make sure you get rid of all your resources after this.

 

There are two ways you can use ASGs

* Create a EC2 instance.

  * > 1. install Node.js on it <https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04>
    >
    > 1) Clone the repo - <https://github.com/100xdevs-cohort-2/week-22>

- Create an AMI with your machine

* Create security group

- Launch template

  * Ref for User data - <https://stackoverflow.com/questions/15904095/how-to-check-whether-my-user-data-passing-to-ec2-instance-is-working>
  * > ```
    > #!/bin/bash 
    > export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.0.0/bin/
    > echo "hi there before"
    > echo "hi there after"
    > npm install -g pm2
    > cd /home/ubuntu/week-22
    > pm2 start index.js
    > pm2 save
    > pm2 startup
    > ```
  * ![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F371fb427-6d1d-4de2-911d-b3b26b76a2fc%2FScreenshot_2024-04-28_at_2.56.43_PM.png?table=block\&id=3a988b2a-bb8f-422b-9528-125d560bcd33\&cache=v2 "notion image")

* ASG

  * Callout on availability zones - ASGs try to balance instances in each zone

    * ![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fac0ac67a-e59b-4276-b2e9-7737d579372d%2FScreenshot_2024-04-28_at_2.58.46_PM.png?table=block\&id=947df69e-c484-4a3e-897d-2ade03c043a9\&cache=v2 "notion image")

- Load balancer

  * Add an HTTPS Listener from your domain, request a certificate from ACM

* Target group - Attach the target group to the ASG

 

### Autoscaling part

You can create an `dynamic scaling` policy

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F05934146-4089-402c-b8e7-9a609ae9b85f%2FScreenshot_2024-04-28_at_3.18.57_PM.png?table=block\&id=8badc8c9-2915-4bf1-a819-373604aee18c\&cache=v2 "notion image")

 

Try playing with the Min and max on the ASG

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1b3975f3-49ca-4289-914f-508cfdedbefc%2FScreenshot_2024-04-28_at_3.19.44_PM.png?table=block\&id=e49eb5ba-8508-4c0b-beeb-b1f59f05cf4d\&cache=v2 "notion image")

### Try killing servers

Try to stop a few servers in the ASG. Notice they spin back up to arrive at the desired amount.

### Simulate a scale up

Try running an infinite for loop on the instance to see if a scale up happens

```
let c = 0;

while (1) {
	c++;
}
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fe046a54d-646d-465f-ae65-527e6634db04%2FScreenshot_2024-04-28_at_3.21.01_PM.png?table=block\&id=b1a32d19-56a9-459c-8fe0-f68bb6da88a6\&cache=v2 "notion image")

 

You’ll notice the desired capacity goes up by one in some time

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1fc77ed4-4a87-40e4-8202-797ad57ca601%2FScreenshot_2024-04-28_at_3.27.58_PM.png?table=block\&id=d00dc721-04d5-4a75-870c-2d96fd46d484\&cache=v2 "notion image")

Try turning the infinite loop off and notice a scale down happens

 

## Scaling via a Node.js app

Create a new user with permissions to `AutoscalingFullAccess`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2d03a8da-3834-4793-9c77-35dbac3ea977%2FScreenshot_2024-04-28_at_5.50.52_PM.png?table=block\&id=e08c3c22-1ce9-49c8-8ba5-aa95de6ee445\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fe008a297-24d1-4cad-9586-06da2c6ce578%2FScreenshot_2024-04-28_at_5.58.12_PM.png?table=block\&id=6c7c2452-99b9-4806-b83f-fd30f2b41975\&cache=v2 "notion image")

```
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_ACCESS_SECRET'
});

// Create an Auto Scaling client
const autoscaling = new AWS.AutoScaling();

// Function to update the desired capacity of an Auto Scaling group
const updateDesiredCapacity = (autoScalingGroupName: string, desiredCapacity: number) => {
  const params = {
    AutoScalingGroupName: autoScalingGroupName,
    DesiredCapacity: desiredCapacity
  };

  autoscaling.setDesiredCapacity(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};

// Example usage
const groupName = 'node-app-1'; // Set your Auto Scaling group name
const newDesiredCapacity = 3; // Set the new desired capacity

// Call the function
updateDesiredCapacity(groupName, newDesiredCapacity);

```

## Cleanup

Please delete all things one by one

1. ASG

1) Target group

1. Load balancer

1) Launch template

1. Image

1) Instance that the image was created from

 

💡

Try using elastic beanstalk. Gives you the same benefits w/o the developer having to create all of these&#x20;



# Indexing in Postgres

We’ve created postgres tables many times now. Let’s see how/if indexing helps us speed up queries

 

* Create a postgres DB locally (dont use neon, we have a lot of data to store, will be very slow)

```
docker run  -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

* Connect to it and create some dummy data in it

```
docker exec -it container_id /bin/bash
psql -U postgres
```

* Create the schema for a simple medium like app

```
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

* Insert some dummy data in

```
DO $$
DECLARE
    returned_user_id INT;
BEGIN
    -- Insert 5 users
    FOR i IN 1..5 LOOP
        INSERT INTO users (email, password, name) VALUES
        ('user'||i||'@example.com', 'pass'||i, 'User '||i)
        RETURNING user_id INTO returned_user_id;

        FOR j IN 1..500000 LOOP
            INSERT INTO posts (user_id, title, description)
            VALUES (returned_user_id, 'Title '||j, 'Description for post '||j);
        END LOOP;
    END LOOP;
END $$;
```

* Try running a query to get all the posts of a user and log the time it took

```
 EXPLAIN ANALYSE SELECT * FROM posts WHERE user_id=1 LIMIT 5;
```

Focus on the `execution time`

* Add an index to user\_id

```
CREATE INDEX idx_user_id ON posts (user_id);
```

Notice the `execution time` now.  What do you think happened that caused the query time to go down by so much?

 

### How indexing works (briefly)

When you create an index on a field, a new data structure (usually B-tree) is created that stores the mapping from the `index column` to the `location` of the record in the original table.&#x20;

Search on the index is usually `log(n)`&#x20;

#### Without indexes

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F059144a3-cb58-4658-8b51-019f2411950b%2FScreenshot_2024-04-27_at_7.04.41_PM.png?table=block\&id=843dcaf3-5995-4980-ace1-e3ae58b0b03e\&cache=v2 "notion image")

#### With indexes

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3df35f4c-ed1e-4ed2-a704-99c43a3a999a%2FScreenshot_2024-04-27_at_7.10.00_PM.png?table=block\&id=b1492b6a-2798-4667-9f92-96225c31ba1c\&cache=v2 "notion image")

The data pointer (in case of postgres) is the `page` and `offset` at which this record can be found.&#x20;

Think of the index as the `appendix` of a book and the `location` as the `page + offset` of where this data can be found



# Complex indexes

You can have index on more than one column for more complex queries

For example,&#x20;

Give me all the posts of a user with given `id` with `title` “Class 1”.

The index needs to have two keys now

```
CREATE INDEX idx_posts_user_id_title ON posts (description, title);
```

* Try searching before the index is added and after it is added

```
 SELECT * FROM posts WHERE title='title' AND description='my title';
```



# Indexes in Prisma

Ref - <https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes>

You can add an index to a `model` in prisma by doing the following -&#x20;

```
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id          String   @id @default(uuid())
  title       String
  content     String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
 
```

Let’s look at daily code and see where all can we introduce an index

<https://github.com/code100x/daily-code/blob/main/packages/db/prisma/schema.prisma#L129>



# **Normalization**

Normalization is the process of removing redundancy in your database.&#x20;

### Redundancy

Redundant data means data that already exists elsewhere and we’re duplicating it in two places

For example, if you have two tables

1. users

1) user\_metadata

where you do the following -&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9fdded74-4e0e-4866-8459-e730c87bc521%2FScreenshot_2024-05-02_at_1.14.02_PM.png?table=block\&id=107d0556-d19e-4c66-9256-dbd421dc0b09\&cache=v2 "notion image")

If you notice, we’ve stored the name on the order in the Orders table, when it is already present in the Users table. This is what is `redundant` data.&#x20;

Notice this schema is still `full proof`. We can get all the orders given a user id. We can tell the users details (username, name) given an order id.&#x20;

### Non full proof data

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff389e2e8-cf2d-4843-80ca-19875a846868%2FScreenshot_2024-05-02_at_1.17.08_PM.png?table=block\&id=e98a5baa-40a7-44ba-b961-b7b2eab5a600\&cache=v2 "notion image")

This data doesn’t have any relationship b/w Orders and users. This is just plain wrong. You can never tell the orders for a user (esp if 2 users can have the same name)

Normalisation is done on tables that are full proof to remove redundancy.&#x20;



# Types of relationships

Use case - Library management system

1. Users table

1) Library card table

1. Books table

1) Genre table

### One to One

Each user has a single `Library card`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdaaa9d62-e071-4429-8ba4-e5a7a9fd500c%2FScreenshot_2024-05-02_at_1.37.56_PM.png?table=block\&id=d7b7bef5-e5f2-426c-b1ec-e1aab61c2015\&cache=v2 "notion image")

### One to many

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F0852ad48-2f0a-4246-ac74-159b4c89cc36%2FScreenshot_2024-05-03_at_11.49.46_AM.png?table=block\&id=996adea5-984d-4665-8f72-a785e38910d4\&cache=v2 "notion image")

 

### Many to one

Opposite of the thing above

### Many to Many

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7f419cf4-f225-47b1-8082-0a6ba929a8ce%2FScreenshot_2024-05-03_at_11.56.00_AM.png?table=block\&id=d09f77cb-5d30-46d8-9a07-e16d2d9f90be\&cache=v2 "notion image")

### Final graph

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdd916952-b32c-4346-972e-6cba39e310af%2FScreenshot_2024-05-03_at_12.01.17_PM.png?table=block\&id=0b6e7529-fcf5-4e81-810c-3fd7ce32e5f6\&cache=v2 "notion image")



# Normalizing data

Normalization in databases is a systematic approach of decomposing tables to eliminate data redundancy and improve data integrity.&#x20;

The process typically progresses through several normal forms, each building on the last.

When you look at a schema, you can identify if it lies in one of the following categories of normalization

1. 1NF

1) 2NF

1. 3NF

1) BCNF

1. 4NF

1) 5NF

 

You aim to reach 3NF/BCNF usually. The lower you go, the more normalised your table is. But over normalization can lead to excessive joins

### 1NF

* **A single cell must not hold more than one value (atomicity)**: This rule ensures that each column of a database table holds only atomic (indivisible) values, and multi-valued attributes are split into separate columns. For example, if a column is meant to store phone numbers, and a person has multiple phone numbers, each number should be in a separate row, not as a list or set in a single cell.

  * ![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F93afac44-d131-4622-a7b7-11704ac94c8e%2FScreenshot_2024-05-03_at_12.26.37_PM.png?table=block\&id=403e39a2-1496-4192-8931-d6316ae21ed8\&cache=v2 "notion image")
  * ![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb2fec16c-b8f7-4717-9513-677f09c0f6cc%2FScreenshot_2024-05-03_at_12.26.41_PM.png?table=block\&id=1a850971-420b-4ae0-afc9-f2ef58f7465b\&cache=v2 "notion image")

- **There must be a primary key for identification**: Each table should have a primary key, which is a column (or a set of columns) that uniquely identifies each row in a table

* **No duplicated rows**: To ensure that the data in the table is organised properly and to uphold the integrity of the data, each row in the table should be unique. This rule works hand-in-hand with the presence of a primary key to prevent duplicate entries which can lead to data anomalies.

- **Each column must have only one value for each row in the table**: This rule emphasizes that every column must hold only one value per row, and that value should be of the same kind for that column across all rows.&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F72b3d81b-6a03-4f01-8bcb-480de001abc6%2FScreenshot_2024-05-03_at_12.25.23_PM.png?table=block\&id=f9108d9a-fb29-426d-83da-74206c873c35\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa18e7a09-e396-480d-829e-221649ae61a6%2FScreenshot_2024-05-03_at_12.25.26_PM.png?table=block\&id=a44b52af-9efc-4f63-a551-3b3db7f09a34\&cache=v2 "notion image")

### 2NF

Ref -<https://www.studytonight.com/dbms/second-normal-form.php>

1NF gets rid of repeating rows. 2NF gets rid of redundancy

A table is said to be in 2NF if it meets the following criteria:

* is already in 1NF

- Has 0 partial dependency.

💡

Partial dependency - This occurs when a non-primary key attribute is dependent on part of a composite primary key, rather than on the whole primary key. In simpler terms, if your table has a primary key made up of multiple columns, a partial dependency exists if an attribute in the table is dependent only on a subset of those columns that form the primary key. **Example**: Consider a table with the composite primary key (**`StudentID`**, **`CourseID`**) and other attributes like **`InstructorName`** and **`CourseName`**. If **`CourseName`** is dependent only on **`CourseID`** and not on the complete composite key (**`StudentID`**, **`CourseID`**), then **`CourseName`** has a partial dependency on the primary key. This violates 2NF.

 

#### Before normalization

Enrollments table

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd56a2464-4a92-432d-aa79-c998f1f58c34%2FScreenshot_2024-05-03_at_1.07.47_PM.png?table=block\&id=96cced59-7dd4-4ec7-8c2f-5ec0c54ba8ca\&cache=v2 "notion image")

Can you spot the redundancy over here? The instructor name and course name are repeated in rows, even though the name of an instructor should be the same for a given courseID

Primary key of this table is (student\_id, course\_id)

CourseName and InstructorName have a `partial dependency` on `CourserID`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd9028a09-53f6-452e-a17c-37b061e6ce61%2FScreenshot_2024-05-03_at_1.11.14_PM.png?table=block\&id=9d11093f-3ca3-45de-98ad-9440e1afdaa1\&cache=v2 "notion image")

#### After normalisation

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F15fd6c51-8574-4911-9f95-facebfc3e2e8%2FScreenshot_2024-05-03_at_1.08.17_PM.png?table=block\&id=86ec6fa2-d9fa-44e2-b25b-5fadbfd53ed6\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff1df691d-2fab-489c-b138-844e23289a48%2FScreenshot_2024-05-03_at_1.08.32_PM.png?table=block\&id=4a255882-c9c9-448f-8713-be03f1772e18\&cache=v2 "notion image")

### 3NF

When a table is in 2NF, it eliminates repeating groups and redundancy, but it does not eliminate transitive partial dependency.

So, for a table to be in 3NF, it must:

* be in 2NF

- have no transitive partial dependency.

💡

A **transitive dependency** in a relational database occurs when one non-key attribute indirectly depends on the primary key through another non-key attribute.

For example

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F21b7cf62-dd2d-4674-8884-0e7599fcf627%2FScreenshot_2024-05-03_at_1.29.10_PM.png?table=block\&id=36140903-15a9-4ff5-ae9e-0d5209147ed0\&cache=v2 "notion image")

`Department name` has a `transitive dependency` on the primary key (employee id).

 

To normalise to 3NF, we need to do the following

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8443bd6b-4baf-4213-831d-656cb23b243a%2FScreenshot_2024-05-03_at_1.31.18_PM.png?table=block\&id=2e03a23f-21ac-4ceb-bef4-0b40f2feef93\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7cfb41e8-bdaf-4083-85a4-7f0ab9017250%2FScreenshot_2024-05-03_at_1.31.21_PM.png?table=block\&id=4623f5c4-febc-42b9-b015-14ecb919c5e5\&cache=v2 "notion image")





