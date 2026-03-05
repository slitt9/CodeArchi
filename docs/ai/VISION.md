# CodeArchi: The Architect's Blueprint

**Tagline:** Visualize the Logic. Own the Architecture. Ship with Certainty.

CodeArchi is built for the **"Power Beginner"** — someone who wants the speed of AI but the control of an Architect. We don't hide the code; we visualize the structure so you actually understand what's being built.

---

## Phase 1: The Spark & Calibration

*Moving from "Guesswork" to "Blueprint."*

The process starts with a conversational funnel designed to eliminate ambiguity before a single line of code is written.

- **The Spark:** A single, clean input box asks: *"What do you want to build?"*
  - Example: *"A keto calorie tracker with photo analysis and daily streaks."*

- **Conversational Narrowing:** Instead of generic toggles, the agent asks 1–2 targeted follow-ups:
  - *"Is this a mobile-first PWA for quick logging, or a data-heavy desktop dashboard?"*
  - *"Should we use a pre-trained Vision API for photo analysis, or a custom local model for privacy?"*

- **The Ghost Scaffold:** While you answer, a translucent 3D visualization of folders like `/api`, `/components`, and `/lib` appears in the background — shifting and growing as the scope narrows.

---

## Phase 2: The Stack Reveal

*Transparent Tech Decisions.*

Before the build begins, CodeArchi presents a **Stack Card** with two options. You choose the one that fits your comfort level.

| | The Recommendation (Next-Gen) | The Alternative (Proven) |
|---|---|---|
| **Stack** | Next.js 16 + Supabase + Tailwind | Django + PostgreSQL + React |
| **Pros** | Instant global scaling, Edge functions | Robust admin panel, Python simplicity |
| **Logic** | Perfect for high-speed user interactions | Better for data-heavy automation |

---

## Phase 3: The Living Canvas (Modular Map)

*The end of the "File Tree" headache.*

Once the stack is locked, you enter the **Living Canvas** — a hierarchical map where you see the **Relationships**, not just the files.

- **Hexagonal Module Cards:** Instead of a list of `.ts` files, you see cards like "Nutrition API" or "Streak Logic."

- **The "Zoom In" (Plain English Edits):** Click a card, and it expands with a liquid-metal animation. You don't navigate a directory; you type in the module's chat box:
  *"Add a validation step so users can't log more than 5000 calories at once."*

- **The Edit Beam:** A beam of neon light travels through the module's code, showing you exactly where the "Nutrition Validator" is being injected.

---

## Phase 4: The "Synapse" (Visual Flow)

*The separate "Aha!" button.*

Hit the **Synapse Button** to toggle into **Neural View**. The entire workspace transforms into a live data-flow diagram.

- **Pulse Visualization:** Click "Log Meal" in the app preview. You literally see a glowing pulse travel from `[Button Component]` → `[Auth Guard]` → `[Image Processor]` → `[Postgres DB]`.

- **The "Logic Break":** If your API key is missing, the line in the Synapse View **snaps** and turns red.

- **One-Click Jump:** Click the snapped line, and CodeArchi opens the specific `.env` or configuration file needed to fix it.

---

## The Structured Workflow

CodeArchi is designed for **structured vibe coding** — a deliberate, architect-paced process that unfolds over a day or a couple of sessions.

| Session | Activity |
|---|---|
| **Session 1: Define** | Describe your idea. Answer the calibration follow-ups. Watch the Ghost Scaffold take shape. Select your Tech Stack. |
| **Session 2: Build** | Enter the Living Canvas. Add features module by module using plain English. Review each module's code as it materializes. Iterate on logic and relationships. |
| **Session 3: Verify & Ship** | Enter the Synapse to verify data flow end-to-end. Fix any Logic Breaks. Polish, test, and deploy when you're confident in the architecture. |

The pace is yours. The AI does the heavy lifting; you make the decisions.

---

## Tech Stack: The "Architect's Edge" (2026 Edition)

### 1. The Visual Core (Frontend & Canvas)

- **Next.js 16 (App Router + Turbopack Stable):** The 2026 release includes "AI-First Rendering" — designed to let agents "see" the component tree through the new DevTools MCP (Model Context Protocol).

- **tldraw (SDK v4+):** The "Living Canvas." Superior to React Flow for freeform "liquid" interactions. Custom `ModuleShape` components that users can "Zoom In" to reveal the code.

- **Framer Motion 12 + View Transitions API:** Native in React 19.2 (bundled with Next 16). Enables "Liquid Metal" zooms between the high-level Synapse view and the low-level code editor without jarring layout shifts.

### 2. The Brain (AI & Orchestration)

- **Claude 4.6 (Opus for Scaffolding / Sonnet for Edits):** As of early 2026, Claude 4.6 is the state-of-the-art for "Agentic Planning." Handles multi-step sub-tasks (e.g., "Create DB schema" → "Update API" → "Refresh UI") in parallel.

- **Vercel AI SDK 4.0:** Used for "Generative UI." When the AI suggests a fix, the SDK streams a preview of the fixed component directly into your modular card before you hit "Apply."

- **MCP (Model Context Protocol):** Allows the Agent to read the local file system, logs, and DB schema with 100% accuracy, eliminating hallucination.

### 3. The Execution (Preview & Runtime)

- **StackBlitz WebContainers:** Runs a full Node.js environment inside the browser. The "Synapse View" pulses are real data — when a user clicks a button in the preview, WebContainers intercepts the actual network request and visualizes it as a neon beam.

- **Supabase (Postgres + pg_vector):** Stores the "Memory" of the project so the AI remembers why you chose a specific algorithm three sessions ago.

### Stack Summary

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 | Turbopack caching makes Ghost Scaffolding feel instantaneous |
| Canvas | tldraw SDK v4+ | Most extensible whiteboard for Modular Hierarchies |
| Animation | Framer Motion 12 | Liquid-metal transitions between views |
| Runtime | StackBlitz WebContainers | Live Logic preview without a backend server |
| Logic Agent | Claude 4.6 | State-of-the-art reasoning and multi-file architecture |
| AI SDK | Vercel AI SDK 4.0 | Generative UI streaming |
| Protocol | MCP | Accurate file system and schema reads |
| Database | Supabase (Postgres + pg_vector) | Project memory and vector search |
| Styling | Tailwind 4.0 | Zero-runtime CSS for instant-load feel |

---

## Implementation Notes

### Synapse "Logic Break" Detail

To get the "snap" effect where a data-flow line breaks:

1. Use **OpenTelemetry hooks** within the WebContainer.
2. The user clicks a button → the `fetch` request is intercepted.
3. If the status is 500, a signal is sent to the tldraw canvas to change the edge color to red and play a "snap" animation.

### Context Window Management

Even at 1M tokens, a massive project can get "foggy." Use **File Compaction** to summarize old modules the AI isn't currently working on, keeping the active context sharp.
