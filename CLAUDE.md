# Claude Project Documentation

## Project Overview
Next.js application with Vercel serverless backend, Neon database, Tailwind CSS and Drizzle ORM

## Tech Stack
- **Framework**: Next.js (App Router)
- **Backend**: Vercel Serverless Functions
- **Database**: Neon (Serverless PostgreSQL)
- **Styling**: Tailwind CSS v4.1.12
- **ORM**: Drizzle ORM
- **Language**: TypeScript
- **Build Tool**: Turbopack
- **Linting**: ESLint

## Project Structure
- App Router configuration (no src directory)
- Import alias: `@/*`

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx drizzle-kit generate` - Generate database migrations
- `npx drizzle-kit migrate` - Run database migrations
- `npx drizzle-kit studio` - Open Drizzle Studio for database management

## Database Setup
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM with @neondatabase/serverless adapter
- **Migrations**: Drizzle Kit installed for migrations
- **Connection**: Configured for serverless environments
- **Configuration**: 
  - Connection string stored in `.env.local` as `DATABASE_URL`
  - Drizzle config in `drizzle.config.ts`
  - Database client in `db/index.ts`
  - Schema definitions in `db/schema.ts`
  - Migrations output to `db/migrations/`

## Important Commands
- Lint check: `npm run lint`
- Type check: `npm run build` (TypeScript compilation happens during build)

## Notes
- Project initialized with latest Next.js defaults
- Turbopack enabled for faster builds
- Backend infrastructure uses Vercel serverless functions
- Database: Neon serverless PostgreSQL with @neondatabase/serverless adapter installed