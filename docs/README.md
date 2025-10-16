# Standalone CV Website

This directory contains the standalone CV website that is automatically deployed to GitHub Pages.

## Features

- **Live CV**: Automatically updated from the professional profile automation system
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Print-Friendly**: Optimized for printing with clean layouts
- **SEO Optimized**: Includes proper meta tags and Open Graph properties
- **Jekyll-Free**: Uses `.nojekyll` to disable Jekyll processing for faster deployment

## Access

The CV is accessible at: `https://niyidukunda.github.io/Professional-PROFILE-AUTOMATION/`

## Auto-Updates

This CV is automatically updated whenever changes are made to:
- Personal information in `data/personal.json`
- Work experience in `data/experience.json`  
- Projects in `data/projects.json`
- Skills in `data/skills.json`

The GitHub Actions workflow will regenerate and redeploy the CV page automatically.

## Files

- `index.html` - The main CV webpage
- `.nojekyll` - Disables Jekyll processing for GitHub Pages
- `README.md` - This documentation file

## Manual Generation

To manually regenerate the CV page:

```bash
npm run generate-page
```

This will update the `docs/index.html` file with the latest data from your JSON files.