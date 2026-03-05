# CodeArchi — Tasks

## Backlog

### Phase 0 — Bootstrap & Foundation (COMPLETE)
- [x] Create project tracking files (PROJECT_STATUS, TASKS, DECISIONS)
- [x] Create Cursor rules for architect workflow
- [x] Define product vision and spec (VISION.md)
- [x] Select tech stack
- [x] Design high-level system architecture (ARCHITECTURE.md)
- [x] Set up Next.js 16 project scaffolding
- [x] Install core dependencies (tldraw, Framer Motion, Tailwind 4, Vercel AI SDK, Supabase, WebContainers)
- [x] Create base layout, AppShell, phase state machine (PhaseProvider)
- [x] Create all 4 phase views (Spark, Stack, Canvas, Synapse)
- [x] Build passes clean — zero errors

### Phase 1 — The Spark & Calibration
- [ ] Wire SparkInput to Claude Opus via /api/scaffold route
- [ ] Build real conversational narrowing (replace setTimeout stubs)
- [ ] Build Ghost Scaffold visualization (translucent 3D folder structure)
- [ ] Animate Ghost Scaffold reacting to scope changes in real time
- [ ] Stream project scope JSON to frontend as it generates

### Phase 2 — The Stack Reveal
- [ ] Generate dynamic stack recommendations from Claude (replace hardcoded options)
- [ ] Build stack selection persistence to Supabase
- [ ] Animate Ghost Scaffold "solidifying" on stack confirmation
- [ ] Add stack comparison detail (bundle size, learning curve, community)

### Phase 3 — The Living Canvas (Modular Map)
- [ ] Replace placeholder grid with tldraw canvas + custom ModuleShape
- [ ] Build hexagonal module card renderer on tldraw
- [ ] Implement "Zoom In" expansion with liquid-metal animation (Framer Motion)
- [ ] Wire per-module chat box to Claude Sonnet via /api/edit route
- [ ] Build Edit Beam visualization (neon light tracing code injection point)
- [ ] Implement module relationship edges and dependency visualization

### Phase 4 — The Synapse (Visual Flow)
- [ ] Replace placeholder diagram with tldraw Neural View canvas
- [ ] Integrate WebContainers for live in-browser runtime
- [ ] Hook OpenTelemetry into WebContainer for request interception
- [ ] Build real Pulse Visualization (data-flow animation along edges)
- [ ] Build "Logic Break" detection (snapped red lines on errors)
- [ ] Implement One-Click Jump from broken edge to source file

### Phase 5 — Deploy & Polish
- [ ] Build deployment pipeline (Vercel / Railway push)
- [ ] Implement File Compaction for context window management
- [ ] Build project memory system (Supabase pg_vector)
- [ ] End-to-end testing across all phases
- [ ] Performance optimization (Turbopack caching, zero-runtime CSS)
- [ ] Documentation and onboarding guide

## In Progress
_Phase 0 complete. Ready to start Phase 1._

## Completed
- [x] Phase 0 — Full bootstrap, scaffolding, and base UI
