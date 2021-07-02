# PlatformKit UI

### Overview

PlatformKit UI is a **static site generator** built with [VueJS](https://www.vuejs.org), [BootstrapVue](https://bootstrap-vue.org) and [Gridsome](https://www.gridsome.org).

[Get the source on GitHub](https://github.com/platform-kit/platformkit-ui).

### Key Features

- **Publishing:** Publish content & sell access via subscriptions OR on a per-item basis
- **E-Commerce:** Sell products, services, & subscriptions via Stripe or 3rd Party services
- **Marketing:** Create landing pages & track results via the built-in (zero-config) analytics API
- **Security**: Protect paid content/pages behind a secure API that requires login & a valid subscription

### Comparisons

| Feature                       | PlatformKit  | Ghost         | Wordpress | Strapi     | Forestry     | Contentful    | 
| ----------------------------- | ------------ | ------------- | --------- | ---------- | ------------ | ------------- |  
| Open Source                   | ✅           | ✅             | ✅        | ✅         | ❌            | ❌            |
| Zero Config/Development Time  | ✅           | ✅             | ✅        | ❌         | ❌            | ❌            |
| Content Subscriptions         | ✅           | ✅             | ❌        | ❌         | ❌            | ❌            |
| Content Sales (ala-carte)     | ✅           | ❌             | ❌        | ❌         | ❌            | ❌            |
| Custom Content Models         | ✅           | ❌             | ❌        | ✅         | ✅            | ✅            |
| Landing Pages                 | ✅           | ❌             | ✅        | ❌         | ❌            | ❌            |
| Serverless Architecture       | ✅           | ❌             | ❌        | ❌         | ✅            | ✅            |
| Passwordless Login            | ✅           | ❌             | ❌        | ❌         | ❌            | ❌            |
| Analytics                     | ✅           | ❌             | ❌        | ❌         | ❌            | ❌            |
| Static Files (Git-based)      | ✅           | ❌             | ❌        | ❌         | ✅            | ❌            |

### Benefits
- **For Founders**
  - No Platform Lock-In (adopt Serverless Node/Lambda functions without comitting to a cloud platform).
  - No CMS Lock-In (your content lives as static files in your own GitHub account).
  - Zero Time-to-Launch on marketing, sales, payments, and user authentication. 
- **For Developers**
  - Pre-Built Pages & Templates
    - Marketing: Landing Pages.
    - Sales: Product Pages / Checkout.
    - Content: Audio / Video or Text Articles.
  - Pre-Installed Authentication
    - Passwordless Login via Email / Magic Link / JWT    
  - Decoupled (Headless) Architecture
    - Deploy the front-end and the back-end together OR...
    - Deploy the backend alone, OR....
    - Deploy the backend alongside the front-end of your choice.
- **For Marketers**
  - Content Management
    - Edit static content (json/markdown) from any number of repositories.
    - Specify custom data models (input validation schemas) per-collection.
    - Specify custom browse/read/edit/add/delete permissions per-collection.
- **For Sales People**
  - Sell subscriptions via Stripe.
  - Restrict access to content / API endpoints based on the users' subscriptions.
- **For DevOps**
  - Instant Updates
    - Changes to your content are reflected immediately.
    - No need to rebuild the website = lower costs.
  - Infinite Scalability
    - Scale globally without worries of outages / attacks.
    - The static front-end can deployed "to the edge" (CDN).
    - The API can scale infintely via serverless architecture.
- **For Administrators**
  - User Management
    - Assign Tags, Roles, & Permissions from the Admin UI. 
  - Analytics API
    - Capture analytics with complex JSON data structures.

### 1-Click Deployment

To deploy to the cloud, simply click one of the buttons below...

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/platformkit-ui" target="_blank"><img src="https://www.herokucdn.com/deploy/button.svg" height="35"></a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/platformkit-api" target="_blank"><img src="https://render.com/images/deploy-to-render-button.svg" height="35"></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/platformkit-api/tree/main" target="_blank"><img src="https://www.deploytodo.com/do-btn-blue.svg" height="35"></a> <a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/platformkit-ui" target="_blank"><img height="35" src="https://www.netlify.com/img/deploy/button.svg"></a> 

Note: if you deploy to Netlify, you will have to provision a database manually.



