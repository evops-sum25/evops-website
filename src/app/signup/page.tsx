import { ChevronLeft, User } from "lucide-react";

export default function SignUpPage() {
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
            <input type="text" className="w-full" required placeholder="Name" />
          </div>

          <button className="btn btn-primary w-full">Sign up</button>
        </fieldset>
      </main>
    </>
  );
}
