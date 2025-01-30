# **Step 1 - Types of Databases**

💡 What all we’ll learn today -Simple - SQL vs NoSQL, how to create Postgres Databases, How to do CRUD on themAdvance - Relationships, Joins, Transactions

#### There are a few types of databases, all service different types of use-cases

#### **NoSQL databases**

1.  Store data in a `schema-less` fashion. Extremely lean and fast way to store data.

<!---->

1.  Examples - MongoDB,

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc1750169-9a32-4b92-a424-13feba37211d%2Fs6_data_no_sidebar.png?table=block&id=fd5d37a7-88ae-40d3-8cdf-f97ca850d60b&cache=v2 "notion image")

#### **Graph databases**

1.  Data is stored in the form of a graph. Specially useful in cases where `relationships` need to be stored (social networks

<!---->

1.  Examples - Neo4j

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdeec5e2d-bb2c-4b5e-b8d8-ed26342cfec3%2FNeo4j-01.png?table=block&id=6a664c87-1fbd-49a2-88d6-af084e6f52b1&cache=v2 "notion image")

#### **Vector databases**

1.  Stores data in the form of vectors

<!---->

1.  Useful in Machine learning

<!---->

1.  Examples - Pinecone

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F76957494-3415-46c1-a395-c633d0001872%2F64ff91994b8f87cabbd254cc_vector_database.webp?table=block&id=9baba7b4-64e7-48e1-874f-d225b9192112&cache=v2 "notion image")

#### **SQL databases**

1.  Stores data in the form of rows

<!---->

1.  Most full stack applications will use this

<!---->

1.  Examples - MySQL, Postgres

![notion image](<https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F48b213de-b3d3-4d6d-8cf4-f09afce3fb40%2Fdownload_(2).png?table=block&id=8fa33082-8b13-49ef-b7a7-e25e15937972&cache=v2> "notion image")

# **Step 2 - Why not NoSQL**

You might’ve used `MongoDB`

It’s `schemaless` properties make it ideal to for bootstraping a project fast.

But as your app grows, this property makes it very easy for data to get `curropted`

### **What is schemaless?**

Different rows can have different `schema` (keys/types)

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3f3641a6-337a-45bb-a9d0-2cf110b459be%2FScreenshot_2024-02-02_at_6.50.17_PM.png?table=block&id=c9ee2bbd-97d3-4dd1-aec0-fd7ffa75d8e9&cache=v2 "notion image")

#### **Problems?**

1.  Can lead to inconsistent database

<!---->

1.  Can cause runtime errors

<!---->

1.  Is too flexible for an app that needs strictness

#### **Upsides?**

1.  Can move very fast

<!---->

1.  Can change schema very easily

💡 You might think that `mongoose` does add strictness to the codebase because we used to define a schema there. That strictness is present at the Node.js level, not at the DB level. You can still put in erroneous data in the database that doesn’t follow that schema.

# **Step 3 - Why SQL?**

SQL databases have a strict schema. They require you to

1.  Define your schema

<!---->

1.  Put in data that follows that schema

<!---->

1.  Update the schema as your app changes and perform `migrations`

So there are 4 parts when using an SQL database (not connecting it to Node.js, just running it and putting data in it)

1.  Running the database.

<!---->

1.  Using a library that let’s you connect and put data in it.

<!---->

1.  Creating a table and defining it’s `schema`.

<!---->

1.  Run queries on the database to interact with the data (Insert/Update/Delete)

# **Step 4 - Creating a database**

You can start a Potgres database in a few ways -

Using neondb![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb7ee7eea-328e-4b37-8481-0afb51676e7b%2FScreenshot_2024-02-02_at_9.45.53_PM.png?table=block&id=f089c2e4-7756-4532-a7df-ca4a482138ac&cache=v2 "notion image")Connection String

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F879101b6-dd5e-4a36-86ba-36513d0c3274%2FScreenshot_2024-02-03_at_2.42.21_AM.png?table=block&id=f9978396-dba5-456e-9899-2c185b85c85d&cache=v2 "notion image")

where does harkirat live ⇒ \[1, 2, 2, 2, 3001, 100]

Harkirat lives in INdia ⇒ \[1, 2, 2, 2, 2,2 ]

Harkirat is from chandigarh ⇒ \[1, 2, 2, 2, 3]

Harkirat has been living in india, chandigarh ⇒ \[1, 2, 2, 2, 2, 3]

