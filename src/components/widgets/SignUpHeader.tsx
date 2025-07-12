"use client";

import { useRouter } from "next/navigation";

export default function SignUpHeader() {
  const router = useRouter();
  return (
    <header className="flex w-full flex-row items-center justify-between p-3">
      <p className="text-base-content font-semibold">Hi, guest!</p>
      <button
        className="btn btn-primary"
        onClick={() => router.push("/signup")}
      >
        Sign Up
      </button>
    </header>
  );
}
