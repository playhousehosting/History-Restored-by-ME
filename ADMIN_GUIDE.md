# History Restored by ME - Modern Admin Portal & Luxury UI

## 🎨 What's New

### ✨ Comprehensive Admin Portal
Your site now has a **Facebook/Instagram-style admin dashboard** that makes content management incredibly easy:

#### **Project Management**
- ✅ **Drag & Drop Image Upload** - Just drag images from your computer
- ✅ **Image Reordering** - Drag images to reorder them (like Instagram post order)
- ✅ **Live Preview** - See exactly how your project will look
- ✅ **Quick Edit** - Edit title, description, status (completed/in-progress/planned)
- ✅ **Featured Toggle** - Mark projects to show on homepage
- ✅ **Image Editing** - Built-in cropping and editing tools
- ✅ **Delete Protection** - Confirmation before deleting

#### **Blog Management**
- ✅ **Rich Text Editor** - Format text like Medium or Substack
- ✅ **Image Insertion** - Add images directly into blog posts
- ✅ **Live Preview** - Toggle between edit and preview modes
- ✅ **Auto Slug Generation** - URL-friendly slugs created automatically
- ✅ **Draft/Publish Toggle** - Save as draft or publish immediately
- ✅ **Featured Images** - Add header images to posts
- ✅ **SEO-Friendly** - Excerpts and metadata for search engines

### 🎯 Key Features

#### **Easy as Social Media**
- **No technical knowledge needed** - If you can use Facebook, you can use this
- **Instant feedback** - See changes as you make them
- **Mobile-friendly** - Manage content from phone/tablet
- **Fast uploads** - Multiple images at once

#### **Professional Look**
- **Modern luxury design** - Clean, professional appearance
- **Smooth animations** - Polished user experience
- **Card-based layouts** - Easy to scan and navigate
- **Responsive design** - Looks great on all devices

#### **SEO Optimized**
- **Meta descriptions** - Search engine friendly
- **Open Graph tags** - Beautiful social media sharing
- **Structured data** - Better search rankings
- **Fast loading** - Optimized performance

## 🚀 How to Use the Admin Portal

### Access the Dashboard
1. Go to `http://localhost:3000/auth/signin`
2. Sign in with your admin account
3. Click "Admin Dashboard" in the navigation

### Adding a New Project
1. Click the **"Projects"** tab
2. Click **"New Project"** button
3. Fill in:
   - **Title**: E.g., "1952 Farmall M Restoration"
   - **Description**: Brief overview of the work
   - **Status**: Completed, In Progress, or Planned
   - **Featured**: Toggle ON to show on homepage
4. **Upload Images**:
   - Drag & drop images OR click to select
   - Upload multiple at once
   - Drag images to reorder them
   - Click X to remove any image
5. Click **"Create Project"**

### Creating a Blog Post
1. Click the **"Blog"** tab
2. Click **"New Post"** button
3. Fill in:
   - **Title**: Auto-generates URL slug
   - **Excerpt**: Short summary for listings
   - **Featured Image**: Optional header image URL
4. **Write Content**:
   - Use the rich text editor toolbar
   - **Bold, Italic, Headings, Lists, Quotes**
   - Add images with the image button
   - Add links with the link button
5. **Preview**: Click "Preview" tab to see how it looks
6. **Publish**: Toggle "Publish immediately" ON
7. Click **"Create & Publish"** or **"Save as Draft"**

### Editing Content
- Click the **Edit** button (pencil icon) on any project or post
- Make your changes
- Click "Update" to save

### Deleting Content
- Click the **Delete** button (trash icon)
- Confirm deletion

## 📦 New Components Installed

### shadcn/ui Components
- Button, Card, Dialog, Tabs
- Input, Textarea, Select, Label
- Switch, Checkbox, Badge
- Alert, Skeleton, Progress
- Dropdown Menu, Scroll Area
- Avatar, Table, Separator

### Advanced Features
- **Tiptap** - Rich text editor for blog posts
- **React Dropzone** - Drag & drop file uploads
- **React Image Crop** - Image editing and cropping
- **Framer Motion** - Smooth animations
- **Sonner** - Beautiful toast notifications
- **Lucide React** - Modern icon library

## 🎨 Design Improvements

### Homepage
- Luxury hero section with gradient
- Feature cards with icons
- Project cards with hover effects
- Blog post previews
- Modern badges and buttons
- Smooth transitions

