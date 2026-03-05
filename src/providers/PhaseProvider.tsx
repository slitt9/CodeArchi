"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Phase, PHASE_ORDER } from "@/lib/types";

interface PhaseContextValue {
  currentPhase: Phase;
  setPhase: (phase: Phase) => void;
  nextPhase: () => void;
  prevPhase: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  phaseIndex: number;
}

const PhaseContext = createContext<PhaseContextValue | null>(null);

export function PhaseProvider({
  initialPhase = "spark",
  children,
}: {
  initialPhase?: Phase;
  children: React.ReactNode;
}) {
  const [currentPhase, setCurrentPhase] = useState<Phase>(initialPhase);

  const phaseIndex = PHASE_ORDER.indexOf(currentPhase);

  const setPhase = useCallback((phase: Phase) => {
    setCurrentPhase(phase);
  }, []);

  const nextPhase = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(currentPhase);
    if (idx < PHASE_ORDER.length - 1) {
      setCurrentPhase(PHASE_ORDER[idx + 1]);
    }
  }, [currentPhase]);

  const prevPhase = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(currentPhase);
    if (idx > 0) {
      setCurrentPhase(PHASE_ORDER[idx - 1]);
    }
  }, [currentPhase]);

  const value = useMemo<PhaseContextValue>(
    () => ({
      currentPhase,
      setPhase,
      nextPhase,
      prevPhase,
      canGoNext: phaseIndex < PHASE_ORDER.length - 1,
      canGoPrev: phaseIndex > 0,
      phaseIndex,
    }),
    [currentPhase, setPhase, nextPhase, prevPhase, phaseIndex]
  );

  return (
    <PhaseContext.Provider value={value}>{children}</PhaseContext.Provider>
  );
}

export function usePhase() {
  const ctx = useContext(PhaseContext);
  if (!ctx) throw new Error("usePhase must be used within PhaseProvider");
  return ctx;
}
