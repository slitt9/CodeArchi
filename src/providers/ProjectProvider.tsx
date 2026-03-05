"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Module, Project, StackChoice } from "@/lib/types";

interface ProjectContextValue {
  project: Project | null;
  initProject: (name: string, description: string) => void;
  setStack: (stack: StackChoice) => void;
  addModule: (module: Module) => void;
  updateModule: (id: string, updates: Partial<Module>) => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);

  const initProject = (name: string, description: string) => {
    setProject({
      id: crypto.randomUUID(),
      name,
      description,
      currentPhase: "spark",
      stack: null,
      modules: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const setStack = (stack: StackChoice) => {
    setProject((prev) =>
      prev
        ? { ...prev, stack, currentPhase: "canvas", updatedAt: new Date().toISOString() }
        : prev
    );
  };

  const addModule = (module: Module) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            modules: [...prev.modules, module],
            updatedAt: new Date().toISOString(),
          }
        : prev
    );
  };

  const updateModule = (id: string, updates: Partial<Module>) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            modules: prev.modules.map((m) =>
              m.id === id ? { ...m, ...updates } : m
            ),
            updatedAt: new Date().toISOString(),
          }
        : prev
    );
  };

  const value = useMemo<ProjectContextValue>(
    () => ({ project, initProject, setStack, addModule, updateModule }),
    [project]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
