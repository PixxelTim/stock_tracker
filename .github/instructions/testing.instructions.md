---
applyTo: '**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx'
description: 'Testing Guidelines für Stock Tracker App'
---

# Testing Richtlinien

## Test Frameworks

- **Jest** für Unit und Integration Tests
- **React Testing Library** für Component Tests
- **Supertest** für API Route Tests
- **Playwright** oder **Cypress** für E2E Tests

## Test Struktur

### Unit Tests
- Teste Business Logik isoliert
- Verwende Mocks für externe Dependencies
- Folge AAA Pattern (Arrange, Act, Assert)
- Ein Test sollte eine Sache testen

### Component Tests
- Teste User Interactions, nicht Implementation Details
- Verwende `screen` Queries von Testing Library
- Teste Accessibility (aria-labels, roles)
- Vermeide Snapshot Tests für komplexe Components

### Integration Tests
- Teste Server Actions mit realistischen Daten
- Teste API Routes mit verschiedenen Inputs
- Teste Error Handling und Edge Cases
- Mocke externe APIs (TradingView, Finnhub)

## Stock Tracker Spezifische Tests

### Watchlist Tests
```typescript
describe('Watchlist Actions', () => {
  it('should add stock to watchlist', async () => {
    // Arrange
    const userId = 'test-user';
    const symbol = 'AAPL';
    
    // Act
    const result = await addToWatchlist(userId, symbol);
    
    // Assert
    expect(result.success).toBe(true);
    expect(result.data.symbol).toBe(symbol);
  });
});
```

### TradingView Widget Tests
- Teste Widget Initialisierung
- Teste Cleanup bei Component Unmount
- Mocke TradingView Library

### Financial Data Validation Tests
- Teste alle Input Validationen
- Teste Boundary Cases (negative Zahlen, große Zahlen)
- Teste Datenformate und Typen

## Best Practices

- **Naming:** Beschreibende Test Namen die Intent erklären
- **Setup:** Verwende `beforeEach` für gemeinsame Setup Logik
- **Cleanup:** Nutze `afterEach` für Cleanup und Mocks Reset
- **Assertions:** Verwende spezifische Matchers (`toBeInTheDocument`, `toHaveTextContent`)
- **Async:** Verwende `waitFor` für async Assertions
- **Coverage:** Strebe mindestens 80% Code Coverage an

## Test Data

- Verwende Factories für Test Data Generation
- Erstelle realistische Mock Daten
- Vermeide hardcodierte Werte wo möglich
- Nutze `faker` oder ähnliche Libraries für randomisierte Daten

## Continuous Integration

- Alle Tests müssen vor Merge passieren
- Teste auf verschiedenen Node Versionen
- Nutze GitHub Actions für automatisierte Tests
- Implementiere Test Reports und Coverage Reports