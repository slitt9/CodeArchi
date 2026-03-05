export type Phase = "spark" | "stack" | "canvas" | "synapse";

export const PHASE_ORDER: Phase[] = ["spark", "stack", "canvas", "synapse"];

export const PHASE_META: Record<Phase, { title: string; description: string }> = {
  spark: {
    title: "The Spark",
    description: "Define your idea and narrow the scope",
  },
  stack: {
    title: "Stack Reveal",
    description: "Choose your tech stack with full transparency",
  },
  canvas: {
    title: "Living Canvas",
    description: "Build module by module on the visual map",
  },
  synapse: {
    title: "The Synapse",
    description: "Verify data flow and squash logic breaks",
  },
};

export interface Project {
  id: string;
  name: string;
  description: string;
  currentPhase: Phase;
  stack: StackChoice | null;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface StackChoice {
  name: string;
  framework: string;
  database: string;
  styling: string;
  reasoning: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  dependencies: string[];
  files: string[];
}
