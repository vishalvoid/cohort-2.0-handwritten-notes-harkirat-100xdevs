# What we’ll be doing today

#### What we’ve done already

1. Clusters

1) Nodes

1. Pods

1) Deployment

1. Replicasets

#### What we’re doing today

1. Namespaces

1) Ingress

1. Ingress Controller

   1. nginx
   2. traefik

1) ConfigMaps

1. Secrets

#### What we’re doing tomorrow

1. Cert management

1) Volumes and Persistent volumes

1. Resource management&#x20;

#### Offline video next week

1. HPA - Horizontal Pod Autoscaling

1) Node autoscaling

1. Labs to add k8s a real codebase

# Recapping what we’ve done

Ref - <https://projects.100xdevs.com/tracks/kubernetes-1/Kubernetes-Part-1-1>

### Quick recap

Cluster

A kubernetes cluster is a bunch of machines that work together to help you deploy your app

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdaf3874b-e45d-440a-9046-182765e77fef%2FScreenshot_2024-06-08_at_1.46.27_AM.png?table=block&id=f773411f-40ad-4f39-a801-d794ea690a8c&cache=v2 "notion image")

Nodes

Each machine in your cluster is called a node

Nodes are of two types

1. Master node (control plane) - Exposes an API that the `developer` can use to deploy `pods`

1) Worker node - Actually run the `pods`

Pods

The smallest execution unit inside a kubernetes cluseter. A pod can run `one or more` containers

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd117a4d3-f000-4696-8a05-5c0fffea8ad5%2FScreenshot_2024-06-08_at_2.28.17_AM.png?table=block&id=fe5240f9-c5ff-4e1d-80ba-3d853576e690&cache=v2 "notion image")

---

Replicasets

They let you create `multiple` pods (replicas).&#x20;

It also takes care of bringing them back up if they ever go down/are killed

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fee367c83-e258-4051-96ce-d2113a73d210%2FScreenshot_2024-06-08_at_2.42.42_AM.png?table=block&id=35a0cddd-9ea0-45e5-b3b1-b3482d563de0&cache=v2 "notion image")

Deployment

A deployment creates&#x20;

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F01d4993c-2cca-4b02-b048-e49b65c6304a%2FScreenshot_2024-06-08_at_2.46.32_AM.png?table=block&id=c39eccb5-add1-4420-8c62-7fdf5930cdef&cache=v2 "notion image")

Services

Services let you expose your pods to other pods/over the internet

They are of three types

1. ClusterIP

1) NodePort

1. Loadbalancer — Creates a loadbalancer outside the kubernetes cluster

**Nodeport**

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fcd834831-1bdb-4add-afdb-f7eb87829c26%2FScreenshot_2024-06-08_at_2.54.07_AM.png?table=block&id=d15eb601-403c-428d-9747-6640c1d98fa0&cache=v2 "notion image")

**Loadbalancer**

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffcb5be14-96ee-4c61-935b-a7759dc5e969%2FScreenshot_2024-06-08_at_2.52.57_AM.png?table=block&id=a221c3d4-71cf-4ff9-aa66-0420612351bb&cache=v2 "notion image")

# Recapping how to run this locally

### Creating a cluster

- Create a `kind.yml` file locally

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

- Run the cluster locally

```
 kind create cluster --config kind.yml --name local2
```

- Run docker ps to confirm that the cluster is running

```
 docker ps
```

### Creating a pod

- Create a pod manifest (pod.yml)

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

- Apply the pod manifest

```
kubectl apply -f pod.yml
```

- Check if the pod exists now

```
kube get pods
```

- Check the logs&#x20;

```
 kubectl logs -f nginx
```

- Delete the pod

```
kubectl delete pod nginx
```

### Creating a replicaset

- Create the replicaset manifest

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

- Apply the replicaset manifest

```
 kubectl apply -f rs.yml
```

- Check the number of pods running now

```
kubectl get pods
```

- Try deleting a pod, and ensure it gets restarted

* Delete the replicaset

```
 kubectl delete rs nginx-replicaset
```

### Creating a Deployment

- Create a deployment manifest (deployment.yml)

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

- Apply the manifest

```
kubectl apply -f deployment.yml
```

- Check the `rs` that exist now

```
kubectl get rs
```

- Check the pods that exist now

```
kubectl get pods
```

- Try creating a new deployment with a wrong image name

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

- Ensure that the old pods are still running

```
kubectl get pods
```

&#x20;Keep the deployment, it’ll come in handy in the 4th slide

