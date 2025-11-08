# Signalist Stock Tracker - AI Copilot Instructions

## Project Architecture

This is a **Next.js 15 stock tracking app** with event-driven workflows, real-time data, and AI-powered notifications.

### Core Technology Stack
- **Next.js 15** with App Router (turbopack enabled)
- **Better Auth** for authentication with MongoDB adapter
- **Inngest** for event-driven workflows and AI integration
- **MongoDB/Mongoose** for data persistence
- **Finnhub API** for real-time stock data
- **Gemini AI** for content generation
- **Nodemailer** for transactional emails

## Development Workflow

### Local Development
```bash
# Start development servers (both required)
pnpm dev                    # Next.js app on :3000
npx inngest-cli@latest dev  # Inngest dev server for event workflows
```

### Database Testing
Use `pnpm test:db` to verify MongoDB connection (runs `scripts/test-db.mjs`).

## Authentication Pattern

**Better Auth Integration** (`lib/better-auth/auth.ts`):
- Singleton pattern with `getAuth()` to prevent multiple instances
- MongoDB adapter using shared mongoose connection
- Email/password auth with auto sign-in enabled
- Next.js cookies plugin for session management

**Middleware** (`middleware/index.ts`):
- Protects all routes except auth pages and public assets
- Uses `getSessionCookie()` for session validation

## Event-Driven Architecture

**Inngest Functions** (`lib/inngest/functions.ts`):
- `sendSignUpEmail`: Triggered on `app/user.created` event
- `sendDailyNewsSummary`: Cron job (12 PM daily) + manual trigger
- All functions use Gemini AI for content personalization

**Key Pattern**: Events are fired from server actions (e.g., user creation) and processed asynchronously by Inngest.

## Database Patterns

**Connection Management** (`database/mongoose.ts`):
- Global connection caching to prevent connection exhaustion
- Singleton pattern using `global.mongooseCache`

**Models** (`database/models/`):
- Follow Mongoose schema patterns
- Use consistent naming (e.g., `watchlist.model.ts`)

## API Integration

**Finnhub Actions** (`lib/actions/finnhub.actions.ts`):
- Server-side data fetching with caching (`cache: 'force-cache'`, revalidate timers)
- Error handling with fallback to popular stocks (`POPULAR_STOCK_SYMBOLS`)
- Rate limiting considerations built into fetch patterns

## UI Patterns

**Component Structure**:
- Shadcn/UI components in `components/ui/`
- Feature components in root `components/` (e.g., `SearchCommand.tsx`)
- Form components in `components/forms/`

**Key Components**:
- `SearchCommand`: Uses debounced search with keyboard shortcuts (Cmd/Ctrl+K)
- `TradingViewWidget`: External widget integration
- `WatchlistButton`: Stock watchlist management

## File Organization

```
app/
├── (auth)/          # Auth pages (sign-in, sign-up)
├── (root)/          # Protected app pages
├── api/inngest/     # Inngest webhook endpoint
└── globals.css      # Tailwind base styles

lib/
├── actions/         # Server actions by domain
├── better-auth/     # Auth configuration
├── inngest/         # Event functions and prompts
└── nodemailer/      # Email templates and sending
```

## Code Conventions

### Server Actions
- Always use `'use server'` directive
- Group by domain (auth, finnhub, user, watchlist)
- Include proper error handling and type safety

### Environment Variables
Required for full functionality:
- `MONGODB_URI`, `BETTER_AUTH_SECRET`, `GEMINI_API_KEY`
- `FINNHUB_API_KEY`, `NODEMAILER_EMAIL`/`NODEMAILER_PASSWORD`

### Styling
- Dark theme by default (`html className="dark"`)
- Tailwind utility classes with custom CSS variables
- Geist fonts for consistent typography

## AI Integration Points

**Gemini AI Usage**:
- Welcome email personalization based on user profile
- Daily news summaries with watchlist context
- Prompts in `lib/inngest/prompts.ts` for consistent AI interactions

When adding new AI features, follow the established pattern in Inngest functions with `step.ai.infer()`.