/**
 * AI Orchestrator — routes requests to Claude Opus (scaffolding) or Sonnet (edits).
 * This is the server-side entry point for all AI interactions.
 */

export type AgentMode = "scaffold" | "edit" | "recommend";

export function getModelForMode(mode: AgentMode): string {
  switch (mode) {
    case "scaffold":
      return "claude-opus-4-0";
    case "edit":
      return "claude-sonnet-4-0";
    case "recommend":
      return "claude-sonnet-4-0";
  }
}
