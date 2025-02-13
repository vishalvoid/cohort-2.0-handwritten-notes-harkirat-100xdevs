# What is CI and CD?

#### Continuous Integration

Continuous Integration (CI) is a development practice where developers frequently integrate their code changes into a shared repository, preferably several times a day. Each integration is automatically verified by&#x20;

1. Building the project and&#x20;

1) Running automated tests.&#x20;

This process allows teams to detect problems early, improve software quality, and reduce the time it takes to validate and release new software updates.

#### Continuous Deployment

As the name suggests, deploying your code `continuously` to various environments (dev/stage/prod)



# Continuous Deployment in Github

We’ll be deploying a next.js app to EC2 servers via Docker

💡

You don’t really need Docker here, since it’s deploying on a simple EC2 server. If you deploy to  1. GCP App runner 2. ECS 3. Kubernetes then it makes more sense to deploy a `dockerised`

#### Architecture diagram

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F22c1c7b4-3fa2-46b4-80e0-49f8b66ea635%2FScreenshot_2024-03-20_at_8.51.20_PM.png?table=block\&id=c62fe199-6f4b-413d-8c68-4d5d465759e7\&cache=v2 "notion image")

💡

Last step keeps changing based on where you’re pushing your image



# Monorepo we’re dealing with today

<https://github.com/100xdevs-cohort-2/week-18-2-ci-cd>

This monorepo has 3 apps inside -&#x20;

1. bank-webhook

1) merchant-app

1. user-app

We’ll be deploying all three to the same ec2 instance



# How to create a CI/CD pipeline?

For Github, you can add all your pipelines to `.github/workflows`

For eg - <https://github.com/code100x/cms/blob/main/.github/workflows/lint.yml>

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F604e322e-77ba-4a33-a0ab-9252321ef0fa%2FScreenshot_2024-03-31_at_4.23.03_PM.png?table=block\&id=da42c1d0-4cb7-40a7-b7a6-c88914f2caeb\&cache=v2 "notion image")

 

#### CD pipelines look like this finally -

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fbb9b9e1f-5313-4c6a-a89d-00b699134969%2FScreenshot_2024-03-31_at_4.24.16_PM.png?table=block\&id=baad753d-9a8f-4b2f-8ee7-d34874cda47a\&cache=v2 "notion image")

 

Hint - Use <https://onlineyamltools.com/convert-yaml-to-json> to see the pipeline in json



# Step 1 - Create the CI pipeline

Make sure that whenever someone tries to create a PR, we build the project and make sure that it builds as expected

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7804a4e7-a34e-4796-8d26-5cb236c5d199%2FScreenshot_2024-03-31_at_6.50.45_PM.png?table=block\&id=ae992744-1143-4ebc-9848-de2ed6733ca6\&cache=v2 "notion image")



# Lets add a build pipeline for our repo

Anytime a user creates a PR, we need to run `npm run build` and only if it succeeds should the workflow succeed

 

* Fork the main repo - <https://github.com/100xdevs-cohort-2/week-18-2-ci-cd>

- Add `.github/workflows/build.yml`  in the root folder

* Create the workflow

```YAML
name: Build on PR

on:
  pull_request:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install Dependencies
        run: npm install
        
      - name: Run Build
        run: npm run build

```

* Push this to master branch

- Create a new branch with some minimal changes and create a PR from it

* You should see the workflow run

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fe66100ee-cdad-46d8-8b5b-0e97563aaf28%2FScreenshot_2024-03-31_at_4.37.16_PM.png?table=block\&id=6b012946-2705-4ae3-889d-d64fa8d0b112\&cache=v2 "notion image")



# Let’s add a deploy step

* Create dockerfiles for the `apps` you have

  * Create `docker/Dockerfile.user`
  * > ```YAML
    > FROM node:20.12.0-alpine3.19
    >
    > WORKDIR /usr/src/app
    >
    > COPY package.json package-lock.json turbo.json tsconfig.json ./
    >
    > COPY apps ./apps
    > COPY packages ./packages
    >
    > # Install dependencies
    > RUN npm install
    > # Can you add a script to the global package.json that does this?
    > RUN cd packages/db && npx prisma generate && cd ../..
    >
    > # Can you filter the build down to just one app?
    > RUN npm run build
    >
    > CMD ["npm", "run", "start-user-app"]
    > ```
  * Add `start-user-app` script to the root `package.json`
  * > ```
    > "start-user-app": "cd ./apps/user-app && npm run start"
    > ```

 

💡

