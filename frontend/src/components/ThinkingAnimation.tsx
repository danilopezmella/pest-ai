import { BrainCircuit } from "lucide-react";

export function ThinkingAnimation() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5">
      <BrainCircuit className="h-5 w-5 text-purple-400 animate-pulse" />
      <span className="text-[14px] text-white/70">Thinking...</span>
    </div>
  );
} 