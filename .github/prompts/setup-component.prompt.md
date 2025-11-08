---
mode: 'agent'
model: Claude Sonnet 4
tools: ['codebase', 'usages', 'search', 'edit/editFiles', 'new']
description: 'Erstellt eine neue React Component für die Stock Tracker App'
---

# Component Setup Prompt

Du bist ein erfahrener React/Next.js Entwickler. Deine Aufgabe ist es, eine neue Component für die Stock Tracker App zu erstellen, die allen Best Practices und Projektstandards entspricht.

## Informationen sammeln

Falls nicht bereitgestellt, frage nach:

1. **Component Name**: z.B. `StockCard`, `WatchlistTable`, `PriceChart`
2. **Component Type**: Server Component oder Client Component?
3. **Props**: Welche Props benötigt die Component?
4. **Location**: Wo soll die Component platziert werden?
   - `components/` für wiederverwendbare Components
   - `app/[route]/` für route-spezifische Components
5. **Styling**: Tailwind CSS Klassen oder neue Styles benötigt?
6. **Dependencies**: Benötigt sie externe Libraries oder UI Components?

## Component Erstellung Schritte

### 1. Analysiere bestehende Patterns
- Suche im Codebase nach ähnlichen Components
- Identifiziere wiederverwendbare Patterns
- Prüfe bestehende UI Components in `components/ui/`

### 2. Erstelle die Component Datei

**Für Server Components:**
```typescript
import { FC } from 'react';

interface ComponentNameProps {
  // Props definition
}

const ComponentName: FC<ComponentNameProps> = async ({ prop1, prop2 }) => {
  // Server-side data fetching
  const data = await fetchData();

  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

**Für Client Components:**
```typescript
'use client';

import { FC } from 'react';

interface ComponentNameProps {
  // Props definition
}

const ComponentName: FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // Client-side logic, hooks, event handlers

  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### 3. Implementiere Best Practices

#### TypeScript
- Definiere strikte Props Interface
- Verwende Generics wo sinnvoll
- Exportiere Types für Wiederverwendung

#### Styling
- Verwende Tailwind CSS Utility Classes
- Folge dem Mobile-First Ansatz
- Nutze CSS Variables aus `globals.css`
- Implementiere Responsive Design

#### Accessibility
- Verwende semantische HTML Tags
- Füge ARIA Labels hinzu wo nötig
- Implementiere Keyboard Navigation
- Stelle ausreichenden Kontrast sicher

#### Performance
- Verwende `React.memo` für Pure Components
- Implementiere `useMemo` für teure Berechnungen
- Nutze `useCallback` für Event Handlers in optimierten Components
- Lazy Load große Dependencies

### 4. Erstelle Tests

Erstelle eine Test-Datei `ComponentName.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    // Test interactions
  });
});
```

### 5. Dokumentiere die Component

Füge JSDoc Kommentare hinzu:

```typescript
/**
 * ComponentName - Kurze Beschreibung
 * 
 * @example
 * ```tsx
 * <ComponentName prop1="value" />
 * ```
 */
```

## Stock Tracker Spezifische Components

### StockCard
- Zeigt Stock Symbol, Preis, Change
- Implementiert Watchlist Add/Remove Button
- Nutzt TradingView Mini Chart

### WatchlistTable
- Zeigt User's Watchlist
- Sortierbare Columns
- Real-time Price Updates
- Remove from Watchlist Action

### PriceChart
- TradingView Widget Integration
- Responsive Chart Size
- Loading State
- Error Handling

## Checklist vor Completion

- [ ] Component folgt Naming Conventions
- [ ] TypeScript Types sind definiert
- [ ] Styling mit Tailwind CSS
- [ ] Accessibility Features implementiert
- [ ] Tests sind geschrieben
- [ ] JSDoc Dokumentation hinzugefügt
- [ ] Performance Optimierungen angewandt
- [ ] Component ist im korrekten Verzeichnis
- [ ] Imports sind organisiert
- [ ] Keine ESLint Fehler

## Nächste Schritte

Nach Erstellung der Component:
1. Importiere und verwende sie in der Parent Component
2. Teste sie im Browser
3. Führe Tests aus: `pnpm test ComponentName`
4. Erstelle einen PR mit klarer Beschreibung