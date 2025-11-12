<div align="center">
  <img src="public/logo.png" alt="History Restored by ME Logo" width="600">
  
  # History Restored by ME
  
  **Professional Tractor Restoration Showcase**
  
  *Specializes in Farmall but Can Fix Them All*
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Convex](https://img.shields.io/badge/Convex-Backend-orange?style=flat-square)](https://www.convex.dev/)
  [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
</div>

---

## 🚜 About

A premium, Fortune 500-level website showcasing vintage tractor restoration services. Features luxury dark-themed design, AI-powered blog generation, and comprehensive project management.

## ✨ Features

### 🎨 **Luxury Design System**
- Fortune 500-level dark theme with animated blobs and gradients
- Glass morphism effects and smooth transitions
- Fully responsive mobile-first design
- Custom animations and hover effects

### 🚜 **Project Gallery**
- Showcase restoration projects with multiple images
- Featured project carousel on homepage
- Detailed project pages with image galleries
- Status tracking and categorization

### 📝 **Advanced Blog System**
- AI-powered blog post generation using Anthropic Claude
- Rich text editor with markdown support
- Featured images and excerpts
- Scheduled publishing and draft management
- SEO-optimized content

### 🔐 **Authentication & Security**
- Secure authentication with Convex Auth
- Role-based access control (Admin/User)
- Protected admin routes
- Session management

### 👤 **Admin Dashboard**
- Comprehensive project management
- Blog post creation and editing
- AI blog generator with customizable tone
- Contact form submissions management
- User management system
- Site settings configuration

### 📸 **Image Management**
- Multiple image uploads per project
- UploadThing integration for reliable hosting
- Automatic image optimization
- Responsive image loading

### 💬 **Contact System**
- Contact form with validation
- FAQ accordion section
- Submission tracking and status management
- Email integration ready

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Backend** | Convex (Realtime Database) |
| **Authentication** | Convex Auth |
| **AI Integration** | Anthropic Claude API |
| **File Upload** | UploadThing |
| **UI Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 📋 Prerequisites

- Node.js 18+ installed
- A Convex account (https://convex.dev)
- An UploadThing account (https://uploadthing.com)
- Anthropic API key for AI blog generation (https://console.anthropic.com)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/history-restored-by-me.git
cd history-restored-by-me
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex Backend
CONVEX_DEPLOYMENT=your-deployment-url  # From Convex Dashboard
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# UploadThing (Image Uploads)
UPLOADTHING_TOKEN=your_uploadthing_token

# Anthropic API (AI Blog Generation)
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 3. Set Up Convex Backend

```bash
# Install Convex CLI globally
npm install -g convex

# Initialize Convex (follow prompts)
npx convex dev

# This will:
# - Create a new Convex project (or link to existing)
# - Set up your database schema
# - Start the development server
```

### 4. Create Admin User

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/auth/register`
3. Create your first account
4. Open Convex Dashboard (https://dashboard.convex.dev)
5. Go to your project → Data → `users` table
6. Find your user and edit the `role` field to `"admin"`

### 5. Configure AI Blog Generation

1. Get your Anthropic API key from https://console.anthropic.com
2. Add it to your `.env.local` file
3. The AI blog generator will be available in the admin panel

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## 📁 Project Structure

```
├── convex/                     # Convex backend
│   ├── schema.ts              # Database schema
│   ├── auth.ts                # Authentication logic
│   ├── projects.ts            # Project CRUD operations
│   ├── blogPosts.ts           # Blog post operations
│   ├── aiBlogGeneration.ts    # AI blog generation
│   ├── contactSubmissions.ts  # Contact form handling
│   └── users.ts               # User management
├── src/
│   ├── app/
│   │   ├── admin/             # Admin dashboard (protected)
│   │   ├── api/uploadthing/   # File upload endpoint
│   │   ├── auth/              # Authentication pages
│   │   │   ├── signin/        # Sign-in page
│   │   │   └── register/      # Registration page
│   │   ├── blog/              # Blog pages
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/        # Individual blog post
│   │   ├── contact/           # Contact page with form
│   │   ├── gallery/           # Project gallery
│   │   │   ├── page.tsx       # Gallery grid
│   │   │   └── [id]/          # Project details
│   │   ├── globals.css        # Global styles & animations
│   │   ├── layout.tsx         # Root layout (Header/Footer)
│   │   └── page.tsx           # Homepage
│   └── components/
│       ├── admin/             # Admin-specific components
│       │   ├── AIBlogGenerator.tsx
│       │   ├── BlogForm.tsx
│       │   ├── ProjectForm.tsx
│       │   └── SiteSettings.tsx
│       ├── ui/                # shadcn/ui components
│       ├── ConvexClientProvider.tsx
│       ├── Header.tsx
│       └── Footer.tsx
└── public/
    └── logo.png               # Site logo
```

## 🗄️ Database Schema (Convex)

### Collections

- **users**: User accounts with authentication and roles
- **projects**: Restoration project showcases
- **blogPosts**: Blog articles with AI generation support
- **contactSubmissions**: Contact form submissions
- **siteSettings**: Global site configuration
- **scheduledPosts**: Scheduled blog post publications

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

Add these in Vercel's Project Settings → Environment Variables:

```env
CONVEX_DEPLOYMENT=prod:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
UPLOADTHING_TOKEN=your_token
ANTHROPIC_API_KEY=your_key
```

4. **Deploy Convex to Production**
```bash
npx convex deploy
```

5. **Update Convex Site URL**
   - Go to Convex Dashboard → Settings
   - Set Site URL to your Vercel domain (e.g., `https://your-site.vercel.app`)

### Production Checklist

- [ ] Environment variables configured
- [ ] Convex deployed to production
- [ ] Admin user created
- [ ] Site URL updated in Convex
- [ ] DNS configured (if custom domain)
- [ ] SSL certificate active

## 📚 Usage Guide

### Admin Dashboard (`/admin`)

The admin panel includes 7 tabs for complete site management:

1. **Projects** - Create and manage restoration project showcases
2. **Blog** - Write and publish blog posts
3. **AI Generator** - Generate SEO-optimized blog posts with AI
4. **Drafts** - Review and edit AI-generated or unpublished posts
5. **Contacts** - View and manage contact form submissions
6. **Users** - Manage user accounts and permissions
7. **Settings** - Configure site-wide settings

### Creating Projects

1. Navigate to `/admin` → **Projects** tab
2. Click "New Project"
3. Fill in project details:
   - Title and description
   - Status (In Progress/Completed)
   - Upload multiple images
   - Mark as "Featured" for homepage carousel
4. Save and publish

### AI Blog Generation

1. Go to `/admin` → **AI Generator** tab
2. Enter your topic (e.g., "1950 Ford 8N Tractor")
3. Add optional SEO keywords
4. Choose tone: Professional, Enthusiast, Technical, or Casual
5. Generate - AI creates 1200-1800 word article
6. Review in **Drafts** tab
7. Edit if needed and publish

### Managing Contact Submissions

1. Navigate to `/admin` → **Contacts** tab
2. View all submissions with status indicators
3. Mark as Read or Responded
4. Delete processed submissions

## 🔐 Environment Variables Reference

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `CONVEX_DEPLOYMENT` | Yes | Convex deployment URL | Convex Dashboard |
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Public Convex endpoint | Convex Dashboard → Settings |
| `UPLOADTHING_TOKEN` | Yes | Image upload API token | uploadthing.com/dashboard |
| `ANTHROPIC_API_KEY` | Optional | For AI blog generation | console.anthropic.com |

## 🐛 Troubleshooting

### Convex Connection Issues
```bash
# Check if Convex is running
npx convex dev

# Verify environment variables
echo $NEXT_PUBLIC_CONVEX_URL
```

### Authentication Not Working
- Clear browser cookies and localStorage
- Verify user has `role: "admin"` in Convex Dashboard
- Check Convex Auth configuration in `convex/auth.config.ts`

### Image Upload Failing
- Confirm `UPLOADTHING_TOKEN` is valid
- Check UploadThing dashboard for quota limits
- Verify file size is under the limit (default 4MB)

### AI Blog Generation Errors
- Ensure `ANTHROPIC_API_KEY` is set correctly
- Check API key has sufficient credits
- Verify Anthropic API is accessible from your region

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own tractor restoration business!

## 🔗 Links

- **Live Site**: [https://www.historyrestoredbyme.com](https://www.historyrestoredbyme.com)
- **Convex**: [convex.dev](https://convex.dev)
- **Next.js**: [nextjs.org](https://nextjs.org)
- **UploadThing**: [uploadthing.com](https://uploadthing.com)

---

<div align="center">
  <strong>Built with ❤️ for vintage tractor enthusiasts</strong>
  <br>
  <sub>Specializes in Farmall but Can Fix Them All</sub>
</div>
