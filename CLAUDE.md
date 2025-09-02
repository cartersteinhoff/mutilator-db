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
- `npm run mcp` - Start Neon MCP server for natural language database management
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio for database management

## Database Setup
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM with @neondatabase/serverless adapter
- **Migrations**: Drizzle Kit installed for migrations
- **Connection**: Configured for serverless environments
- **MCP Server**: Neon MCP server installed for natural language database operations
- **Configuration**: 
  - Connection string stored in `.env.local` as `DATABASE_URL`
  - Neon API key stored in `.env.local` as `NEON_API_KEY`
  - MCP configuration in `mcp-config.json`
  - Drizzle config in `drizzle.config.ts`
  - Database client in `db/index.ts`
  - Schema definitions in `db/schema.ts`
  - Migrations output to `db/migrations/`

### Neon MCP Server
The project includes Neon's Model Context Protocol (MCP) server which enables:
- Natural language database queries
- Database management through conversational commands
- Schema modifications without writing SQL
- Branch and project management

To use the MCP server:
1. Run `npm run mcp` to start the server
2. The server uses the API key from `.env.local`
3. Available for development and testing (not recommended for production)

## Important Commands
- Lint check: `npm run lint`
- Type check: `npm run build` (TypeScript compilation happens during build)
- Push database schema changes: `npx drizzle-kit push --force` (use --force to bypass interactive prompts)

## Authentication Setup
- **Provider**: Neon Auth (powered by Stack Auth)
- **SDK**: @stackframe/stack
- **Configuration**:
  - Stack Auth project ID in `.env.local` as `NEXT_PUBLIC_STACK_PROJECT_ID`
  - Publishable key in `.env.local` as `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
  - Secret key in `.env.local` as `STACK_SECRET_SERVER_KEY`
- **User Data**: Automatically synced to `neon_auth.users_sync` table
- **Features**:
  - Email/password authentication
  - OAuth support (Google, GitHub if configured)
  - Protected routes and API endpoints
  - User dashboard at `/dashboard`
  - Sign in/up pages at `/auth/sign-in` and `/auth/sign-up`
- **Database Relations**:
  - `mutilators.createdBy` references user ID from Neon Auth
  - Users can only edit/delete their own mutilators
- **Protected Actions**:
  - Adding mutilators requires authentication
  - Users can only edit/delete their own entries
  - Dashboard shows user-specific contributions

## Dark Theme Design System

### Color Palette

#### Background Colors
- **Primary Background**: `#0A0A0B` - Near black base background
- **Card Background**: `#141415` - Elevated surface for cards/containers
- **Modal Background**: `#1A1A1C` - Overlay surfaces and modals
- **Hover Background**: `#1F1F21` - Interactive element hover state

#### Text Colors
- **Primary Text**: `#FAFAFA` - High contrast white for main content
- **Secondary Text**: `#A1A1AA` - Muted gray for descriptions
- **Tertiary Text**: `#71717A` - Lower emphasis text
- **Disabled Text**: `#52525B` - Disabled state text

#### Brand Colors
- **Primary**: `#8B5CF6` - Purple accent for primary actions
- **Primary Hover**: `#A78BFA` - Lighter purple for hover states
- **Primary Active**: `#7C3AED` - Darker purple for pressed states
- **Accent**: `#06B6D4` - Cyan for highlights and secondary actions

#### Semantic Colors
- **Success**: `#10B981` - Green for success states
- **Warning**: `#F59E0B` - Amber for warnings
- **Error**: `#EF4444` - Red for errors and destructive actions
- **Info**: `#3B82F6` - Blue for informational messages

#### Border & Focus
- **Default Border**: `#27272A` - Subtle gray borders
- **Focus Ring**: `#8B5CF6` - Purple focus indicator
- **Divider**: `#1F1F21` - Section dividers

### Typography Scale
- **Heading 1**: `2.5rem` (40px) - Page titles
- **Heading 2**: `2rem` (32px) - Section headers
- **Heading 3**: `1.5rem` (24px) - Subsections
- **Body**: `1rem` (16px) - Standard text
- **Small**: `0.875rem` (14px) - Secondary text
- **Caption**: `0.75rem` (12px) - Labels and captions

### Spacing System (4px base unit)
- **xs**: `4px` - Tight spacing
- **sm**: `8px` - Small gaps
- **md**: `16px` - Default spacing
- **lg**: `24px` - Section spacing
- **xl**: `32px` - Large gaps
- **2xl**: `48px` - Page sections

### Border Radius
- **sm**: `0.375rem` (6px) - Small elements
- **default**: `0.5rem` (8px) - Standard radius
- **lg**: `0.625rem` (10px) - Cards and containers
- **xl**: `0.875rem` (14px) - Modals and overlays
- **full**: `9999px` - Pills and circles

### Elevation (Box Shadows)
- **Level 0**: No shadow - Flat elements
- **Level 1**: `0 1px 3px rgba(0, 0, 0, 0.4)` - Cards
- **Level 2**: `0 4px 6px rgba(0, 0, 0, 0.5)` - Dropdowns
- **Level 3**: `0 10px 15px rgba(0, 0, 0, 0.6)` - Modals
- **Level 4**: `0 20px 25px rgba(0, 0, 0, 0.7)` - Popovers

### Component Guidelines

#### Buttons
- **Primary**: Purple background (#8B5CF6), white text
- **Secondary**: Transparent with purple border
- **Ghost**: Transparent with hover effect
- **Destructive**: Red background (#EF4444)
- **Disabled**: Opacity 50%

#### Form Fields
- Background: `#1A1A1C`
- Border: `#27272A`
- Focus: Purple ring (#8B5CF6)
- Text: `#FAFAFA`
- Placeholder: `#52525B`

#### Cards
- Background: `#141415`
- Border: `#27272A`
- Hover: Subtle shadow elevation
- Padding: `24px`

#### Modals
- Background: `#1A1A1C`
- Backdrop: `rgba(0, 0, 0, 0.8)`
- Border radius: `0.875rem`
- Shadow: Level 3

### Implementation Notes
- Dark theme is the only theme (no light mode)
- Use CSS variables for easy maintenance
- Ensure WCAG AA contrast ratios (minimum 4.5:1)
- Focus states must be clearly visible
- Interactive elements need hover/active states

## Notes
- Project initialized with latest Next.js defaults
- Turbopack enabled for faster builds
- Backend infrastructure uses Vercel serverless functions
- Database: Neon serverless PostgreSQL with @neondatabase/serverless adapter installed
- Dark theme only - no light mode toggle