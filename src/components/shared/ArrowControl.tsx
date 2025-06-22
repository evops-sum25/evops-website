"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ArrowControlClient() {
  const [activeArrow, setActiveArrow] = useState<"up" | "down" | null>(null);

  return (
    <div className="flex flex-row items-center justify-between">
      <button onClick={() => setActiveArrow("up")} className="cursor-pointer">
        <ChevronUp
          size={40}
          strokeWidth={activeArrow === "up" ? 3 : 1}
          color={activeArrow === "up" ? "#2ECC71" : "#000"}
        />
      </button>
      <button onClick={() => setActiveArrow("down")} className="cursor-pointer">
        <ChevronDown
          size={40}
          strokeWidth={activeArrow === "down" ? 3 : 1}
          color={activeArrow === "down" ? "#FF5449" : "#000"}
        />
      </button>
    </div>
  );
}
