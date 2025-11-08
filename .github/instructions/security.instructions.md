---
applyTo: '**'
description: 'Security Best Practices für Stock Tracker App'
---

# Security Best Practices

## Authentifizierung & Autorisierung

### Better Auth Integration
- Verwende sichere Session Management
- Implementiere CSRF Protection
- Nutze httpOnly Cookies für Tokens
- Setze secure Flag für Production Cookies
- Implementiere Rate Limiting für Login Attempts

### Protected Routes
- Schütze alle authenticated Routes mit Middleware
- Validiere User Sessions server-side
- Implementiere Role-Based Access Control (RBAC) wenn nötig
- Nutze Next.js Middleware für Route Protection

## Input Validation & Sanitization

### User Input
- Validiere alle User Inputs mit Zod oder Yup
- Sanitize Inputs vor Database Operations
- Verwende Parameterized Queries (Mongoose schützt automatisch)
- Escape HTML Content vor Rendering

### API Input Validation
```typescript
// Beispiel mit Zod
import { z } from 'zod';

const WatchlistSchema = z.object({
  symbol: z.string().min(1).max(10).regex(/^[A-Z]+$/),
  userId: z.string().uuid()
});
```

## Datensicherheit

### MongoDB Security
- Verwende Mongoose Schema Validierung
- Implementiere Field-Level Encryption für sensitive Daten
- Nutze Connection String aus Environment Variables
- Aktiviere MongoDB Authentication
- Verwende Principle of Least Privilege für DB Users

### Environment Variables
- Speichere alle Secrets in `.env.local`
- Niemals Secrets in Git committen
- Verwende `.env.example` für Template
- Nutze `NEXT_PUBLIC_` Prefix nur für öffentliche Variables
- Rotiere API Keys regelmäßig

## API Security

### Rate Limiting
- Implementiere Rate Limiting für alle API Routes
- Verwende unterschiedliche Limits für verschiedene Endpoints
- Implementiere IP-based und User-based Limiting
- Nutze Libraries wie `@upstash/ratelimit`

### CORS Configuration
- Konfiguriere CORS für Production Domain
- Verwende Whitelist für erlaubte Origins
- Beschränke erlaubte HTTP Methods
- Setze appropriate Headers

### API Keys & External Services
- Speichere API Keys sicher (TradingView, Finnhub)
- Implementiere Key Rotation Strategy
- Verwende Server-side API Calls für sensitive Operations
- Niemals API Keys im Client Code exposen

## XSS & CSRF Protection

### XSS Prevention
- React escaped automatisch JSX Content
- Verwende `dangerouslySetInnerHTML` nur wenn absolut nötig
- Sanitize alle User-generated Content
- Setze Content Security Policy Headers

### CSRF Protection
- Better Auth bietet automatischen CSRF Schutz
- Validiere Origin und Referer Headers
- Verwende SameSite Cookie Attribute

## HTTP Headers Security

### Empfohlene Headers
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

## Dependency Security

- Führe regelmäßig `pnpm audit` aus
- Update Dependencies regelmäßig
- Nutze Dependabot für automatische Updates
- Überprüfe neue Dependencies vor Installation
- Verwende Lock Files (pnpm-lock.yaml)

## Error Handling

### Sichere Error Messages
- Expose niemals sensitive Information in Error Messages
- Logge detaillierte Errors server-side
- Zeige generische Fehler dem User
- Implementiere strukturiertes Error Logging

### Production vs Development
- Unterscheide zwischen Dev und Prod Error Handling
- Nutze Environment Variables für Feature Toggles
- Implementiere Error Boundaries für React Components

## Monitoring & Logging

- Implementiere Security Event Logging
- Monitore ungewöhnliche Activity Patterns
- Logge Failed Authentication Attempts
- Implementiere Alerting für Security Events
- Verwende Structured Logging (JSON Format)

## Data Privacy

### GDPR Compliance
- Implementiere User Data Export
- Ermögliche Account Deletion
- Speichere nur notwendige User Daten
- Implementiere Data Retention Policies

### Financial Data
- Behandle alle Financial Data als sensitive Information
- Implementiere Encryption at Rest und in Transit
- Logge alle Zugriffe auf Financial Data
- Implementiere Data Anonymization wo möglich