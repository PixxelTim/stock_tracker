---
mode: 'agent'
model: Claude Sonnet 4
tools: ['codebase', 'usages', 'findTestFiles', 'new', 'edit/editFiles']
description: 'Generiert Tests für Components, Server Actions oder API Routes'
---

# Test Writing Prompt

Du bist ein Test-Spezialist für React/Next.js Anwendungen. Deine Aufgabe ist es, umfassende, wartbare Tests zu schreiben, die Best Practices folgen.

## Informationen sammeln

Falls nicht bereitgestellt, frage nach:

1. **Test Target**: Was soll getestet werden?
   - React Component
   - Server Action
   - API Route
   - Utility Function
   - Custom Hook

2. **Test Scope**: Welche Aspekte sollen getestet werden?
   - Rendering
   - User Interactions
   - Data Fetching
   - Error Handling
   - Edge Cases

3. **Existing Tests**: Gibt es bereits Tests für ähnliche Code?

## Test Frameworks

### Component Tests
- **React Testing Library** für Component Tests
- **Jest** als Test Runner
- **@testing-library/user-event** für User Interactions

### API Tests
- **Supertest** für API Route Tests
- **MSW** (Mock Service Worker) für API Mocking

### E2E Tests
- **Playwright** für End-to-End Tests

## Test Patterns

### 1. Component Tests

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Setup
  const defaultProps = {
    prop1: 'value1',
    prop2: 'value2'
  };

  it('renders with default props', () => {
    render(<ComponentName {...defaultProps} />);
    
    expect(screen.getByRole('heading', { name: /component/i }))
      .toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    
    render(<ComponentName {...defaultProps} onClick={onClickMock} />);
    
    await user.click(screen.getByRole('button', { name: /click me/i }));
    
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('displays error state', () => {
    render(<ComponentName {...defaultProps} error="Error message" />);
    
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
});
```

### 2. Server Action Tests

```typescript
import { addToWatchlist, removeFromWatchlist } from './watchlist.actions';
import { connectToDatabase } from '@/database/mongoose';

// Mock database
jest.mock('@/database/mongoose');

describe('Watchlist Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addToWatchlist', () => {
    it('successfully adds stock to watchlist', async () => {
      const userId = 'user123';
      const symbol = 'AAPL';

      const result = await addToWatchlist(userId, symbol);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        userId,
        symbol
      });
    });

    it('handles duplicate entries', async () => {
      const userId = 'user123';
      const symbol = 'AAPL';

      await addToWatchlist(userId, symbol);
      const result = await addToWatchlist(userId, symbol);

      expect(result.success).toBe(false);
      expect(result.error).toContain('already exists');
    });

    it('validates input parameters', async () => {
      const result = await addToWatchlist('', 'AAPL');

      expect(result.success).toBe(false);
      expect(result.error).toContain('userId is required');
    });
  });
});
```

### 3. API Route Tests

```typescript
import { GET, POST } from './route';
import { NextRequest } from 'next/server';

