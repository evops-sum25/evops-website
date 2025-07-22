import Loading from '@/components/shared/Loading'
import Markdown from '@/components/shared/Markdown.tsx'
import TagBar from '@/components/shared/TagBar.tsx'
import EventCarousel from '@/components/widgets/EventCaousel.tsx'
import getApi from '@/lib/api/api.ts'
import { useDeleteEvent } from '@/lib/api/hooks/deleteEvent.ts'
import { useSingleEvent } from '@/lib/api/hooks/getSingleEvent.ts'
import { useMyInfo } from '@/lib/api/hooks/useAuth.ts'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { EllipsisVertical, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/events/$id')({
  component: EventPage,
})

function EventPage() {
  const params = Route.useParams()
  const api = getApi()
  const navigate = useNavigate()
  const { data, isLoading, error } = useSingleEvent(params)
  const { data: currentUser } = useMyInfo()
  const deleteEventMutation = useDeleteEvent()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const { t } = useTranslation('eventPage')

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false)
    if (showMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMenu])

  const handleDeleteEvent = async () => {
    try {
      await deleteEventMutation.mutateAsync(params.id)
      setShowDeleteModal(false)
      navigate({ to: '/events' })
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowDeleteModal(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <div>{t('loadingError', { message: error })}</div>
  }
  if (data === undefined) {
    return <div>{t('eventNotFound')}</div>
  }

  const event = data
  const images = event.imageIds.map((imageId: string) =>
    new URL(`/v1/events/images/${imageId}`, api.url).toString(),
  )

  const isAuthor =
    currentUser && event.author && currentUser.id === event.author.id

  return (
    <>
      <main className="main-layout w-full overflow-x-hidden px-4 md:ml-56 md:max-w-[calc(100vw-14rem)] lg:px-80">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{event.title}</h1>

          {isAuthor && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="hover:bg-base-200 rounded-lg p-2 transition-colors"
              >
                <EllipsisVertical className="h-5 w-5" />
              </button>

              {showMenu && (
                <div
                  className="bg-base-100 border-base-300 absolute top-full right-0 z-20 mt-1 min-w-[120px] rounded-lg border shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setShowDeleteModal(true)
                      setShowMenu(false)
                    }}
                    className="hover:bg-base-200 text-error flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                    {t('deleteEvent')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {event?.author && (
          <span className="text-base-content mb-4 text-xl font-bold">
            by {event.author.displayName}
          </span>
        )}
        {images.length > 0 && <EventCarousel images={images} />}
        <TagBar tags={event.tags} />
        <article className="text-base-content mt-4 w-full lg:w-auto">
          <Markdown text={event.description} />
        </article>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={handleModalBackdropClick}
        >
          <div
            className="bg-base-100 border-base-300 w-full max-w-md rounded-lg border p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-error/10 rounded-full p-2">
                <Trash className="text-error h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{t('confirmDelete')}</h3>
            </div>

            <p className="text-base-content/70 mb-6">
              {t('confirmDeleteDescription')}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-ghost"
                disabled={deleteEventMutation.isPending}
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDeleteEvent}
                className="btn btn-error"
                disabled={deleteEventMutation.isPending}
              >
                {deleteEventMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    {t('deleting')}
                  </>
                ) : (
                  <>{t('delete')}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
