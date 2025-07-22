import Loading from '@/components/shared/Loading'
import TagBar from '@/components/shared/TagBar'
import { Event as ApiEvent } from '@/gen/evops/api/v1/api_pb.ts'
import getApi from '@/lib/api/api'
import { useEvents } from '@/lib/api/hooks/getEvents.ts'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/events/')({
  component: EventsList,
})

function EventsList() {
  const { t } = useTranslation('eventsList')
  const api = getApi()
  const [events, setEvents] = useState<ApiEvent[]>([])
  const [lastEvent, setLastEvent] = useState<string>('')
  const [isFetching, setFetching] = useState<boolean>(false)

  const { data, isLoading, error, refetch } = useEvents(lastEvent)

  useEffect(() => {
    if (data?.events && data.events.length > 0) {
      setEvents((prev) => {
        if (!lastEvent) {
          return [...data.events]
        }
        return [...prev, ...data.events]
      })

      setLastEvent(data.events[data.events.length - 1].id)
    }
    setFetching(false)
  }, [data])

  const scrollHandler = useCallback(() => {
    const position =
      document.documentElement.scrollHeight -
      (document.documentElement.scrollTop + window.innerHeight)
    if (position < 300 && !isFetching) {
      setFetching(true)
      refetch()
    }
  }, [isFetching, refetch])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler])

  if (isLoading && events.length === 0) return <Loading />
  if (error) return <div>{t('loadingError', { message: String(error) })}</div>

  return (
    <>
      <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
        {events.map((event) => (
          <section
            key={event.id}
            className="card my-10 flex w-full flex-col items-center space-y-2"
          >
            <Link
              to="/events/$id"
              params={{ id: event.id }}
              className="w-full"
              style={{ textDecoration: 'none' }}
            >
              <div className="w-full">
                <h1 className="text-base-content mb-3 w-full text-2xl font-bold lg:mb-3 lg:text-center lg:text-3xl">
                  {event.title}
                </h1>
                {event.imageIds && event.imageIds.length > 0 && (
                  <figure className="carousel flex snap-x snap-mandatory overflow-x-auto scroll-smooth">
                    <div className="carousel-item relative w-full flex-shrink-0 snap-center justify-center">
                      <img
                        src={new URL(
                          `/v1/events/images/${event.imageIds[0]}`,
                          api.url,
                        ).toString()}
                        alt=""
                        className="z-10 h-auto max-h-70 w-auto rounded-md md:max-h-100"
                      />
                      <img
                        src={new URL(
                          `/v1/events/images/${event.imageIds[0]}`,
                          api.url,
                        ).toString()}
                        alt=""
                        className="absolute size-full object-fill blur-3xl"
                      />
                    </div>
                  </figure>
                )}
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
    </>
  )
}
