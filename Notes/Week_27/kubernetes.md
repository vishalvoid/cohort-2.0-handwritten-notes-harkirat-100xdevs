# What is kubernetes

💡

Docker is a pre-requisite before you proceed to understand kubernetes

Kubernetes (popularly known as k8s) is a `container orchestration engine`, which as the name suggests lets you create, delete, and update `containers`

This is useful when

1. You have your docker images in the docker registry and want to deploy it in a `cloud native` fashion

1) You want to `not worry about` patching, crashes. You want the system to `auto heal`

1. You want to autoscale with some simple constructs

1) You want to observe your complete system in a simple dashboard

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffd175c30-21c5-4def-a49c-6d23189e8d65%2FScreenshot_2024-06-01_at_1.54.06_AM.png?table=block&id=b418c2e0-910a-4361-bb5d-c144fc6e2c24&cache=v2 "notion image")

💡

Kubernetes is also known as k8s. K\_ \_ \_ \_ \_ \_ \_ \_ s

# Before kubernetes

### Backend

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F402416b8-e3c4-4625-9bee-25bb426b5560%2FScreenshot_2024-06-01_at_1.59.09_AM.png?table=block&id=cd28994a-1caa-46ad-be9e-c40294d7d0a8&cache=v2 "notion image")

### Frontend (Nextjs)

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdad2df52-f8cf-42dd-bd2c-d9862da80891%2FScreenshot_2024-06-01_at_2.00.27_AM.png?table=block&id=b50abd64-422d-40bd-8c30-1d0031acf911&cache=v2 "notion image")

### Frontend (React)

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7ed4a418-f414-403b-8eb8-ceb6a2cf8787%2FScreenshot_2024-06-01_at_2.01.54_AM.png?table=block&id=e7aae50c-2f73-46b5-a722-a3ea11eadf43&cache=v2 "notion image")

# After kubernetes

Your frontend, backend are all `pods` in your `kubernetes cluster`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fce44d5dd-0919-4494-8a0e-dbcc910782da%2FScreenshot_2024-06-01_at_2.10.10_AM.png?table=block&id=c3122524-594f-4d69-91a0-14241c548b00&cache=v2 "notion image")

## Jargon

Ref - <https://kubernetes.io/docs/concepts/overview/components/>

### Nodes

In kubernetes, you can create and connect various machines together, all of which are running `kubernetes`. Every machine here is known as a `node`

There are two types of nodes

Master Node (Control pane) - The node that takes care of deploying the containers/healing them/listening to the developer to understand what to deploy

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fbc046171-9624-411b-a06b-391ac9d38af8%2FScreenshot_2024-06-01_at_2.55.57_AM.png?table=block&id=28f4ee90-9008-4054-a9ea-427e218272dd&cache=v2 "notion image")

API Server

1. **Handling RESTful API Requests**: The API server processes and responds to RESTful API requests from various clients, including the `kubectl` command-line tool, other Kubernetes components, and external applications. These requests involve creating, reading, updating, and deleting Kubernetes resources such as pods, services, and deployments

1) **Authentication and Authorization**: The API server authenticates and authorizes all API requests. It ensures that only authenticated and authorized users or components can perform actions on the cluster. This involves validating user credentials and checking access control policies.

1. **Metrics and Health Checks**: The API server exposes metrics and health check endpoints that can be used for monitoring and diagnosing the health and performance of the control plane.

1) **Communication Hub**: The API server acts as the central communication hub for the Kubernetes control plane. Other components, such as the scheduler, controller manager, and kubelet, interact with the API server to retrieve or update the state of the cluster.

etcd

Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data. Ref - <https://etcd.io/docs/v3.5/quickstart/>

kube-scehduler

Control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on. Its responsible for pod placement and deciding which pod goes on which node.

**kube-controller-manager**

Ref - <https://kubernetes.io/docs/concepts/architecture/controller/>

The `kube-controller-manager` is a component of the Kubernetes control plane that runs a set of controllers. Each controller is responsible for managing a specific aspect of the cluster's state.

There are many different types of controllers. Some examples of them are:

- Node controller: Responsible for noticing and responding when nodes go down.

