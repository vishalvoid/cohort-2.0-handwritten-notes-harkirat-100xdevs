# Kubernetes Cluster Configuration (clusters.yml)

A clusters.yml file defines the configuration for Kubernetes clusters, typically used with cluster management tools like Kind, k3d, or cluster API.

## Common Components

- **apiVersion**: API version for the cluster configuration
- **kind**: Type of resource (Cluster)
- **metadata**: Cluster name and labels
- **spec**: Cluster specifications and configurations

## Basic Example

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: multi-node-cluster
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
  - role: worker
  - role: worker
```

## Key Features

1. Node configuration
2. Control plane settings
3. Network policies
4. Storage configuration
5. Security settings

## Best Practices

- Define resource limits
- Configure high availability
- Set up proper networking
- Enable monitoring
- Implement security policies

## Common Use Cases

1. Development environments
2. Testing clusters
3. CI/CD pipelines
4. Local Kubernetes development
5. Multi-node setups

# Kubernetes Manifests (manifest.yml)

A manifest file in Kubernetes is a YAML file that describes the desired state of resources in a cluster. It can contain one or multiple resource definitions.

## Structure Components

- **apiVersion**: API version for the resource
- **kind**: Type of resource (Pod, Deployment, Service, etc.)
- **metadata**: Resource identification and labels
- **spec**: Resource specifications and configurations

## Basic Example

```yaml
# Pod manifest
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: myapp-container
      image: nginx:latest
      ports:
        - containerPort: 80
---
# Service manifest
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

## Best Practices

- Use version control for manifests
- Implement resource limits
- Add meaningful labels and annotations
- Use multi-document YAML files
- Include resource requests
- Document configuration choices

## Common Resource Types

1. Pods
2. Deployments
3. Services
4. ConfigMaps
5. Secrets
6. Volumes
7. Ingress
