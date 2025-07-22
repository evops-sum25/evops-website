import { TagProps } from '@/components/shared/Tag.tsx'
import getApi from '@/lib/api/api'
import { FormDataState } from '@/lib/types.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { FormEvent, useState } from 'react'

const api = getApi()

export function useTags() {
  return useQuery<TagProps[], Error>({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await api.tagService.list({})
      return (res.tags || []).map((tag: any) => ({ ...tag, color: 'gray' }))
    },
  })
}

export function useNewEventForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    description: '',
    tagIds: [],
    withAttendance: false,
    imageFields: [{ file: null, preview: '' }],
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleInputChange = (field: keyof FormDataState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleTagToggle = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }))
  }
  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setFormData((prev) => {
        const newFields = [...prev.imageFields]
        newFields[index] = { file, preview: e.target?.result as string }
        return { ...prev, imageFields: newFields }
      })
    }
    reader.readAsDataURL(file)
  }
  const handleAddImageField = () => {
    if (formData.imageFields.length < 5) {
      setFormData((prev) => ({
        ...prev,
        imageFields: [...prev.imageFields, { file: null, preview: '' }],
      }))
    }
  }
  const handleRemoveImageField = (index: number) => {
    setFormData((prev) => {
      const newFields = prev.imageFields.filter((_, i) => i !== index)
      return {
        ...prev,
        imageFields: newFields.length
          ? newFields
          : [{ file: null, preview: '' }],
      }
    })
  }

  const createEventMutation = useMutation({
    mutationFn: async (data: FormDataState) => {
      const eventRes = await api.eventService.create({
        form: {
          title: data.title,
          description: data.description,
          tagIds: data.tagIds,
        },
      })
      const eventId = eventRes.eventId
      for (const imgField of data.imageFields) {
        if (imgField.file) {
          const formData = new window.FormData()
          formData.append('image', imgField.file)
          const token = localStorage.getItem('accessToken')
          await fetch(`${api.url}v1/events/${eventId}/images`, {
            method: 'POST',
            body: formData,
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          })
        }
      }
      return eventRes
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigate({ to: '/events' })
    },
    onError: (e: any) => {
      alert('Event creation error: ' + (e?.message || e))
    },
  })

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.title && formData.description) setStep(2)
  }
  const handleBack = () => setStep(1)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    createEventMutation.mutate(formData)
  }

  const isStep1Valid = formData.title.trim() && formData.description.trim()

  return {
    step,
    setStep,
    formData,
    setFormData,
    isSubmitting,
    handleInputChange,
    handleTagToggle,
    handleImageUpload,
    handleAddImageField,
    handleRemoveImageField,
    handleNext,
    handleBack,
    handleSubmit,
    createEventMutation,
    isStep1Valid,
  }
}