* Deployment controller: Watches for newly created or updated deployments and manages the creation and updating of ReplicaSets based on the deployment specifications. It ensures that the desired state of the deployment is maintained by creating or scaling ReplicaSets as needed.

- **ReplicaSet Controller**: Watches for newly created or updated ReplicaSets and ensures that the desired number of pod replicas are running at any given time. It creates or deletes pods as necessary to maintain the specified number of replicas in the ReplicaSet's configuration.

Worker Nodes - The nodes that actually run your Backend/frontend

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2f0cf057-07cf-43d7-8865-d56f84ac664d%2FScreenshot_2024-06-01_at_3.19.30_AM.png?table=block&id=fb76030e-0923-45af-b81f-d9bba531f3d3&cache=v2 "notion image")

**kubelet - **An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.

#### How the kubelet Control Loop Works

1. **Watch for PodSpecs**: The kubelet watches the API server for PodSpecs that are scheduled to run on its node. This includes both new pods that need to be started and existing pods that may need to be updated or terminated.

1) **Reconcile Desired State**: The kubelet compares the current state of the node (which pods are running, their statuses, etc.) with the desired state as defined by the PodSpecs.

1. **Take Action**: Based on this comparison, the kubelet takes actions to reconcile the actual state with the desired state:

   1. > - **Start Pods**: If there are new PodSpecs, the kubelet will pull the necessary container images, create the containers, and start the pods.
      >
      > * **Monitor Health**: The kubelet performs health checks (liveness and readiness probes) on running containers. If a container fails a health check, the kubelet may restart it according to the pod's restart policy.
      >
      > - **Update Pods**: If there are changes to the PodSpecs (e.g., configuration changes), the kubelet will update the running pods accordingly.
      >
      > * **Stop Pods**: If a pod is no longer needed or should be terminated, the kubelet will stop and remove the containers.

1) **Report Status**: The kubelet periodically reports the status of the pods and the node back to the API server. This includes resource usage (CPU, memory, etc.) and the status of each container.

**kube-proxy** - The `kube-proxy` is a network proxy that runs on each node in a Kubernetes cluster. It is responsible for you being able to talk to a pod

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffe93d672-2bce-491f-b5f5-4b088f4de3e0%2FScreenshot_2024-06-01_at_3.53.24_AM.png?table=block&id=36788e97-5111-4f7b-a5e6-495999fa5990&cache=v2 "notion image")

**Container runtime** - In a Kubernetes worker node, the container runtime is the software responsible for running containers.

It interacts with the kubelet, which is the agent running on each node, to manage the lifecycle of containers as specified by Kubernetes pod specifications. The container runtime ensures that the necessary containers are started, stopped, and managed correctly on the worker node.

#### Common Container Runtimes for Kubernetes

1. containerd

1) CRI-O

1. Docker

#### Kubernetes Container Runtime Interface (CRI)

The Container Runtime Interface (CRI) is a plugin interface that allows the kubelet to use a variety of container runtimes without needing to know the specifics of each runtime. This abstraction layer enables Kubernetes to support multiple container runtimes, providing flexibility and choice to users.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffe8a235c-708e-4a39-8b53-3c3b4f1c81b5%2FScreenshot_2024-06-01_at_3.45.02_AM.png?table=block&id=ba797605-2975-475c-9483-f77aaa5cd7a9&cache=v2 "notion image")

### Cluster

A bunch of worker nodes + master nodes make up your `kubernetes cluster` . You can always add more / remove nodes from a cluster.

### Images

A **Docker image** is a lightweight, standalone, and executable software package that includes everything needed to run a piece of software, including the code, runtime, libraries, environment variables, and configuration files. Images are built from a set of instructions defined in a file called a Dockerfile.

Eg - <https://hub.docker.com/_/mongo>

### Containers

A container is an image in execution. For example if you run

```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword  -d postgres
```

### Pods

A pod is the smallest and simplest unit in the Kubernetes object model that you can create or deploy

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc628e103-d7a3-41e8-9a68-fa688a93adad%2FScreenshot_2024-06-01_at_4.21.32_AM.png?table=block&id=1c32f52f-410c-496c-97a8-a025ef4fc73c&cache=v2 "notion image")