### Color Scheme
- **Primary**: Red (#991B1B, #B91C1C, #DC2626) - Farmall red
- **Accents**: White, Gray shades
- **Highlights**: Green for published status
- Modern, clean aesthetic

### Typography
- **Large, bold headings** - Easy to read
- **Card-based layouts** - Organized content
- **Icons throughout** - Visual clarity
- **Hover effects** - Interactive feedback

## 🔧 Technical Stack

```
Frontend:
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components

Backend:
- Neon PostgreSQL
- Prisma ORM
- NextAuth.js v5
- UploadThing

Features:
- Server Components
- API Routes
- Image optimization
- SEO metadata
- Form validation
```

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env` file:
```env
# Database (from Neon dashboard)
DATABASE_URL="postgresql://..."

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# UploadThing (from uploadthing.com)
UPLOADTHING_TOKEN="your-token-here"
```

### 3. Set Up Database
```bash
# Push schema to database
npx prisma db push

# Open Prisma Studio to create admin user
npx prisma studio
```

### 4. Create Admin User
In Prisma Studio:
1. Click **User** table
2. Click **Add record**
3. Fill in:
   - email: your@email.com
   - name: Your Name
   - role: admin
   - password: (will hash manually)
4. Click Save

**Hash password** in terminal:
```bash
node
> const bcrypt = require('bcrypt')
> bcrypt.hashSync('yourpassword', 10)
# Copy the hash and update the user's password field in Prisma Studio
```

### 5. Start Development
```bash
npm run dev
```

Visit:
- **Homepage**: http://localhost:3000
- **Sign In**: http://localhost:3000/auth/signin
- **Admin**: http://localhost:3000/admin

## 📱 Admin Portal Features

### Dashboard Overview
- **Projects Tab**: Manage restoration projects
- **Blog Tab**: Manage blog posts
- **Visual Cards**: See thumbnails and status at a glance
- **Quick Actions**: View, Edit, Delete buttons
- **Badge Indicators**: Featured, Published, Draft, Status

### Image Management
- **Multiple Uploads**: Upload many images at once
- **Drag to Reorder**: Change image order easily
- **Remove Images**: Click X on any image
- **Image Preview**: See thumbnails while editing
- **First Image Featured**: First image shows as main

### Content Editing
- **Rich Text Formatting**: Bold, italic, headings, lists
- **Image Insertion**: Add images to blog content
- **Link Addition**: Add clickable links
- **Live Preview**: See formatted output before saving
- **Auto-save**: Changes saved on form submission

### Status Management
- **Project Status**: Completed, In Progress, Planned
- **Blog Status**: Published or Draft
- **Featured Toggle**: Show/hide on homepage
- **Visual Indicators**: Color-coded badges

## 🎯 Best Practices

### Images
- **Landscape orientation** works best (16:9 or 4:3)
- **High quality** (at least 1200px wide)
- **File size** under 5MB per image
- **Formats**: JPG, PNG, WebP
- **First image** should be the best showcase shot

### Projects
- **Clear titles**: "1952 Farmall M Restoration"
- **Detailed descriptions**: What work was done
- **Multiple images**: Show before/during/after
- **Update status**: Mark progress as you go

### Blog Posts
- **Catchy titles**: Draw readers in
- **Excerpts**: Summarize in 1-2 sentences
- **Headings**: Break up long content
- **Images**: Add visual interest
- **Links**: Reference sources or products

## 🔐 Security

- **Admin-only access**: Only admins can create/edit/delete
- **Authentication required**: Must be signed in
- **Password hashing**: bcrypt encryption
- **CSRF protection**: NextAuth security
- **Input validation**: Server-side checks

## 📞 Need Help?

### Common Issues

**"Database not connected"**
- Check DATABASE_URL in .env
- Ensure database is running
- Run `npx prisma db push`

**"Upload failed"**
- Check UPLOADTHING_TOKEN in .env
- Verify token at uploadthing.com
- Check file size (under 5MB)

**"Unauthorized"**
- Verify user role is "admin"
- Check in Prisma Studio
- Sign out and sign in again

**"Can't sign in"**
- Verify password hash in database
- Check email is correct
- Ensure NextAuth secret is set

## 🎨 Customization

### Colors
Edit `src/app/globals.css` for theme colors:
```css
:root {
  --primary: 0 72% 39%; /* Red-700 */
  --primary-foreground: 0 0% 100%;
}
```

### Layout
- **Header**: `src/components/Header.tsx`
- **Footer**: `src/components/Footer.tsx`
- **Homepage**: `src/app/page.tsx`
- **Admin**: `src/app/admin/page.tsx`

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
Add in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `UPLOADTHING_TOKEN`

## ✨ Summary

Your website now has:
- ✅ Modern, luxury design
- ✅ Comprehensive admin portal
- ✅ Easy content management (like Facebook/Instagram)
- ✅ Rich text editor for blogs
- ✅ Drag & drop image uploads
- ✅ Image editing & reordering
- ✅ SEO optimization
- ✅ Mobile-responsive
- ✅ Fast & secure

**Start adding your restoration projects and blog posts today!** 🚜
