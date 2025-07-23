import Loading from '@/components/shared/Loading'
import {
  useNewEventForm,
  useTags,
} from '@/lib/api/hooks/eventService/newEventPage.ts'
import { useCreateTag } from '@/lib/api/hooks/tagService/createTag.ts'
import { requireAuth } from '@/lib/api/requireAuth.ts'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, Trash, X } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/events/new')({
  beforeLoad: () => requireAuth(),
  component: NewEventPage,
})

function NewEventPage() {
  const { t } = useTranslation('newEvent')
  const {
    step,
    formData,
    isSubmitting,
    handleInputChange,
    handleTagToggle,
    handleImageUpload,
    handleAddImageField,
    handleRemoveImageField,
    handleNext,
    handleBack,
    handleSubmit,
    isStep1Valid,
  } = useNewEventForm()
  const { data: tagsData, isLoading: tagsLoading } = useTags()
  const createTag = useCreateTag()
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false)
  const [newTagForm, setNewTagForm] = useState({ name: '', aliases: '' })
  const [isCreatingTag, setIsCreatingTag] = useState(false)
  const tags = tagsData || []

  const handleCreateTag = async () => {
    if (!newTagForm.name.trim()) return

    setIsCreatingTag(true)
    try {
      const aliases = newTagForm.aliases
        .split(',')
        .map((alias) => alias.trim())
        .filter((alias) => alias.length > 0)

      await createTag({
        name: newTagForm.name.trim(),
        aliases: aliases.length > 0 ? aliases : undefined,
      })

      setIsCreateTagModalOpen(false)
      setNewTagForm({ name: '', aliases: '' })
    } catch (error) {
      console.error('Failed to create tag:', error)
    } finally {
      setIsCreatingTag(false)
    }
  }

  if (tagsLoading) return <Loading />

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4 md:ml-56 md:max-w-[calc(100vw-14rem)]">
      <div className="card bg-base-200 mt-30 w-full max-w-2xl shadow-xl">
        <div className="card-body">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`text-sm ${
                  step >= 1 ? 'text-primary' : 'text-base-content/50'
                }`}
              >
                {t('step1')}
              </span>
              <span
                className={`text-sm ${
                  step >= 2 ? 'text-primary' : 'text-base-content/50'
                }`}
              >
                {t('step2')}
              </span>
            </div>
            <div className="bg-base-300 h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h1 className="card-title mb-1 text-2xl">
              {step === 1 ? t('title') : t('images')}
            </h1>
          </div>
          <p className="text-base-content/70 mb-6">
            {step === 1 ? t('step1Description') : t('step2Description')}
          </p>

          <form
            className="w-full"
            onSubmit={step === 1 ? handleNext : handleSubmit}
          >
            {step === 1 ? (
              <div className="flex flex-col gap-6">
                <div className="form-control flex gap-3">
                  <label className="label font-medium">{t('form.title')}</label>
                  <input
                    className="input input-bordered"
                    type="text"
                    value={formData.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('title', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-control flex gap-3">
                  <label className="label font-medium">
                    {t('form.description')}
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    value={formData.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      handleInputChange('description', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="label font-medium">
                      {t('form.tags')}
                    </label>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary btn-circle"
                      onClick={() => setIsCreateTagModalOpen(true)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="border-base-300 h-32 overflow-y-auto rounded-lg border p-3">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <label
                          key={tag.id}
                          className={`btn btn-sm btn-outline flex cursor-pointer items-center gap-2 ${
                            formData.tagIds.includes(tag.id)
                              ? 'btn-primary'
                              : ''
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.tagIds.includes(tag.id)}
                            onChange={() => handleTagToggle(tag.id)}
                            className="checkbox checkbox-xs"
                          />
                          {tag.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {formData.imageFields.map((img, idx) => (
                  <div
                    key={idx}
                    className="form-control flex flex-row items-center gap-4"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(idx, file)
                      }}
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                    {img.preview && (
                      <img
                        src={img.preview}
                        alt="Preview"
                        className="h-20 w-20 rounded-lg object-cover shadow-lg"
                      />
                    )}
                    {img.preview && (
                      <button
                        type="button"
                        className="btn btn-sm btn-error ml-2"
                        onClick={() => handleRemoveImageField(idx)}
                      >
                        <Trash />
                      </button>
                    )}
                  </div>
                ))}
                {formData.imageFields.length < 10 && (
                  <button
                    type="button"
                    className="btn btn-outline btn-sm w-fit"
                    onClick={handleAddImageField}
                  >
                    <Plus />
                  </button>
                )}
              </div>
            )}
            <div className="card-actions mt-8 flex justify-between">
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-outline"
                >
                  {t('form.back')}
                </button>
              )}
              <div className="ml-auto">
                {step === 1 ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isStep1Valid}
                  >
                    {t('form.next')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary btn-wide"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      t('form.createEvent')
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Create Tag Modal */}
      {isCreateTagModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">{t('createTag.title')}</h3>
              <button
                className="btn btn-sm btn-ghost btn-circle"
                onClick={() => setIsCreateTagModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="form-control space-x-2">
                <label className="label">
                  <span className="label-text">{t('createTag.name')}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={newTagForm.name}
                  onChange={(e) =>
                    setNewTagForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder={t('createTag.namePlaceholder')}
                />
              </div>

              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text">{t('createTag.aliases')}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={newTagForm.aliases}
                  onChange={(e) =>
                    setNewTagForm((prev) => ({
                      ...prev,
                      aliases: e.target.value,
                    }))
                  }
                  placeholder={t('createTag.aliasesPlaceholder')}
                />
                <label className="label">
                  <span className="label-text-alt">
                    {t('createTag.aliasesHint')}
                  </span>
                </label>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setIsCreateTagModalOpen(false)}
              >
                {t('createTag.cancel')}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateTag}
                disabled={!newTagForm.name.trim() || isCreatingTag}
              >
                {isCreatingTag ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  t('createTag.create')
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
