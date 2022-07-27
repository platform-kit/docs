---
Title: Server
Description: Self-Hosted Serverless Infrastructure
---

<h1 align="center">PlatformKit Server</h1>

<p align="center">
Self-Hosted Serverless Infrastructure
</p>

<p align="center">Deploy serverless functions & static site generators via Express on any cloud platform.</p>

**Built with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Node.js-ebf5fb?style=for-the-badge&logo=nodedotjs"/>
<img src="https://img.shields.io/badge/Express.js-ebf5fb?style=for-the-badge&logo=express&logoColor=000" />
 <img src="https://img.shields.io/badge/Lambda-ebf5fb?style=for-the-badge&logo=awslambda&logoColor=000" /> 
</p>

**Deploy with:** <br> 
<p float="left">
<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/> <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> <img src="https://img.shields.io/badge/Lambda-orange?style=for-the-badge&logo=awslambda&logoColor=white" /> <img src="https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white" />
</p>

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge"/><img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

## Features

- Deploy **static site generator** with custom build commands.
- Deploy **serverless functions** on any major cloud provider.
- Deploy a **PostgreSQL database** with zero config.

## Benefits
- Prevents vendor lock-in (easily move to/from hosting platforms).
- Deploy your front-end, back-end, and database in one step.
- Predictable billing + configurable auto-scaling.
- Scale via serverless functions when necessary.

## Local Development

Clone the project

```bash
  git clone https://github.com/platform-kit/server pk-server
```

Go to the project directory

```bash
  cd pk-server
```

Install dependencies

```bash
  npm install && npm run pull && npm run build-functions && npm run build
```

Start the server

```bash
  npm run dev
```

A local instance is now running at `https://localhost:3000`

## Configuration

Before use, you will need to add the following environment variables to your .env file

The `GITHUB_REPOSITORY` variable is the repo containing your static site generator.

The `BUILD_COMMAND` is the command that is used to install/run your site generator.

The `PUBLIC_DIRECTORY` variable specifies which directory to serve.

The `GITHUB_TOKEN` is only necessary if your repo is private.

The `PORT` is 3000 by default, change it if 3000 is taken.

```
# GitHub
GITHUB_REPOSITORY=platform-kit/platformkit-ui
GITHUB_TOKEN=STRING

# Static Site Generator
BUILD_COMMAND=npm i; npm run build;
PUBLIC_DIRECTORY=dist
```


## Deployment

To deploy to the cloud, simply click one of the buttons below.

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/server" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/server/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/server" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a> 