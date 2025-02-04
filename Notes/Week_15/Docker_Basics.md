# **Why Docker?**

Docker/containers are important for a few reasons -&#x20;

1. Kubernetes/Container orchestration

1) Running processes in isolated environments

1. Starting projects/auxilary services locally

## **Containerization**

Containers are a way to package and distribute software applications in a way that makes them easy to deploy and run consistently across different environments. They allow you to package an application, along with all its dependencies and libraries, into a single unit that can be run on any machine with a container runtime, such as Docker.

#### Why containers

1. Everyone has different Operating systems

1) Steps to run a project can vary based on OS

1. Extremely harder to keep track of dependencies as project grows

#### Benefits of using containers

1. Let you describe your `configuration` in a single file

1) Can run in isolated environments

1. Makes Local setup of OS projects a breeze

1) Makes installing auxiliary services/DBs easy

#### References

- For Reference, the following command starts `mongo` in all operating systems -&#x20;

```TypeScript
docker run -d -p 27017:27017 mongo
```

- Docker isn’t the only way to create containers

# History of Docker

Docker is a YC backed company, started in \~2014

They envisioned a world where containers would become mainstream and people would deploy their applications using them

That is mostly true today

Most projects that you open on Github will/should have docker files in them (a way to create docker containers)

Ref - <https://www.ycombinator.com/blog/solomon-hykes-docker-dotcloud-interview/>

# Inside docker

As an application/full stack developer, you need to be comfortable with the following terminologies -

1. Docker Engine

1) Docker CLI - Command line interface

1. Docker registry

### 1. Docker Engine

Docker Engine is an open-source `containerization` technology that allows developers to package applications into `container`

Containers are standardized executable components combining application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.

### 2. Docker CLI

The command line interface lets you talk to the `docker engine` and lets you start/stop/list containers

```
docker run -d -p 27017:27017 mongo
```

💡

Docker cli is not the only way to talk to a docker engine. You can hit the docker `REST` API to do the same things

#### 3. Docker registry

The `docker registry` is how Docker makes money.&#x20;

It is similar to `github`, but it lets you push `images` rather than `sourcecode`

Docker’s main registry - <https://dockerhub.com/>

Mongo image on docker registry - <https://hub.docker.com/_/mongo>

# Images vs containers

**Docker Image**

A Docker image is a lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files.

💡 A good mental model for an image is `Your codebase on github`

**Docker Container**

A container is a running instance of an image. It encapsulates the application or service and its dependencies, running in an isolated environment.

💡 A good mental model for a container is when you run `node index.js` on your machine from some source code you got from github

# Port mapping

```
docker run -d -p 27018:27017 mongo

```

# Common docker commands

1. docker images

1) docker ps

1. docker run

1) docker build

### 1. docker images

Shows you all the images that you have on your machine

### 2. docker ps

Shows you all the containers you are running on your machine

### 3. docker run

Lets you start a container

1. -p ⇒ let’s you create a port mapping

1) -d. ⇒ Let’s you run it in detatched mode

### 4. docker build

Lets you build an image. We will see this after we understand how to create your own `Dockerfile`

### 5. docker push

Lets you push your image to a registry

### 6. Extra commands

1. docker kill

1) docker exec

# Dockerfile

### What is a Dockerfile

If you want to create an image from your own code, that you can push to `dockerhub`, you need to create a `Dockerfile` for your application.

A Dockerfile is a text document that contains all the commands a user could call on the command line to create an image.

### How to write a dockerfile

A dockerfile has 2 parts

1. Base image

1) Bunch of commands that you run on the base image (to install dependencies like Node.js)

### Let’s write our own Dockerfile

Let’s try to containerise this backend app - <https://github.com/100xdevs-cohort-2/week-15-live-1>

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6b0619fb-054b-4ba4-a82b-d7524c903bd8%2FScreenshot_2024-03-09_at_3.17.15_PM.png?table=block&id=47b44c7c-f5e1-44df-a90a-ee2e1b4bbbec&cache=v2 "notion image")

Solution

```
FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Common commands

- **`WORKDIR`**: Sets the working directory for any **`RUN`**, **`CMD`**, **`ENTRYPOINT`**, **`COPY`**instructions that follow it.

* **`RUN`**: Executes any commands in a new layer on top of the current image and commits the results.

- **`CMD`**: Provides defaults for executing a container. There can only be one CMD instruction in a Dockerfile.

* **`EXPOSE`**: Informs Docker that the container listens on the specified network ports at runtime.

- **`ENV`**: Sets the environment variable.

* **`COPY`**: Allow files from the Docker host to be added to the Docker image

<https://github.com/100xdevs-cohort-2/week-15-live-1>

# Building images

Now that you have a dockerfile in your project, try building a `docker image` from it

```
docker build -t image_name .
```

Now if you try to look at your images, you should notice a new image created

```
docker images
```

💡 Add a .dockerignore so that node_modules don’t get copied over&#x20;

# &#x20;Running images

```
docker run -p 3000:3000 image_name
```

Try visiting `localhost:3000`

# Passing in env variables

```
docker run -p 3000:3000 -e DATABASE_URL="postgres://avnadmin:AVNS_EeDiMIdW-dNT4Ox9l1n@pg-35339ab4-harkirat-d1b9.a.aivencloud.com:25579/defaultdb?sslmode=require" image_name
```

The `-e` argument let’s you send in environment variables to your node.js app
