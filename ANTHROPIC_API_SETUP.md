# AI Blog Generator - Anthropic API Key Setup

## Error: ANTHROPIC_API_KEY not configured

If you're seeing this error when trying to generate blog posts, you need to configure your Anthropic API key in Convex.

## Solution: Set Environment Variable in Convex

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy your API key (starts with `sk-ant-`)

### Step 2: Set the Key in Convex (Development)

Run this command in your terminal:

```bash
npx convex env set ANTHROPIC_API_KEY sk-ant-your-actual-key-here
```

Replace `sk-ant-your-actual-key-here` with your actual API key.

### Step 3: Set the Key in Convex (Production)

To set the key for production deployment:

```bash
npx convex env set ANTHROPIC_API_KEY sk-ant-your-actual-key-here --prod
```

### Step 4: Verify the Key is Set

You can list your environment variables:

```bash
npx convex env list
```

You should see `ANTHROPIC_API_KEY` in the list (the value will be hidden for security).

### Step 5: Deploy to Production

After setting the environment variable:

```bash
npx convex deploy
```

## Alternative: Using Convex Dashboard

1. Go to https://dashboard.convex.dev/
2. Select your project: **history-restored-by-me**
3. Go to **Settings** → **Environment Variables**
4. Click **Add Environment Variable**
5. Name: `ANTHROPIC_API_KEY`
6. Value: Your API key (starting with `sk-ant-`)
7. Click **Save**
8. Deploy your functions: `npx convex deploy`

## Testing

After setting the API key:

1. Go to `/admin` → **AI Generator** tab
2. Enter a topic (e.g., "1950 Ford 8N Tractor")
3. Add keywords (optional)
4. Select tone
5. Click **Generate Blog Post**
6. Wait 10-30 seconds for generation
7. Check the **Drafts** tab for your generated post

## Cost Information

- Claude Haiku 4.5 costs approximately $0.01-0.02 per blog post
- Monthly cost estimate: $0.60-1.20 (for 60 posts)
- Very affordable for high-quality content generation

## Troubleshooting

### Error persists after setting key?

1. Make sure you deployed after setting the key:
   ```bash
   npx convex deploy
   ```

2. Verify the key is set correctly:
   ```bash
   npx convex env list
   ```

3. Check the key is valid at https://console.anthropic.com/

4. Restart your dev server:
   ```bash
   npm run dev
   ```

### Still having issues?

The error message will now tell you exactly what's wrong:
- If the key is missing, it will ask you to set it
- If the key is invalid, Anthropic will return an authentication error
- If there's a rate limit, the error will indicate that

## Security Note

⚠️ **Never commit your API key to Git!**
- The key is stored securely in Convex
- It's not exposed to the client
- It's only accessible in Convex actions (server-side)

Your `.env.local` file is already in `.gitignore`, so local keys won't be committed.
