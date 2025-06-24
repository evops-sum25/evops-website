import { Link, User } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <fieldset className="fieldset flex w-128 max-w-full flex-col gap-4">
        <legend className="fieldset-legend">New account</legend>

        <div className="input w-full">
          <User className="text-base-content/50 size-4" />
          <input type="text" className="w-full" required placeholder="Name" />
        </div>

        <div className="input w-full">
          <Link className="text-base-content/50 size-4" />
          <input
            type="url"
            required
            className="w-full"
            placeholder="Profile picture URL"
          />
        </div>

        <button className="btn btn-primary">Sign up</button>
      </fieldset>
    </main>
  );
}
