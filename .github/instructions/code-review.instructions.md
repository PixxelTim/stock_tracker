---
applyTo: '**'
description: 'Code Review Standards für Stock Tracker App'
---

# Code Review Standards

## Review Ziele

- Sicherstellung von Code Quality und Consistency
- Identifikation von Bugs und potentiellen Issues
- Wissensaustausch im Team
- Einhaltung von Best Practices und Standards
- Verbesserung der Codebase Wartbarkeit

## Review Checklist

### Funktionalität
- [ ] Code erfüllt die Anforderungen
- [ ] Business Logik ist korrekt implementiert
- [ ] Edge Cases sind behandelt
- [ ] Error Handling ist implementiert
- [ ] Tests sind vorhanden und passieren

### Code Quality
- [ ] Code ist lesbar und verständlich
- [ ] Naming Conventions sind eingehalten
- [ ] Functions und Components sind fokussiert (Single Responsibility)
- [ ] DRY Prinzip ist befolgt (Don't Repeat Yourself)
- [ ] Comments erklären das "Warum", nicht das "Was"

### TypeScript
- [ ] Types sind korrekt definiert
- [ ] Keine `any` Types (außer begründet)
- [ ] Interfaces sind für geteilte Contracts definiert
- [ ] Type Guards sind für Runtime Checks verwendet
- [ ] Generics sind sinnvoll eingesetzt

### React/Next.js
- [ ] Server vs Client Components sind korrekt verwendet
- [ ] Hooks folgen den Rules of Hooks
- [ ] useEffect hat proper Dependencies und Cleanup
- [ ] Props sind mit TypeScript typisiert
- [ ] Components sind wiederverwendbar designed

### Performance
- [ ] Keine unnötigen Re-renders
- [ ] Teure Operationen sind optimiert (useMemo, useCallback)
- [ ] Images nutzen next/image
- [ ] API Calls sind optimiert (Caching, Batching)
- [ ] Database Queries haben Indexes

### Security
- [ ] Input Validation ist implementiert
- [ ] SQL/NoSQL Injection ist verhindert
- [ ] XSS Protection ist vorhanden
- [ ] Secrets sind nicht im Code
- [ ] Authentication/Authorization ist korrekt

### Testing
- [ ] Unit Tests für Business Logik
- [ ] Component Tests für UI
- [ ] Integration Tests für kritische Flows
- [ ] Test Coverage ist angemessen
- [ ] Tests sind aussagekräftig benannt

### Documentation
- [ ] README ist aktualisiert bei Bedarf
- [ ] API Dokumentation ist vorhanden
- [ ] Complex Logic hat erklärende Comments
- [ ] JSDoc für public APIs
- [ ] Type Definitions sind dokumentiert

## Review Process

### Als Reviewer

1. **Verstehe den Context**
   - Lies die PR Description und verlinkte Issues
   - Verstehe das "Warum" hinter den Changes
   - Checke die Commit History

2. **Code Review durchführen**
   - Starte mit High-Level Architecture
   - Prüfe dann Details und Implementation
   - Teste lokal bei signifikanten Changes
   - Verwende GitHub's Review Features (Comments, Suggestions)

3. **Constructive Feedback**
   - Sei spezifisch und klar
   - Erkläre das "Warum" bei Änderungswünschen
   - Unterscheide zwischen "Must Fix" und "Nice to Have"
   - Biete Lösungsvorschläge an
   - Sei respektvoll und konstruktiv

4. **Approve oder Request Changes**
   - Approve nur wenn alle kritischen Issues adressiert sind
   - Request Changes mit klarer Begründung
   - Kommentiere auch positives Feedback

### Als Author

1. **PR vorbereiten**
   - Schreibe klare PR Description
   - Linke relevante Issues
   - Mache Self-Review vor Submission
   - Ensure Tests passieren
   - Update Documentation

2. **Auf Feedback reagieren**
   - Antworte zeitnah auf Comments
   - Erkläre deine Design Decisions
   - Sei offen für Verbesserungsvorschläge
   - Markiere resolved Conversations
   - Re-request Review nach Changes

## GitHub Review Features

### Kommentar Typen
- **Comment:** Allgemeine Bemerkung oder Frage
- **Suggestion:** Konkrete Code-Änderung vorschlagen
- **Request Changes:** Blockiert Merge bis resolved
- **Approve:** Gibt grünes Licht für Merge

### Konventionen
```markdown
**Nit:** Kleine, nicht-kritische Anmerkung
**Question:** Verständnisfrage
**Suggestion:** Verbesserungsvorschlag
**Critical:** Muss behoben werden vor Merge
**Security:** Sicherheitsrelevanter Punkt
**Performance:** Performance-Optimierung möglich
```

## Common Issues & Solutions

### Performance Issues
❌ **Problem:** Unnötige Re-renders
```typescript
const Component = ({ data }) => {
  const processed = expensiveOperation(data); // Runs on every render
  return <div>{processed}</div>;
};
```

✅ **Solution:** Use useMemo
```typescript
const Component = ({ data }) => {
  const processed = useMemo(() => expensiveOperation(data), [data]);
  return <div>{processed}</div>;
};
```

### Type Safety Issues
❌ **Problem:** Using any
```typescript
const fetchData = async (): Promise<any> => {
  const response = await fetch('/api/data');
  return response.json();
};
```

✅ **Solution:** Define proper types
```typescript
interface ApiResponse {
  data: Stock[];
  error?: string;
}

const fetchData = async (): Promise<ApiResponse> => {
  const response = await fetch('/api/data');
  return response.json();
};
```

### Security Issues
❌ **Problem:** Direct user input rendering
```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

✅ **Solution:** Sanitize or use safe rendering
```typescript
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

## Review Best Practices

### Timing
- Review PRs innerhalb von 24 Stunden
- Priorisiere kleine PRs über große
- Setze dedicated Review Zeit

### Communication
- Verwende konkrete Beispiele
- Linke zu relevanter Dokumentation
- Nutze Code Suggestions für kleine Fixes
- Kommuniziere asynchron aber effizient

### Team Standards
- Halte Team Code Style ein
- Folge established Patterns im Projekt
- Diskutiere größere Architectural Changes im Team
- Dokumentiere Team Decisions

## Automatisierte Checks

Stelle sicher diese passieren vor Review:
- ✅ Linting (ESLint)
- ✅ Type Checking (TypeScript)
- ✅ Unit Tests
- ✅ Build Check
- ✅ Format Check (Prettier)