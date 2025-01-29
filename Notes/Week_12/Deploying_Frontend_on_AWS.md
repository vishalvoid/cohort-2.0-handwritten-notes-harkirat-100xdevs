# **How to Deploy FrontEnd to AWS**

> New things to Learn :&#x20;
>
> 1.  Object stores (s3)
>
> 2.  CDNs (CloudFront)

# What are CDNs?

A CDN stands for `Content Delivery Network`. As the name suggests, it’s an optimal way for you to deliver content (mp4 files, jpgs and even HTML/CSS/JS files) to your users.

It is better than serving it from a VM/EC2 instances because of a few reasons -

### **EC2 Approach vs. CDN Approach for Serving a File**

When serving a file (e.g., an image, video, or static asset) to users, two common approaches are using an **EC2 instance** (self-hosted) and a **CDN (Content Delivery Network)**. Here’s how they differ:

**1. EC2 Approach (Self-Hosted)**

**How It Works:**

&#x20; • The file is stored on an **Amazon EC2 instance** (or an attached storage like EBS).

&#x20; • When a user requests the file, the request goes to the EC2 instance, which **retrieves and delivers** the file.

&#x20; • If multiple users request the file, EC2 handles all traffic directly.

```typescript
          User Request (HTTP/HTTPS)
                |
                v
        +--------------------+
        |      Internet      |
        +--------------------+
                |
                v
        +---------------------+
        |    EC2 Instance     |   <--- Stores & serves files
        |  (Origin Server)    |
        +---------------------+
                |
                v
        [ Delivers File to User ]
```

**Pros:**

&#x20; ✅ **Full Control** – You manage the server, configurations, and security settings.

&#x20; ✅ **Dynamic Content** – Ideal for serving dynamic files or custom-processed requests.

&#x20; ✅ **Custom Backend Logic** – If file access needs authentication or processing, EC2 can handle it.

**Cons:**

&#x20; ❌ **Higher Latency** – If users are far from the EC2 region, they experience **slower load times**.

&#x20; ❌ **Scalability Issues** – Under heavy traffic, EC2 may **struggle** unless you scale it manually or use **Auto Scaling**.

&#x20; ❌ **Increased Cost** – High bandwidth usage **increases EC2 costs**, especially with large files.

**2. CDN Approach (Content Delivery Network)**

```typescript
          User Request (HTTP/HTTPS)
                |
                v
        +--------------------+
        |      Internet      |
        +--------------------+
                |
                v
        +--------------------+
        |       CDN          |   <-- Caches file for fast delivery
        | (Edge Locations)   |
        +--------------------+
             |    |
        (Cache Hit) (Cache Miss)
             |        |
             |        v
             |   +---------------------+
             |   |    EC2 Instance     |   <--- Only accessed if file is missing in CDN
             |   |  (Origin Server)    |
             |   +---------------------+
             v
        [ Delivers File to User ]
```

**How It Works:**

&#x20; • The file is **cached and stored** across **multiple edge locations** worldwide.

&#x20; • When a user requests the file, the **nearest CDN server** delivers it instead of EC2.

&#x20; • If the file is **not cached**, the CDN fetches it from the **origin server (e.g., EC2 or S3)** and stores a copy for future requests.

**Pros:**

&#x20; ✅ **Lower Latency** – Users get files from **the nearest server**, reducing load time.

&#x20; ✅ **High Scalability** – CDNs handle **millions of requests** without overloading EC2.

&#x20; ✅ **Reduced EC2 Load** – Since files are cached, EC2 doesn’t handle every request, **saving bandwidth costs**.

&#x20; ✅ **Better Security** – CDNs offer **DDoS protection, HTTPS termination, and caching**.

**Cons:**

&#x20; ❌ **Cache Invalidation Issues** – If the file updates frequently, CDNs might serve **stale content** unless cache rules are set properly.

&#x20; ❌ **Additional Costs** – CDNs **charge per data transfer** and **request**, adding extra costs for high-volume traffic.

&#x20; ❌ **Limited Backend Control** – If dynamic processing is needed, CDNs alone may not be enough.

**Which One to Use?**

| **Factor**          | **EC2 Approach**                                  | **CDN Approach**                       |
| :------------------ | :------------------------------------------------ | :------------------------------------- |
| **Best for**        | Dynamic files, APIs, authentication-heavy content | Static files (images, videos, CSS, JS) |
| **Latency**         | Higher (single origin)                            | Lower (global distribution)            |
| **Scalability**     | Needs manual scaling                              | Automatically handles spikes           |
| **Cost Efficiency** | High for large traffic                            | Lower for static file delivery         |
| **Security**        | Self-managed                                      | Built-in DDoS protection               |

