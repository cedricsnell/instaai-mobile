# Netlify Deployment Guide

## Quick Deploy via Web Interface (Recommended)

1. **Go to Netlify**: Visit https://app.netlify.com/

2. **Import from Git**:
   - Click "Add new site" > "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select the repository: `cedricsnell/instaai-mobile`

3. **Configure Build Settings**:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy**: Click "Deploy site"

5. **Get Your URL**: Once deployed, you'll get a URL like `https://instaai-studio.netlify.app`

## Alternative: Deploy via CLI

If you prefer using the CLI, run these commands:

```bash
cd C:\CODING\Apps\instaai-mobile

# Option 1: Use the GitHub integration method when prompted
netlify deploy --prod --dir=dist

# Or create directly with a specific name
netlify sites:create --name instaai-studio
netlify deploy --prod --dir=dist
```

When prompted:
- Choose "Create & configure a new project"
- Select your team
- Enter site name: `instaai-studio`
- Publish directory: `dist`

## Post-Deployment

Your InstaAI Studio app will be live at:
- **Production**: `https://[your-site-name].netlify.app`

## Environment Variables (Optional)

If you need to configure the API endpoint for production:

1. Go to Site settings > Environment variables
2. Add `REACT_APP_API_URL` with your backend URL

## Repository Links

- **Frontend (Mobile/Web)**: https://github.com/cedricsnell/instaai-mobile
- **Backend (API)**: https://github.com/cedricsnell/InstaAI-Studio

## Build Output

The `dist` folder contains your production-ready static files:
- Bundled JavaScript
- Optimized assets
- HTML entry point
- Favicon and metadata

All files are optimized and ready for deployment.
