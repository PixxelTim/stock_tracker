<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/typescript-5-es2022.instructions.md -->
---
applyTo: '**/*.ts,**/*.tsx'
description: 'TypeScript 5.x Development Guidelines für Stock Tracker App'
---

# TypeScript Development Guidelines

## Core Intent

- Respektiere die bestehende Architektur und Coding Standards
- Bevorzuge lesbare, explizite Lösungen gegenüber cleveren Shortcuts
- Erweitere aktuelle Abstraktionen bevor du neue erfindest
- Priorisiere Wartbarkeit und Klarheit, kurze Methoden und Klassen

## General Guardrails

- Ziele auf TypeScript 5.x / ES2022 und bevorzuge native Features gegenüber Polyfills
- Verwende pure ES Module; emittiere niemals `require`, `module.exports` oder CommonJS Helpers
- Verlass dich auf die Build-, Lint- und Test-Scripts des Projekts
- Notiere Design Trade-offs wenn Intent nicht offensichtlich ist

## Projekt Organisation

- Folge dem Repository's Ordner- und Verantwortlichkeits-Layout für neuen Code
- Verwende kebab-case Dateinamen (z.B. `user-session.ts`, `data-service.ts`)
- Halte Tests, Types und Helpers nah bei ihrer Implementierung
- Verwende oder erweitere geteilte Utilities bevor du neue hinzufügst

## Naming & Style

- Verwende PascalCase für Classes, Interfaces, Enums und Type Aliases; camelCase für alles andere
- Überspringe Interface Prefixes wie `I`; verlass dich auf beschreibende Namen
- Benenne Dinge nach ihrem Verhalten oder Domain Meaning, nicht Implementation

## Type System Expectations

- Vermeide `any` (implizit oder explizit); bevorzuge `unknown` plus Narrowing
- Verwende Discriminated Unions für Events und State Machines
- Zentralisiere geteilte Contracts anstatt Shapes zu duplizieren
- Drücke Intent mit TypeScript Utility Types aus (z.B. `Readonly`, `Partial`, `Record`)

## Stock Tracker Spezifische Types

### Financial Data Types
```typescript
interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

interface WatchlistItem {
  id: string;
  symbol: string;
  userId: string;
  addedAt: Date;
}
```

### API Response Types
- Definiere strikte Types für alle externen API Responses
- Verwende Union Types für verschiedene Response States
- Implementiere Type Guards für Runtime Validierung

## Async, Events & Error Handling

- Verwende `async/await`; wrappe awaits in try/catch mit strukturierten Errors
- Schütze Edge Cases früh um tiefe Verschachtelung zu vermeiden
- Sende Errors durch die Logging/Telemetry Utilities des Projekts
- Zeige user-facing Errors über das Repository's Notification Pattern

## Sicherheitspraktiken

- Validiere und sanitize externen Input mit Schema Validators oder Type Guards
- Vermeide dynamische Code Execution und untrusted Template Rendering
- Enkodiere untrusted Content vor HTML Rendering
- Verwende parametrisierte Queries für Datenbank Operations
- Halte Secrets in sicherem Storage und fordere least-privilege Scopes an

## Performance & Reliability

- Lazy-load schwere Dependencies und dispose sie wenn fertig
- Verschiebe teure Arbeit bis Users sie brauchen
- Batch oder debounce high-frequency Events um Thrash zu reduzieren
- Verfolge Resource Lifetimes um Leaks zu verhindern

## Testing Expectations

- Füge Unit Tests mit dem Framework und Naming Style des Projekts hinzu
- Erweitere Integration oder End-to-End Suites wenn Verhalten Module oder Platform APIs kreuzt
- Vermeide brüchige Timing Assertions; bevorzuge Fake Timer oder injected Clocks

## Documentation & Comments

- Füge JSDoc zu public APIs hinzu; inkludiere `@remarks` oder `@example` wenn hilfreich
- Schreibe Comments die Intent erfassen und entferne stale Notes während Refactors
- Update Architektur oder Design Docs bei Einführung signifikanter Patterns