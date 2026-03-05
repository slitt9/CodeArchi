# CodeArchi — System Architecture

## Overview

CodeArchi is a single-page Next.js 16 application with four distinct UI modes (Spark, Stack Reveal, Living Canvas, Synapse) backed by an AI orchestration layer, an in-browser runtime, and a persistent project memory store.

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  Spark UI    │  │  Stack       │  │  Living Canvas        │ │
│  │  (Chat +     │  │  Reveal      │  │  (tldraw + Module     │ │
│  │   Ghost      │  │  (Stack      │  │   Cards + Edit Beam)  │ │
│  │   Scaffold)  │  │   Cards)     │  │                       │ │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬───────────┘ │
│         │                 │                       │             │
│  ┌──────┴─────────────────┴───────────────────────┴───────────┐ │
│  │                    Phase Router                             │ │
│  │          (manages transitions + Framer Motion)              │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┴──────────────────────────────────┐ │
│  │                     Synapse View                            │ │
│  │  (Neural View overlay — tldraw edges + pulse animations)    │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┴──────────────────────────────────┐ │
│  │                  WebContainers Runtime                      │ │
│  │  (StackBlitz — full Node.js in browser)                     │ │
│  │  ┌────────────┐  ┌─────────────────┐  ┌──────────────────┐ │ │
│  │  │ App Preview│  │ OpenTelemetry   │  │ File System      │ │ │
│  │  │ (iframe)   │  │ Hooks           │  │ (virtual)        │ │ │
│  │  └────────────┘  └─────────────────┘  └──────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │    Next.js API Routes   │
                    │    (Server Actions)     │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
   ┌──────────┴───────┐  ┌──────┴──────┐  ┌───────┴────────┐
   │  AI Orchestrator  │  │  MCP Server │  │  Supabase      │
   │                   │  │             │  │                │
   │  Claude 4.6 Opus  │  │  File reads │  │  Postgres      │
   │  (scaffolding)    │  │  DB schema  │  │  pg_vector     │
   │                   │  │  Logs       │  │                │
   │  Claude 4.6 Sonnet│  │             │  │  Project       │
   │  (edits)          │  │             │  │  Memory        │
   │                   │  │             │  │                │
   │  Vercel AI SDK    │  │             │  │  Stack         │
   │  (streaming)      │  │             │  │  Decisions     │
   └───────────────────┘  └─────────────┘  └────────────────┘
```

---

## Component Breakdown

### 1. Phase Router

The central state machine that manages which phase the user is in and orchestrates transitions.

| Responsibility | Detail |
|---|---|
| State management | Tracks current phase (Spark → Stack → Canvas → Synapse) |
| Transitions | Framer Motion 12 + View Transitions API for liquid-metal animations |
| Persistence | Saves phase state to Supabase so sessions resume where you left off |

**Key file:** `src/app/providers/PhaseProvider.tsx`

### 2. Spark UI

The entry point — conversational funnel for project definition.

| Component | Purpose |
|---|---|
| `SparkInput` | Single clean text input — "What do you want to build?" |
| `NarrowingChat` | Follow-up question interface (1–2 targeted questions from Claude) |
| `GhostScaffold` | 3D translucent folder visualization (Three.js or CSS 3D transforms) |

**Data flow:**
```
User input → API route → Claude Opus → structured project scope JSON
                                       → streamed to GhostScaffold for live updates
```

### 3. Stack Reveal

Transparent tech decision UI.

| Component | Purpose |
|---|---|
| `StackCard` | Side-by-side recommendation vs. alternative |
| `StackSelector` | Confirms choice, triggers Ghost Scaffold solidification |

**Data flow:**
```
Project scope JSON → Claude generates stack recommendations
                   → User selects → saved to Supabase project memory
                   → GhostScaffold solidifies into concrete folder structure
