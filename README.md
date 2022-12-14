<h1 align="center">PlatformKit Docs</h1>

<p align="center">
Static Documentation Generator
</p>

<p align="center">
Search, analytics, pdf export, & offline mode.
</p>

<div align="center">
    <img src="https://raw.githubusercontent.com/platform-kit/docs/master/assets/images/screenshot.png" style="border-radius:4px; margin:auto;max-width:300px;"  width="400"/>
</div>


**Built with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Node.js-ebf5fb?style=for-the-badge&logo=nodedotjs"/>
<img src="https://img.shields.io/badge/Vue.js-ebf5fb?style=for-the-badge&logo=vuedotjs" />
<img src="https://img.shields.io/badge/Nuxt.js-ebf5fb?style=for-the-badge&logo=nuxt.js" />
<img src="https://img.shields.io/badge/Bootstrap-ebf5fb?style=for-the-badge&logo=bootstrap" />
</p>

**Deploy with:** <br> 
<p float="left">
<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/> <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> 
</p>

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge&logo=git"/> <img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

## Features

- Generate beautiful, searchable docs from [Markdown](https://www.markdownguide.org) files
- Frontmatter support (title, description, git repo, website)
- Progressive Web App (works offline)
- Automated reading time estimates
- Code syntax highlighting
- Zero-config analytics
- Emoji based feedback
- Export docs as PDF


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
  npm run dev
```

A local instance is now running at `https://localhost:3000`

### Configuration

Before use, you will need to add the following environment variables to your .env file

```env
REPO=
SITE_NAME=
BUILD_COMMAND=
CONTENT_DIRECTORY=
```

## Deployment

To deploy to the cloud, simply click one of the buttons below.

Note: if you deploy to Netlify, you will have to provision a database manually.

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/docs" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku???-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/docs/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean???-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/docs" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render???-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a> 






