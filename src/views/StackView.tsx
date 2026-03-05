"use client";

import { useState } from "react";
import { StackCard } from "@/components/stack/StackCard";
import { usePhase } from "@/providers/PhaseProvider";
import { useProject } from "@/providers/ProjectProvider";

const STACK_OPTIONS = [
  {
    name: "Next-Gen",
    framework: "Next.js 16 + Turbopack",
    database: "Supabase (Postgres)",
    styling: "Tailwind 4.0",
    pros: "Instant global scaling, Edge functions, AI-first rendering.",
    reasoning: "Perfect for high-speed user interactions and modern web apps.",
  },
  {
    name: "Proven",
    framework: "Django + React",
    database: "PostgreSQL",
    styling: "Tailwind 4.0",
    pros: "Robust admin panel, Python simplicity, battle-tested ORM.",
    reasoning: "Better for data-heavy automation and backend logic.",
  },
] as const;

export function StackView() {
  const { nextPhase } = usePhase();
  const { setStack } = useProject();
  const [selected, setSelected] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selected === null) return;
    const opt = STACK_OPTIONS[selected];
    setStack({
      name: opt.name,
      framework: opt.framework,
      database: opt.database,
      styling: opt.styling,
      reasoning: opt.reasoning,
    });
    nextPhase();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-white">
          Choose Your Stack
        </h2>
        <p className="text-sm text-white/40">
          Transparent tech decisions. You pick what fits.
        </p>
      </div>

      <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {STACK_OPTIONS.map((opt, i) => (
          <StackCard
            key={opt.name}
            option={opt}
            label={i === 0 ? "Recommended" : "Alternative"}
            selected={selected === i}
            onSelect={() => setSelected(i)}
          />
        ))}
      </div>

      <button
        onClick={handleConfirm}
        disabled={selected === null}
        className="rounded-xl bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-30"
      >
        Lock Stack & Continue
      </button>
    </div>
  );
}