```

### 4. Living Canvas

The tldraw-powered modular workspace.

| Component | Purpose |
|---|---|
| `ModuleShape` | Custom tldraw shape — hexagonal card representing a code module |
| `ModuleEditor` | Expanded view with code preview + per-module chat box |
| `EditBeam` | Neon animation showing where code is being injected |
| `DependencyEdge` | Custom tldraw arrow showing module relationships |

**Data flow:**
```
User types in module chat → API route → Claude Sonnet
→ code diff returned → applied to WebContainers virtual FS
→ EditBeam animates injection point → module card updates
```

### 5. Synapse View

Neural View overlay for data-flow visualization.

| Component | Purpose |
|---|---|
| `SynapseToggle` | Button to enter/exit Neural View |
| `PulseAnimation` | Glowing dot that travels along edges tracing real requests |
| `LogicBreak` | Red snap animation when a request fails |
| `JumpLink` | Click broken edge → opens relevant source file |

**Data flow:**
```
User clicks button in App Preview (iframe)
→ WebContainers intercepts fetch via OpenTelemetry hook
→ emits trace event with route + status
→ Synapse View receives event via postMessage
→ animates pulse along matching tldraw edges
→ if error: snaps edge red, enables JumpLink
```

### 6. AI Orchestrator

Server-side AI integration layer.

| Component | Purpose |
|---|---|
| `scaffold` route | Claude Opus — generates project structure from scope |
| `edit` route | Claude Sonnet — applies module-level code changes |
| `recommend` route | Claude — generates stack recommendations |
| Vercel AI SDK | Handles streaming responses + Generative UI previews |
| MCP Client | Reads file system, DB schema for accurate context |

### 7. WebContainers Runtime

In-browser Node.js execution environment.

| Responsibility | Detail |
|---|---|
| Virtual file system | Holds the generated project files |
| App Preview | Serves the app in an iframe for live testing |
| OpenTelemetry hooks | Intercepts network requests for Synapse pulse data |
| Hot reload | Reflects code changes instantly as modules are edited |

### 8. Supabase (Project Memory)

Persistent storage across sessions.

| Table | Purpose |
|---|---|
| `projects` | Project metadata, current phase, stack choice |
| `modules` | Module definitions, code, relationships |
| `decisions` | AI decisions with reasoning (why this algorithm, etc.) |
| `memory_vectors` | pg_vector embeddings for semantic recall across sessions |

---

## Directory Structure (Planned)

```
codearchi/
├── docs/
│   └── ai/                    # AI tracking documents
│       ├── PROJECT_STATUS.md
│       ├── TASKS.md
│       ├── DECISIONS.md
│       ├── VISION.md
│       └── ARCHITECTURE.md    # ← this file
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (providers, fonts, theme)
│   │   ├── page.tsx           # Entry — redirects to current phase
│   │   ├── spark/
│   │   │   └── page.tsx       # Phase 1: Spark & Calibration
│   │   ├── stack/
│   │   │   └── page.tsx       # Phase 2: Stack Reveal
│   │   ├── canvas/
│   │   │   └── page.tsx       # Phase 3: Living Canvas
│   │   ├── synapse/
│   │   │   └── page.tsx       # Phase 4: Synapse View
│   │   └── api/
│   │       ├── scaffold/
│   │       │   └── route.ts   # Claude Opus — project scaffolding
│   │       ├── edit/
│   │       │   └── route.ts   # Claude Sonnet — module edits
│   │       └── recommend/
│   │           └── route.ts   # Stack recommendations
│   ├── components/
│   │   ├── spark/
│   │   │   ├── SparkInput.tsx
│   │   │   ├── NarrowingChat.tsx
│   │   │   └── GhostScaffold.tsx
│   │   ├── stack/
│   │   │   ├── StackCard.tsx
│   │   │   └── StackSelector.tsx
│   │   ├── canvas/
│   │   │   ├── ModuleShape.tsx
│   │   │   ├── ModuleEditor.tsx
│   │   │   ├── EditBeam.tsx
│   │   │   └── DependencyEdge.tsx
│   │   ├── synapse/
│   │   │   ├── SynapseToggle.tsx
│   │   │   ├── PulseAnimation.tsx
│   │   │   ├── LogicBreak.tsx
│   │   │   └── JumpLink.tsx
│   │   └── shared/
│   │       ├── PhaseTransition.tsx
│   │       └── AppShell.tsx
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── orchestrator.ts    # AI routing (Opus vs Sonnet)
│   │   │   ├── mcp-client.ts      # MCP integration
│   │   │   └── file-compactor.ts  # Context window management
│   │   ├── canvas/
│   │   │   └── shapes.ts          # tldraw custom shape definitions
│   │   ├── runtime/
│   │   │   ├── webcontainer.ts    # WebContainers setup + API
│   │   │   └── telemetry.ts       # OpenTelemetry hook for Synapse
│   │   └── supabase/
│   │       ├── client.ts          # Supabase client
│   │       └── schema.ts          # Type definitions for tables
│   └── providers/
│       ├── PhaseProvider.tsx       # Phase state machine
│       ├── ProjectProvider.tsx     # Current project context
│       └── RuntimeProvider.tsx     # WebContainers instance
├── public/
├── .cursor/
│   └── rules/
│       └── codearchi-architect.mdc
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Key Data Flows

### Flow 1: Spark → Scaffold

```
[SparkInput] → user describes idea
    ↓
[NarrowingChat] → Claude asks 1–2 follow-ups → user answers
    ↓
[API /scaffold] → Claude Opus receives full scope
    ↓
  returns: { modules[], relationships[], suggestedStacks[] }
    ↓
[GhostScaffold] → renders translucent 3D folders in real time
```

### Flow 2: Module Edit

```
[ModuleEditor chat] → "Add calorie validation max 5000"
    ↓
[API /edit] → Claude Sonnet + MCP reads current module code
    ↓
  returns: { diff, injectionPoint, explanation }
    ↓
[WebContainers] → applies diff to virtual FS → hot reload
    ↓
[EditBeam] → animates neon beam at injectionPoint
    ↓
[App Preview] → reflects change live
```

### Flow 3: Synapse Pulse

```
[App Preview] → user clicks "Log Meal" button
    ↓
[WebContainers] → fetch("/api/meals") intercepted by OpenTelemetry
    ↓
  emits: { route, method, status, latency, traceId }
    ↓
[postMessage] → sent to parent frame
    ↓
[Synapse View] → matches route to tldraw edge path
    ↓
  if 200: [PulseAnimation] → green glow travels along edge
  if 500: [LogicBreak] → edge snaps red + [JumpLink] enabled
```

---

## Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| WebContainers browser compatibility | High | Feature-detect on load; fallback to server-side preview |
| Claude context window overflow on large projects | Medium | File Compaction — summarize inactive modules |
| tldraw performance with 100+ module cards | Medium | Virtualize off-screen shapes; lazy-load expanded views |
| Framer Motion + tldraw animation conflicts | Low | Isolate animation layers; tldraw handles canvas, Framer handles UI chrome |
| Supabase cold starts on free tier | Low | Use connection pooling; consider Edge Functions for latency-sensitive reads |
