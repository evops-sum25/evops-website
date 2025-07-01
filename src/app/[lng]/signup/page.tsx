"use client";

import { useT } from "@/app/i18n/client";
import BackButton from "@/components/shared/BackButton";
import clsx from "clsx";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function pseudoValidateUserName(userName: string): boolean {
  return userName.length > 0;
}

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const userNameIsValid = pseudoValidateUserName(userName);

  const { t } = useT("common", { keyPrefix: "signup" });
  const router = useRouter();
  return (
    <>
      <nav>
        <BackButton />
      </nav>
      <main className="main-layout w-full justify-center p-4">
        <fieldset className="fieldset flex w-full max-w-96 flex-col items-center gap-4">
          <legend className="fieldset-legend w-full">
            <h1 className="w-full text-center text-lg">{t("title")}</h1>
          </legend>

          <div className="input w-full">
            <User className="text-base-content/50 size-4" />
            <input
              type="text"
              className="w-full"
              required
              placeholder={t("namePlaceholder")}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>

          <div
            className={clsx(["w-full", !userNameIsValid && "tooltip"])}
            data-tip={t("usernameEmpty")}
          >
            <button
              className="btn btn-primary w-full"
              disabled={!userNameIsValid}
              onClick={() => {
                localStorage.setItem("signedUp", "true");
                router.push("/");
              }}
            >
              Sign up
            </button>
          </div>
        </fieldset>
      </main>
    </>
  );
}
