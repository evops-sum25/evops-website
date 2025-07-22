export interface ImageField {
  file: File | null
  preview: string
}

export interface FormDataState {
  title: string
  description: string
  tagIds: string[]
  imageFields: ImageField[]
}
