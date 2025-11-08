---
applyTo: '**'
description: 'Performance Optimization Guidelines für Stock Tracker App'
---

# Performance Optimization Guidelines

## Next.js Optimizations

### Image Optimization
- Verwende `next/image` für alle Bilder
- Definiere `width` und `height` für Layout Stability
- Nutze `priority` für Above-the-Fold Bilder
- Verwende moderne Formate (WebP, AVIF)
- Implementiere Lazy Loading für Below-the-Fold Content

### Font Optimization
- Verwende `next/font` für Font Loading
- Nutze `display: swap` für bessere First Paint
- Beschränke Font Variants auf notwendige
- Self-host Fonts wo möglich

### Code Splitting
- Nutze Dynamic Imports für große Components
- Implementiere Route-based Code Splitting
- Lazy Load modals und Dialogs
- Verwende `Suspense` für Loading States

## React Performance

### Component Optimization
- Verwende `React.memo` für Pure Components
- Nutze `useMemo` für teure Berechnungen
- Verwende `useCallback` für Event Handlers in optimierten Components
- Vermeide unnötige Re-renders durch proper State Management

### Server Components
- Maximiere Server Component Usage
- Verschiebe Data Fetching zu Server Components
- Minimiere Client JavaScript Bundle Size
- Nutze Streaming für Progressive Rendering

## Data Fetching

### Server Actions
- Implementiere Caching für häufig abgefragte Daten
- Verwende `revalidate` für Incremental Static Regeneration
- Nutze `cache()` API für deduplication
- Implementiere Optimistic Updates für bessere UX

### Real-time Data
- Implementiere Efficient Polling mit exponential Backoff
- Nutze WebSockets für echte Real-time Updates
- Debounce API Calls für User Inputs
- Implementiere Request Batching wo möglich

### TradingView Widget
- Lazy Load TradingView Library
- Implementiere proper Cleanup in `useEffect`
- Vermeiде multiple Widget Instanzen
- Cache Widget Configuration

## Database Performance

### MongoDB Optimization
- Erstelle Indexes für häufig queried Fields
```typescript
// Beispiel: Watchlist Index
WatchlistSchema.index({ userId: 1, symbol: 1 });
WatchlistSchema.index({ userId: 1, addedAt: -1 });
```
- Verwende Projection für Field Selection
- Implementiere Pagination für große Resultsets
- Nutze Aggregation Pipeline für komplexe Queries

### Connection Management
- Verwende Connection Pooling
- Implementiere proper Connection Cleanup
- Cache Database Connection
- Handle Connection Errors gracefully

## Bundle Optimization

### Bundle Analysis
- Führe regelmäßig Bundle Analysis aus
```bash
pnpm build && pnpm analyze
```
- Identifiziere und eliminiere große Dependencies
- Verwende Tree Shaking kompatible Libraries
- Implementiere Code Splitting für große Pages

### Third-Party Scripts
- Laden Third-Party Scripts async
- Verwende `next/script` mit appropriate Strategy
- Defer non-critical Scripts
- Self-host kritische Third-Party Resources

## Caching Strategy

### HTTP Caching
- Setze appropriate Cache Headers
- Nutze CDN für statische Assets
- Implementiere Stale-While-Revalidate Pattern
- Cache API Responses wo sinnvoll

### Client-Side Caching
- Verwende React Query oder SWR für Data Caching
- Implementiere Cache Invalidation Strategy
- Nutze Local Storage für User Preferences
- Cache Watchlist Daten client-side

## Runtime Performance

### JavaScript Performance
- Vermeide blocking Operations im Main Thread
- Nutze Web Workers für Heavy Computations
- Debounce und Throttle Event Handlers
- Optimiere Loops und Iterations

### Rendering Performance
- Minimize DOM Manipulations
- Verwende Virtual Scrolling für lange Listen
- Implementiere Windowing für große Datasets
- Nutze CSS Containment für Isolation

## Monitoring & Metrics

### Core Web Vitals
- Monitore LCP (Largest Contentful Paint)
- Tracke FID (First Input Delay)
- Messe CLS (Cumulative Layout Shift)
- Nutze Next.js Analytics oder Vercel Analytics

### Performance Budget
- Definiere Maximum Bundle Sizes
- Setze Performance Budgets in CI/CD
- Monitore Page Load Times
- Tracke API Response Times

### Tools
- Nutze Lighthouse für Performance Audits
- Verwende Chrome DevTools Performance Panel
- Implementiere Real User Monitoring (RUM)
- Nutze Next.js Built-in Performance Metrics

## API Performance

### Response Optimization
- Implementiere Response Compression (gzip, brotli)
- Minimiere Response Payload Size
- Verwende JSON Streaming für große Responses
- Implement Conditional Requests (ETag, Last-Modified)

### Query Optimization
- Optimize Database Queries
- Implement Query Result Caching
- Use Connection Pooling
- Batch Multiple Requests

## Stock Tracker Specific

### Watchlist Performance
- Cache User's Watchlist client-side
- Implement Optimistic Updates
- Batch Price Updates für multiple Symbols
- Use WebSocket for Real-time Price Updates

### Chart Performance
- Lazy Load Chart Library
- Implement Chart Data Caching
- Optimize Chart Re-rendering
- Use Canvas over SVG für komplexe Charts