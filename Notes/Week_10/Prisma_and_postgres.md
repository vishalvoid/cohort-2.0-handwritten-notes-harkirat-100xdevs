## SQL Databases & Prisma ORM.

*   **SQL (Structured Query Language)**

    *   **Data Model:** Relational (tables with rows and columns)

    *   **Strengths:**

        *   Strong data integrity and consistency

        *   Denfined your schema upfront : put in data that follows that schema

        *   update the schema as your app changes and perform migrations.

        *   ACID properties (Atomicity, Consistency, Isolation, Durability)

        *   Powerful for complex queries and joins

        *   Mature technology with extensive tooling and support

    *   **Weaknesses:**

        *   Scalability can be challenging with large datasets

        *   Schema rigidity can limit flexibility

        *   Not ideal for unstructured or semi-structured data

*   **NoSQL (Not Only SQL)**

    *   **Data Model:**

        *   Document (e.g., JSON, XML)

        *   Key-value

        *   Graph

        *   Wide-column

    *   **Strengths:**

        *   High scalability and flexibility

        *   Can handle large volumes of unstructured data

        *   Often easier to scale horizontally

    *   **Weaknesses:**

        *   Can lead to inconsistent database.

        *   can cause runtime errors

        *   is to flexible for an app that needs strictness

        *   Can be more complex to query and join data

        *   Less mature than SQL in some areas

*   **Graph Databases**

    *   Data is stored in the form of graph. Specially usefull in case where relationships need to be stored&#x20;

    *   Example Neo4j

<!---->

*   **Vector Databases**

    *   Store data in form of vectors.

    *   Usefull in Machine Learning

    *   Example Pinecone

**In essence:**

*   **Choose SQL when:**

    *   Data integrity and consistency are paramount.

    *   You need to perform complex joins and queries.

    *   You have structured data.

*   **Choose NoSQL when:**

    *   You need high scalability and flexibility.

    *   You have large volumes of unstructured or semi-structured data.

    *   You prioritize rapid development and ease of scaling.

**Note:** This is a simplified overview. The best choice depends on the specific needs of your application.

### SQL Relationships.&#x20;

*   **One-to-one:**

    *   One row in table A corresponds to exactly one row in table B.

    *   Example: A table of employees and a table of their assigned desks.

*   **One-to-many:**

    *   One row in table A can correspond to multiple rows in table B.

    *   Example: A table of customers and a table of their orders.

*   **Many-to-many:**

    *   One row in table A can correspond to multiple rows in table B, and vice versa.

    *   Example: A table of students and a table of courses, where students can take multiple courses, and courses can have multiple students enrolled.

**Note:** Relationships are typically implemented using foreign keys, which are columns in one table that reference the primary key of another table.

### Types of SQL Databases.

*   Postgres

*   SQL

*   etc.

### Connecting to Postgres.

Required: Username, Password, URL, Databases, Tables.

**URL** : postgres\://\[username]:\[password]@\[host]/\[database\_name].

**Example**: postgres\://vishalvoid:secretpassword\@localhost:5432/metavoid

### Basic Types of Queries.

![]()

### How to create a table in SQL

```javascript
CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
)

// THINGS TO LEARN => SERIAL PRIMARY KEY, VARCHAR8(255), UNIQUE, NOT NULL
```

EXAMPLE : CREATING A TODO&#x20;

```javascript
CREATE TABLE users (
id SERIAL PRIMARY KEY,
text TEXT NOT NULL,
description TEXT,
user_id INTEGER REFERENCE users(id),
done BOOLEAN DEFAULT FALSE
)

// THINGS TO LEARN => REFERENCES, DEFAUlt
```

Checkout Real time Example : [Click Here](./../../Practice/Week_10/src/create-table.ts)

**INSERTS : HOW TO INSERT DATA INTO SQL**

```javascript
INSERT INTO todos (title, description, user_id, done)
VALUES ('Buy Groceries', 'Milk, bread, and eggs', 1, FALSE);

INSERT INTO users (username, email, password)
VALUES('John_Doe', 'john.doe@example.com', 'hashed_password');
```

Checkout Real time Example : [Click Here](./../../Practice/Week_10/src/insert-data.ts)

**GETS : HOW TO GET DATA**

