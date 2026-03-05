"use client";

import { useState } from "react";
import { SynapseToggle } from "@/components/synapse/SynapseToggle";

export function SynapseView() {
  const [neuralActive, setNeuralActive] = useState(true);

  return (
    <div className="relative flex h-full items-center justify-center">
      {neuralActive ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            {/* Placeholder for the Neural View data-flow diagram (tldraw canvas) */}
            <div className="flex h-80 w-[600px] items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-8">
                  {["Button", "Auth", "API", "DB"].map((node, i) => (
                    <div key={node} className="flex items-center gap-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-xs font-medium text-cyan-300">
                        {node}
                      </div>
                      {i < 3 && (
                        <div className="h-px w-8 bg-gradient-to-r from-cyan-400/60 to-cyan-400/20" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-white/30">
                  Neural View — live data-flow visualization will render here
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white">The Synapse</h2>
          <p className="max-w-md text-sm text-white/40">
            Click elements in the app preview to see data pulses trace through
            your architecture. Red snaps indicate logic breaks.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-bold text-white">App Preview</h2>
          <div className="flex h-80 w-[600px] items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <p className="text-sm text-white/30">
              WebContainer preview will render here
            </p>
          </div>
        </div>
      )}

      <SynapseToggle
        active={neuralActive}
        onToggle={() => setNeuralActive((prev) => !prev)}
      />
    </div>
  );
}
