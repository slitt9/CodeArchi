# CodeArchi — Architectural Decisions

## ADR-001: Project Tracking Workflow
**Date:** 2026-03-04
**Status:** Accepted

**Context:** We need a consistent workflow for AI-assisted development that ensures transparency and quality.

**Decision:** Every session begins by reading PROJECT_STATUS.md, TASKS.md, and DECISIONS.md. Changes are planned in steps, proposed as diffs, and require approval before writing. All output is self-reviewed.

**Consequences:** Slower iteration but higher quality and full traceability of decisions.

---

## ADR-002: Target User — The "Power Beginner"
**Date:** 2026-03-04
**Status:** Accepted

**Context:** We need to define who CodeArchi is for so every UX and architecture decision has a clear audience.

**Decision:** The target user is the "Power Beginner" — someone who wants AI speed but architect-level control. They don't want code hidden from them; they want the structure visualized so they understand what's being built. The workflow is structured vibe coding: deliberate, architect-paced work over a day or multiple sessions — not a quick demo.

**Consequences:** The UI must balance power with approachability. Every AI action must be visible and reversible. No "magic black box" patterns.

---

## ADR-003: Tech Stack Selection
**Date:** 2026-03-04
**Status:** Accepted

**Context:** CodeArchi needs a stack that supports: (a) a rich interactive canvas, (b) AI-driven code generation with streaming, (c) live in-browser code execution, and (d) project memory persistence.

**Decision:**

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 | Turbopack caching for instant Ghost Scaffolding; AI-First Rendering; DevTools MCP support |
| Canvas | tldraw SDK v4+ | Most extensible whiteboard SDK; supports custom shapes for Module Cards; superior freeform interaction vs React Flow |
| Animation | Framer Motion 12 + View Transitions API | Native in React 19.2 (bundled with Next 16); enables liquid-metal zoom transitions between Synapse and code views |
| AI Agent | Claude 4.6 (Opus for scaffolding, Sonnet for edits) | State-of-the-art agentic planning; parallel multi-step sub-tasks |
| AI SDK | Vercel AI SDK 4.0 | Generative UI streaming; preview fixed components before applying |
| Protocol | MCP (Model Context Protocol) | Accurate reads of file system, logs, DB schema; eliminates hallucination |
| Runtime | StackBlitz WebContainers | Full Node.js in-browser; enables real data-flow pulses in Synapse View by intercepting actual network requests |
| Database | Supabase (Postgres + pg_vector) | Project memory persistence; vector search for AI context recall across sessions |
| Styling | Tailwind 4.0 | Zero-runtime CSS; instant-load feel |

**Consequences:** Heavy frontend stack — requires careful bundle optimization. WebContainers add browser runtime complexity. Claude 4.6 context window (1M tokens) needs File Compaction strategy for large projects.

---

## ADR-004: Four-Phase UX Architecture
**Date:** 2026-03-04
**Status:** Accepted

**Context:** The user experience needs to guide a Power Beginner from idea to deployed app with full transparency at every step.

**Decision:** The UX is structured as four sequential phases:

1. **The Spark & Calibration** — Conversational funnel to eliminate ambiguity. Ghost Scaffold visualizes scope in real time.
2. **The Stack Reveal** — Transparent tech decision via Stack Cards (recommended vs. alternative). User chooses with full context.
3. **The Living Canvas** — Hexagonal Module Cards on a tldraw canvas. Plain English edits via per-module chat. Edit Beam shows injection points.
4. **The Synapse** — Neural View with live data-flow visualization. Pulse animations trace real requests. Logic Breaks surface errors visually.

This is a structured, multi-session workflow — not a speed run.

**Consequences:** Each phase must be independently functional and testable. Transitions between phases need polished animations to maintain the "architect's control" feeling. The Synapse phase has the highest technical risk (OpenTelemetry + WebContainers + tldraw real-time sync).

---

## ADR-005: Project File Organization
**Date:** 2026-03-04
**Status:** Accepted

**Context:** AI tracking files (PROJECT_STATUS, TASKS, DECISIONS, VISION, ARCHITECTURE) were initially at the project root, cluttering it alongside source code.

**Decision:** Move all AI tracking documents to `docs/ai/`. Cursor rules reference this path. The project root stays clean for source code, config, and standard files (README, package.json, etc.).

**Consequences:** Cursor rule must always point to `docs/ai/`. New AI docs go in this folder. Source code never mixes with planning artifacts.

---

## ADR-006: Phase-Based Single-Page Architecture
**Date:** 2026-03-04
**Status:** Accepted

**Context:** The four UX phases (Spark, Stack, Canvas, Synapse) could be implemented as separate routes (`/spark`, `/stack`, etc.) or as a single-page app with a phase state machine.

**Decision:** Single-page architecture with a `PhaseProvider` context and `PhaseRouter` component. All four views live under the root `/` route. Transitions are handled by Framer Motion's `AnimatePresence`. Phase state is managed client-side (will persist to Supabase later).

**Consequences:** Smoother transitions between phases (no full-page navigations). All view code is bundled in the initial page — acceptable given that each view is lightweight at this stage. Phase state must be lifted to Supabase for multi-session persistence.
