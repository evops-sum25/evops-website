"use client";

export interface ReactionProps {
  emoji: string;
  count: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Reaction({
  emoji,
  count,
  isSelected = false,
  onClick,
}: ReactionProps) {
  return (
    <button
      onClick={onClick}
      className={`emoji btn flex flex-row items-center gap-1 rounded-3xl px-3 py-2 font-extrabold text-gray-50 ${isSelected ? "bg-accent" : "bg-gray-400/60"}`}
    >
      {emoji}
      <span>{count}</span>
    </button>
  );
}
