import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { ChevronLeft, User } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function pseudoValidateUserName(userName: string): boolean {
  return userName.length > 0
}

function SignUpPage() {
  const [userName, setUserName] = useState('')
  const userNameIsValid = pseudoValidateUserName(userName)
  const router = useRouter()

  return (
    <>
      <nav>
        <Link to="/events" className="btn btn-ghost btn-circle">
          <ChevronLeft />
        </Link>
      </nav>
      <main className="main-layout w-full justify-center p-4">
        <fieldset className="fieldset flex w-full max-w-96 flex-col items-center gap-4">
          <legend className="fieldset-legend w-full">
            <h1 className="w-full text-center text-lg">Sign Up</h1>
          </legend>

          <div className="input w-full">
            <User className="text-base-content/50 size-4" />
            <input
              type="text"
              className="w-full"
              required
              placeholder="Name"
              onChange={(event) => {
                setUserName(event.target.value)
              }}
            />
          </div>

          <div
            className={clsx(['w-full', !userNameIsValid && 'tooltip'])}
            data-tip="The username cannot be empty."
          >
            <button
              className="btn btn-primary w-full"
              disabled={!userNameIsValid}
              onClick={() => {
                localStorage.setItem('signedUp', 'true')
                router.navigate({ to: '/events' })
              }}
            >
              Sign up
            </button>
          </div>
        </fieldset>
      </main>
    </>
  )
}