# How to run this on a cloud provider

Go to a cloud provider like

1. AWS

1) GCP

1. Digital ocean

1) Vultr

and create a k8s cluster

- Create a cluster

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6d688f5e-531e-4d61-abbf-88d1cbe78057%2FScreenshot_2024-06-08_at_3.21.33_AM.png?table=block&id=f04652ba-bd81-4601-85cd-d89a7d682be4&cache=v2 "notion image")

- Download the credentials file and replace `~/.kube/config` with it

  - ![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb959a27b-80ac-4cee-9319-1891e07d74bc%2FScreenshot_2024-06-08_at_3.23.19_AM.png?table=block&id=ffd84455-64fa-4517-a3c0-0394e027f046&cache=v2 "notion image")

* Create a deployment manifest

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

- Create a deployment

```
kubectl apply -f deployment.yml
```

# Services

Services let you actually expose your app over the internet.

#### Nodeport

- Create a `Nodeport` service (service.yml)

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

- Apply it

```
kubectl apply -f service.yml
```

- Visit any of the nodes on 30007

```
http://localhost:30007/
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2c427310-6b24-486a-8ae3-27731f09cf45%2FScreenshot_2024-06-08_at_3.28.45_AM.png?table=block&id=ac1156a3-b977-4102-8d35-17045857361a&cache=v2 "notion image")

💡

This will only work if you’ve started your `kind` cluster with the config from slide 2 On vultr, it will just work

#### LoadBalancer (will only work on a cloud provider)

The `LoadBalancer` service type is designed to work with cloud providers to create an external load balancer that routes traffic to the service.

- Replace the `type` to be `LoadBalancer`

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

- Re-apply the config

```
kubectl apply -f service.yml
```

- See the loadbalancer created on the dashboard

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc2ee0af1-b98d-4a76-969e-7e72a58dca53%2FScreenshot_2024-06-08_at_3.32.43_AM.png?table=block&id=0fa938c5-95ef-4e04-b537-4bff859fe32e&cache=v2 "notion image")

- Visit the balancer to see the website

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F93c54ab9-6392-4a3d-8cd5-7267d8415d5c%2FScreenshot_2024-06-08_at_3.35.58_AM.png?table=block&id=9fd1be2c-396a-49e8-b4ed-74e6180f7ac9&cache=v2 "notion image")

# Downsides of services

Services are great, but they have some downsides -&#x20;

### Scaling to multiple apps

1. If you have three apps (frontend, backend, websocket server), you will have to create `3` saparate services to route traffic to them. There is no way to do `centralized traffic management` (routing traffic from the same URL/Path-Based Routing)&#x20;

1) There are also limits to how many load balancers you can create

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3e0cb374-6286-471f-9431-6486712f363b%2FScreenshot_2024-06-08_at_3.42.17_AM.png?table=block&id=41cc187a-dff9-473b-a6a6-6251ac3f292c&cache=v2 "notion image")

### Multiple certificates for every route

You can create certificates for your `load balancers` but you have to maintain them outside the cluster and create them manually

You also have to update them if they ever expire

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F935a9107-d8a1-4a73-adab-15ffc97ed853%2FScreenshot_2024-06-08_at_3.45.06_AM.png?table=block&id=a0020d73-d4c5-4809-baf1-e52653870ea7&cache=v2 "notion image")

### No centralized logic to handle `rate limitting` to all services

Each load balancer can have its own set of rate limits, but you cant create a `single rate limitter` for all your services.&#x20;

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb507687b-3666-4d56-9a62-d39206715e02%2FScreenshot_2024-06-08_at_3.48.24_AM.png?table=block&id=a6576bb9-d69a-4372-baa0-7fa1b7929827&cache=v2 "notion image")

#### Trying it out

Here is a sample manifest that you can run to start two saparate deployments and attach them to two saparate `LoadBalancer` services

Manifest

```