# Creating a k8s cluster

#### Locally (Make sure you have docker)

1. minukube

1) kind - <https://kind.sigs.k8s.io/docs/user/quick-start/>

#### On cloud

1. GKE

1) AWS K8s

1. vultr

### Using kind

- Install kind - <https://kind.sigs.k8s.io/docs/user/quick-start/#installation>

#### Single node setup

- Create a 1 node cluster

```
kind create cluster --name local
```

- Check the docker containers you have running

```
docker ps
```

- You will notice a single container running (control-pane)

* Delete the cluster

```
kind delete cluster -n local
```

#### Multi node setup

- Create a `clusters.yml` file

```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
```

- Create the node setup

```
 kind create cluster --config clusters.yml --name local
```

- Check docker containers

```
docker ps
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6777a996-53c8-426f-a40e-86e16202f1df%2FScreenshot_2024-06-01_at_5.24.54_AM.png?table=block&id=95959b33-dce8-4efc-b679-de5e53cbbba9&cache=v2 "notion image")

Now you have a node cluster running locally

### Using minikube

- Install minikube - <https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Fx86-64%2Fstable%2Fbinary+download>

* Start a k8s cluster locally

```
minikube start
```

- Run `docker ps` to see the single node setup

💡

A single node setup works but is not ideal. You don’t want your control pane to run containers/act as a worker.

# Kubernetes API

The master node (control pane) exposes an API that a developer can use to start pods.

#### Try the API

- Run `docker ps` to find where the control pane is running

  - ![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fed848804-79a9-4232-8f50-9ff4cfaa919c%2FScreenshot_2024-06-01_at_5.32.21_AM.png?table=block&id=93fba35b-e982-4bd5-a65f-f9cb90207f11&cache=v2 "notion image")

* Try hitting various endpoints on the API server - <https://127.0.0.1:50949/api/v1/namespaces/default/pods>

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F80b0d641-1105-4898-a2b3-d57c642f21ed%2FScreenshot_2024-06-01_at_5.31.04_AM.png?table=block&id=2059e490-aec5-4295-b86b-5b9a0b49273c&cache=v2 "notion image")

Kubernetes API server does authentication checks and prevents you from getting in.

All of your authorization credentials are stored by `kind` in \~/.kube/config&#x20;

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F43b9c30e-b0ed-4455-8c86-3acb3779ddac%2FScreenshot_2024-06-01_at_5.36.03_AM.png?table=block&id=1b7ff330-74c5-43b8-a25a-ed8862e91c74&cache=v2 "notion image")

# kubectl

`kubectl` is a command-line tool for interacting with Kubernetes clusters. It provides a way to communicate with the Kubernetes API server and manage Kubernetes resources.

#### Install kubectl

<https://kubernetes.io/docs/tasks/tools/#kubectl>

#### Ensure kubectl works fine

```
 kubectl get nodes
 kubectl get pods
```

If you want to see the exact HTTP request that goes out to the API server, you can add `--v=8` flag

```
kubectl get nodes --v=8
```

# Creating a Pod

There were 5 jargons we learnt about

1. Cluster

1) Nodes

1. Images

1) Containers

1. Pods

We have created a `cluster` of `3 nodes`

How can we deploy a `single container` from `an image` inside a `pod` ?

### Finding a good image

Let’s try to start this image locally - <https://hub.docker.com/_/nginx>

#### Starting using docker

```
docker run -p 3005:80 nginx
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F11a5e55c-2a4f-4929-b1de-ce300ad59f97%2FScreenshot_2024-06-01_at_6.04.17_AM.png?table=block&id=1d1b8aa2-5578-48f8-adff-184be3458e58&cache=v2 "notion image")

Try visiting localhost:3005

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F275e9a71-0edd-4e6e-bcf4-5d2acf8c3fbc%2FScreenshot_2024-06-01_at_6.04.22_AM.png?table=block&id=08f7c0a7-e42e-4ce8-b1c2-abf7858568b4&cache=v2 "notion image")

#### Starting a pod using k8s

- Start a pod

```
kubectl run nginx --image=nginx --port=80
```

- Check the status of the pod

