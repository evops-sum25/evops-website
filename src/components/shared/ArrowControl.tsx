"use client";

import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ArrowControl() {
  const [activeArrow, setActiveArrow] = useState<"up" | "down" | null>(null);

  return (
    <div className="flex flex-row items-center justify-between">
      <button onClick={() => setActiveArrow("up")} className="cursor-pointer">
        <ChevronUp
          size={40}
          strokeWidth={activeArrow === "up" ? 3 : 1}
          className={clsx(
            "transition-colors",
            activeArrow === "up" ? "text-green-500" : "text-base-content",
          )}
        />
      </button>
      <button onClick={() => setActiveArrow("down")} className="cursor-pointer">
        <ChevronDown
          size={40}
          strokeWidth={activeArrow === "down" ? 3 : 1}
          className={clsx(
            "transition-colors",
            activeArrow === "down" ? "text-red-500" : "text-base-content",
          )}
        />
      </button>
    </div>
  );
}