```

```
kubectl apply -f manifest.yml
```

You will notice two load balancers created for your two services

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4479daa6-0559-4cc1-b019-75a05b78c814%2FScreenshot_2024-06-08_at_3.53.00_AM.png?table=block&id=8d66d3b3-c1e7-482d-9985-a020073c0ae0&cache=v2 "notion image")

Open the load balancers

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2ccd493b-caa4-44de-9a0e-bf72ca8532bf%2FScreenshot_2024-06-08_at_3.55.31_AM.png?table=block&id=57d7807f-5571-403b-b74a-71fd2a53be0a&cache=v2 "notion image")

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9f9fec89-6ce4-4614-b637-7092498ecbc2%2FScreenshot_2024-06-08_at_3.55.34_AM.png?table=block&id=ce34e74c-aa24-4274-b917-162c4288e4f4&cache=v2 "notion image")

# Ingress and Ingress Controller

Ref - <https://kubernetes.io/docs/concepts/services-networking/ingress/>

An API object that manages external access to the services in a cluster, typically HTTP.

Ingress may provide load balancing, SSL termination and name-based virtual hosting.

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F07041d43-0f69-4781-aa76-265f4111a913%2FScreenshot_2024-06-08_at_4.17.39_AM.png?table=block&id=cd9df811-016d-43e4-a03a-7bb8566b0d7f&cache=v2 "notion image")

💡

An Ingress does not expose arbitrary ports or protocols. Exposing services other than HTTP and HTTPS to the internet typically uses a service of type [Service.Type=NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) or [Service.Type=LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer).

# Ingress controller

If you remember from last week, our `control plane` had a `controller manager` running.

Ref - <https://projects.100xdevs.com/tracks/kubernetes-1/Kubernetes-Part-1-3>

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F42f76bed-0087-4764-8989-5dc4eb4b89e8%2FScreenshot_2024-06-08_at_4.20.51_AM.png?table=block&id=619c8f95-35d8-4b7c-8096-e7086b8d28dc&cache=v2 "notion image")

The `kube-controller-manager` runs a bunch of `controllers` like

1. Replicaset controller

1) Deployment controller

etc

If you want to add an `ingress` to your kubernetes cluster, you need to install an `ingress controller` manually. It doesn’t come by default in k8s

#### Famous k8s ingress controllers

- The [NGINX Ingress Controller for Kubernetes](https://www.nginx.com/products/nginx-ingress-controller/) works with the [NGINX](https://www.nginx.com/resources/glossary/nginx/) webserver (as a proxy).

* [HAProxy Ingress](https://haproxy-ingress.github.io/) is an ingress controller for [HAProxy](https://www.haproxy.org/#desc).

- The [Traefik Kubernetes Ingress provider](https://doc.traefik.io/traefik/providers/kubernetes-ingress/) is an ingress controller for the [Traefik](https://traefik.io/traefik/) proxy.

Full list - <https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/>

# Namespaces

In Kubernetes, a `namespace` is a way to divide cluster resources between multiple users/teams. Namespaces are intended for use in environments with many users spread across multiple teams, or projects, or environments like development, staging, and production.

When you do&#x20;

```
kubectl get pods
```

it gets you the `pods` in the `default` namespace

#### Creating a new namespace

- Create a new namespace

```
kubectl create namespace backend-team
```

- Get all the namespaces

```
kubectl get namespaces
```

- Get all pods in the namespace

```
kubectl get pods -n my-namespace
```

- Create the manifest for a deployment in the namespace

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: backend-team
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
kubectl apply -f deployment-ns.yml
```

- Get the deployments in the namespace

```
kubectl get deployment -n backend-team
```

- Get the pods in the namespace

```
kubectl get pods -n backend-team
```

- Set the default context to be the namespace

```
kubectl config set-context --current --namespace=backend-team
```

- Try seeing the pods now

```
kubectl get pods
```

- Revert back the kubectl config

```
kubectl config set-context --current --namespace=default
```

# Install the nginx ingress controller

Ref - <https://docs.nginx.com/nginx-ingress-controller/installation/installing-nic/installation-with-manifests/>

**Using helm**

- Install helm

Ref - <https://helm.sh/>

Installation - <https://helm.sh/docs/intro/install/>

- Add the `ingress-nginx` chart

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
```

- Check if you have pods running in the&#x20;

```
 kubectl get pods -n ingress-nginx
```

#### Default loadbalancer service

You will notice that if you use `helm` to install the nginx-ingress-controller, it creates a `Loadbalancer` service for you

```
kubectl get services --all-namespaces
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4751e61d-3596-4e25-b77d-542b5329dde2%2FScreenshot_2024-06-08_at_4.48.31_AM.png?table=block&id=b9139eca-8ced-4a88-9ffb-bd2fe684da5e&cache=v2 "notion image")

This routes all the traffic to an `nginx pod`

```
kubectl get pods -n ingress-nginx
```