```
kubectl get pods
```

- Check the logs&#x20;

```
kubectl logs nginx
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F26d04a50-52d7-4bdf-8e9a-b147f51e52a2%2FScreenshot_2024-06-01_at_6.09.40_AM.png?table=block&id=feafd6ac-29bd-4736-8ab6-d4ddcb7959c9&cache=v2 "notion image")

- Describe the pod to see more details

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7a280791-aab0-4729-b1f7-dee91a074f4c%2FScreenshot_2024-06-01_at_6.11.29_AM.png?table=block&id=339cc01e-a3b7-439e-b2b4-73018723bf75&cache=v2 "notion image")

### What our system looks like right now

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fae88030d-2973-4add-adcb-3bbb88007e40%2FScreenshot_2024-06-01_at_6.13.20_AM.png?table=block&id=038f5630-6c6b-4129-aef7-818aebf19ac2&cache=v2 "notion image")

Good questions to ask

1. How can I stop a pod?

1) How can I visit the pod? Which port is it available on?

1. How many pods can I start?

# Stop the pod

Stop the pod by running

```
 kubectl delete pod nginx
```

Check the current state of pods

```
kubectl get pods
```

# Kubernetes manifest

A manifest defines the desired state for Kubernetes resources, such as Pods, Deployments, Services, etc., in a declarative manner.&#x20;

#### Original command

```
kubectl run nginx --image=nginx --port=80
```

#### Manifest

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
```

#### Breaking down the manifest

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2e1f9bdf-0d18-460a-8e31-3124a79a7278%2FScreenshot_2024-06-01_at_6.29.59_AM.png?table=block&id=ca3401f3-d207-4af7-b493-34cac3c4cce9&cache=v2 "notion image")

#### Applying the manifest

```
kubectl apply -f manifest.yml
```

#### Delete the pod

```
 kubectl delete pod nginx
```

# Checkpoint

We have created&#x20;

1. Cluster

1) Nodes

1. Images

1) Containers

1. Pods

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffee7d8f9-4bde-4fa6-ae4e-9843d212e49d%2FScreenshot_2024-06-01_at_6.13.20_AM.png?table=block&id=35f84577-0f92-4b4e-8791-75fcd5afb2ce&cache=v2 "notion image")

# Deployment

A **Deployment** in Kubernetes is a higher-level abstraction that manages a set of Pods and provides declarative updates to them. It offers features like scaling, rolling updates, and rollback capabilities, making it easier to manage the lifecycle of applications.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8a18b080-4a2b-4c8b-a677-ea7542ba42c3%2FScreenshot_2024-06-01_at_6.54.23_AM.png?table=block&id=aa8babe1-9dd3-4751-b6dc-d9962443e8f6&cache=v2 "notion image")

- **Pod**: A Pod is the smallest and simplest Kubernetes object. It represents a single instance of a running process in your cluster, typically containing one or more containers.

* **Deployment**: A Deployment is a higher-level controller that manages a set of identical Pods. It ensures the desired number of Pods are running and provides declarative updates to the Pods it manages.

#### Key Differences Between Deployment and Pod:

1. **Abstraction Level**:

   1. > - **Pod**: A Pod is the smallest and simplest Kubernetes object. It represents a single instance of a running process in your cluster, typically containing one or more containers.
      >
      > * **Deployment**: A Deployment is a higher-level controller that manages a set of identical Pods. It ensures the desired number of Pods are running and provides declarative updates to the Pods it manages.

1) **Management**:

   1. > - **Pod**: They are ephemeral, meaning they can be created and destroyed frequently.
      >
      > * **Deployment**: Deployments manage Pods by ensuring the specified number of replicas are running at any given time. If a Pod fails, the Deployment controller replaces it automatically.

1. **Updates**:

   1. > - **Pod**: Directly updating a Pod requires manual intervention and can lead to downtime.
      >
      > * **Deployment**: Supports rolling updates, allowing you to update the Pod template (e.g., new container image) and roll out changes gradually. If something goes wrong, you can roll back to a previous version.

