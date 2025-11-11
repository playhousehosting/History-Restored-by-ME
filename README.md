# History Restored by Me - Tractor Restoration Website

A professional showcase website for tractor restoration services built with Next.js, featuring a gallery, blog, authentication, and admin panel.

## Features

- 🚜 **Project Gallery**: Showcase restoration projects with multiple images
- 📝 **Blog System**: Share restoration stories and techniques
- 🔐 **Authentication**: User registration and login with NextAuth.js
- 👤 **Admin Panel**: Manage projects and blog posts (admin users only)
- 📸 **Image Upload**: Upload multiple images per project using UploadThing
- 💾 **Neon Database**: PostgreSQL database with Prisma ORM
- 🎨 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- ⚡ **Vercel Ready**: Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **File Upload**: UploadThing
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- A Neon database account (https://neon.tech)
- An UploadThing account for image uploads (https://uploadthing.com)

## Getting Started

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Update your `.env` file with the following:

```env
# Get your Neon database connection string from https://console.neon.tech
DATABASE_URL="postgresql://username:password@host.neon.tech/database?sslmode=require"

# Generate a secret key with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key-here"

# Get your UploadThing token from https://uploadthing.com/dashboard
UPLOADTHING_TOKEN="your-uploadthing-token"
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your database
npx prisma db push

# (Optional) Open Prisma Studio to view/manage data
npx prisma studio
```

### 4. Create Admin User

You'll need to create your first admin user. You can do this in two ways:

**Option A: Using Prisma Studio**
```bash
npx prisma studio
```
1. Open User model
2. Create a new user with `role: "admin"`
3. Use a hashed password (you can generate one using the register page first, then update the role)

**Option B: Register then Update**
1. Start the dev server: `npm run dev`
2. Go to http://localhost:3000/auth/register
3. Create an account
4. Use Prisma Studio to change the user's `role` to `"admin"`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── uploadthing/    # File upload endpoints
│   ├── auth/               # Auth pages (signin, register)
│   ├── blog/               # Blog listing and post pages
│   ├── gallery/            # Project gallery and detail pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                    # Utility files
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client instance
│   └── uploadthing.ts     # UploadThing helpers
└── types/                  # TypeScript type definitions

prisma/
└── schema.prisma          # Database schema
```

## Database Schema

The application includes the following models:

- **User**: User accounts with authentication
- **Project**: Restoration projects with images
- **BlogPost**: Blog articles with markdown support
- **Image**: Image storage for projects and blog posts
- **Account/Session**: NextAuth.js session management

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL` (your Neon database URL)
   - `NEXTAUTH_URL` (your Vercel deployment URL, e.g., `https://your-site.vercel.app`)
   - `NEXTAUTH_SECRET` (same secret from local development)
   - `UPLOADTHING_TOKEN` (your UploadThing token)
5. Click "Deploy"

### 3. Update Admin User

After deployment, use Prisma Studio or database console to set a user's role to "admin".

## Features Guide

### Adding Projects (Admin Only)

1. Sign in as admin
2. Navigate to `/admin`
3. Click "Manage Projects"
4. Add project details and upload images
5. Mark as "featured" to display on homepage

### Writing Blog Posts (Admin Only)

1. Navigate to `/admin/blog`
2. Create new post with title and content (supports Markdown)
3. Add optional excerpt for preview
4. Publish when ready

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db` |
| `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` or `https://yoursite.com` |
| `NEXTAUTH_SECRET` | Random secret for JWT encryption | Generate with `openssl rand -base64 32` |
| `UPLOADTHING_TOKEN` | UploadThing API token | Get from uploadthing.com dashboard |

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure your Neon database is active
- Check that SSL mode is enabled (`sslmode=require`)

### Authentication Not Working

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### Image Upload Failing

- Confirm `UPLOADTHING_TOKEN` is valid
- Check UploadThing dashboard for quota limits
- Verify file size is under 4MB

## License

MIT