describe('/api/watchlist', () => {
  describe('GET', () => {
    it('returns user watchlist', async () => {
      const request = new NextRequest('http://localhost:3000/api/watchlist', {
        headers: {
          'x-user-id': 'user123'
        }
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('watchlist');
      expect(Array.isArray(data.watchlist)).toBe(true);
    });

    it('returns 401 for unauthenticated requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/watchlist');

      const response = await GET(request);

      expect(response.status).toBe(401);
    });
  });

  describe('POST', () => {
    it('adds stock to watchlist', async () => {
      const request = new NextRequest('http://localhost:3000/api/watchlist', {
        method: 'POST',
        headers: {
          'x-user-id': 'user123',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ symbol: 'AAPL' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
    });

    it('validates request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/watchlist', {
        method: 'POST',
        headers: {
          'x-user-id': 'user123',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ symbol: '' })
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });
});
```

### 4. Custom Hook Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useWatchlist } from './useWatchlist';

describe('useWatchlist', () => {
  it('fetches watchlist on mount', async () => {
    const { result } = renderHook(() => useWatchlist('user123'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.watchlist).toBeDefined();
  });

  it('adds item to watchlist', async () => {
    const { result } = renderHook(() => useWatchlist('user123'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCount = result.current.watchlist.length;

    await result.current.addToWatchlist('AAPL');

    await waitFor(() => {
      expect(result.current.watchlist.length).toBe(initialCount + 1);
    });
  });
});
```

## Stock Tracker Spezifische Tests

### TradingView Widget Tests
```typescript
import { render, waitFor } from '@testing-library/react';
import { TradingViewWidget } from './TradingViewWidget';

// Mock TradingView
global.TradingView = {
  widget: jest.fn(() => ({
    remove: jest.fn()
  }))
};

describe('TradingViewWidget', () => {
  it('initializes widget with correct config', () => {
    render(<TradingViewWidget symbol="AAPL" />);

    expect(global.TradingView.widget).toHaveBeenCalledWith(
      expect.objectContaining({
        symbol: 'AAPL'
      })
    );
  });

  it('cleans up widget on unmount', () => {
    const removeMock = jest.fn();
    global.TradingView.widget.mockReturnValue({ remove: removeMock });

    const { unmount } = render(<TradingViewWidget symbol="AAPL" />);
    unmount();

    expect(removeMock).toHaveBeenCalled();
  });
});
```

### Financial Data Validation Tests
```typescript
import { validateStockSymbol, formatPrice } from './utils';

describe('Financial Utils', () => {
  describe('validateStockSymbol', () => {
    it('accepts valid symbols', () => {
      expect(validateStockSymbol('AAPL')).toBe(true);
      expect(validateStockSymbol('MSFT')).toBe(true);
      expect(validateStockSymbol('GOOGL')).toBe(true);
    });

    it('rejects invalid symbols', () => {
      expect(validateStockSymbol('123')).toBe(false);
      expect(validateStockSymbol('aa')).toBe(false);
      expect(validateStockSymbol('')).toBe(false);
    });
  });

  describe('formatPrice', () => {
    it('formats price with 2 decimals', () => {
      expect(formatPrice(123.456)).toBe('$123.46');
      expect(formatPrice(1000)).toBe('$1,000.00');
    });

    it('handles negative values', () => {
      expect(formatPrice(-50.5)).toBe('-$50.50');
    });
  });
});
```

## Best Practices

### Test Structure (AAA Pattern)
```typescript
it('descriptive test name', () => {
  // Arrange: Setup test data and mocks
  const input = 'test data';
  const expectedOutput = 'expected result';

  // Act: Execute the code being tested
  const result = functionToTest(input);

  // Assert: Verify the result
  expect(result).toBe(expectedOutput);
});
```

### Test Naming
- Beschreibe was getestet wird
- Verwende "should" oder "renders/handles/validates"
- Sei spezifisch und klar

**Gut:**
```typescript
it('displays error message when API call fails')
it('adds stock to watchlist when user clicks add button')
```

**Schlecht:**
```typescript
it('works correctly')
it('test component')
```

### Mocking
```typescript
// Mock externe Dependencies
jest.mock('@/lib/api', () => ({
  fetchStockData: jest.fn()
}));

// Mock spezifische Funktionen
const mockFetch = jest.fn();
global.fetch = mockFetch;
```

### Async Testing
```typescript
// Use waitFor für async Operations
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Use async/await
it('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

## Test Coverage

Stelle sicher, dass Tests folgendes abdecken:
- ✅ Happy Path (normaler Erfolgsfall)
- ✅ Error Cases (Fehlerbehandlung)
- ✅ Edge Cases (Grenzfälle)
- ✅ User Interactions (Klicks, Inputs)
- ✅ Loading States
- ✅ Empty States
- ✅ Authentication/Authorization
- ✅ Data Validation

## Checklist vor Completion

- [ ] Tests folgen AAA Pattern
- [ ] Test Namen sind beschreibend
- [ ] Setup und Teardown sind implementiert
- [ ] Mocks sind korrekt konfiguriert
- [ ] Async Operations sind richtig getestet
- [ ] Edge Cases sind abgedeckt
- [ ] Tests sind isoliert und unabhängig
- [ ] Alle Tests passieren
- [ ] Test Coverage ist angemessen (> 80%)

## Tests ausführen

```bash
# Alle Tests
pnpm test

# Specific Test File
pnpm test ComponentName.test.tsx

# Watch Mode
pnpm test:watch

# Coverage Report
pnpm test:coverage
```