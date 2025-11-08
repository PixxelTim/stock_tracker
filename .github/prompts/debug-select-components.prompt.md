---
mode: 'agent'
model: Claude Sonnet 4
tools: ['codebase', 'problems', 'usages', 'search', 'edit/editFiles', 'terminalLastCommand']
description: 'Debugge und behebe shadcn Select-Komponenten die keine Optionen anzeigen'
---

# Debug Select Components - Keine Dropdown-Optionen sichtbar

## Problem Beschreibung

Die shadcn Select-Komponenten (`SelectField` und `CountrySelectField`) zeigen beim Klicken keine Dropdown-Optionen an. Die Komponenten rendern korrekt, aber das Dropdown-Menü erscheint nicht oder ist unsichtbar.

## Symptome

1. ✅ **CountrySelectField**: Zeigt "Deutschland" an (funktioniert teilweise)
2. ❌ **SelectField**: Zeigt keine Values an (komplett leer)
3. ❌ **Dropdown**: Öffnet nicht beim Klick auf beide Komponenten
4. ✅ **Console Logs**: Zeigen dass Komponenten korrekt rendern
5. ✅ **Data**: Options und Default Values sind vorhanden

## Schritt 1: Browser DevTools Inspektion

### A) DOM Inspektion beim Klick

1. Öffne `http://localhost:3000/sign-up`
2. Öffne Browser DevTools (F12) → Elements Tab
3. Klicke auf ein Select-Feld
4. Prüfe im DOM nach:

```html
<!-- Suche nach diesem Element: -->
<div data-radix-select-content>
  <!-- Sollte die Options enthalten -->
</div>
```

**Prüfe folgendes:**
- [ ] Existiert `[data-radix-select-content]` im DOM?
- [ ] Wenn ja: Ist es sichtbar? (nicht `display: none`)
- [ ] Hat es `position: fixed` oder `absolute`?
- [ ] Welcher `z-index` ist gesetzt?
- [ ] Ist es außerhalb des Viewports positioniert?

### B) CSS Computed Styles Prüfung

Wähle das `[data-radix-select-content]` Element und prüfe:
- `display`: Sollte NICHT `none` sein
- `visibility`: Sollte `visible` sein
- `opacity`: Sollte > 0 sein
- `transform`: Prüfe ob es off-screen verschoben ist
- `z-index`: Sollte hoch sein (9999+)
- `pointer-events`: Sollte NICHT `none` sein

### C) Console Errors

Prüfe Console auf:
- React Hydration Errors
- Radix UI Warnungen
- Portal Rendering Errors
- CSS-in-JS Errors

## Schritt 2: Radix UI Portal Debugging

Das Problem ist wahrscheinlich **Portal-Rendering**. Radix UI rendert Dropdowns in einem Portal außerhalb der Component-Hierarchie.

### Prüfe Portal Container

```javascript
// Führe in Browser Console aus:
document.querySelector('[data-radix-portal]')
// Sollte Container für Portal-Content zurückgeben
```

**Wenn `null`:**
- Portal wird nicht erstellt → Radix UI Problem
- Mögliche Ursache: SSR/Hydration Mismatch

**Wenn Container existiert:**
- Prüfe ob Content darin ist
- Prüfe CSS Styles des Containers

## Schritt 3: Code Fixes

### Fix 1: SelectValue Rendering Problem

**Problem**: `SelectValue` mit Children funktioniert nicht korrekt in Radix UI Select.

**Lösung**: Entferne Custom Children aus `SelectValue`

```typescript
// ❌ FALSCH - Aktueller Code in SelectField.tsx
<SelectValue placeholder={placeholder}>
    {field.value ? (
        options.find(opt => opt.value === field.value)?.label || field.value
    ) : null}
</SelectValue>

// ✅ RICHTIG - Korrigierter Code
<SelectValue placeholder={placeholder} />
```

**Begründung**: Radix UI Select managed die Value-Anzeige automatisch über das `value` Prop der `Select` Component. Custom Children überschreiben diese Logik und brechen das Rendering.

### Fix 2: Portal Container Position

**Problem**: Portal wird möglicherweise nicht korrekt positioniert oder ist hidden.

**Lösung**: Füge expliziten Portal Container CSS hinzu

```css
/* In globals.css hinzufügen: */
[data-radix-portal] {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
}

[data-radix-portal] > * {
  pointer-events: auto;
}
```

### Fix 3: SelectContent Position Props

**Problem**: `position="popper"` funktioniert möglicherweise nicht mit custom styles.

**Lösung**: Teste mit `position="item-aligned"`

```typescript
// In SelectField.tsx ändern:
<SelectContent 
  className="bg-gray-800 border-gray-600 text-white z-[9999]"
  position="item-aligned"  // ← Ändere von "popper"
>
```

### Fix 4: Entferne z-index aus className

**Problem**: `z-[9999]` in className kann von globals.css z-index überschrieben werden.

**Lösung**: Nutze nur CSS-Klasse für z-index

```typescript
// SelectField.tsx - Entferne z-[9999] aus className
<SelectContent className="bg-gray-800 border-gray-600 text-white">
```

```css
/* globals.css - Stelle sicher dass diese Regel existiert: */
[data-slot="select-content"] {
  @apply bg-gray-800 border-gray-600 text-white z-[9999];
}
```

