## **What are Backend Servers**

&#x20;You might have used express to create Backend server. The way it usually is node index.js which starts a process on a certain port ( 3000 ) for example.&#x20;

**When you have to deploy it on Internet, There are few ways :**&#x20;

1.  Go to Aws, GCP, Azure, Cloudflare.

    1.  &#x20;Renat a VM (Virtual Machine) and deploy your app.

    2.  Put it in a n autoscaling group

    3.  Deploy it in a Kubernates cluster.&#x20;

2.  There are some downsides of doing that -

    1.  Taking care or how/when to scale

    2.  Base cost even if no one is visiting your website.&#x20;

    3.  Monitoring various servers to make sure no server is down.&#x20;

**What is you write a code and someone else could take care of all these problems ?**&#x20;

### What are Serverless Backends.&#x20;

"Serverless" is a backend deployment in which the cloud provider dynamically manages the allocation and provisioning of servers. The term "serverless" doesn't mean there is no server involved. Instread, it means that developers and operators do not have to worry about the servers.

**Easier Defination :**&#x20;

What if you could just write your express routes and run a command. The app would automatically.&#x20;

*   Deploy

*   Autoscale

*   Charge you on a per request basis (rather than you paying for vms)

**Problems with this approach :**&#x20;

1.  More exprensive at scale&#x20;

2.  cold start problem

### Famous Serverless Providers.&#x20;

*   AWS Lambda

*   Google Cloud Functions

*   Cloudflare Workers

### When Should you sue a Serverless architecture ?

1.  When you have to get off the ground fast and don't want to worry about deployments.

2.  When you can't anticipate the traffic and don't want to worry about autoscaling.

3.  if you have very low traffic and want to optimise for costs.&#x20;



