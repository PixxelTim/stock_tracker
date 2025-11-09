# ============================================
# Multi-Stage Dockerfile for Next.js Stock Tracker App
# ============================================
# Optimized for production deployment on VPS

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --prod && \
    pnpm store prune

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm and all dependencies (including dev)
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile

# Accept only public build arguments (NEXT_PUBLIC_* can be baked into build)
ARG NEXT_PUBLIC_FINNHUB_API_KEY
ARG NEXT_PUBLIC_BASE_URL

# Set environment variables for build (only public vars)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_FINNHUB_API_KEY=$NEXT_PUBLIC_FINNHUB_API_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# Build Next.js application with standalone output
RUN pnpm build && \
    pnpm store prune

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set port environment variable
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
