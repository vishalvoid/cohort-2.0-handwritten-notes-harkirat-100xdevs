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