1) **Scaling**:

   1. > - **Pod**: Scaling Pods manually involves creating or deleting individual Pods.
      >
      > * **Deployment**: Allows easy scaling by specifying the desired number of replicas. The Deployment controller adjusts the number of Pods automatically.

1. **Self-Healing**:

   1. > - **Pod**: If a Pod crashes, it needs to be restarted manually unless managed by a higher-level controller like a Deployment.
      >
      > * **Deployment**: Automatically replaces failed Pods, ensuring the desired state is maintained.

# Replicaset

A ReplicaSet in Kubernetes is a controller that ensures a specified number of pod replicas are running at any given time. It is used to maintain a stable set of replica Pods running in the cluster, even if some Pods fail or are deleted.

When you create a deployment, you mention the amount of `replicas` you want for this specific pod to run. The deployment then creates a new `ReplicaSet` that is responsible for creating X number of pods.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8e4e0f11-5a7a-4b32-a2ae-8861705a703b%2FScreenshot_2024-06-01_at_3.38.18_PM.png?table=block&id=02687613-4125-47a7-8e84-2a3840634c44&cache=v2 "notion image")

# Series of events

When you run the following command, a bunch of things happen

```
kubectl create deployment nginx-deployment --image=nginx --port=80 --replicas=3
```

#### Step-by-Step Breakdown:

1. **Command Execution**:

   1. > - You execute the command on a machine with `kubectl` installed and configured to interact with your Kubernetes cluster.

1) **API Request**:

   1. > - `kubectl` sends a request to the Kubernetes API server to create a Deployment resource with the specified parameters.

1. **API Server Processing**:

   1. > - The API server receives the request, validates it, and then processes it. If the request is valid, the API server updates the desired state of the cluster stored in etcd. The desired state now includes the new Deployment resource.

1) **Storage in etcd**:

   1. > - The Deployment definition is stored in etcd, the distributed key-value store used by Kubernetes to store all its configuration data and cluster state. etcd is the source of truth for the cluster's desired state.

1. **Deployment Controller Monitoring**:

   1. > - The Deployment controller, which is part of the `kube-controller-manager`, continuously watches the API server for changes to Deployments. It detects the new Deployment you created.

1) **ReplicaSet Creation**:

   1. > - The Deployment controller creates a ReplicaSet based on the Deployment's specification. The ReplicaSet is responsible for maintaining a stable set of replica Pods running at any given time.

1. **Pod Creation**:

   1. > - The ReplicaSet controller (another part of the `kube-controller-manager`) ensures that the desired number of Pods (in this case, 3) are created and running. It sends requests to the API server to create these Pods.

1) **Scheduler Assignment**:

   1. > - The Kubernetes scheduler watches for new Pods that are in the "Pending" state. It assigns these Pods to suitable nodes in the cluster based on available resources and scheduling policies.

1. **Node and Kubelet**:

   1. > - The kubelet on the selected nodes receives the Pod specifications from the API server. It then pulls the necessary container images (nginx in this case) and starts the containers.

Hierarchical Relationship

1. **Deployment**:

   1. > - **High-Level Manager**: A Deployment is a higher-level controller that manages the entire lifecycle of an application, including updates, scaling, and rollbacks.
      >
      > * **Creates and Manages ReplicaSets**: When you create or update a Deployment, it creates or updates ReplicaSets to reflect the desired state of your application.
      >
      > - **Handles Rolling Updates and Rollbacks**: Deployments handle the complexity of updating applications by managing the creation of new ReplicaSets and scaling down old ones.

1) **ReplicaSet**:

   1. > - **Mid-Level Manager**: A ReplicaSet ensures that a specified number of identical Pods are running at any given time.
      >
      > * **Maintains Desired State of Pods**: It creates and deletes Pods as needed to maintain the desired number of replicas.
      >
      > - **Label Selector**: Uses label selectors to identify and manage Pods.

1. **Pods**:

   1. > - **Lowest-Level Unit**: A Pod is the smallest and simplest Kubernetes object. It represents a single instance of a running process in your cluster and typically contains one or more containers.

💡

A good question to ask at this point is why do you need a `deployment` when a `replicaset` is good enough to bring up and heal pods?

#### Series of events

User creates a `deployment` which creates a `replicaset` which creates `pods`

