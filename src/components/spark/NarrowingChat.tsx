"use client";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface NarrowingChatProps {
  messages: Message[];
  onReply: (answer: string) => void;
  isThinking?: boolean;
}

export function NarrowingChat({
  messages,
  onReply,
  isThinking,
}: NarrowingChatProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = e.currentTarget.value.trim();
      if (val) {
        onReply(val);
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`rounded-lg px-4 py-2.5 text-sm ${
            msg.role === "assistant"
              ? "bg-white/5 text-white/80"
              : "self-end bg-white/10 text-white"
          }`}
        >
          {msg.content}
        </div>
      ))}

      {isThinking && (
        <div className="flex items-center gap-1.5 px-4 py-2 text-xs text-white/30">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white/30" />
          Thinking...
        </div>
      )}

      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Type your answer..."
        disabled={isThinking}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/30 disabled:opacity-50"
      />
    </div>
  );
}