The world is round ⇒ \[1, 2, 10001, 1001, 001001]

Pacman is such a good game ⇒ \[100, 10001, 20020, 1-001, 100]

# **Step 5 - Using a library that let’s you connect and put data in it.**

### 1. psql

`psql` is a terminal-based front-end to PostgreSQL. It provides an interactive command-line interface to the PostgreSQL (or TimescaleDB) database. With psql, you can type in queries interactively, issue them to PostgreSQL, and see the query results.

#### How to connect to your database?

psql Comes bundled with postgresql. You don’t need it for this tutorial. We will directly be communicating with the database from Node.js

```bash
psql -h p-broken-frost-69135494.us-east-2.aws.neon.tech -d database1 -U 100xdevs
```

### 2. pg

`pg` is a `Node.js` library that you can use in your backend app to store data in the Postgres DB (similar to `mongoose`). We will be installing this eventually in our app.

# Step 6 - Creating a table and defining it’s `schema`.

### Tables in SQL

A single database can have multiple tables inside. Think of them as collections in a MongoDB database.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6fe44578-8e4f-4303-8034-f4621e533ad3%2FScreenshot_2024-02-03_at_1.37.51_PM.png?table=block&id=b9928b02-d188-42d4-832b-2b20c9a6f7fb&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1ce3660e-f87a-4d1d-b03e-b9c6728e868b%2FScreenshot_2024-02-03_at_12.14.18_AM.png?table=block&id=3e3adbb5-7d32-4d21-a52c-0a915b60fb42&cache=v2 "notion image")

Until now, we have a database that we can interact with. The next step in case of postgres is to define the `schema` of your tables.

SQL stands for `Structured query language`. It is a language in which you can describe what/how you want to put data in the database.

To create a table, the command to run is -

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

There are a few parts of this SQL statement, let’s decode them one by one

#### 1. CREATE TABLE users

**`CREATE TABLE users`**: This command initiates the creation of a new table in the database named **`users`**.

#### 2. id SERIAL PRIMARY KEY

- **`id`**: The name of the first column in the **`users`** table, typically used as a unique identifier for each row (user). Similar to `_id` in mongodb

<!---->

- **`SERIAL`**: A PostgreSQL-specific data type for creating an auto-incrementing integer. Every time a new row is inserted, this value automatically increments, ensuring each user has a unique **`id`**.

<!---->

- **`PRIMARY KEY`**: This constraint specifies that the **`id`** column is the primary key for the table, meaning it uniquely identifies each row. Values in this column must be unique and not null.

#### 3. email VARCHAR(255) UNIQUE NOT NULL,

- `email`: The name of the second column, intended to store the user's username.

<!---->

- **`VARCHAR(50)`**: A variable character string data type that can store up to 50 characters. It's used here to limit the length of the username.

<!---->

- **`UNIQUE`**: This constraint ensures that all values in the **`username`** column are unique across the table. No two users can have the same username.

<!---->

- **`NOT NULL`**: This constraint prevents null values from being inserted into the **`username`** column. Every row must have a username value.

#### 4. password VARCHAR(255) NOT NUL

Same as above, can be non uniqye

#### 5. created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

- **`created_at`**: The name of the fifth column, intended to store the timestamp when the user was created.

<!---->

- **`TIMESTAMP WITH TIME ZONE`**: This data type stores both a timestamp and a time zone, allowing for the precise tracking of when an event occurred, regardless of the user's or server's time zone.

<!---->

- **`DEFAULT CURRENT_TIMESTAMP`**: This default value automatically sets the **`created_at`** column to the date and time at which the row is inserted into the table, using the current timestamp of the database server.

💡 If you have access to a database right now, try running this command to create a simple table in there CREATE TABLE users ( id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ); Then try running \dt; to see if the table has been created or not

# Step 7 - Interacting with the database

There are 4 things you’d like to do with a database

#### 1. INSERT

```bash
INSERT INTO users (username, email, password)
VALUES ('username_here', 'user@example.com', 'user_password');
```

💡 Notice how you didn’t have to specify the `id` because it auto increments

#### 2. UPDATE

```bash
UPDATE users
SET password = 'new_password'
WHERE email = 'user@example.com';
```

#### 3. DELETE

```bash
DELETE FROM users
WHERE id = 1;
```

#### 4. Select