If `pods` go down, `replicaset controller` ensures to bring them back up

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2e7f54fe-80aa-4d85-923a-5177b4295b7f%2FScreenshot_2024-06-01_at_3.46.08_PM.png?table=block&id=6052082e-5e75-4088-8453-b0577d25c413&cache=v2 "notion image")

# Create a replicaset

Let’s not worry about deployments, lets just create a replicaset that starts 3 pods

- Create `rs.yml`

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

- Apply the manifest

```
kubectl apply -f rs.yml
```

- Get the rs details

```
kubectl get rs

NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       23s
```

- Check the pods

```
kubectl get pods

NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-7zp2v   1/1     Running   0          35s
nginx-replicaset-q264f   1/1     Running   0          35s
nginx-replicaset-vj42z   1/1     Running   0          35s
```

- Try deleting a pod and check if it self heals

```
kubectl delete pod nginx-replicaset-7zp2v
kubectl get pods
```

- Try adding a pod with the `app=nginx`

```
kubectl run nginx-pod --image=nginx --labels="app=nginx"
```

- Ensure it gets terminated immedietely because the `rs` already has 3 pods

* Delete the replicaset

```
 kubectl delete rs nginx-deployment-576c6b7b6
```

💡

Note the naming convention of the pods. The pods are named after the `replicaset` followed by a unique id (for eg nginx-replicaset-vj42z)

# Create a deployment

Lets create a deployment that starts 3 pods

- Create deployment.yml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

- Apply the deployment

```
 kubectl apply -f deployment.yml
```

- Get the deployment

```
kubectl get deployment

NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           18s
```

- Get the rs

```
kubectl get rs
NAME                         DESIRED   CURRENT   READY   AGE
nginx-deployment-576c6b7b6   3         3         3       34s
```

- Get the pod

```
kubectl get pod
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-576c6b7b6-b6kgk   1/1     Running   0          46s
nginx-deployment-576c6b7b6-m8ttl   1/1     Running   0          46s
nginx-deployment-576c6b7b6-n9cx4   1/1     Running   0          46s
```

- Try deleting a pod

```
kubectl delete pod nginx-deployment-576c6b7b6-b6kgk
```

- Ensure the pods are still up

```
kubectl get pods
```

# Why do you need deployment?

If all that a `deployment` does is create a `replicaset` , why cant we just create `rs` ?

#### Experiment

Update the `image` to be `nginx2` (an image that doesnt exist)

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx2:latest
        ports:
        - containerPort: 80
```

- Apply the new deployment

```
kubectl apply -f deployment.yml
```

- Check the new `rs` now

```
kubectl get rs
NAME                          DESIRED   CURRENT   READY   AGE
nginx-deployment-576c6b7b6    3         3         3       14m
nginx-deployment-5fbd4799cb   1         1         0       10m
```

- Check the pods

```
kubectl get pods
NAME                                READY   STATUS             RESTARTS   AGE
nginx-deployment-576c6b7b6-9nlnq    1/1     Running            0          15m
nginx-deployment-576c6b7b6-m8ttl    1/1     Running            0          16m
nginx-deployment-576c6b7b6-n9cx4    1/1     Running            0          16m
nginx-deployment-5fbd4799cb-fmt4f   0/1     ImagePullBackOff   0          12m
```

#### Role of deployment

Deployment ensures that there is a smooth deployment, and if the new image fails for some reason, the old replicaset is maintained.

Even though the `rs` is what does `pod management` , `deployment` is what does `rs management`

#### Rollbacks

- Check the history of deployment

```
 kubectl rollout history deployment/nginx-deployment
```

- Undo the last deployment

```
kubectl rollout undo deployment/nginx-deployment
```

### Create a new deployment

- Replace the image to be `postgres`

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: postgres:latest
        ports:
        - containerPort: 80
```

- Check the new set or `rs`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb4e8a201-6a97-47a3-8285-014d269d0b9e%2FScreenshot_2024-06-01_at_4.20.39_PM.png?table=block&id=16df26bd-84f9-42af-af1e-7daec836c181&cache=v2 "notion image")