This means the first part of our `ingress deployment` is already created

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F17e9d9e4-e73f-4ba8-b4b1-f20054fdbbf2%2FScreenshot_2024-06-08_at_4.53.36_AM.png?table=block&id=33716986-d95a-4621-b578-5f1126f666a5&cache=v2 "notion image")

# Adding the routing to the ingress controller

Next up, we want to do the following -&#x20;

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9801471d-09e0-4e30-b785-0768fcac8cfd%2FScreenshot_2024-06-08_at_5.29.30_PM.png?table=block&id=40dd48bf-599f-49ac-a803-acf3830a9b64&cache=v2 "notion image")

- Get rid of all existing deployments in the default namespace

```
kubectl get deployments
kubectl delete deployment_name
```

- Get rid of all the services in the default namespace (dont delete the default kubernetes service, delete the old `nginx` and `apache` loadbalancer services)

```
 kubectl get services
 kubect
```

- Create a `deployment` and `service` definition for the `nginx` image/app (this is different from the nginx controller)

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: default
spec:
  replicas: 2
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
        image: nginx:alpine
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: default
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

- Create a deployment and service for the `apache` app

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apache-deployment
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: apache
  template:
    metadata:
      labels:
        app: apache
    spec:
      containers:
      - name: my-apache-site
        image: httpd:2.4
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: apache-service
  namespace: default
spec:
  selector:
    app: apache
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

- Create the ingress resource

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-apps-ingress
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /nginx
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
      - path: /apache
        pathType: Prefix
        backend:
          service:
            name: apache-service
            port:
              number: 80
```

#### Combined manifest

Create a combined manifest with all the api objects

```

```

- Apply the manifest

```
kubectl apply -f complete.yml
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F424e6cdc-9fdd-4a91-ba7f-81bce2f3f338%2FScreenshot_2024-06-08_at_5.09.17_AM.png?table=block&id=e8aeb45d-7a06-4939-ac61-3c70ba5d642f&cache=v2 "notion image")

- Update your local hosts entry (`/etc/hosts ` ) such that [your-domain.com](http://your-domain.com/) points to the IP of your load balancer

```
65.20.84.86	your-domain.com
```

- Try going to [`your-domain.com/apache`](http://your-domain.com/apache) and `your-domain.com/nginx`

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa56ff199-8eba-4e2a-9540-44f1e8bc99f7%2FScreenshot_2024-06-08_at_5.24.27_AM.png?table=block&id=d67e3f53-1d8c-48b8-b0eb-410bdb38cc70&cache=v2 "notion image")

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F87efc884-157f-4cb5-8045-5cb9a9ff0f5d%2FScreenshot_2024-06-08_at_5.24.23_AM.png?table=block&id=c62ef167-12b3-4622-a607-107e775e9758&cache=v2 "notion image")

# Trying traefik’s ingress controller

Traefik is another popular ingress controller. Let’s try to our apps using it next

- Install traefik ingress controller using helm

```
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
helm install traefik traefi/traefik --namespace traefik --create-namespace
```

- Make sure an ingressClass is created for traefik

```
 kubectl get IngressClass
```

- Notice it created a `LoadBalancer` svc for you

```
 kubectl get svc -n traefik
```

- Create a `Ingress` that uses the traefik ingressClass and traefik annotations (traefik.yml)

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: traefik-web-apps-ingress
  namespace: default
spec:
  ingressClassName: traefik
  rules:
  - host: traefik-domain.com
    http:
      paths:
      - path: /nginx
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
      - path: /apache
        pathType: Prefix
        backend:
          service:
            name: apache-service
            port:
              number: 80

