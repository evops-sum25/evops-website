import Loading from '@/components/shared/Loading'
import { useNewEventForm, useTags } from '@/lib/api/hooks/newEventPage'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, Trash } from 'lucide-react'
import { ChangeEvent } from 'react'

export const Route = createFileRoute('/events/new')({
  component: NewEventPage,
})

function NewEventPage() {
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
  const tags = tagsData || []

  if (tagsLoading) return <Loading />

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-2xl shadow-xl">
        <div className="card-body">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`text-sm ${step >= 1 ? 'text-primary' : 'text-base-content/50'}`}
              >
                Шаг 1
              </span>
              <span
                className={`text-sm ${step >= 2 ? 'text-primary' : 'text-base-content/50'}`}
              >
                Шаг 2
              </span>
            </div>
            <div className="bg-base-300 h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
          </div>

          <h1 className="card-title mb-1 text-2xl">
            {step === 1 ? 'Новое событие' : 'Изображения'}
          </h1>
          <p className="text-base-content/70 mb-6">
            {step === 1
              ? 'Заполните основные данные'
              : 'Загрузите до 5 изображений (опционально)'}
          </p>

          <form
            className="w-full"
            onSubmit={step === 1 ? handleNext : handleSubmit}
          >
            {step === 1 ? (
              <div className="flex flex-col gap-6">
                <div className="form-control">
                  <label className="label font-medium">Название</label>
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
                <div className="form-control">
                  <label className="label font-medium">Описание</label>
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
                  <label className="label font-medium">Теги</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <label
                        key={tag.id}
                        className={`btn btn-sm btn-outline flex cursor-pointer items-center gap-2 ${formData.tagIds.includes(tag.id) ? 'btn-primary' : ''}`}
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
                <div className="form-control flex-row items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={formData.withAttendance}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('withAttendance', e.target.checked)
                      }
                    />
                    <span className="label-text font-medium">
                      С посещаемостью
                    </span>
                  </label>
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
                    {formData.imageFields.length > 1 && (
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
                {formData.imageFields.length < 5 && (
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
                  Назад
                </button>
              )}
              <div className="ml-auto">
                {step === 1 ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isStep1Valid}
                  >
                    Далее
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
                      'Создать событие'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
