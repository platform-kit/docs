# Docs Config

If the repo you've specified in your `GITHUB_REPO` environment variable includes a folder with markdown files, you may specify the path to those files in the `DOCS_PATH` environment variable.

Alternatively, if you'd like to track this in your codebase, you can use a `ui-schema.json` file in the root of your repository.

The schema look's something like this:

```
{
    "name": "PlatformKit",
    "siteName": "PlatformKit",
    "version": "0.0.1",
    "logos": {
        "light": "https://avatars.githubusercontent.com/u/54647524?v=4"
    },
    "icons": {
        "favicon": "https://avatars.githubusercontent.com/u/54647524?v=4",
        "touch": "https://avatars.githubusercontent.com/u/54647524?v=4"
    },
    "docs": {
        "collections": [
            {
                "name": "API",
                "prefix": "pka",
                "label": "PlatformKit API Docs",
                "repo": "https://github.com/platform-kit/platformkit-api",
                "path": "docs"
            },
            {                
                "name": "UI",
                "prefix": "pku",
                "label": "PlatformKit UI Docs",
                "repo": "https://github.com/platform-kit/platformkit-ui",
                "path": "docs",
                "publish": true
            }
        ]
    }
}
```

- `siteName` determines the name that appears in the navbar and in the site's page titles and SEO metadata.
- `icons` determine the images used for favicon / touch icon and in the navbar.
- `docs` allows you to specify multiple git repositories and the path to the docs in each of them.