```

- Add an entry to your `/etc/hosts` (IP should be your loadbalancer IP)

```
65.20.90.183    traefik-domain.com
```

- Visit the website

```
traefik-domain.com/nginx
traefik-domain.com/apache
```

💡

Can you guess what is going wrong? Why are you not seeing anything on this final page?

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff2d62e3d-b1fd-4be6-b9a3-05d9f00152a7%2FScreenshot_2024-06-08_at_5.48.24_AM.png?table=block&id=ebe7d3ff-c286-45eb-a9c3-60b5bb5cd510&cache=v2 "notion image")

### Assignment

Try to figure out how can you rewrite the path to `/` if you’re using traefik as the ingress class

# Secrets and configmaps

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F104d454b-4ab4-4efd-86f3-fd6696170ab3%2FScreenshot_2024-06-09_at_6.49.13_PM.png?table=block&id=84bb0583-4073-46a2-8c23-f61b84f243db&cache=v2 "notion image")

Kubernetes suggests some standard configuration practises.

These include things like

1. You should always create a deployment rather than creating naked pods

1) Write your configuration files using YAML rather than JSON

1. Configuration files should be stored in version control before being pushed to the cluster

Kubernetes v1 API also gives you a way to store `configuration` of your application outside the image/pod

This is done using&#x20;

1. ConfigMaps&#x20;

1) Secrets

#### Rule of thumb

Don’t bake your application secrets in your docker image

Pass them in as environment variables whenever you’re starting the container

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4ffa62dc-f597-43fb-b090-402232429fba%2FScreenshot_2024-06-08_at_5.33.04_PM.png?table=block&id=4cc483b2-9f6c-4e43-8de7-c61cae644d66&cache=v2 "notion image")

# ConfigMaps

Ref - <https://kubernetes.io/docs/concepts/configuration/configmap/>

A ConfigMap is an API object used to store non-confidential data in key-value pairs. [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a [volume](https://kubernetes.io/docs/concepts/storage/volumes/).

A ConfigMap allows you to decouple environment-specific configuration from your [container images](https://kubernetes.io/docs/reference/glossary/?all=true#term-image), so that your applications are easily portable.

### Creating a ConfigMap

- Create the manifest

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: ecom-backend-config
data:
  database_url: "mysql://ecom-db:3306/shop"
  cache_size: "1000"
  payment_gateway_url: "https://payment-gateway.example.com"
  max_cart_items: "50"
  session_timeout: "3600"
```

- Apply the manifest

```
	kubectl apply -f cm.yml
```

- Get the configmap

```
 kubectl describe configmap ecom-backend-config
```

### Creating an express app that exposes env variables

Express app code

```
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    CACHE_SIZE: process.env.CACHE_SIZE,
    PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
    MAX_CART_ITEMS: process.env.MAX_CART_ITEMS,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
  };

  res.send(`
    <h1>Environment Variables</h1>
    <pre>${JSON.stringify(envVars, null, 2)}</pre>
  `);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

```

Dockerfile to containerise it

```
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc -b

EXPOSE 3000
CMD [ "node", "index.js" ]

```

Deploy to dockerhub - <https://hub.docker.com/repository/docker/100xdevs/env-backend/general>

### Trying the express app using docker locally

```
 docker run -p 3003:3000 -e DATABASE_URL=asd  100xdevs/env-backend
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F0f89e3b7-1c9a-4ce6-945f-419a06524a2a%2FScreenshot_2024-06-08_at_4.19.21_PM.png?table=block&id=1dc8b234-ad19-4d6e-a04b-0ff6a8a0c975&cache=v2 "notion image")

### Try running using k8s locally

- Create the manifest (express-app.yml)

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecom-backend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ecom-backend
  template:
    metadata:
      labels:
        app: ecom-backend
    spec:
      containers:
      - name: ecom-backend
        image: 100xdevs/env-backend
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            configMapKeyRef:
              name: ecom-backend-config
              key: database_url
        - name: CACHE_SIZE
          valueFrom:
            configMapKeyRef:
              name: ecom-backend-config
              key: cache_size
        - name: PAYMENT_GATEWAY_URL
          valueFrom:
            configMapKeyRef:
              name: ecom-backend-config
              key: payment_gateway_url
        - name: MAX_CART_ITEMS
          valueFrom:
            configMapKeyRef:
              name: ecom-backend-config
              key: max_cart_items
        - name: SESSION_TIMEOUT
          valueFrom:
            configMapKeyRef:
              name: ecom-backend-config
              key: session_timeout
```

- Apply the manifest

```
 kubectl apply -f express-app.yml
```

- Create the service (express-service.yml)

```
apiVersion: v1
kind: Service
metadata:
  name: ecom-backend-service
spec:
  type: NodePort
  selector:
    app: ecom-backend
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 30007
```

- Apply the service

```
kubectl apply -f express-service.yml
```

- Try visiting the website

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F677287af-1b96-454a-a162-b43831f91202%2FScreenshot_2024-06-08_at_4.35.43_PM.png?table=block&id=2c657a05-cb94-4cc5-a432-4653c67835c6&cache=v2 "notion image")

# Secrets

Secrets are also part of the kubernetes v1 api. They let you store `passwords` / `sensitive data` which can then be mounted on to pods as environment variables. Using a Secret means that you don't need to include confidential data in your application code.

Ref - <https://kubernetes.io/docs/concepts/configuration/secret/>

#### Using a secret

