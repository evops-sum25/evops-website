import { createFileRoute } from '@tanstack/react-router'
import SignUpHeader from '@/components/widgets/SignUpHeader'

export const Route = createFileRoute('/signup')({
    component: SignUpPage,
})

function SignUpPage() {
    return <SignUpHeader />
} 