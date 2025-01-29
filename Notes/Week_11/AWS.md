# **What is AWS ?**

AWS is Amazon web services that's a Amazon's cloud service. it let's you&#x20;

1.  Rent Servers

2.  Manage domains

3.  upload objects(mp4, files, jpgs, mp3s...)

4.  autoscale servers

5.  create k8s cluster

6.  ... much more services

The offering we will focusing on today's renting servers.&#x20;

## EC-2 Servers - Elastic Compute Version 2.

VMs on AWS are called `EC2 Servers`

EC2 stands for Elastic compute Version 2.

1.  `Elastic` - Can increase/decrease the size of the machine

<!---->

1.  `Compute` - It is a machine

You can spin up a new EC2 instance from the aws dashboard

### **HTTP vs HTTPS vs SSH**

| **Feature**       | **HTTP (HyperText Transfer Protocol)**         | **HTTPS (Secure HTTP)**                            | **SSH (Secure Shell)**                             |
| :---------------- | :--------------------------------------------- | :------------------------------------------------- | :------------------------------------------------- |
| **Purpose**       | Transfers web pages & data over the internet.  | Secure version of HTTP, encrypts data.             | Secure remote access & file transfer.              |
| **Port**          | 80                                             | 443                                                | 22                                                 |
| **Security**      | No encryption, data is sent in plaintext.      | Uses **SSL/TLS** encryption for security.          | Uses encryption for secure access.                 |
| **Use Case**      | Browsing non-sensitive websites.               | Online banking, login pages, secure transactions.  | Logging into remote servers, managing systems.     |
| **Encryption**    | No security, prone to attacks.                 | Encrypts data to prevent eavesdropping.            | Encrypts data for secure remote connections.       |
| **Data Transfer** | Transfers webpages, APIs, media.               | Transfers encrypted webpages, APIs.                | Transfers commands, files, and secure connections. |
| **Vulnerability** | Prone to **MITM (Man-in-the-Middle)** attacks. | Secure from MITM, phishing, and data interception. | Secure from brute-force and MITM attacks.          |

**Key Differences**

1\. **HTTP**: Basic, **insecure** communication protocol for web pages.

2\. **HTTPS**: **Secure version** of HTTP, using **SSL/TLS encryption** to protect data.

3\. **SSH**: **Secure remote login** protocol used for server access and file transfers.

**When to Use Each?**

• **HTTP** → Public, non-sensitive content (e.g., blogs, articles).

• **HTTPS** → Secure sites (e.g., banking, logins, online payments).

• **SSH** → Remote access to servers (e.g., Linux, cloud hosting).

> By default Port 80 is open to the internet. while only 443 should be open. for security.

**Allow Custom Port on AWS EC2**

1\. **Go to EC2** → **Instances** → Select your instance.

2\. **Security** → **Security Groups** → **Inbound Rules** → **Edit**.

3\. **Add Rule**:

• **Type**: Custom TCP/UDP

• **Port**: _Your Port (e.g., 5726)_

• **Source**: 0.0.0.0/0 (Public) or Specific IP

4\. **Save** → Done! ✅

**Verify:**

```typescript
nc -zv YOUR_IP PORT
```

### **Understanding Permission Digits**

Each permission digit is a sum of:

• 4 (Read r)

• 2 (Write w)

• 1 (Execute x)

| **Permission** | **Binary** | **Meaning**                 |
| :------------- | :--------- | :-------------------------- |
| **7**          | 111        | Read, Write, Execute (Full) |
| **6**          | 110        | Read, Write                 |
| **5**          | 101        | Read, Execute               |
| **4**          | 100        | Read Only                   |
| **3**          | 011        | Write, Execute              |
| **2**          | 010        | Write Only                  |
| **1**          | 001        | Execute Only                |
| **0**          | 000        | No Permission               |

**Common Permission Examples**

• **700** → Owner: Full (rwx), Group & Others: None (---)

• **755** → Owner: Full (rwx), Group & Others: Read & Execute (r-x)

• **644** → Owner: Read & Write (rw-), Group & Others: Read (r--)

• **600** → Owner: Read & Write (rw-), Group & Others: None (---)

**Changing Permissions**

Use chmod to modify permissions:

```typescript
chmod 644 filename  # Set file to 644
chmod 755 script.sh  # Make script executable
```

✅ **Tip:** Use ls -l to check file permissions.

# SSH into server

#### &#x20; 1. Give ssh key permissions

```typescript
chmod 700 aws-key.pem
```

#### &#x20; 2. ssh into machine

    ssh -i aws-key.pem ubuntu@ip_of_machine

## Problem when aws ec2 cannot access internet on booting.&#x20;

```typescript
tecmint@ubuntu:~$ ping google.com
ping: tecmint.com: Temporary failure in name resolution
```

**Solution**&#x20;

```typescript
$ sudo nano /etc/resolv.conf
OR
$ sudo vim /etc/resolv.conf

// then add this

nameserver 8.8.8.8
nameserver 8.8.4.4
```

### Install Node.js on Ec-2&#x20;

> <https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04>

```typescript
sudo apt install nodejs

node --version

sudo apt install npm
```

### NGINX&#x20;

**NGINX** is open source software for web serving, **reverse proxying**, caching, load balancing, media streaming, and more. It started out as a web server designed for maximum performance and stability. In addition to its HTTP server capabilities, NGINX can also function as a proxy server for email (IMAP, POP3, and SMTP) and a reverse proxy and load balancer for HTTP, TCP, and UDP servers

```typescript

                                           ┌──────────────────────────────────────────────────────┐
                                           │                                                      │
                                           │                               ┌────────────────┐     │
                                           │                               │                │     │
                                           │              be1.100xdevs.com │                │     │
                                           │           ┌──────────────────►│  port: 8081    │     │
                                           │           │                   │                │     │
                                           │           │                   │                │     │
                                           │           │                   └────────────────┘     │
                                           │   ┌───────┼─────────┐                                │
                                           │   │                 │                                │
                                           │   │     nginx       │                                │
         be1.100xdevs.com                  │   │                 │                                │
  ──────────────────────────────────────►  │   │    port: 80     │                                │
         be2.100xdevs.com                  │   │                 │         ┌────────────────┐     │
                                           │   └────────┬────────┘         │                │     │
                                           │            │                  │                │     │
                                           │            │                  │   port: 8080   │     │
                                           │            │                  │                │     │
                                           │            └─────────────────►│                │     │
                                           │              be2.100xdevs.com │                │     │
                                           │                               └────────────────┘     │
                                           │                                                      │
                                           └──────────────────────────────────────────────────────┘



```

How to Install nginx on server :&#x20;

```bash
sudo apt update
sudo apt install nginx
```

This should start a `nginx server` on port 80

Try visiting the website :)))))

### Creating Reverse Proxy :

```bash
events {
    # Event directives...
}

http {
	server {
    listen 80;
    server_name be1.100xdevs.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
}
```