- Create the manifest with a secret and pod (secret value is base64 encoded) (<https://www.base64encode.org/>)

```
apiVersion: v1
kind: Secret
metadata:
  name: dotfile-secret
data:
  .env: REFUQUJBU0VfVVJMPSJwb3N0Z3JlczovL3VzZXJuYW1lOnNlY3JldEBsb2NhbGhvc3QvcG9zdGdyZXMi
---
apiVersion: v1
kind: Pod
metadata:
  name: secret-dotfiles-pod
spec:
  containers:
    - name: dotfile-test-container
      image: nginx
      volumeMounts:
        - name: env-file
          readOnly: true
          mountPath: "/etc/secret-volume"
  volumes:
    - name: env-file
      secret:
        secretName: dotfile-secret
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F71a3b055-2d80-43e3-8ce5-63a4250387ce%2FScreenshot_2024-06-09_at_5.00.31_PM.png?table=block&id=35254a5c-579b-46da-a1cf-9c361436e493&cache=v2 "notion image")

- Try going to the container and exploring the `.env`

```
kubectl exec -it secret-dotfiles-pod /bin/bash
cd /etc/secret-volume/
ls
```

### Base64 encoding

Whenever you’re storing values in a secret, you need to base64 encode them. They can still be `decoded` , and hence this is not for security purposes. This is more to provide a standard way to store secrets, incase they are binary in nature.&#x20;

For example, TLS (https) certificates that we’ll be storing as secrets eventually can have non ascii characters. Converting them to base64 converts them to ascii characters.

### Secrets as env variables

You can also pass in secrets as environment variables to your process (similar to how we did it for configmaps in the last slide)

- Create the secret

```
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
data:
  username: YWRtaW4=  # base64 encoded 'admin'
  password: cGFzc3dvcmQ=  # base64 encoded 'password'

```

- Create the pod

```
apiVersion: v1
kind: Pod
metadata:
  name: secret-env-pod
spec:
  containers:
  - name: my-container
    image: busybox
    command: ["/bin/sh", "-c", "echo Username: $USERNAME; echo Password: $PASSWORD; sleep 3600"]
    env:
    - name: USERNAME
      valueFrom:
        secretKeyRef:
          name: my-secret
          key: username
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: my-secret
          key: password
```

# ConfigMaps vs Secrets

- Creating a ConfigMap

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: example-config
data:
  key1: value1
  key2: value2
```

- Creating a Secret

```
apiVersion: v1
kind: Secret
metadata:
  name: example-secret
data:
  password: cGFzc3dvcmQ=
  apiKey: YXBpa2V5
```

### Key differences

- **Purpose and Usage:**

  - **Secrets:** Designed specifically to store sensitive data such as passwords, OAuth tokens, and SSH keys.
  - **ConfigMaps:** Used to store non-sensitive configuration data, such as configuration files, environment variables, or command-line arguments.

* **Base64 Encoding:**

  - **Secrets:** The data stored in Secrets is base64 encoded. This is not encryption but simply encoding, making it slightly obfuscated. This encoding allows the data to be safely transmitted as part of JSON or YAML files.
  - **ConfigMaps:** Data in ConfigMaps is stored as plain text without any encoding.

- **Volatility and Updates:**

  - **Secrets:** Often, the data in Secrets needs to be rotated or updated more frequently due to its sensitive nature.
  - **ConfigMaps:** Configuration data typically changes less frequently compared to sensitive data.

* **Kubernetes Features:**

  - **Secrets:** Kubernetes provides integration with external secret management systems and supports encryption at rest for Secrets when configured properly. Ref <https://secrets-store-csi-driver.sigs.k8s.io/concepts.html#provider-for-the-secrets-store-csi-driver>
  - **ConfigMaps:** While ConfigMaps are used to inject configuration data into pods, they do not have the same level of support for external management and encryption.

# Adding https using cert-manager

Ref - <https://cert-manager.io/>

Try installing a certificate for a domain name of your own before tomorrows class

Maybe get a domain name from namecheap for cheap - <https://www.namecheap.com/>

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7df3a56e-7237-49cb-aad1-cad6e06807e5%2FScreenshot_2024-06-08_at_3.32.01_PM.png?table=block&id=9379b855-0c7b-4439-a320-ad234a055d0d&cache=v2 "notion image")

# Volumes in docker

### Pretext

The following docker image runs a Node.js app that writes peridically to the filesystem -&#x20;

<https://hub.docker.com/r/100xdevs/write-random>

