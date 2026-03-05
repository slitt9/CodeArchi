"use client";

import { motion } from "framer-motion";

interface SynapseToggleProps {
  active: boolean;
  onToggle: () => void;
}

export function SynapseToggle({ active, onToggle }: SynapseToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-sm transition-colors ${
        active
          ? "bg-cyan-500 text-black"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          active ? "bg-black animate-pulse" : "bg-cyan-400"
        }`}
      />
      {active ? "Exit Neural View" : "Synapse"}
    </motion.button>
  );
}
