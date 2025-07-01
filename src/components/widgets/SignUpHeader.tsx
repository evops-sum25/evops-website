"use client";

import { useRouter } from "next/navigation";
import { useT } from "@/app/i18n/client";

export default function SignUpHeader() {
  const { t } = useT("common", { keyPrefix: "signUpHeader" });
  const router = useRouter();
  return (
    <header className="flex w-full flex-row items-center justify-between py-3 px-23">
      <p className="text-base-content font-semibold">{t("greeting")}</p>
      <button
        className="btn btn-primary"
        onClick={() => router.push("/signup")}
      >
        {t('button')}
      </button>
    </header>
  );
}
