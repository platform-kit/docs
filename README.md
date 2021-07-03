# PlatformKit UI

### Overview

PlatformKit UI is a **static site generator**  and **serverless content management system**. 

Front-End: [VueJS](https://www.vuejs.org), [BootstrapVue](https://bootstrap-vue.org) and [Gridsome](https://www.gridsome.org).

Back-End: [NodeJS](https://nodejs.org/en/) and [Lambda-Local](https://www.npmjs.com/package/lambda-local).

The [source code](https://github.com/platform-kit/platformkit-ui) is available on GitHub.

### Key Features

- **Publishing:** Publish content & sell access via subscriptions OR on a per-item basis
- **E-Commerce:** Sell products, services, & subscriptions via Stripe or 3rd Party services
- **Marketing:** Create landing pages & track results via the built-in (zero-config) analytics API
- **Security**: Protect paid content/pages behind a secure API that requires login & a valid subscription

### Comparisons


<table>
  <tr style="font-weight:bold;">
    <td><b>Feature</b></td>
    <td><b>PlatformKit</b></td>
    <td><b>Ghost</b></td>
    <td><b>Wordpress</b></td>
    <td><b>Strapi</b></td>
    <td><b>Forestry</b></td>
    <td><b>Contentful</b></td>
  </tr>
  <tr>
    <td colspan="1">Headless CMS</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
  </tr>
    <tr>
    <td colspan="1">Custom Content Types</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
  </tr>
  <tr>
    <td colspan="1">Open Source</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Front-End Included (Optional)</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Landing Pages</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Content Subscriptions</td>
    <td colspan="1">✅</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>  
  <tr>
    <td colspan="1">E-Commerce</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Serverless Architecture</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Extensible API</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Static Site Generator</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Built-In Analytics</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Passwordless Login</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">User Roles / Permissions</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
  </tr>
  <tr>
    <td colspan="1">Static Files (Git-Based)</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">❌</td>
    <td colspan="1">✅</td>
    <td colspan="1">❌</td>
  </tr>
</table>

### Benefits
- **For Content Creators**
  - LAUNCH IMMEDIATELY: publish, market, and sell your content within minutes of deployment.
- **For Startups**
  - SPEED: Instantly generate content, marketing, & sales pages, so you can focus on your core.
  - AGILITY: adopt JAMStack without comitting to a particular cloud platform or framework.
  - OWNERSHIP: your content lives as static files in your own GitHub account.
- **For Developers**
  - SECURITY: Authentication via Email ("Magic Links")
    - Easily integrate passwordless login into your app or website 
  - FLEXIBILITY: Decoupled/Headless Architecture allows 3 deployment scenarios:
    - Deploy the backend (CMS & API) alone
    - Deploy the back-end with the default front-end
    - Deploy the backend with the front-end framework/generator of your choice
- **For Publishers**
  - CUSTOMIZATION: Build a custom-designed content platform
    - Manage static content (json/markdown) from any number of repositories
    - Design custom data models (input validation schemas) per-collection
    - Specify custom access rules (required roles/permissions) per-collection
  - Analytics API
    - Automatically track page views, content views, etc, out of the box
    - Capture custom analytics events with any data structure
- **For Sales People**
  - Sell subscriptions via Stripe
  - Develop detailed customer personas with interests & tags  
- **For DevOps**
  - Instant Updates
    - Changes to your content are reflected immediately.
    - No need to rebuild the website = lower costs.
  - GLOBAL SCALABILITY: never worry about outages or traffic spikes
    - The static front-end can deployed "to the edge" (global CDN)
    - The API can scale infintely, automatically
- **For Administrators**
  - User Management
    - Assign Tags, Roles, & Permissions from the Admin UI. 
    - Ban / Unban users  

### 1-Click Deployment

To deploy to the cloud, simply click one of the buttons below...

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/platformkit-ui" target="_blank"><img src="https://www.herokucdn.com/deploy/button.svg" height="35"></a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/platformkit-api" target="_blank"><img src="https://render.com/images/deploy-to-render-button.svg" height="35"></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/platformkit-api/tree/main" target="_blank"><img src="https://www.deploytodo.com/do-btn-blue.svg" height="35"></a> <a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/platformkit-ui" target="_blank"><img height="35" src="https://www.netlify.com/img/deploy/button.svg"></a> 

Note: if you deploy to Netlify, you will have to provision a database manually.



