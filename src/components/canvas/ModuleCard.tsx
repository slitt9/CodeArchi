"use client";

import { motion } from "framer-motion";
import { Module } from "@/lib/types";

interface ModuleCardProps {
  module: Module;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

export function ModuleCard({ module, onSelect, isSelected }: ModuleCardProps) {
  return (
    <motion.button
      onClick={() => onSelect(module.id)}
      layoutId={`module-${module.id}`}
      className={`group flex flex-col gap-2 rounded-2xl border p-5 text-left transition-colors ${
        isSelected
          ? "border-cyan-400/50 bg-cyan-400/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
      style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h4 className="text-sm font-semibold text-white">{module.name}</h4>
      <p className="text-xs text-white/40">{module.description}</p>
      {module.dependencies.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {module.dependencies.map((dep) => (
            <span
              key={dep}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30"
            >
              {dep}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
}