- Check the pods

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa9334e99-6818-4e14-9a2b-a8c2dc8bfb86%2FScreenshot_2024-06-01_at_4.22.47_PM.png?table=block&id=3f0e75da-7b48-40d7-ba87-ef495ec104ca&cache=v2 "notion image")

- Check pods after some time

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F79ae257e-318d-4af6-9618-3b0e5f09ab1b%2FScreenshot_2024-06-01_at_4.23.53_PM.png?table=block&id=051058cb-0c4c-42e0-9fa9-55dc04fa2a7b&cache=v2 "notion image")

- Check the logs

```
kubectl logs -f nginx-deployment-7cdb767447-4d5dr
Error: Database is uninitialized and superuser password is not specified.
       You must specify POSTGRES_PASSWORD to a non-empty value for the
       superuser. For example, "-e POSTGRES_PASSWORD=password" on "docker run".

       You may also use "POSTGRES_HOST_AUTH_METHOD=trust" to allow all
       connections without a password. This is *not* recommended.

       See PostgreSQL documentation about "trust":
       https://www.postgresql.org/docs/current/auth-trust.html
```

- Update the manifest to pass `POSTGRES_PASSWORD`

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: postgres:latest
        ports:
        - containerPort: 80
        env:
        - name: POSTGRES_PASSWORD
          value: "yourpassword"
```

- Check pods now

```
kubectl get pods
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffaf4b10a-f7dd-48f1-9b55-e3cc0a7a50c6%2FScreenshot_2024-06-01_at_4.25.38_PM.png?table=block&id=c2b0ffaf-59e1-42e6-88cc-78e0ffea2c67&cache=v2 "notion image")

- Try after some time

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdc94851b-d947-4d4a-b0f2-e229ba68ea65%2FScreenshot_2024-06-01_at_4.25.56_PM.png?table=block&id=fde5e343-1dce-4346-9cff-d37d9354bd62&cache=v2 "notion image")

Postgres is running correctly

- Check the rs

  - ![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8b3ea994-85cd-4676-a145-e92e6dceb732%2FScreenshot_2024-06-01_at_4.26.12_PM.png?table=block&id=b543f110-0054-4626-8c59-c9ec7bb48381&cache=v2 "notion image")

# How to expose the app?

Let’s delete all resources and restart a `deployment` for `nginx` with 3 replicas

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

- Apply the configuration

```
kubectl apply -f deployment.yml
```

- Get all pods

```
kubectl get pods -owide
NAME                               READY   STATUS    RESTARTS   AGE     IP            NODE            NOMINATED NODE   READINESS GATES
nginx-deployment-576c6b7b6-7jrn5   1/1     Running   0          2m19s   10.244.2.19   local-worker2   <none>           <none>
nginx-deployment-576c6b7b6-88fkh   1/1     Running   0          2m22s   10.244.1.13   local-worker    <none>           <none>
nginx-deployment-576c6b7b6-zf8ff   1/1     Running   0          2m25s   10.244.2.18   local-worker2   <none>           <none>
```

- The IPs that you see are `private IPs` . You wont be able to access the app on it

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F77f9803a-7876-4e8c-b6ac-1b2d53a6ebc9%2FScreenshot_2024-06-01_at_4.49.50_PM.png?table=block&id=3503d3ea-0682-4790-b871-6541afa7a06b&cache=v2 "notion image")

# Services

In Kubernetes, a "Service" is an abstraction that defines a logical set of Pods and a policy by which to access them. Kubernetes Services provide a way to expose applications running on a set of Pods as network services. Here are the key points about Services in Kubernetes:

Key concepts

1. **Pod Selector**: Services use labels to select the Pods they target. A label selector identifies a set of Pods based on their labels.

1) **Service Types**:

   1. > - **ClusterIP**: Exposes the Service on an internal IP in the cluster. This is the default ServiceType. The Service is only accessible within the cluster.
      >
      > * **NodePort**: Exposes the Service on each Node’s IP at a static port (the NodePort). A ClusterIP Service, to which the NodePort Service routes, is automatically created. You can contact the NodePort Service, from outside the cluster, by requesting `<NodeIP>:<NodePort>`.
      >
      > - **LoadBalancer**: Exposes the Service externally using a cloud provider’s load balancer. NodePort and ClusterIP Services, to which the external load balancer routes, are automatically created.

