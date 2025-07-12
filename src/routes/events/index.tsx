import Loading from '@/components/shared/Loading'
import TagBar from '@/components/shared/TagBar'
import getApi from '@/lib/api/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/events/')({
  component: EventsList,
})

function EventsList() {
  const api = getApi()
  const queryClient = useQueryClient()
  React.useEffect(() => {
    queryClient.invalidateQueries(['events'])
  }, [])
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await api.eventService.list({}),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  if (isLoading) return <Loading />
  if (error) return <div>Loading error: {String(error)}</div>

  const events = data?.events || []

  return (
    <main className="main-layout w-screen overflow-x-hidden px-4 lg:px-80">
      {events.map((event) => (
        <section
          key={event.id}
          className="card my-4 flex w-full flex-col items-center space-y-2"
        >
          <Link
            to="/events/$id"
            params={{ id: event.id }}
            className="w-full"
            style={{ textDecoration: 'none' }}
          >
            <div className="w-full">
              <h1 className="text-base-content mb-3 ml-4 w-full text-2xl font-bold lg:mb-3 lg:text-center lg:text-3xl">
                {event.title}
              </h1>
              <figure className="carousel aspect-square max-h-120 w-full rounded-md">
                {event.imageIds!.map((imageId, i) => (
                  <div
                    key={i}
                    className="carousel-item relative flex size-full flex-row justify-center"
                    id={`image-${i + 1}`}
                  >
                    <img
                      src={new URL(
                        `/v1/events/images/${imageId}`,
                        api.url,
                      ).toString()}
                      alt="Event thumbnail"
                      className="z-10 h-auto max-h-full w-auto max-w-full rounded-md"
                    />
                    <img
                      src={new URL(
                        `/v1/events/images/${imageId}`,
                        api.url,
                      ).toString()}
                      alt="Event thumbnail"
                      className="absolute size-full object-fill blur-3xl"
                    />
                  </div>
                ))}
              </figure>
            </div>
          </Link>
          <div className="flex w-full flex-col items-start gap-3 px-2 lg:items-center lg:justify-center">
            <TagBar tags={event.tags} />
            <Link
              to="/events/$id"
              params={{ id: event.id }}
              style={{ textDecoration: 'none' }}
            >
              <article className="text-base-content clamping w-full text-start lg:w-auto lg:text-center lg:text-lg">
                {event.description}
              </article>
            </Link>
          </div>
        </section>
      ))}
    </main>
  )
}
