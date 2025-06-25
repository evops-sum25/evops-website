"use client";
import Reaction, { ReactionProps } from "@/components/shared/Reaction";
import { useState } from "react";

interface ReactionBarProps {
  reactions: Omit<ReactionProps, "isSelected" | "onClick">[];
}

export default function ReactionsBar({ reactions }: ReactionBarProps) {
  const [counts, setCounts] = useState(reactions.map((r) => r.count));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleReaction = (idx: number) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      if (selectedIdx === idx) {
        newCounts[idx] = newCounts[idx] - 1;
        setSelectedIdx(null);
      } else {
        if (selectedIdx !== null) {
          newCounts[selectedIdx] = newCounts[selectedIdx] - 1;
        }
        newCounts[idx] = newCounts[idx] + 1;
        setSelectedIdx(idx);
      }
      return newCounts;
    });
  };

  return (
    <div className="carousel flex min-w-[65vw] flex-row gap-2 rounded-lg bg-gray-200/50 p-2">
      {reactions.map((prop, idx) => (
        <Reaction
          key={idx}
          emoji={prop.emoji}
          count={counts[idx]}
          isSelected={selectedIdx === idx}
          onClick={() => handleReaction(idx)}
        />
      ))}
    </div>
  );
}
