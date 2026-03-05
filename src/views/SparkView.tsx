"use client";

import { useState } from "react";
import { SparkInput } from "@/components/spark/SparkInput";
import { NarrowingChat } from "@/components/spark/NarrowingChat";
import { usePhase } from "@/providers/PhaseProvider";
import { useProject } from "@/providers/ProjectProvider";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function SparkView() {
  const { nextPhase } = usePhase();
  const { initProject } = useProject();
  const [idea, setIdea] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSparkSubmit = (text: string) => {
    setIdea(text);
    initProject(text.slice(0, 50), text);

    // Simulate a narrowing question (will be replaced by Claude)
    setIsThinking(true);
    setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content:
            "Great idea! Is this a mobile-first PWA for quick interactions, or a data-heavy desktop dashboard?",
        },
      ]);
      setIsThinking(false);
    }, 1200);
  };

  const handleReply = (answer: string) => {
    setMessages((prev) => [...prev, { role: "user", content: answer }]);

    setIsThinking(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Perfect — I've got a clear picture. Let's pick the right stack for this.",
        },
      ]);
      setIsThinking(false);

      // Auto-advance after a beat
      setTimeout(() => nextPhase(), 1500);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
      {!idea ? (
        <>
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
              What do you want to build?
            </h1>
            <p className="text-sm text-white/40">
              Describe your idea. We&apos;ll narrow the scope together.
            </p>
          </div>
          <SparkInput onSubmit={handleSparkSubmit} />
        </>
      ) : (
        <>
          <div className="text-center">
            <p className="text-xs text-white/30">Your idea</p>
            <p className="text-lg text-white/80">{idea}</p>
          </div>
          <NarrowingChat
            messages={messages}
            onReply={handleReply}
            isThinking={isThinking}
          />
        </>
      )}
    </div>
  );
}
