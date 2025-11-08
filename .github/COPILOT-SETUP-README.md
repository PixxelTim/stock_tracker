# GitHub Copilot Setup - Stock Tracker App

✅ **Setup erfolgreich abgeschlossen!**

Dieses Repository ist jetzt vollständig mit GitHub Copilot konfiguriert und bietet intelligente Code-Unterstützung für die Stock Tracker App.

## 📁 Erstellte Dateien

### Haupt-Konfiguration
- `.github/copilot-instructions.md` - Projekt-weite Copilot Instruktionen

### Instructions (Best Practices)
- `.github/instructions/nextjs.instructions.md` - Next.js 15+ Best Practices
- `.github/instructions/typescript.instructions.md` - TypeScript 5.x Guidelines
- `.github/instructions/testing.instructions.md` - Testing Standards
- `.github/instructions/security.instructions.md` - Security Best Practices
- `.github/instructions/performance.instructions.md` - Performance Optimization
- `.github/instructions/code-review.instructions.md` - Code Review Standards

### Prompts (Wiederverwendbare Workflows)
- `.github/prompts/setup-component.prompt.md` - Component Erstellung
- `.github/prompts/write-tests.prompt.md` - Test Generierung
- `.github/prompts/code-review.prompt.md` - Code Review Assistance
- `.github/prompts/refactor-code.prompt.md` - Code Refactoring
- `.github/prompts/generate-docs.prompt.md` - Dokumentation
- `.github/prompts/debug-issue.prompt.md` - Debugging Hilfe

### Chat Modes (Spezialisierte Modi)
- `.github/chatmodes/architect.chatmode.md` - Architektur Planung
- `.github/chatmodes/frontend-expert.chatmode.md` - React/Next.js Expertise
- `.github/chatmodes/reviewer.chatmode.md` - Code Review Mode
- `.github/chatmodes/debugger.chatmode.md` - Debugging Mode

### Workflows
- `.github/workflows/copilot-setup-steps.yml` - CI/CD für Coding Agent

## 🚀 Verwendung

### 1. Instructions (Automatisch aktiv)

Instructions werden automatisch angewendet wenn sie zu deinem Code passen:

- Arbeitest du an `.ts` oder `.tsx` Files? → TypeScript Guidelines werden aktiv
- Schreibst du Tests? → Testing Guidelines werden aktiv
- Alle Files profitieren von Next.js und Security Guidelines

**Keine Aktion nötig** - Instructions sind immer im Hintergrund aktiv!

### 2. Prompts verwenden

Prompts sind wiederverwendbare Workflows. Verwende sie in VS Code:

1. Öffne GitHub Copilot Chat (`Ctrl+Shift+I` oder `Cmd+Shift+I`)
2. Referenziere einen Prompt mit `@`-Zeichen:
   ```
   @workspace /setup-component
   ```
3. Copilot führt dich durch den Workflow

**Beispiele:**
```
@workspace Erstelle eine neue StockCard Component basierend auf setup-component.prompt.md

@workspace Schreibe Tests für WatchlistButton basierend auf write-tests.prompt.md

@workspace Review diese Changes basierend auf code-review.prompt.md

@workspace Refactor diesen Code basierend auf refactor-code.prompt.md
```

### 3. Chat Modes aktivieren

Chat Modes sind spezialisierte Copilot Persönlichkeiten:

1. Öffne GitHub Copilot Chat
2. Wechsle in einen Mode:
   ```
   @workspace Aktiviere architect.chatmode.md
   ```
3. Stelle Fragen in diesem Mode

**Beispiele:**

**Architect Mode:**
```
@workspace Aktiviere architect.chatmode.md

Wie sollten wir real-time price updates architektonisch implementieren?
```

**Frontend Expert Mode:**
```
@workspace Aktiviere frontend-expert.chatmode.md

Wie kann ich diese Component für bessere Performance optimieren?
```

**Reviewer Mode:**
```
@workspace Aktiviere reviewer.chatmode.md

Review diese Component Änderungen
```

**Debugger Mode:**
```
@workspace Aktiviere debugger.chatmode.md

Hilf mir diesen "Hydration failed" Error zu debuggen
```

## 💡 Workflow Beispiele

### Neues Feature entwickeln

1. **Planung:**
   ```
   @workspace Aktiviere architect.chatmode.md
   Ich möchte ein Portfolio Tracking Feature hinzufügen. Wie sollte die Architektur aussehen?
   ```

