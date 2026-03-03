# collectexports — Landing Page Spec

> Product name is **collectexports** (standalone). Devlander is the publisher—mention in footer/attribution only.

---

## 1. Hero

**Headline:**  
*"Generate barrel exports automatically"*  
or  
*"Stop writing export statements by hand"*

**Subhead:**  
*"collectexports scans your directories and generates TypeScript/JavaScript export statements for barrel files and design systems."*

**CTA:**  
*"Get started"* → docs or install instructions

**Optional:** Small inline code preview below the CTA so people see the tool immediately.

---

## 2. Before / After

Show the pain vs the automated outcome.

**Before (manual):**
```typescript
// src/components/index.ts — you wrote this by hand
export { Button } from './Button'
export { Card } from './Card'
export { Modal } from './Modal'
// ... 47 more lines
```

**After (generated):**
```typescript
// src/components/index.ts — generated
export { Button } from './Button'
export { Card } from './Card'
export { Modal } from './Modal'
export { Tabs } from './Tabs'
export { Input } from './Input'
// ... automatically kept in sync
```

---

## 3. Install & Run

```bash
npm install @devlander/collectexports
collectexports collect
```

Show the resulting `.collect-exports.json` (or interactive init output) and a before/after of `index.ts`.

---

## 4. Programmatic Usage

```typescript
import autoExporter from '@devlander/collectexports'

autoExporter({
  rootDir: 'src/components',
  allowedExtensions: ['.ts', '.tsx'],
  ignoredExtensions: ['.test.ts'],
})
```

---

## 5. Directive Example

```typescript
// InternalHelper.ts
/** @collect-exports-exclude */
export const debugOnly = () => { /* ... */ }
```

---

## 6. How It Works

**Title:** *"Three ways to run it"*

- **CLI** — `collectexports collect` or `ce collect`
- **Programmatic** — Call the API from scripts or tooling
- **Interactive** — `collectexports init --interactive` for guided setup

---

## 7. Use Cases

**Title:** *"Built for design systems & shared code"*

- Design systems — barrel files for components, icons, tokens
- Shared types & enums — single source of truth across projects
- Monorepos — per-package or per-directory barrels
- Bundling — works with Rollup, Vite, Storybook

---

## 8. Features

**Title:** *"Everything you need"*

- Recursive directory scanning with configurable extensions
- TypeScript Compiler API support for accurate export extraction
- `rollup-plugin-dts`–friendly (`export { type X }`)
- `@collect-exports-exclude` for fine-grained control
- Presets and interactive config
- CLI + programmatic API

---

## 9. CLI Quick Reference

`collectexports collect -d ./src -o index.ts` — concise options overview.

---

## 10. Footer CTA

**Title:** *"Ready to stop hand-maintaining exports?"*

**CTA:**  
*"View the docs"* or *"Try it now"*

**Attribution:**  
*"collectexports — by Devlander"* (small, secondary)

---

## Tone & Guidelines

- Direct, developer-focused tone
- Lead with code examples — they do the heavy lifting
- Short sentences and bullets
- Save jargon (e.g. "barrel files") for feature/use-case sections, not hero
