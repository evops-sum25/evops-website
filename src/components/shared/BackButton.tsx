"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </button>
  );
}
