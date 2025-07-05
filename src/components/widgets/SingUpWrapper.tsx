"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SignUpHeader from "./SignUpHeader";

export default function SingUpWrapper() {
  const pathname = usePathname();
  const [signedUp, setSignedUp] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window !== "undefined") {
      setSignedUp(localStorage.getItem("signedUp") === "true");
    }
  }, []);

  if (!hydrated || pathname === "/signup" || signedUp) return null;

  return <SignUpHeader />;
}