```bash
SELECT * FROM users
WHERE id = 1;
```

💡 Try running all 4 of these in your terminal if you have `psql` installed locally. If not, that’s fine we’ll eventually be doing these through the `pg` library

# **Step 8 - How to do queries from a Node.js app?**

In the end, postgres exposes a protocol that someone needs to talk to be able to send these commands (update, delete) to the database.

`psql` is one such library that takes commands from your terminal and sends it over to the database.

To do the same in a Node.js , you can use one of many `Postgres clients`

### **pg library**

<https://www.npmjs.com/package/pg>

Non-blocking PostgreSQL client for Node.js.

Documentation - <https://node-postgres.com/>

Connecting -

```typescript
import { Client } from "pg";

const client = new Client({
  host: "my.database-server.com",
  port: 5334,
  database: "database-name",
  user: "database-user",
  password: "secretpassword!!",
});

client.connect();
```

Querying -

```typescript
const result = await client.query("SELECT * FROM USERS;");
console.log(result);

// write a function to create a users table in your database.
import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

createUsersTable();
```

# **Step 9 - Creating a simple Node.js app**

1.  Initialise an empty typescript project

```bash
npm init -y
npx tsc --init
```

1.  Change the `rootDir` and `outDir` in `tsconfig.json`

```bash
"rootDir": "./src",
"outDir": "./dist",
```

1.  Install the `pg` library and it’s types (because we’re using TS)

<!---->

    npm install pg
    npm install @types/pg

1.  Create a simple Node.js app that lets you put data

Create a function that let’s you insert data into a table. Make it `async`, make sure `client.connect` resolves before u do the insert

💡 This is an `insecure` way to store data in your tables. When you expose this functionality eventually via `HTTP`, someone can do an `SQL INJECTION` to get access to your data/delete your data.

1.  More secure way to store data. Update the code so you don’t put `user provided fields` in the `SQL string`

1.  Query data Write a function `getUser` that lets you fetch data from the database given a `email` as input.

```typescript
import { Client } from "pg";

// Async function to fetch user data from the database given an email
async function getUser(email: string) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect(); // Ensure client connection is established
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log("No user found with the given email.");
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error("Error during fetching user:", err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser("user5@example.com").catch(console.error);
```

# **Step 10 - Relationships and Transactions**

Relationships let you store data in different tables and `relate` it with each other.

### Relationships in Mongodb

Since `mongodb` is a NoSQL database, you can store any shape of data in it. If I ask you to store a users details along with their address, you can store it in an object that has the address details.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffd33f71f-ac54-432e-9afc-321758d50b04%2FScreenshot_2024-02-03_at_1.24.12_AM.png?table=block&id=ededf670-2336-4101-b701-c384e35f7447&cache=v2 "notion image")

### Relationships in SQL

Since SQL can not store `objects` as such, we need to define two different tables to store this data in.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1646f1fe-2d70-4df1-9de1-b619b28bf3a7%2FScreenshot_2024-02-03_at_1.30.10_AM.png?table=block&id=4af3b6ab-44fe-4ca4-8f04-c3d063592e11&cache=v2 "notion image")

&#x20;This is called a `relationship` , which means that the `Address` table is related to the `Users` table.

When defining the table, you need to define the `relationship`

```typescript
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### SQL query

To insert the address of a user -

```bash
INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');
```

Now if you want to get the address of a user given an `id` , you can run the following query -

```bash
SELECT city, country, street, pincode
FROM addresses
WHERE user_id = 1;
```

### Extra - Transactions in SQL

💡 Good question to have at this point is what queries are run when the user signs up and sends both their information and their address in a single request. Do we send two SQL queries into the database? What if one of the queries (address query for example) fails? This would require `transactions` in SQL to ensure either both the user information and address goes in, or neither does

SQL Query

```typescript
BEGIN; -- Start transaction

INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

COMMIT;
```

Node.js Code

```typescript
import { Client } from "pg";

