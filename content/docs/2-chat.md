---
Title: Chat
Description: Self-Hosted Web Conferencing
Repository: "https://github.com/platform-kit/chat"
Icon: chat-dots
Website: "https://talk.platformkit.com"
Cover: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80"
CoverContent: <h1>Self-Hosted Web Conferencing</h1><h4>Audio Chat, Video Chat, Text Chat, Screen Sharing & more.</h4><code class='d-table br-5 bg-dark p-1 px-2 mt-5 mx-auto'>git clone https://github.com/platform-kit/chat</code>
CTA: "<p>Honestly, it's better than Zoom!</p><p><a href='https://talk.platformkit.com' target='_blank'>Click here</a> to try it out.</p>"
CTAImage: "https://images.unsplash.com/photo-1617777934845-a818fd6e1bcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80"
---
<h1 align="center">PlatformKit Chat</h1>

<p align="center">
Self-Hosted Web Conferencing
</p>

<p align="center">
Peer-to-Peer Video Chat & Screen Sharing
</p>

<div align="center">
    <img src="https://raw.githubusercontent.com/platform-kit/chat/master/assets/images/screenshot.png" style="border-radius:4px; margin:auto;max-width:300px;" class="raised" width="400"/>
</div>

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

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge&logo=git"/> <img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

## Features

- Free peer-to-peer audio calls, video calls, screensharing and chat via WebRTC
- Connect to private STUN/TURN servers via Twilio
- UI & API can be easily customized

## Local Development

Clone the project

```bash
  git clone https://github.com/platform-kit/chat pk-chat
```

Go to the project directory

```bash
  cd pk-chat
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

### Configuration

Before use, you will need to add the following environment variables to your .env file

```env
ALLOWED_ORIGIN=localhost:3000
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

## Deployment

To deploy to the cloud, simply click one of the buttons below.

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/chat" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/chat/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/chat" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a>