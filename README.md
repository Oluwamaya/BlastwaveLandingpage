# Blastwave Landing Page

Static HTML landing page for Blastwave. No framework, no build step.

## Setup

1. Open `index.html` directly in a browser for local dev, OR
2. Deploy to any static host:
   - **Netlify**: Drag and drop the `landing/` folder
   - **Vercel**: `vercel --cwd landing`
   - **GitHub Pages**: Push and enable Pages on the repo

## Configuration

Edit the top of the `<script>` block in `index.html`:

```js
const APP_URL = 'https://app.blastwave.com';   // Your Angular app URL
const API_URL = 'https://api.blastwave.com/api'; // Your backend URL
```

## How Pricing Works

The pricing section fetches plans dynamically from:
`GET /api/plans/public`

Admin changes a plan → landing page reflects it automatically on next load.
No redeployment needed.

## Recommended Hosting

| Service     | Landing Page | App (Angular) | Backend (Node) |
|-------------|-------------|---------------|----------------|
| Netlify     | ✅ Free      | ✅ Free        | ❌             |
| Vercel      | ✅ Free      | ✅ Free        | ❌             |
| Render      | ❌           | ❌             | ✅ $7/mo       |
| Railway     | ❌           | ❌             | ✅ $5/mo       |
| MongoDB Atlas | ❌         | ❌             | ✅ DB $0-57    |
