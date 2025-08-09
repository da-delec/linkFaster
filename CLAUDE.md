# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev`: Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build`: Build the application for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint to check code quality

## Database Commands

- `npx prisma migrate dev`: Run database migrations in development
- `npx prisma generate`: Generate Prisma client after schema changes
- `npx prisma studio`: Open Prisma Studio for database management
- `npx prisma db push`: Push schema changes to database without migrations

## Architecture Overview

This is a Next.js 15 application using the App Router with the following key technologies:

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with RSC support
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Component library with Radix UI primitives
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

### Backend/Database
- **Prisma**: ORM with PostgreSQL database
- **PostgreSQL**: Primary database (requires DATABASE_URL and DIRECT_URL env vars)

### Project Structure
- `app/`: Next.js App Router pages and API routes
- `components/ui/`: shadcn/ui components
- `lib/`: Utility functions and shared logic
- `prisma/`: Database schema and migrations
- `public/`: Static assets

### Key Configuration
- Uses `@/*` path aliases for imports
- shadcn/ui configured with "new-york" style and slate base color
- Geist font family from Vercel
- CSS variables enabled for theming

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_URL`: Direct PostgreSQL connection for migrations

## Development Notes

- The app uses Turbopack for faster development builds
- Prisma Client must be regenerated after schema changes
- All UI components follow shadcn/ui patterns with Radix UI primitives
- TypeScript strict mode is enabled