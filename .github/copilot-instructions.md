# GitHub Copilot Instructions - Stock Tracker App

Dieses Repository enthält eine moderne Next.js Stock Tracker App mit TypeScript, MongoDB, TradingView Integration und Better Auth.

## 📁 Projektstruktur

```
app/                    # Next.js App Router (Hauptverzeichnis)
├── (auth)/            # Auth-Routen Gruppe
├── (root)/            # Haupt-App Routen
├── api/               # API Route Handlers
├── globals.css        # Globale Styles
└── layout.tsx         # Root Layout

components/            # Wiederverwendbare UI Komponenten
├── forms/            # Form-spezifische Komponenten
└── ui/               # Basis UI Komponenten (shadcn/ui)

lib/                  # Geteilte Utilities und Logik
├── actions/          # Server Actions
├── better-auth/      # Authentifizierung Setup
├── inngest/          # Background Job Processing
└── nodemailer/       # E-Mail Services

database/             # MongoDB Schemas und Modelle
hooks/                # Custom React Hooks
middleware/           # Next.js Middleware
types/                # TypeScript Typdefinitionen
```

## 🎯 Entwicklungsrichtlinien

### Next.js Best Practices
- Verwende den **App Router** für alle neuen Routen und Features
- Nutze **Server Components** standardmäßig, Client Components nur bei Bedarf
- Implementiere **Route Groups** mit Klammern für organisatorische Struktur
- Befolge die [Next.js-spezifischen Anweisungen](./instructions/nextjs.instructions.md)

### TypeScript Standards
- Nutze **TypeScript 5.x** mit strikten Einstellungen
- Definiere Typen in `types/` Verzeichnis für geteilte Interfaces
- Befolge die [TypeScript-spezifischen Anweisungen](./instructions/typescript.instructions.md)

### Component Architektur
- **Server Components** für Datenabfrage und statische UI
- **Client Components** für Interaktivität und Browser APIs
- Organisiere Komponenten nach Feature oder wiederverwendbar in `components/`
- Nutze shadcn/ui Komponenten aus `components/ui/`

### State Management
- **React State** für lokale Component State
- **Server Actions** für Datenmanipulation
- **React Context** für globale App-Zustände (Auth, Theme)

### Styling
- **Tailwind CSS** für alle Styles
- **CSS Variables** für Design Tokens
- **Responsive Design** mit Mobile-First Ansatz

### Datenbank
- **MongoDB** mit Mongoose ODM
- **Modelle** in `database/models/`
- **Server Actions** in `lib/actions/` für Datenbankoperationen

### Authentifizierung
- **Better Auth** für Session Management
- **Protected Routes** über Middleware
- **User Context** für Auth State

## 🔧 Entwicklungsworkflow

1. **Komponenten erstellen**: Nutze [setup-component.prompt.md](./prompts/setup-component.prompt.md)
2. **Tests schreiben**: Befolge [write-tests.prompt.md](./prompts/write-tests.prompt.md)
3. **Code Review**: Verwende [code-review.prompt.md](./prompts/code-review.prompt.md)
4. **Refactoring**: Nutze [refactor-code.prompt.md](./prompts/refactor-code.prompt.md)

## 🎭 Spezialisierte Chat Modi

- **[Architect Mode](./chatmodes/architect.chatmode.md)**: Für Architekturplanung
- **[Frontend Expert](./chatmodes/frontend-expert.chatmode.md)**: React/Next.js Expertise
- **[Code Reviewer](./chatmodes/reviewer.chatmode.md)**: Code Quality Reviews
- **[Debugger](./chatmodes/debugger.chatmode.md)**: Problem Solving

## 📋 Qualitätssicherung

- **Linting**: ESLint mit Next.js Config
- **Formatting**: Prettier für Code Formatierung
- **Type Checking**: TypeScript Strict Mode
- **Testing**: Jest + React Testing Library

## 🔗 Verwandte Anweisungen

- [Next.js Entwicklung](./instructions/nextjs.instructions.md)
- [TypeScript Standards](./instructions/typescript.instructions.md)
- [Testing Richtlinien](./instructions/testing.instructions.md)
- [Sicherheit Best Practices](./instructions/security.instructions.md)
- [Performance Optimierung](./instructions/performance.instructions.md)
- [Code Review Standards](./instructions/code-review.instructions.md)