Nodejs Code

```
const fs = require('fs');
const path = require('path');

// Function to generate random data
function generateRandomData(length) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Write random data to a file
function writeRandomDataToFile(filePath, dataLength) {
    const data = generateRandomData(dataLength);
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data written to file', filePath);
        }
    });
}

// Define the file path and data length
const filePath = path.join(__dirname, '/generated/randomData.txt');
const dataLength = 100; // Change this to desired length of random data

// Write random data to file every 10 seconds
setInterval(() => {
    writeRandomDataToFile(filePath, dataLength);
}, 10000); // 10000 ms = 10 seconds

// Keep the script running
console.log('Node.js app is running and writing random data to randomData.txt every 10 seconds.');

```

### Run it in docker

Try running the image above in your local machine

```
docker run 100xdevs/write-random
```

Try going to the container and seeing the contents of the container

```
docker exec -it container_id /bin/bash
cat randomData.txt
```

### Where is this file being stored?

The data is stored in the `docker runtime filesystem` . When the container dies, the data dies with it. This is called `ephemeral storage`

## Volumes in docker

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9d922c45-c39d-4161-a822-c87bfbfd0bff%2FScreenshot_2024-06-09_at_3.12.13_AM.png?table=block&id=453fcb91-1681-44f9-91ab-ababd8fbc091&cache=v2 "notion image")

If you want to persist data across container stops and starts, you can use Volumes in Docker

#### Bind mounts

Replace the mount on the left with a folder on your own machine

```
docker run -v /Users/harkiratsingh/Projects/100x/mount:/usr/src/app/generated 100xdevs/write-random
```

#### Volume Mounts

- Create a volume

```
docker volume create hello
```

- Mount data to volume

```
docker run -v hello:/usr/src/app/generated 100xdevs/write-random
```

If you stop the container in either case, the `randomFile.txt` file persists

# Volumes in kubernetes

Ref - <https://kubernetes.io/docs/concepts/storage/volumes/>

### Volumes

In Kubernetes, a Volume is a directory, possibly with some data in it, which is accessible to a Container as part of its filesystem. Kubernetes supports a variety of volume types, such as EmptyDir, PersistentVolumeClaim, Secret, ConfigMap, and others.

#### Why do you need volumes?

- If two containers in the same `pod` want to share data/fs.

  - ![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F25db4dd7-1c84-4702-b3d6-e02bd5743192%2FScreenshot_2024-06-09_at_4.49.05_PM.png?table=block&id=77bf37d1-b894-415d-a67b-45eaec9021ae&cache=v2 "notion image")

* If you want to create a database that persists data `even when` a container restarts (creating a DB)

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1272c4b1-66e4-49a9-bb2c-1834b08f40f3%2FScreenshot_2024-06-09_at_4.15.10_AM.png?table=block&id=cf7271bf-2d66-49fc-a3ad-1553cd695cc2&cache=v2 "notion image")

- Your `pod` just needs extra space during execution (for caching lets say) but doesnt care if it persists or not.

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa4fc860e-e4ff-41ec-8d91-39474edcde74%2FScreenshot_2024-06-09_at_4.50.28_PM.png?table=block&id=f5f64c2b-2c04-42d0-a042-b7c401a87ef6&cache=v2 "notion image")

## Types of volumes

### Ephemeral Volume

Temporary volume that can be shared amongst various containers of a pod. When the pods dies, the volume dies with it.

For example -&#x20;

1. ConfigMap

1) Secret

1. emptyDir

### Persistent Volume

A Persistent Volume (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes. It is a resource in the cluster just like a node is a cluster resource. PVs are volume plugins like Volumes but have a lifecycle independent of any individual Pod that uses the PV. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.

### Persistent volume claim

A Persistent Volume Claim (PVC) is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., can be mounted once read/write or many times read-only).

# Ephemeral volumes

A lot of times you want two containers in a pod to share data. But when the pods dies, then the data can die with it.&#x20;

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fac3ff6c0-0653-4efb-92b9-07d4e66700ed%2FScreenshot_2024-06-09_at_4.35.14_PM.png?table=block&id=3664cbc2-f117-4625-a031-b256a80b3653&cache=v2 "notion image")

#### Setup

