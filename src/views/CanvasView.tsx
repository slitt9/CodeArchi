"use client";

import { ModuleCard } from "@/components/canvas/ModuleCard";
import { useProject } from "@/providers/ProjectProvider";
import { useState } from "react";
import { Module } from "@/lib/types";

const PLACEHOLDER_MODULES: Module[] = [
  {
    id: "auth",
    name: "Auth Guard",
    description: "User authentication and session management",
    dependencies: [],
    files: ["src/lib/auth.ts", "src/middleware.ts"],
  },
  {
    id: "api",
    name: "API Layer",
    description: "REST endpoints and server actions",
    dependencies: ["auth"],
    files: ["src/app/api/"],
  },
  {
    id: "db",
    name: "Database",
    description: "Supabase schema and queries",
    dependencies: [],
    files: ["src/lib/supabase/"],
  },
  {
    id: "ui",
    name: "UI Components",
    description: "Shared component library",
    dependencies: [],
    files: ["src/components/"],
  },
];

export function CanvasView() {
  const { project } = useProject();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const modules =
    project?.modules.length ? project.modules : PLACEHOLDER_MODULES;

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h2 className="text-xl font-bold text-white">Living Canvas</h2>
        <p className="text-sm text-white/40">
          Click a module to expand. Use the chat to edit with plain English.
        </p>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {modules.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            isSelected={selectedId === mod.id}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      {selectedId && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-xs text-white/30">
            Module Chat — {modules.find((m) => m.id === selectedId)?.name}
          </p>
          <input
            type="text"
            placeholder="e.g. Add a validation step so users can't log more than 5000 calories..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/30"
          />
        </div>
      )}
    </div>
  );
}