You dont really need to build every app for every dockerfile. Can you change the build command so that only a single app is built for each dockerfile?

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F51df3aa8-aeaa-480b-ba8c-2199f4f024b2%2FScreenshot_2024-03-31_at_5.44.18_PM.png?table=block\&id=2610106d-6187-4732-9ab3-2d6de23e3918\&cache=v2 "notion image")

* Create the CD pipeline that

  * Clones the repo
  * Builds the docker image
  * Pushes the docker image
  * > ```YAML
    > name: Build and Deploy to Docker Hub
    >
    > on:
    >   push:
    >     branches:
    >       - master
    >
    > jobs:
    >   build-and-push:
    >     runs-on: ubuntu-latest
    >     steps:
    >     - name: Check Out Repo
    >       uses: actions/checkout@v2
    >
    >     - name: Log in to Docker Hub
    >       uses: docker/login-action@v1
    >       with:
    >         username: ${{ secrets.DOCKER_USERNAME }}
    >         password: ${{ secrets.DOCKER_PASSWORD }}
    >
    >     - name: Build and Push Docker image
    >       uses: docker/build-push-action@v2
    >       with:
    >         context: .
    >         file: ./Dockerfile
    >         push: true
    >         tags: 100xdevs/web-app:latest  # Replace with your Docker Hub username and repository
    >
    >     - name: Verify Pushed Image
    >       run: docker pull 100xdevs/web-app:latest  # Replace with your Docker Hub username and repository
    >
    > ```

- Make sure to add the `dockerhub` secrets to `github secrets`  of the repo (DOCKER\_USERNAME, DOCKER\_PASSWORD)

* You should see a workflow running

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F58c0244b-9fc2-4a73-bf6b-18e8c96186df%2FScreenshot_2024-03-31_at_5.58.58_PM.png?table=block\&id=f5fa90e6-b914-4fd7-a729-944a1b165902\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Faeeaea90-055b-4eae-814c-f0dc4d3f059f%2FScreenshot_2024-03-31_at_6.00.25_PM.png?table=block\&id=3e12a6d3-a563-4c14-a3f3-0bcf96e50061\&cache=v2 "notion image")

 

#### Check dockerhub to ensure the image has indeed reached there

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F12f5ab3c-a7e7-424f-99c6-358995e68649%2FScreenshot_2024-03-31_at_6.01.41_PM.png?table=block\&id=ab1aea6b-37b7-4313-93cb-758bda7687f2\&cache=v2 "notion image")

 

💡

You might have to inject more environment variables (like DB URL) in there for the build to work as expected



# Let’s pull the docker image

Ref - <https://github.com/appleboy/ssh-action>

* Create an ec2 server

  * Download its keypair file
  * Allow http/https traffic
  * Ubuntu base image

- Download docker on the machine

  * <https://docs.docker.com/engine/install/ubuntu/>
  * &#x20;sudo docker run hello-world

* Update workflow to pull the latest image on the ec2 machine&#x20;

```YAML
name: Build and Deploy to Docker Hub

on:
  push:
    branches:
      - master  # Adjusted to trigger on pushes to master

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
    - name: Check Out Repo
      uses: actions/checkout@v2

    - name: Prepare Dockerfile
      run: cp ./docker/Dockerfile.user ./Dockerfile

    - name: Log in to Docker Hub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and Push Docker image
      uses: docker/build-push-action@v2
      with:
        context: .
        file: ./Dockerfile
        push: true
        tags: 100xdevs/web-app:latest

    - name: Verify Pushed Image
      run: docker pull 100xdevs/web-app:latest

    - name: Deploy to EC2
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SSH_HOST }}
        username: ${{ secrets.SSH_USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          sudo docker pull 100xdevs/web-app:latest
          sudo docker stop web-app || true
          sudo docker rm web-app || true
          sudo docker run -d --name web-app -p 3005:3000 100xdevs/web-app:latest
```

* Point userapp.your\_domain.com to the IP of the server

- Add nginx reverse proxy to forward requests from userapp.your\_domain.com to port on which the app is running

```TypeScript

server {
        server_name userapp.100xdevs.com;

        location / {
            proxy_pass http://localhost:3005;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;


                # Basic Authentication
                auth_basic "Restricted Content";
                auth_basic_user_file /etc/nginx/.htpasswd;
        }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/userapp.100xdevs.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/userapp.100xdevs.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
```

* Install certbot and Refresh certificate

```TypeScript
sudo certbot --nginx
```

 

 

### Take home assignments

1. Get a DB on [`neon.tech`](http://neon.tech/) / `RDS`  / `Aeiven` and add a DB migration step to the DB

1) Pass in the DB credentials while starting the docker image

1. Start the docker image so that it restarts if it goes down (similar to pm2)