```javascript
async function getTodosForUser(userId: number) {
  const client = await getClient();

  const selectTodosText = "SELECT * FROM todos WHERE user_id = $1";
  const todoRes = await client.query(selectTodosText, [userId]);

  console.log(`Todos for User ID ${userId}:`);
  for (let todo of todoRes.rows) {
    console.log(
      `ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`
    );
  }
}
```

Checkout Real time Example : [Click Here](./../../Practice/Week_10/src/get-data.ts)

**UPDATES : UPDATE A VALUE IN THE DATABASE**

```javascript
import { getClient } from "./utils";

async function updateTodo(todoId: number) {
  const client = await getClient();

  const updateTodoText = "UPDATE todos SET done = $1 WHERE id = $2";
  await client.query(updateTodoText, [true, todoId]);

  console.log(`Todo with ID ${todoId} updated to done!`);
}

const todoIdToUpdate = 1;
updateTodo(todoIdToUpdate);
```

**DELETES : TO DELETE DATA FORM THE DATABASE.**&#x20;

```javascript
import { getClient } from "./utils";

async function deleteTodo(todoId: number) {
  const client = await getClient();

  const deleteTodoText = "DELETE FROM todos WHERE id = $1";
  await client.query(deleteTodoText, [todoId]);

  console.log(`Todo with ID ${todoId} deleted!`);
}

const todoIdToDelete = 1;
deleteTodo(todoIdToDelete);
```

**DROP : USED TO COMPLETELY REMOVE THE TABLE FORM DATABASES**

```javascript
DROP TABLE IF EXISTS todos;
```

FOREIGN KEYS:&#x20;

**JOIN : SAME AS REFERENCE/POPULATE IN MONGODB**

`QUESTION: Get me the email of the user and all their todos?`&#x20;

Easy (not good wat to do):&#x20;

```javascript
async function getUserAndTodosSeparateQueries(userId: number) {
  const client = await getClient();

  // Fetch user details
  const userQuery = "SELECT * FROM users WHERE id = $1";
  const userRes = await client.query(userQuery, [userId]);
  const user = userRes.rows[0];

  // Fetch todos for the user
  const todosQuery = "SELECT * FROM todos WHERE user_id = $1";
  const todosRes = await client.query(todosQuery, [userId]);
  const todos = todosRes.rows;

  console.log("User Details:", user);
  console.log("Todos:", todos);
}

getUserAndTodosSeparateQueries(1);
```

Good way to D0:&#x20;

```javascript
async function getUserAndTodosWithJoin(userId: number) {
  const client = await getClient();

  const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

  const res = await client.query(joinQuery, [userId]);
  const results = res.rows;

  console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(1);
```

Types of Join:&#x20;

*   Full Join : Should be present in either tables.

*   INNER Join : should be present in both the tables. default

*   LEFT Join : should have all entries form left table.

*   Right Join : Opposite of left join.

INDEXES: TO BE LEARN&#x20;

\*\*\*Problems : \*\*\*

*   ***You have to write raw sql queries.***

*   ***Migrations are hard***

*   ***You dont get the best types***

\*\*\*Solution : \*\*\*

*   ***ORMs***

### Prisma as ORMs

Prisma is a Next-generation Node.js and TrypeScript ORM.

`Lbraries Provided by prisma:`&#x20;

1.  **Prisma Client** : Auto generated and type-safe query builder for Node.js & TypeScript.&#x20;

2.  **Prisma Migrate:** Migration tool to easy evelve your database schema form prototyping to production.

3.  **Prisma Studio:** GUI to view and edit in your database.&#x20;

\*\*What is Automated Migrations? \*\*

DB changes often, you add more columns, add new tables, you have to do Migrations to keep syncing the DB state.

Pre ORM Days - Manually update the prod DB, dev LDB.

There was no log of the change made to the DB.

### 3 Steps to the prisma world.

1.  Initialize prisma

2.  Define your schema

3.  create migrations and update client

`Things to Learn` :

```javascript
@id @default(autoincrement())

@unique

@default(false)

@relation(fields:\[authorId], references:\[id])
```

**Checkout How does it work : [Click Here](./../../Practice/Week_10.1_Prisma/prisma/schema.prisma)**

**To finally Migrate**: npx prisma migrate dev --name init
