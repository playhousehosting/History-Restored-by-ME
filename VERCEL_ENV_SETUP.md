# Vercel Environment Variables Setup

## Required Environment Variables for Production

Add these environment variables to your Vercel project:

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your project: `history-restored-by-me` or `History-Restored-by-ME`
- Go to **Settings** → **Environment Variables**

### 2. Add the following variables:

#### Convex Backend (Required)
```
CONVEX_DEPLOYMENT=dev:abundant-mockingbird-432
NEXT_PUBLIC_CONVEX_URL=https://abundant-mockingbird-432.convex.cloud
```

#### Convex Auth (Required)
```
AUTH_SECRET=iS5AGKyssI-dCUCIUj-jhGb4X_rXIhQ-mkREzpvFdRg
```

#### UploadThing (Optional - for image uploads)
```
UPLOADTHING_TOKEN=[Get from https://uploadthing.com/dashboard]
```

### 3. Important Notes:

- **NEXT_PUBLIC_CONVEX_URL**: This variable is exposed to the browser, so it starts with `NEXT_PUBLIC_`
- All variables should be added for **Production**, **Preview**, and **Development** environments
- After adding variables, **trigger a new deployment** or the changes won't take effect

### 4. Deployment Steps:

1. Add all environment variables in Vercel dashboard
2. Go to **Deployments** tab
3. Click **⋯** (three dots) on the latest deployment
4. Select **Redeploy**
5. Check "Use existing build cache" is **unchecked**
6. Click **Redeploy**

### 5. Verify Deployment:

After deployment completes, visit your site at:
- Production: `https://historyrestoredbyme.com`
- Vercel URL: `https://your-project.vercel.app`

Check browser console for any errors. If you see Convex connection errors, double-check the environment variables.

## Convex Dashboard

Your Convex deployment dashboard:
- https://dashboard.convex.dev/d/abundant-mockingbird-432

Here you can:
- View and manage data
- Monitor function calls
- Check logs
- Manage environment variables

## Production Domain Setup

To use your custom domain `historyrestoredbyme.com`:

1. Go to Vercel project → **Settings** → **Domains**
2. Add `historyrestoredbyme.com` and `www.historyrestoredbyme.com`
3. Update your DNS settings with your domain registrar:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (can take up to 48 hours)

## Testing Authentication

Once deployed:

1. Visit `/auth/register` to create an admin account
2. Sign in at `/auth/signin`
3. Access admin dashboard at `/admin`
4. Create your first project or blog post

## Troubleshooting

### Build fails with Convex errors:
- Ensure CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL are set correctly
- Check Convex dashboard for schema deployment status

### Authentication not working:
- Verify AUTH_SECRET is set in Vercel
- Check AUTH_URL and AUTH_REDIRECT_PROXY_URL in Convex dashboard
- Ensure they match your production domain

### Images not uploading:
- Add UPLOADTHING_TOKEN to Vercel environment variables
- Get token from https://uploadthing.com/dashboard