2. **Component erstellen:**
   ```
   @workspace Erstelle eine PortfolioCard Component basierend auf setup-component.prompt.md
   ```

3. **Tests schreiben:**
   ```
   @workspace Schreibe Tests für PortfolioCard basierend auf write-tests.prompt.md
   ```

4. **Code Review:**
   ```
   @workspace Review meine PortfolioCard Implementation basierend auf code-review.prompt.md
   ```

### Bug fixen

1. **Debug:**
   ```
   @workspace Aktiviere debugger.chatmode.md
   
   Ich bekomme diesen Error: [Error Message]
   Stack Trace: [Stack Trace]
   ```

2. **Fix implementieren:**
   ```
   @workspace Wie kann ich diesen Memory Leak in TradingViewWidget fixen?
   ```

3. **Tests hinzufügen:**
   ```
   @workspace Erstelle Tests um diesen Bug zu verhindern basierend auf write-tests.prompt.md
   ```

### Code refactoren

1. **Analyse:**
   ```
   @workspace Aktiviere frontend-expert.chatmode.md
   Wie kann ich diese Component besser strukturieren?
   ```

2. **Refactor:**
   ```
   @workspace Refactor diese Component basierend auf refactor-code.prompt.md
   ```

3. **Verify:**
   ```
   @workspace Aktiviere reviewer.chatmode.md
   Review die refactored Version
   ```

## 🎯 Best Practices

### Do's ✅
- Referenziere spezifische Prompt-Dateien für strukturierte Workflows
- Wechsle Chat Modes für spezifische Aufgaben
- Nutze den Architect Mode für große Design Decisions
- Nutze den Debugger Mode für systematisches Debugging
- Review Code mit dem Reviewer Mode vor PRs

### Don'ts ❌
- Verlasse dich nicht blind auf Copilot - verstehe den generierten Code
- Ignoriere nicht die Instructions - sie sind Best Practices
- Überspringe keine Tests
- Ignoriere keine Security Guidelines
- Merge nicht ohne Code Review

## 📚 Weitere Ressourcen

### Projektspezifisch
- [Next.js Instructions](./instructions/nextjs.instructions.md)
- [TypeScript Guidelines](./instructions/typescript.instructions.md)
- [Security Best Practices](./instructions/security.instructions.md)

### External
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)

## 🔧 Anpassung

### Instructions anpassen
Bearbeite Dateien in `.github/instructions/` um projekt-spezifische Guidelines hinzuzufügen.

### Neue Prompts erstellen
Erstelle neue `.prompt.md` Dateien in `.github/prompts/` für wiederkehrende Workflows.

### Neue Chat Modes erstellen
Erstelle neue `.chatmode.md` Dateien in `.github/chatmodes/` für spezialisierte Modi.

### Frontmatter Format
Alle Dateien sollten YAML frontmatter haben:

**Instructions:**
```yaml
---
applyTo: "**/*.ts,**/*.tsx"
description: "TypeScript Guidelines"
---
```

**Prompts:**
```yaml
---
mode: 'agent'
model: Claude Sonnet 4
tools: ['codebase', 'edit/editFiles']
description: "Component setup workflow"
---
```

**Chat Modes:**
```yaml
---
description: "Specialized mode description"
tools: ['codebase', 'usages']
model: Claude Sonnet 4
---
```

## 🧪 Testing

Der Workflow `.github/workflows/copilot-setup-steps.yml` läuft automatisch:
- Bei Push zum Workflow File
- Bei PRs die den Workflow ändern
- Manuell via `workflow_dispatch`

**Manuell ausführen:**
1. Gehe zu Actions Tab im Repository
2. Wähle "Copilot Setup Steps"
3. Klicke "Run workflow"

## 🆘 Troubleshooting

### Copilot folgt nicht den Instructions
- Stelle sicher die Instructions haben korrektes `applyTo` Pattern
- Prüfe YAML frontmatter Syntax
- Restart VS Code

### Prompts funktionieren nicht
- Stelle sicher du referenzierst sie korrekt: `@workspace /prompt-name`
- Prüfe Datei Extension ist `.prompt.md`
- Prüfe frontmatter ist korrekt

### Chat Modes laden nicht
- Stelle sicher Datei Extension ist `.chatmode.md`
- Prüfe frontmatter Syntax
- Restart Copilot Chat

## 📝 Feedback

Hast du Verbesserungsvorschläge für das Setup?
- Öffne ein Issue
- Erstelle einen PR
- Diskutiere mit dem Team

---

**Happy Coding mit GitHub Copilot! 🚀**