import Loading from '@/components/shared/Loading'
import TagBar from '@/components/shared/TagBar.tsx'
import EventCarousel from '@/components/widgets/EventCaousel.tsx'
import HeaderSingleEvent from '@/components/widgets/Headers/HeaderSingleEvent.tsx'
import getApi from '@/lib/api/api.ts'
import { useSingleEvent } from '@/lib/api/hooks/getSingleEvent.ts'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/events/$id')({
  component: EventPage,
})

function EventPage() {
  const params = Route.useParams()
  const api = getApi()
  const { data, isLoading, error } = useSingleEvent(params)

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
  const images = event.imageIds.map((imageId: string) =>
    new URL(`/v1/events/images/${imageId}`, api.url).toString(),
  )

  return (
    <>
      <HeaderSingleEvent />
      <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
        <h1 className="mb-4 text-2xl font-bold">{event.title}</h1>
        {event?.author ? (
          <span className="text-base-content mb-4 text-xl font-bold">
            by {event.author.name}
          </span>
        ) : (
          ''
        )}
        {images.length > 0 && <EventCarousel images={images} />}
        <TagBar tags={event.tags} />
        <article className="text-base-content mt-4 w-full text-start lg:w-auto lg:text-center lg:text-lg">
          {event.description}
        </article>
      </main>
    </>
  )
}
