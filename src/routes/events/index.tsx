import Loading from '@/components/shared/Loading'
import TagBar from '@/components/shared/TagBar'
import HeaderEvents from '@/components/widgets/Headers/HeaderEvents.tsx'
import getApi from '@/lib/api/api'
import { useEvents } from '@/lib/api/hooks/getEvents.ts'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/events/')({
  component: EventsList,
})

function EventsList() {
  const { t } = useTranslation('eventsList')
  const api = getApi()
  const { data, isLoading, error } = useEvents()

  if (isLoading) return <Loading />
  if (error) return <div>{t('loadingError', { message: String(error) })}</div>

  const events = data?.events || []

  return (
    <>
      <HeaderEvents />
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
                  <div className="carousel-item relative flex size-full flex-row justify-center">
                    <img
                      src={new URL(
                        `/v1/events/images/${event.imageIds[0]}`,
                        api.url,
                      ).toString()}
                      alt="Event thumbnail"
                      className="z-10 h-auto max-h-full w-auto max-w-full rounded-md lg:max-h-[80vh] lg:max-w-[80vw]"
                    />
                    <img
                      src={new URL(
                        `/v1/events/images/${event.imageIds[0]}`,
                        api.url,
                      ).toString()}
                      alt="Event thumbnail"
                      className="absolute size-full object-fill blur-3xl"
                    />
                  </div>
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
    </>
  )
}