async function insertUserAndAddress(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect();

    // Start transaction
    await client.query("BEGIN");

    // Insert user
    const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
    const userRes = await client.query(insertUserText, [username, email, password]);
    const userId = userRes.rows[0].id;

    // Insert address using the returned user ID
    const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
    await client.query(insertAddressText, [userId, city, country, street, pincode]);

    // Commit transaction
    await client.query("COMMIT");

    console.log("User and address inserted successfully");
  } catch (err) {
    await client.query("ROLLBACK"); // Roll back the transaction on error
    console.error("Error during transaction, rolled back.", err);
    throw err;
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertUserAndAddress(
  "johndoe",
  "john.doe@example.com",
  "securepassword123",
  "New York",
  "USA",
  "123 Broadway St",
  "10001"
);
```

# **Step 11 - Joins**

Defining relationships is easy.

What’s hard is `joining` data from two (or more) tables together.

For example, if I ask you to fetch me a users details `and` their address, what SQL would you run?

Approach 1 (Bad)

```typescript
-- Query 1: Fetch user's details
SELECT id, username, email
FROM users
WHERE id = YOUR_USER_ID;

-- Query 2: Fetch user's address
SELECT city, country, street, pincode
FROM addresses
WHERE user_id = YOUR_USER_ID;
```

Approach 2 (using joins)

```typescript
SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
JOIN addresses ON users.id = addresses.user_id
WHERE users.id = '1';
```

```typescript
SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
FROM users u
JOIN addresses a ON u.id = a.user_id
WHERE u.id = YOUR_USER_ID;
```

Now try converting the same to your node app

Approach 1 (Bad)

```typescript
import { Client } from "pg";

// Async function to fetch user details and address separately
async function getUserDetailsAndAddressSeparately(userId: string) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect();

    // Fetch user details
    const userDetailsQuery = "SELECT id, username, email FROM users WHERE id = $1";
    const userDetails = await client.query(userDetailsQuery, [userId]);

    // Fetch user address
    const userAddressQuery =
      "SELECT city, country, street, pincode FROM addresses WHERE user_id = $1";
    const userAddress = await client.query(userAddressQuery, [userId]);

    if (userDetails.rows.length > 0) {
      console.log("User found:", userDetails.rows[0]);
      console.log(
        "Address:",
        userAddress.rows.length > 0 ? userAddress.rows[0] : "No address found"
      );
      return {
        user: userDetails.rows[0],
        address: userAddress.rows.length > 0 ? userAddress.rows[0] : null,
      };
    } else {
      console.log("No user found with the given ID.");
      return null;
    }
  } catch (err) {
    console.error("Error during fetching user and address:", err);
    throw err;
  } finally {
    await client.end();
  }
}
getUserDetailsAndAddressSeparately("1");
```

Approach 2 (using joins)

```typescript
import { Client } from "pg";

// Async function to fetch user data and their address together
async function getUserDetailsWithAddress(userId: string) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect();
    const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
    const result = await client.query(query, [userId]);

    if (result.rows.length > 0) {
      console.log("User and address found:", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No user or address found with the given ID.");
      return null;
    }
  } catch (err) {
    console.error("Error during fetching user and address:", err);
    throw err;
  } finally {
    await client.end();
  }
}
getUserDetailsWithAddress("1");
```

No

#### Benefits of using a join -

1.  **Reduced Latency**

<!---->

1.  Simplified Application Logic

<!---->

1.  **Transactional Integrity**

### Types of Joins

#### **1. INNER JOIN**

Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.

**Use Case: Find All Users With Their Addresses. If a user hasn’t filled their address, that user shouldn’t be returned**

```javascript
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
INNER JOIN addresses ON users.id = addresses.user_id;
```

**2. LEFT JOIN**

Returns all rows from the left table, and the matched rows from the right table.

Use case - To list all users from your database along with their address information (if they've provided it), you'd use a LEFT JOIN. Users without an address will still appear in your query result, but the address fields will be NULL for them.

```javascript
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id;
```

#### **3. RIGHT JOIN**

Returns all rows from the right table, and the matched rows from the left table.

Use case - Given the structure of the database, a RIGHT JOIN would be less common since the **`addresses`** table is unlikely to have entries not linked to a user due to the foreign key constraint. However, if you had a situation where you start with the **`addresses`** table and optionally include user information, this would be the theoretical use case.

```javascript
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
RIGHT JOIN addresses ON users.id = addresses.user_id;
```

#### **4. FULL JOIN**

Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.

Use case - A FULL JOIN would combine all records from both **`users`** and **`addresses`**, showing the relationship where it exists. Given the constraints, this might not be as relevant because every address should be linked to a user, but if there were somehow orphaned records on either side, this query would reveal them.

```javascript
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
FULL JOIN addresses ON users.id = addresses.user_id;
```
