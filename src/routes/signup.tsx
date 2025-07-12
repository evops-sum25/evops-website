import SignUpHeader from '@/components/widgets/SignUpHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  return <SignUpHeader />
}
