---
Title: Auth
Description: Self-Hosted Authentication
Repository: https://github.com/platform-kit/auth
Icon: person-badge
Website: https://auth.platformkit.com
CTA: <a href='https://auth.platformkit.com' target='_blank'>Click here</a> to try it out!
---

<h1 align="center">PlatformKit Auth</h1>

<p align="center">
Self-Hosted Authentication
</p>

<p align="center">Securely sign-in to over 500 platforms.</p>

<div align="center">
    <img src="https://raw.githubusercontent.com/platform-kit/auth/master/docs/images/screenshot.png" style="border-radius:4px; margin:auto;max-width:300px;" class="raised"  width="400"/>
</div>

**Connects with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Email-ebf5fb?style=for-the-badge&logo=minutemailer"/>
<img src="https://img.shields.io/badge/Google-ebf5fb?style=for-the-badge&logo=google"/>
<img src="https://img.shields.io/badge/Github-ebf5fb?style=for-the-badge&logo=GitHub&logoColor=000"/>
<img src="https://img.shields.io/badge/Facebook-ebf5fb?style=for-the-badge&logo=facebook"/>
<img src="https://img.shields.io/badge/Instagram-ebf5fb?style=for-the-badge&logo=instagram"/>
<img src="https://img.shields.io/badge/Twitter-ebf5fb?style=for-the-badge&logo=twitter"/>
<img src="https://img.shields.io/badge/LinkedIn-ebf5fb?style=for-the-badge&logo=linkedin&logoColor=326eb8"/>
<img src="https://img.shields.io/badge/Youtube-ebf5fb?style=for-the-badge&logo=youtube&logoColor=red"/>
<img src="https://img.shields.io/badge/Reddit-ebf5fb?style=for-the-badge&logo=reddit"/>
<img src="https://img.shields.io/badge/Pinterest-ebf5fb?style=for-the-badge&logo=Pinterest&logoColor=red"/>
</p>

**Built with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Node.js-ebf5fb?style=for-the-badge&logo=nodedotjs"/>
<img src="https://img.shields.io/badge/Express.js-ebf5fb?style=for-the-badge&logo=express&logoColor=000" />
<img src="https://img.shields.io/badge/Passport.js-ebf5fb?style=for-the-badge&logo=passport" />
<img src="https://img.shields.io/badge/Vue.js-ebf5fb?style=for-the-badge&logo=vuedotjs" />
<img src="https://img.shields.io/badge/Nuxt-ebf5fb?style=for-the-badge&logo=nuxt.js"/>
<img src="https://img.shields.io/badge/Bootstrap-ebf5fb?style=for-the-badge&logo=bootstrap"/>
</p>

**Deploy with:** <br>

<p float="left">
<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/> <img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white"/> 
</p>

**License:** <br> <img src="https://img.shields.io/badge/License-000000?style=for-the-badge&logo=git"/> <img src="https://img.shields.io/badge/MIT-222?style=for-the-badge&logoColor=white"/>

## Features

- Single Sign-On & passwordless login for any app or framework
- Beautiful, minimal UI included out of the box
- UI & API can be easily customized

## Local Development

Clone the project

```bash
  git clone https://github.com/platform-kit/auth pk-auth
```

Go to the project directory

```bash
  cd pk-auth
```

Install dependencies

```bash
  npm install && npm run preinstall && npm run prebuild
```

Start the server

```bash
  npm run dev
```

A local instance is now running at `https://localhost:3000`

### Configuration

Before use, you will need to add the following environment variables to your .env file

```env
# Environment
ENVIRONMENT=development
SESSION_SECRET=xxxxx

# Branding
LOGO=https://www.example.com/logo.png
BYLINE=Auth by PlatformKit
BYLINE_LINK=https://github.com/platform-kit/auth

# Repository for custom UI/Routes
REPO=https://www.github.com/{username}/{repo}
BUILD_COMMAND="npm run build"
UI_DIRECTORY="dist"
ROUTES_DIRECTORY="routes"
DEV_PATH=localhost:4000

# Redirects
ALLOWED_DOMAINS=https://localhost:4000,https://localhost:3000

# E-mail
MAGIC_LINK_SECRET=xxxxx
MAIL_USER=user@example.com
MAIL_SENDER=user@example.com
MAIL_KEY=password
MAIL_HOST=smtp.xxx.xxx
MAIL_PORT=587

# Facebook
FACEBOOK_CLIENT_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_SCOPES=email,pages_show_list,pages_read_engagement,instagram_content_publish,instagram_basic,pages_show_list

# Instagram
FACEBOOK_CLIENT_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_SCOPES=email,pages_show_list,pages_read_engagement,instagram_content_publish,instagram_basic,pages_show_list

# Twitter
TWITTER_APP_ID=
TWITTER_CONSUMER_API_KEY=
TWITTER_CONSUMER_API_SECRET=

# LinkedIn
LINKEDIN_API_KEY=
LINKEDIN_SECRET_KEY=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Youtube
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=

# Pinterest
PINTEREST_APP_ID=
PINTEREST_APP_SECRET=
PINTEREST_SCOPES=user_accounts:read,pins:read,pins:write,boards:write,boards:read

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Integration

### Iframe Method

Embed the app in an iframe within your website/app. The end-user will go through the login flow entirely through the embedded endpoint. If the login is successful, the user will be redirected to a `/succcess` endpoint where the `token` and a `secret` are represented as the `t` and `s` URL query parameters.

Example:

```
https://localhost:3000/success?t=abcdefg&s=1234567
```

Using the Javascript framework/method of your choice, you can monitor the iframe for the presence of this information, and scrape it/close the iframe accordingly when it appears.

### Redirect Method

Say you have deployed an instance of `platform-kit/auth` to `https://auth.example.com` and you want to use it from a web app at `https://app.example.com`.

First, make sure you have added the desired domain to the `ALLOWED_DOMAINS` environment variable, like so.

```env
ALLOWED_DOMAINS=https://app.example.com
```

Then in your app, create a login button that links to `https://auth.example.com?redirect=https://www.app.example.com`

If the login attempt succeeds, the user will be redirected to the redirect url, with the login data in the URL query parameters:

`https://app.example.com?t=abcdefg&s=1234567`

### Embedded UI

If you use a [static site generator](https://jamstack.org/generators/), you can deploy and serve your app directly on the same server as the `auth` instance.
Simply provide the `REPO`, `BUILD_COMMAND`, and `UI_DIRECTORY` environment variables. You will then be able to detect and capture the token without the need for redirects to another domain or subdomain.

### Dynamic Options

If you want to limit the options available to the user, simply pass a `platforms` parameter in the url. For example, if you only wanted to show the user the Facebook button and the Instagram button, you'd add `platforms=facebook,instagram` - like so:

https://auth.platformkit.com/?platforms=mail,google,github

https://auth.platformkit.com/?platforms=facebook,instagram,twitter,reddit,youtube,pinterest

## Deployment

To deploy to the cloud, simply click one of the buttons below.

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/auth" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/auth/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/auth" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a>
