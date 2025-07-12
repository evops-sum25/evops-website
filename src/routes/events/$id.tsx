import Loading from '@/components/shared/Loading'
import TagBar from '@/components/shared/TagBar.tsx'
import getApi from '@/lib/api/api.ts'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/events/$id')({
  component: EventPage,
})

function EventPage() {
  const params = Route.useParams()
  const api = getApi()
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: async () => await api.eventService.find({ id: params.id }),
    enabled: !!params.id,
  })

  const { t } = useTranslation('eventPage')
  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <div>{t('loadingError', { message: error })}</div>
  }
  if (data === undefined) {
    return <div>{t('eventNotFound')}</div>
  }

  const event = data.event!

  return (
    <main className="main-layout w-screen overflow-x-hidden px-4 lg:px-80">
      <h1 className="mb-4 text-2xl font-bold">{event.title}</h1>
      <figure className="carousel mb-4 aspect-square max-h-120 w-full rounded-md">
        {event.imageIds && event.imageIds.length > 0 ? (
          event.imageIds.map((imageId, i) => (
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
          ))
        ) : (
          <div className="bg-base-300 flex h-full w-full items-center justify-center rounded-md">
            <span className="text-base-content/50">{t('noImage')}</span>
          </div>
        )}
      </figure>
      <TagBar tags={event.tags} />
      <article className="text-base-content mt-4 w-full text-start lg:w-auto lg:text-center lg:text-lg">
        {event.description}
      </article>
    </main>
  )
}
