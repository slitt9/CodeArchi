"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PhaseTransitionProps {
  phaseKey: string;
  children: React.ReactNode;
}

export function PhaseTransition({ phaseKey, children }: PhaseTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phaseKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
