# **Prisma on Edge Architecture with CloudFront Workers**

## **Introduction**

Prisma is a powerful ORM that simplifies database interactions in modern applications. Deploying Prisma on the **Edge** using **CloudFront Workers** brings performance benefits by reducing latency and improving scalability.

## **Why Use Prisma on Edge?**

*   **Low Latency:** Queries execute closer to users.

*   **Serverless Scaling:** Automatically scales with demand.

*   **Resilient Architecture:** Reduces load on central databases.

*   **Optimized Performance:** Uses distributed computing to handle requests.

***

## **1. Setting Up CloudFront Workers**

Amazon CloudFront Workers allow you to execute JavaScript code at the edge locations. To deploy Prisma on CloudFront, follow these steps:

### **Step 1: Create an AWS Account & Enable CloudFront**

1.  Sign in to AWS and go to the **CloudFront** service.

2.  Click **Create Distribution** and configure your origin settings.

3.  Enable **Edge Functions** under **CloudFront Functions**.

### **Step 2: Install AWS CLI & Set Up Credentials**

Install the AWS CLI and configure your credentials:

```bash
aws configure
```

Enter your AWS **Access Key**, **Secret Key**, and **Region**.

### **Step 3: Create a CloudFront Worker**

1.  Go to **CloudFront > Functions > Create Function**.

2.  Name your function (`prismaEdgeWorker`).

3.  Select the **Runtime: JavaScript**.

4.  Deploy the following worker code:

```javascript
addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const response = await fetch(request);
    return response;
}
```

1.  Deploy and attach the function to the CloudFront distribution.

***

## **2. Integrating Prisma with Edge Workers**

Prisma is not directly supported on Edge due to its reliance on **Node.js drivers**, but we can work around this using **HTTP APIs** or **Database Proxies**.

### **Option 1: Using Prisma Data Proxy (Recommended for Serverless & Edge)**

Prisma **Data Proxy** helps run Prisma on serverless environments, including Edge workers.

### **Step 1: Set Up Prisma Data Proxy**

1.  Install Prisma CLI:

```bash
npm install -g prisma
```

1.  Set up Prisma in your project:

```bash
prisma init
```

1.  Enable **Data Proxy** in Prisma schema (`prisma/schema.prisma`):

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["dataProxy"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

1.  Deploy Prisma Data Proxy to **Prisma Cloud**:

```bash
prisma deploy
```

1.  Use the Prisma client with the **Data Proxy**:

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fetchData() {
    const users = await prisma.user.findMany();
    return users;
}
```

### **Option 2: Using Direct Fetch API Calls (For Small Queries)**

Instead of Prisma, you can make direct **HTTP fetch** requests to a database API.

Example using **Neon (PostgreSQL serverless)**:

```javascript
async function fetchUsers() {
    const response = await fetch("https://your-database-url.com/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: "SELECT * FROM users;" })
    });
    return await response.json();
}
```

This method avoids Prisma but can be useful for **lightweight edge computations**.

***

## **3. Deploying the Edge Worker with Prisma Proxy**

Once the Prisma Data Proxy or API method is set up, integrate it into the **CloudFront Worker**:

### **Final CloudFront Worker Code**

```javascript
addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const users = await fetchData();
    return new Response(JSON.stringify(users), {
        headers: { "Content-Type": "application/json" }
    });
}
```

### **Deploy & Attach to CloudFront**

```bash
aws cloudfront update-function --name prismaEdgeWorker --function-config function.conf
```

***

## **4. Testing and Debugging**

### **Test the Worker**

Make a test request to your CloudFront URL:

```bash
curl -X GET https://your-cloudfront-url.com/
```

### **Monitor Logs**

Enable logging in AWS CloudWatch for debugging:

1.  Go to **CloudFront > Logs**.

2.  Enable **Function Logs**.

3.  Check logs in **AWS CloudWatch**.

***

## **5. Best Practices for Prisma on Edge**

*   **Use Prisma Data Proxy** to avoid Node.js driver limitations.

*   **Cache responses** where possible to reduce database calls.

*   **Optimize queries** to minimize load on the database.

*   **Use CloudFront logging** for debugging and performance monitoring.

