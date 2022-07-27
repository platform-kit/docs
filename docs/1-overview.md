<h1 align="center">PlatformKit Docs</h1>

<p align="center">
Static documentation generator and serverless CMS.
</p>

<p>Peer-to-peer video, audio & text chat via WebRTC. Group video calls are achieved using WebRTC mesh. So the quality of the call is inversely proportional to the number of people on the call. The sweet number is somewhere around 6 to 8 people on an average high-speed connection.</p>

**Connects with:** <br>

**Built with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Node.js-ebf5fb?style=for-the-badge&logo=nodedotjs"/>
<img src="https://img.shields.io/badge/Vue.js-ebf5fb?style=for-the-badge&logo=vuedotjs" />
<img src="https://img.shields.io/badge/Lambda-ebf5fb?style=for-the-badge&logo=awslambda" />
</p>

**Deploy with:** <br> 
<p float="left">
<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/> <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> 
</p>

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge"/><img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

## Features

- Generate docs from [Markdown](https://www.markdownguide.org) files in any number of repositories.
- Generate docs for any API via an [API Schema](https://www.platformkit.com/docs/API/the-api-schema) file.
- PWA & client-side search (works offline).

## Local Development

Clone the project

```bash
  git clone https://github.com/platform-kit/docs pk-docs
```

Go to the project directory

```bash
  cd pk-docs
```

Install dependencies

```bash
  npm install 
```

Start the server

```bash
  npm run develop
```

A local instance is now running at `https://localhost:8080`

## Configuration

Before use, you will need to add the following environment variables to your .env file

```env
GITHUB_REPO=
DOCS_PATH=docs
```

## Deployment

To deploy to the cloud, simply click one of the buttons below.

Note: if you deploy to Netlify, you will have to provision a database manually.

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/docs" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/docs/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/docs" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a> 






