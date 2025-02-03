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

* For Reference, the following command starts `mongo` in all operating systems -&#x20;

```TypeScript
docker run -d -p 27017:27017 mongo
```

* Docker isn’t the only way to create containers

# History of Docker

Docker is a YC backed company, started in \~2014

They envisioned a world where containers would become mainstream and people would deploy their applications using them

That is mostly true today

Most projects that you open on Github will/should have docker files in them (a way to create docker containers)

 

Ref - <https://www.ycombinator.com/blog/solomon-hykes-docker-dotcloud-interview/>

