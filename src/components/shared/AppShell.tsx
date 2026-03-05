"use client";

import { usePhase } from "@/providers/PhaseProvider";
import { PHASE_META, PHASE_ORDER } from "@/lib/types";
import { PhaseTransition } from "./PhaseTransition";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentPhase, setPhase, phaseIndex } = usePhase();

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight">CodeArchi</span>
          <span className="text-xs text-white/40">
            {PHASE_META[currentPhase].title}
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {PHASE_ORDER.map((phase, i) => (
            <button
              key={phase}
              onClick={() => setPhase(phase)}
              className={`relative rounded-full px-3 py-1 text-xs font-medium transition-all ${
                phase === currentPhase
                  ? "bg-white text-black"
                  : i <= phaseIndex
                    ? "bg-white/10 text-white/70 hover:bg-white/20"
                    : "text-white/30 cursor-not-allowed"
              }`}
              disabled={i > phaseIndex + 1}
            >
              {PHASE_META[phase].title}
            </button>
          ))}
        </nav>
      </header>

      <main className="relative flex-1 overflow-hidden">
        <PhaseTransition phaseKey={currentPhase}>{children}</PhaseTransition>
      </main>
    </div>
  );
}