# **Hosting a React App Using AWS S3 and CloudFront**

## **1️⃣ Creating an Object Store in AWS (S3)**

AWS **Simple Storage Service (S3)** is an object storage solution used for storing and retrieving files. It is widely used for hosting static websites, backups, and content storage.

### **Steps to Create an S3 Bucket**

1.  **Log in** to AWS Management Console.

2.  Navigate to **S3** and click **Create Bucket**.

3.  Give the bucket a **unique name** (must be globally unique).

4.  Select a **region** closest to your users for better performance.

5.  **Block all public access** (Recommended for security).

6.  Click **Create Bucket**.

> **Security Tip:** Always block public access initially and grant access selectively as needed.

---

## **2️⃣ Uploading the File Bundle to S3**

Once you've built your React app (`npm run build`), you will get a `dist` or `build` folder containing static files.

### **Steps to Upload Files**

1.  Open **AWS S3 Console**.

2.  Navigate to the **bucket** you created.

3.  Click **Upload** → **Drag and drop** all files from the `dist` folder.

4.  Click **Upload** to store the files in S3.

> **Note:** You can also automate deployment using AWS CLI or CI/CD pipelines.

---

## **3️⃣ Trying to Access the Website (Why You Shouldn’t Directly Open S3)**

You might be tempted to access the website directly via the S3 bucket’s URL, but it won’t work.

- By **default, S3 blocks public access**, meaning your files are not accessible via a public URL.

- Instead of making S3 public, the recommended approach is to use **CloudFront**, AWS’s Content Delivery Network (CDN), to securely serve the files.

---

## **4️⃣ Connecting CloudFront (CDN) to S3**

Using **CloudFront** improves security and speeds up content delivery by caching files across multiple global edge locations.

### **Step 1 - Create a CloudFront Distribution**

1.  Open **AWS CloudFront Console**.

2.  Click **Create Distribution**.

3.  Under **Origin**, select **S3 bucket** as the source.

4.  Enable **Origin Access Control (OAC)** (Recommended for security).

5.  Enable **Caching** to optimize performance.

6.  Click **Create Distribution**.

### **Step 2 - Restrict Direct S3 Access (OAC)**

> **Origin Access Control (OAC)** is a feature in CloudFront that prevents users from directly accessing the S3 bucket URL. Instead, it forces them to go through CloudFront.

- This ensures better security and access control.

- Only CloudFront can retrieve files from S3, blocking unauthorized access.

### **Step 3 - Obtain CloudFront URL**

- Once the distribution is created, you’ll receive a **CloudFront URL**.

- Use this URL to access your deployed React app.

## **5️⃣ Connecting to your own domain**

- To make your website more user-friendly and professional, connect your own domain name (e.g., `[your-domain].com`) to your CloudFront distribution.

  - **Step 1:** In the CloudFront console, select the "Edit" option on the root page of your distribution.

  - **Step 2:** In the "Alternate Domain Names (CNAMEs)" section, attach your domain name to the distribution.

  - **Step 3:** **Create a Certificate:** Since we want our website to be hosted on HTTPS, we need an SSL certificate.

    - Navigate to the AWS Certificate Manager (ACM).

    - Request a certificate for your domain.

    - Follow the steps provided by ACM to verify domain ownership.

  - **Step 4:** Once the certificate is issued, return to your CloudFront distribution and associate it with your domain.

  - **Step 5:** In your DNS settings (with your domain registrar), add a CNAME record that points your domain name to the provided CloudFront domain name.

## **6️⃣ Adding Error Pages**

- You might encounter an issue when trying to access routes within your React application (e.g., `/user/1`) that are not directly mapped to files in your S3 bucket.

- CloudFront will search for a file named `/user/1` in S3, which doesn't exist. This will result in an error page.

- To ensure all requests are routed to your `index.html` (which handles routing within your React application), configure an error page within your CloudFront distribution.

  - Create an "Error Page" rule that redirects any 404 (Not Found) errors to your `index.html` file in the S3 bucket.

  - **Invalidate the CloudFront cache** to ensure these changes take effect promptly.

These additions provide crucial information for a complete and professional React app deployment on AWS. By connecting your domain and handling error pages effectively, you enhance the user experience and ensure smooth navigation within your application.

I hope this refined version is helpful!
