import Loading from '@/components/shared/Loading.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/new')({
  component: NewEventPage,
})

function NewEventPage() {
  return <Loading />
}
