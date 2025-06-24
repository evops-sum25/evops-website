"use client";

import clsx from "clsx";
import { ChevronLeft, User } from "lucide-react";
import { useState } from "react";

function pseudoValidateUserName(userName: string): boolean {
  return userName.length > 0;
}

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const userNameIsValid = pseudoValidateUserName(userName);

  return (
    <>
      <nav>
        <a href="../" className="btn btn-ghost btn-circle">
          <ChevronLeft />
        </a>
      </nav>
      <main className="flex h-screen w-screen flex-col items-center justify-center p-4">
        <fieldset className="fieldset flex w-full max-w-96 flex-col items-center gap-4">
          <legend className="fieldset-legend w-full">
            <h1 className="w-full text-center text-lg">New Account</h1>
          </legend>

          <div className="input w-full">
            <User className="text-base-content/50 size-4" />
            <input
              type="text"
              className="w-full"
              required
              placeholder="Name"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>

          <div
            className={clsx(["w-full", !userNameIsValid && "tooltip"])}
            data-tip="The username cannot be empty."
          >
            <button
              className="btn btn-primary w-full"
              disabled={!userNameIsValid}
              onClick={() => {
                alert(
                  `Pseudo-sending ${JSON.stringify({ form: { name: userName } })} to the back end.`,
                );
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
