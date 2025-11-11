# Tractor Restoration Website - Project Instructions

## Project Overview
Professional tractor restoration showcase website with gallery, blog, authentication, and admin panel.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Neon PostgreSQL
- Prisma ORM
- NextAuth.js v5
- UploadThing
- Vercel deployment

## Project Structure
- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/prisma` - Database schema

## Development Guidelines
- Use TypeScript for type safety
- Follow Next.js 14+ App Router conventions
- Use server components by default, client components when needed
- Prisma for all database operations
- Tailwind CSS for styling

## Database Models
- User: Authentication and authorization
- Project: Tractor restoration projects
- BlogPost: Blog articles
- Image: Associated images
- Account/Session: NextAuth.js tables

## Authentication
- NextAuth.js v5 with credentials provider
- Admin role for content management
- Protected routes with middleware

## Setup Complete
✅ Next.js project initialized
✅ Dependencies installed
✅ Prisma schema created
✅ Authentication configured
✅ Gallery and blog pages created
✅ Admin dashboard created
✅ Environment variables configured
✅ README documentation complete

## Next Steps for User
1. Get Neon database URL from https://console.neon.tech
2. Get UploadThing token from https://uploadthing.com
3. Update `.env` file with real credentials
4. Run `npx prisma db push` to create database tables
5. Create admin user via register page or Prisma Studio
6. Start development: `npm run dev`
