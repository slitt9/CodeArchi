"use client";

import { PhaseProvider, usePhase } from "@/providers/PhaseProvider";
import { ProjectProvider } from "@/providers/ProjectProvider";
import { AppShell } from "@/components/shared/AppShell";
import { SparkView } from "@/views/SparkView";
import { StackView } from "@/views/StackView";
import { CanvasView } from "@/views/CanvasView";
import { SynapseView } from "@/views/SynapseView";

function PhaseRouter() {
  const { currentPhase } = usePhase();

  switch (currentPhase) {
    case "spark":
      return <SparkView />;
    case "stack":
      return <StackView />;
    case "canvas":
      return <CanvasView />;
    case "synapse":
      return <SynapseView />;
  }
}

export default function Home() {
  return (
    <ProjectProvider>
      <PhaseProvider>
        <AppShell>
          <PhaseRouter />
        </AppShell>
      </PhaseProvider>
    </ProjectProvider>
  );
}
