---
Title: Messenger
Description: Self-Hosted Audio/Video/Text Chat
---
<h1 align="center">PlatformKit Messenger</h1>

<p align="center">
Self-Hosted Audio/Video/Text Chat
</p>

<p>Peer-to-peer video, audio & text chat via WebRTC. Group video calls are achieved using WebRTC mesh. So the quality of the call is inversely proportional to the number of people on the call. The sweet number is somewhere around 6 to 8 people on an average high-speed connection.</p>

**Built with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Node.js-ebf5fb?style=for-the-badge&logo=nodedotjs"/>
<img src="https://img.shields.io/badge/Express.js-ebf5fb?style=for-the-badge&logo=express&logoColor=000" />
<img src="https://img.shields.io/badge/Vue.js-ebf5fb?style=for-the-badge&logo=vuedotjs" />
</p>

**Deploy with:** <br> 
<p float="left">
<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/> <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> 
</p>

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge"/><img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

## Features

- Free peer-to-peer audio calls, video calls, screensharing and chat via WebRTC
- Connect to private STUN/TURN servers via Twilio
- UI & API can be easily customized

## Local Development

Clone the project

```bash
  git clone https://github.com/platform-kit/messenger pk-messenger
```

Go to the project directory

```bash
  cd pk-messenger
```

Install dependencies

```bash
  npm install 
```

Start the server

```bash
  npm run start
```

Alternatively you can run the application using docker with: 

```bash
  docker-compose up
```

A local instance is now running at `https://localhost:3000`

## Configuration

Before use, you will need to add the following environment variables to your .env file

```env
ALLOWED_ORIGIN=localhost:3000
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

## Deployment

To deploy to the cloud, simply click one of the buttons below.

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/messenger" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/messenger/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/messenger" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a> 