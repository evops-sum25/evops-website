import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$id')({
    component: EventPage,
})

function EventPage() {
    const params = Route.useParams();
    // Здесь можно получить данные события по params.id
    return <div>Event ID: {params.id}</div>;
} 