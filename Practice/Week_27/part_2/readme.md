# Deployment.yml in Kubernetes

A Deployment in Kubernetes is a resource object that provides declarative updates for Pods and ReplicaSets. It's one of the most commonly used workload resources for deploying applications.

## Key Components

- **metadata**: Name and labels for the deployment
- **spec**: Desired state of the deployment
- **replicas**: Number of pod copies to run
- **selector**: How the deployment identifies pods to manage
- **template**: Pod template containing container specifications

## Basic Example

```yaml
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
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

# ReplicaSet in Kubernetes

A ReplicaSet ensures that a specified number of pod replicas are running at any given time. It's the next-generation version of ReplicationController and is recommended over it.

## Key Components of ReplicaSet

- **metadata**: Name and labels for the ReplicaSet
- **spec**: Contains the replica count and pod template
- **selector**: Defines how to identify pods to manage
- **template**: Defines the pod configuration

## Basic Example

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
  labels:
    app: guestbook
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
        - name: php-redis
          image: gcr.io/google_samples/gb-frontend:v3
```

## Key Features

1. Pod maintenance
2. Scaling capability
3. Pod template modifications
4. Label and selector matching

## Best Practices

- Use Deployments instead of directly using ReplicaSets
- Properly define selector labels
- Set appropriate replica counts
- Use resource limits for pods
- Implement proper health checks

## Common Use Cases

1. Application deployments
2. Rolling updates
3. Rollback to previous versions
4. Scaling applications
5. Auto-healing of pods

## Best Practices

- Always specify resource limits
- Use meaningful labels
- Configure health checks
- Set update strategies
- Use configMaps and secrets for configuration
