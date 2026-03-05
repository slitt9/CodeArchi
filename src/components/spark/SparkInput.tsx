"use client";

import { useState } from "react";

interface SparkInputProps {
  onSubmit: (idea: string) => void;
  disabled?: boolean;
}

export function SparkInput({ onSubmit, disabled }: SparkInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <label className="mb-3 block text-sm text-white/50">
        What do you want to build?
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="A keto calorie tracker with photo analysis and daily streaks..."
          disabled={disabled}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.07] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Spark
        </button>
      </div>
    </form>
  );
}