- Create a manifest that starts two pods which share the same volume

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shared-volume-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: shared-volume-app
  template:
    metadata:
      labels:
        app: shared-volume-app
    spec:
      containers:
      - name: writer
        image: busybox
        command: ["/bin/sh", "-c", "echo 'Hello from Writer Pod' > /data/hello.txt; sleep 3600"]
        volumeMounts:
        - name: shared-data
          mountPath: /data
      - name: reader
        image: busybox
        command: ["/bin/sh", "-c", "cat /data/hello.txt; sleep 3600"]
        volumeMounts:
        - name: shared-data
          mountPath: /data
      volumes:
      - name: shared-data
        emptyDir: {}
```

- Apply the manifest

```
kubectl apply -f kube.yml
```

- Check the reader container and see if you can see the volume data in there

```
kubectl exec -it shared-volume-deployment-74d67d6567-tcdsl --container reader sh
```

# Persistent volumes

Just like our kubernetes cluster has `nodes` where we provision our `pods`.

We can create `peristent volumes` where our `pods` can `claim` (ask for) storage

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1272c4b1-66e4-49a9-bb2c-1834b08f40f3%2FScreenshot_2024-06-09_at_4.15.10_AM.png?table=block&id=b31a103f-3d0c-4be9-894c-802cbe7bda58&cache=v2 "notion image")

Persistent volumes can be provisioned statically or dynamically.

# Static persistent volumes

### Creating a NFS

NFS is one famous implementation you can use to deploy your own persistent volume

I’m running one on my aws server -&#x20;

```
version: '3.7'

services:
  nfs-server:
    image: itsthenetwork/nfs-server-alpine:latest
    container_name: nfs-server
    privileged: true
    environment:
      SHARED_DIRECTORY: /exports
    volumes:
      - ./data:/exports:rw
    ports:
      - "2049:2049"
    restart: unless-stopped
```

💡

Make sure the 2049 port on your machine is open

### Creating a pv and pvc

Create a persistent volume claim and persistent volume

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /exports
    server: 52.66.197.168
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: nfs

```

### Create a pod

```
apiVersion: v1
kind: Pod
metadata:
  name: mongo-pod
spec:
  containers:
  - name: mongo
    image: mongo:4.4
    command: ["mongod", "--bind_ip_all"]
    ports:
    - containerPort: 27017
    volumeMounts:
    - mountPath: "/data/db"
      name: nfs-volume
  volumes:
  - name: nfs-volume
    persistentVolumeClaim:
      claimName: nfs-pvc
```

### Try it out

- Put some data in mongodb

```
kubectl exec -it mongo-pod -- mongo
use mydb
db.mycollection.insert({ name: "Test", value: "This is a test" })
exit
```

- Delete and restart the pod

```
kubectl delete pod mongo-pod
kubectl apply -f mongo.yml
```

- Check if the data persists

```
kubectl exec -it mongo-pod -- mongo
use mydb
db.mycollection.find()
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7a2e2f0a-060b-4050-9f28-b02d5b34f81f%2FScreenshot_2024-06-09_at_5.38.39_PM.png?table=block&id=78c640ac-9ba7-44e7-8a66-31efd6421636&cache=v2 "notion image")

# Automatic pv creation

Ref - <https://docs.vultr.com/how-to-provision-persistent-volume-claims-on-vultr-kubernetes-engine>

- Create a persistent volume claim with storageClassName set to `vultr-block-storage-hdd`

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: csi-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 40Gi
  storageClassName: vultr-block-storage-hdd
```

- Apply the pod manifest

```
apiVersion: v1
kind: Pod
metadata:
  name: mongo-pod
spec:
  containers:
  - name: mongo
    image: mongo:4.4
    command: ["mongod", "--bind_ip_all"]
    ports:
    - containerPort: 27017
    volumeMounts:
    - name: mongo-storage
      mountPath: /data/db
  volumes:
  - name: mongo-storage
    persistentVolumeClaim:
      claimName: csi-pvc
```

- Explore the resources created

```
kubectl get pv
kubectl get pvc
kubectl get pods
```

- Put some data in mongodb

```
kubectl exec -it mongo-pod -- mongo
use mydb
db.mycollection.insert({ name: "Test", value: "This is a test" })
exit
```

- Delete and restart the pod

```
kubectl delete pod mongo-pod
kubectl apply -f mongo.yml
```

- Check if the data persists

```
kubectl exec -it mongo-pod -- mongo
use mydb
db.mycollection.find()
```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7a2e2f0a-060b-4050-9f28-b02d5b34f81f%2FScreenshot_2024-06-09_at_5.38.39_PM.png?table=block&id=b90c9458-c9e5-4481-9eda-4117ed64f63a&cache=v2 "notion image")
