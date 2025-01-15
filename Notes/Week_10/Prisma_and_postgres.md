## SQL Databases & Prisma ORM.

*   **SQL (Structured Query Language)**

    *   **Data Model:** Relational (tables with rows and columns)

    *   **Strengths:**

        *   Strong data integrity and consistency

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

        *   May have weaker data consistency guarantees

        *   Can be more complex to query and join data

        *   Less mature than SQL in some areas

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

// THINGS TO LEARN => REFERENCES, DEFAULT
```

