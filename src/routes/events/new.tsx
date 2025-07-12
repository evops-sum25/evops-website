import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/new')({
  component: NewEventPage,
})

function NewEventPage() {
  return <div>Создание события</div>
}