## Schritt 4: Vollständige SelectField Korrektur

Ersetze die gesamte `SelectField.tsx` mit dieser korrigierten Version:

```typescript
'use client';

import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectField = ({ 
    name, 
    label, 
    placeholder, 
    options, 
    control, 
    error, 
    required = false 
}: SelectFieldProps) => {
    
    if (!options || !Array.isArray(options)) {
        console.error(`SelectField "${name}": Options missing`, options);
        return null; // Graceful failure
    }

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Bitte wählen Sie ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger className="select-trigger w-full">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            <SelectGroup>
                                {options.map((option) => (
                                    <SelectItem 
                                        value={option.value} 
                                        key={option.value}
                                        className="text-white cursor-pointer hover:bg-gray-600 focus:bg-gray-600"
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {error && (
                <p className="text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default SelectField;
```

**Wichtige Änderungen:**
1. ✅ Entfernt: Custom `SelectValue` Children
2. ✅ Entfernt: `defaultValue` Prop (wird automatisch von `value` gehandelt)
3. ✅ Entfernt: `onClick` Handler (unnötig)
4. ✅ Entfernt: Debug console.logs (für Production)
5. ✅ Vereinfacht: `onValueChange` direkt zu `field.onChange`

## Schritt 5: Alternative Lösung - Native Select

Falls Radix UI Select weiterhin Probleme macht, verwende eine **einfachere Alternative**:

```typescript
'use client';

import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

const SelectField = ({ 
    name, 
    label, 
    placeholder, 
    options, 
    control, 
    error, 
    required = false 
}: SelectFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Bitte wählen Sie ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <select
                        {...field}
                        className="select-trigger w-full"
                        id={name}
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option 
                                value={option.value} 
                                key={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && (
                <p className="text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default SelectField;
```

## Schritt 6: Radix UI Version Check

Prüfe ob die richtige Radix UI Version installiert ist:

```bash
pnpm list @radix-ui/react-select
```

**Sollte sein:** `@radix-ui/react-select@^2.0.0` oder höher

**Falls älter:**
```bash
pnpm update @radix-ui/react-select
```

## Schritt 7: Test Checklist

Nach Implementierung der Fixes:

- [ ] Öffne `/sign-up` im Browser
- [ ] Klicke auf "Investitionsziele" Select
- [ ] Dropdown sollte sich öffnen
- [ ] Optionen sollten sichtbar sein (weißer Text, grauer Hintergrund)
- [ ] Hover über Optionen sollte Hintergrund ändern
- [ ] Klick auf Option sollte Value setzen
- [ ] Selected Value sollte im Trigger angezeigt werden
- [ ] Wiederhole für alle 3 Select-Felder
- [ ] Teste CountrySelectField (sollte weiterhin funktionieren)

## Schritt 8: Debugging Output

Wenn es immer noch nicht funktioniert, füge temporär diesen Debug-Code hinzu:

```typescript
// In SelectField.tsx nach dem Controller render:
render={({ field }) => {
    console.log('SelectField Render:', {
        name,
        fieldValue: field.value,
        options: options.map(o => o.value)
    });
    
    return (
        <Select 
            value={field.value}
            onValueChange={(val) => {
                console.log('Value changing:', { from: field.value, to: val });
                field.onChange(val);
            }}
            onOpenChange={(open) => {
                console.log('Dropdown state:', open);
            }}
        >
            {/* Rest of Select */}
        </Select>
    );
}}
```

**Erwartete Console Output:**
```
SelectField Render: {name: "investmentGoals", fieldValue: "Growth", options: Array(4)}
Dropdown state: true  // ← Beim Klick sollte true kommen
Value changing: {from: "Growth", to: "Income"}  // ← Beim Select einer Option
```

## Häufige Probleme & Lösungen

### Problem: "Dropdown öffnet sich aber ist unsichtbar"
**Ursache**: CSS z-index oder Portal positioning
**Lösung**: Fix 2 (Portal Container CSS) implementieren

### Problem: "Selected Value wird nicht angezeigt"
**Ursache**: Custom SelectValue Children überschreiben internes Rendering
**Lösung**: Fix 1 (SelectValue ohne Children) implementieren

### Problem: "Dropdown öffnet sich nicht"
**Ursache**: Event Handler Conflicts oder disabled state
**Lösung**: Entferne custom onClick Handler, prüfe ob Select disabled ist

### Problem: "Options sind da aber nicht klickbar"
**Ursache**: `pointer-events: none` auf Parent Element
**Lösung**: Prüfe CSS, entferne pointer-events Restrictions

## Ressourcen

- [Radix UI Select Docs](https://www.radix-ui.com/docs/primitives/components/select)
- [shadcn/ui Select Examples](https://ui.shadcn.com/docs/components/select)
- [React Hook Form Controller](https://react-hook-form.com/api/usecontroller/controller)

## Erfolgs-Kriterien

✅ Dropdown öffnet sich beim Klick
✅ Optionen sind sichtbar (weißer Text, grauer Hintergrund)
✅ Hover funktioniert
✅ Selection funktioniert
✅ Selected Value wird im Trigger angezeigt
✅ Form Submission enthält korrekte Values