1. **Endpoints**: These are automatically created and updated by Kubernetes when the Pods selected by a Service's selector change.

- Create service.yml

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30007  # This port can be any valid port within the NodePort range
  type: NodePort
```

- Restart the cluster with a few extra ports exposed (create kind.yml)

```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30007
    hostPort: 30007
- role: worker
- role: worker
```

- &#x20;kind create cluster --config kind.yml

* Re apply the deployment and the service

- Visit `localhost:30007`

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fefabe5a1-bac7-4b64-bbb6-e482c1f426a7%2FScreenshot_2024-06-01_at_5.05.13_PM.png?table=block&id=2692c080-a889-4465-aa27-6f7330fcb2d4&cache=v2 "notion image")

### Types of services

1. ClusterIP

1) NodePort

1. Loadbalancer

# Loadbalancer service

In Kubernetes, a LoadBalancer service type is a way to expose a service to external clients. When you create a Service of type LoadBalancer, Kubernetes will automatically provision an `external` load balancer from your cloud provider (e.g., AWS, Google Cloud, Azure) to route traffic to your Kubernetes service

### Creating a kubernetes cluster in vultr

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd31e5463-0021-46bf-bc8a-50319f338c82%2FScreenshot_2024-06-02_at_6.01.19_PM.png?table=block&id=4cbf4e05-74a2-47f4-b571-9a5b31ff0667&cache=v2 "notion image")

- Create deployment.yml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

- Apply deployment

```
 kubectl apply -f deployment.yml
```

- Create `service-lb.yml`

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

- Apply the service

```
 kubectl apply -f service-lb.yml
```

# Series of events

### Step 1 - Create your cluster

- Create `kind.yml`

```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30007
    hostPort: 30007
- role: worker
  extraPortMappings:
  - containerPort: 30007
    hostPort: 30008
- role: worker
```

- Create cluster

```
 kind create cluster --config kind.yml --name local
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9d26bc84-8abe-4a84-bbf9-e883aa5105bf%2FScreenshot_2024-06-02_at_5.28.01_PM.png?table=block&id=bfc5ea2e-8eda-4f58-94d9-36bbdefa572a&cache=v2 "notion image")

### Step 2 - Deploy your pod

- Create `deployment.yml`

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

- Apply the deployment

```
kubectl apply -f deployment.yml
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F843a3463-783a-45fe-946b-b17099d4db6c%2FScreenshot_2024-06-02_at_5.31.03_PM.png?table=block&id=e549e182-95c2-49a9-b880-de9b1cc38a33&cache=v2 "notion image")

### Step 3 - Expose your app over a NodePort

- Create service.yml

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30007  # This port can be any valid port within the NodePort range
  type: NodePort
```

- kubectl apply -f service.yml

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F11967bf6-0014-4f7d-a849-92ee2f67f9b2%2FScreenshot_2024-06-02_at_5.33.07_PM.png?table=block&id=70ad4d7a-4936-4264-b8e1-2ba7fde8ce6b&cache=v2 "notion image")

### Step 4 - Expose it over a LoadBalancer

- Create a load balancer service (service-lb.yml)

  - > ```
    > apiVersion: v1
    > kind: Service
    > metadata:
    >   name: nginx-service
    > spec:
    >   selector:
    >     app: nginx
    >   ports:
    >     - protocol: TCP
    >       port: 80
    >       targetPort: 80
    >   type: LoadBalancer
    > ```

* Apply the configuration

```
kubectl apply service-lb.yml
```

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F77acba51-9424-4d1e-ad58-a5806e08e5da%2FScreenshot_2024-06-02_at_5.42.54_PM.png?table=block&id=82be6631-3b52-49c5-b7ba-ca9e8efb1d45&cache=v2 "notion image")

#### Check the cloud dashboard

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fddfb2c27-37bf-4f24-b45f-ca11a3b665f5%2FScreenshot_2024-06-02_at_5.47.57_PM.png?table=block&id=1a5e7986-1179-454a-bc57-22c54c77337d&cache=v2 "notion image")
