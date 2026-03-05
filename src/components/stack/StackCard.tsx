"use client";

interface StackOption {
  name: string;
  framework: string;
  database: string;
  styling: string;
  pros: string;
  reasoning: string;
}

interface StackCardProps {
  option: StackOption;
  label: string;
  selected?: boolean;
  onSelect: () => void;
}

export function StackCard({ option, label, selected, onSelect }: StackCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col gap-4 rounded-2xl border p-6 text-left transition-all ${
        selected
          ? "border-white/40 bg-white/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-white/40">
          {label}
        </span>
        {selected && (
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-black">
            SELECTED
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{option.name}</h3>

      <div className="flex flex-col gap-1.5 text-xs text-white/50">
        <div>
          <span className="text-white/30">Framework:</span> {option.framework}
        </div>
        <div>
          <span className="text-white/30">Database:</span> {option.database}
        </div>
        <div>
          <span className="text-white/30">Styling:</span> {option.styling}
        </div>
      </div>

      <p className="text-sm text-white/60">{option.pros}</p>
      <p className="text-xs italic text-white/30">{option.reasoning}</p>
    </button>
  );
}
