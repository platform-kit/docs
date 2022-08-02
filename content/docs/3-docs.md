---
Title: Docs
Description: Static Documentation
Repository: "https://github.com/platform-kit/docs"
Icon: book
CoverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80"
CoverContent: <h1>Self-Hosted Documentation</h1><h4>Open-Source GitBook Alternative</h4><code class='d-table br-5 bg-dark p-1 px-2 mt-5 mx-auto'>git clone https://github.com/platform-kit/docs</code>
FeedbackLabel: How about those features, though?
TextAreaDemo: "This is a multi-line value wrapped in quotes which should appear in a textarea input: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
---
<h1 align="center">PlatformKit Docs</h1>

<p align="center">
Static Documentation Generator
</p>

<p align="center">
Search, analytics, pdf export, & offline mode.
</p>

<div align="center">
    <img src="https://raw.githubusercontent.com/platform-kit/docs/master/assets/images/screenshot.png" style="border-radius:4px; margin:auto;max-width:300px;" class="raised" width="400"/>
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
- Premium Content (requires login)
- Custom Per-Page Call To Action
- Code syntax highlighting
- Zero-config analytics
- Emoji based feedback
- Export docs as PDF
- Markdown based CMS
## Screenshots

<div align="center">

<div class="badge badge-primary my-3">Premium Content</div><br>
<img src="https://raw.githubusercontent.com/platform-kit/docs/master/assets/images/premium-content.png" class="border raised" width="400"/>
<br>
	
<div class="badge badge-primary my-3">User Feedback</div><br>
<img src="https://raw.githubusercontent.com/platform-kit/docs/master/assets/images/feedback.gif" width="400" class="border raised"/>
<br>

<div class="badge badge-primary my-3">Call To Action</div><br>
<img src="https://raw.githubusercontent.com/platform-kit/docs/master/assets/images/cta.png" width="400" class="border raised" />
<br>	

</div>


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

A local instance is now running at `http://localhost:8000`

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

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/docs" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Heroku→-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/docs/tree/main" target="_blank"><img src="https://img.shields.io/badge/Deploy%20to%20Digital_Ocean→-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" /> </a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/docs" target="_blank"> <img src="https://img.shields.io/badge/Deploy%20to%20Render→-46E3B7?style=for-the-badge&logo=Render&logoColor=fff"/> </a>

## Examples

### Premium Content

[This page](/#/examples/auth) is an example authentication / premium content (this content only shows up if you're logged in.)

### No Cover Page

[This page](/#/examples/no-cover) is an example of a what a typical markdown doc would look like if no cover image is specified. Still quite beautiful!

### No Feedback

[This page](/#/examples/no-feedback) is an example of a what a page looks like if the `Feedback` field is set to `false`.