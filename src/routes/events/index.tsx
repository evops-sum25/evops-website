import Loading from '@/components/shared/Loading'
import TagBar from '@/components/shared/TagBar'
import { Event as ApiEvent } from '@/gen/evops/api/v1/api_pb.ts'
import getApi from '@/lib/api/api'
import {
  useEvents,
  useEventsByTags,
  useSearch,
} from '@/lib/api/hooks/eventService/getEvents.ts'
import { useSearchStore } from '@/lib/stores/searchStore.ts'
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
  const [tagFilterEvents, setTagFilterEvents] = useState<ApiEvent[]>([])
  const [lastTagEvent, setLastTagEvent] = useState<string>('')
  const [isFetching, setFetching] = useState<boolean>(false)
  const [isTagFetching, setTagFetching] = useState<boolean>(false)

  const {
    query,
    isMode,
    selectedTagIds,
    selectedTagName,
    isTagFilterMode,
    clearSearch,
    clearTagFilter,
  } = useSearchStore()

  const {
    data: eventsData,
    isLoading: eventsLoading,
    error,
    refetch,
  } = useEvents(lastEvent)

  const { data: searchData, isLoading: searchLoading } = useSearch(query)

  const {
    data: tagFilterData,
    isLoading: tagFilterLoading,
    refetch: refetchTagFilter,
  } = useEventsByTags(selectedTagIds, lastTagEvent)

  const displayEvents = isMode
    ? searchData?.events || []
    : isTagFilterMode
      ? tagFilterEvents
      : events

  const isLoading = isMode
    ? searchLoading
    : isTagFilterMode
      ? tagFilterLoading && tagFilterEvents.length === 0
      : eventsLoading

  useEffect(() => {
    if (
      !isMode &&
      !isTagFilterMode &&
      eventsData?.events &&
      eventsData.events.length > 0
    ) {
      setEvents((prev) => {
        if (!lastEvent) {
          return [...eventsData.events]
        }
        return [...prev, ...eventsData.events]
      })
      setLastEvent(eventsData.events[eventsData.events.length - 1].id)
    }
    setFetching(false)
  }, [eventsData, isMode, isTagFilterMode, lastEvent])

  useEffect(() => {
    if (
      isTagFilterMode &&
      tagFilterData?.events &&
      tagFilterData.events.length > 0
    ) {
      setTagFilterEvents((prev) => {
        if (!lastTagEvent) {
          return [...tagFilterData.events]
        }
        return [...prev, ...tagFilterData.events]
      })
      if (tagFilterData.events.length > 0) {
        setLastTagEvent(
          tagFilterData.events[tagFilterData.events.length - 1].id,
        )
      }
    }
    setTagFetching(false)
  }, [tagFilterData, isTagFilterMode])

  useEffect(() => {
    if (isMode) {
      setEvents([])
      setLastEvent('')
      setFetching(false)
    }
    if (isTagFilterMode) {
      setTagFilterEvents([])
      setLastTagEvent('')
      setTagFetching(false)
    }
    if (!isMode && !isTagFilterMode) {
      setTagFilterEvents([])
      setLastTagEvent('')
      setTagFetching(false)
    }
  }, [isMode, isTagFilterMode, selectedTagIds])

  const scrollHandler = useCallback(() => {
    const position =
      document.documentElement.scrollHeight -
      (document.documentElement.scrollTop + window.innerHeight)

    if (position < 300) {
      if (isTagFilterMode && !isTagFetching && !tagFilterLoading) {
        if (tagFilterData?.events && tagFilterData.events.length === 25) {
          setTagFetching(true)
          refetchTagFilter()
        }
      } else if (!isMode && !isTagFilterMode && !isFetching && !eventsLoading) {
        if (eventsData?.events && eventsData.events.length === 25) {
          setFetching(true)
          refetch()
        }
      }
    }
  }, [
    isFetching,
    eventsLoading,
    refetch,
    isMode,
    isTagFilterMode,
    isTagFetching,
    tagFilterLoading,
    refetchTagFilter,
    tagFilterData,
    eventsData,
  ])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler])

  if (isMode && query.length === 0) {
    return (
      <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="mb-4 text-2xl font-bold">{t('searchEmptyTitle')}</h2>
          <p className="mb-6 text-center text-gray-600">
            {t('searchEmptyDescription')}
          </p>
          <button onClick={clearSearch} className="btn btn-xl btn-secondary">
            {t('showAllEvents')}
          </button>
        </div>
      </main>
    )
  }

  // Tag filter no results state
  if (isTagFilterMode && displayEvents.length === 0 && !isLoading) {
    return (
      <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="mb-4 text-2xl font-bold">{t('noTagResults')}</h2>
          <p className="mb-6 text-center text-gray-600">
            {t('noTagResultsFor', { tagName: selectedTagName })}
          </p>
          <button onClick={clearTagFilter} className="btn btn-xl btn-secondary">
            {t('clearTagFilter')}
          </button>
        </div>
      </main>
    )
  }

  if (isMode && displayEvents.length === 0 && !isLoading) {
    return (
      <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="mb-4 text-2xl font-bold">{t('noSearchResults')}</h2>
          <p className="mb-6 text-center text-gray-600">
            {t('noSearchResultsFor', { query })}
          </p>
          <button onClick={clearSearch} className="btn btn-xl btn-secondary">
            {t('clearSearch')}
          </button>
        </div>
      </main>
    )
  }

  if (isLoading && displayEvents.length === 0) return <Loading />
  if (error) return <div>{t('loadingError', { message: String(error) })}</div>

  return (
    <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
      {/* Search results header */}
      {isMode && (
        <div className="bg-base-100/95 border-base-200 fixed top-16 right-0 left-0 z-20 border-b shadow-sm backdrop-blur-md md:right-0 md:left-56">
          <div className="mx-auto px-4 py-4 lg:px-80">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <h2 className="text-base-content text-lg font-semibold sm:text-xl">
                  {t('searchResultsFor', { query })}
                </h2>
                <p className="text-base-content/70 mt-1 text-sm">
                  {t('resultsCount', { count: displayEvents.length })}
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="btn btn-primary btn-sm min-w-fit gap-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {t('showAllEvents')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag filter header */}
      {isTagFilterMode && (
        <div className="bg-base-100/95 border-base-200 fixed top-16 right-0 left-0 z-20 border-b shadow-sm backdrop-blur-md md:right-0 md:left-56">
          <div className="mx-auto px-4 py-4 lg:px-80">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <h2 className="text-base-content text-lg font-semibold sm:text-xl">
                  {t('tagFilterResultsFor', { tagName: selectedTagName })}
                </h2>
                <p className="text-base-content/70 mt-1 text-sm">
                  {t('resultsCount', { count: displayEvents.length })}
                </p>
              </div>
              <button
                onClick={clearTagFilter}
                className="btn btn-primary btn-sm min-w-fit gap-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {t('showAllEvents')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={isMode || isTagFilterMode ? 'mt-28 sm:mt-24' : ''}>
        {displayEvents.map((event) => (
          <section
            key={event.id}
            className="card mb-10 flex w-screen flex-col items-center space-y-2 md:w-full"
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

        {isFetching && !isMode && !isTagFilterMode && (
          <div className="flex justify-center py-4">
            <Loading />
          </div>
        )}

        {isTagFetching && isTagFilterMode && (
          <div className="flex justify-center py-4">
            <Loading />
          </div>
        )}
      </div>
    </main>
  )
}

export default EventsList
