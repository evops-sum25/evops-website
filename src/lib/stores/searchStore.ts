import { create } from 'zustand'

interface SearchState {
  query: string
  isMode: boolean
  selectedTagIds: string[]
  selectedTagName: string
  isTagFilterMode: boolean
  setQuery: (query: string) => void
  clearSearch: () => void
  setTagFilter: (tagIds: string[], tagName?: string) => void
  clearTagFilter: () => void
  clearAll: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  isMode: false,
  selectedTagIds: [],
  selectedTagName: '',
  isTagFilterMode: false,
  setQuery: (query: string) =>
    set({
      query,
      isMode: query.length > 0,
      selectedTagIds: [],
      selectedTagName: '',
      isTagFilterMode: false,
    }),
  clearSearch: () =>
    set({
      query: '',
      isMode: false,
    }),
  setTagFilter: (tagIds: string[], tagName: string = '') =>
    set({
      selectedTagIds: tagIds,
      selectedTagName: tagName,
      isTagFilterMode: tagIds.length > 0,
      query: '',
      isMode: false,
    }),
  clearTagFilter: () =>
    set({
      selectedTagIds: [],
      selectedTagName: '',
      isTagFilterMode: false,
    }),
  clearAll: () =>
    set({
      query: '',
      isMode: false,
      selectedTagIds: [],
      selectedTagName: '',
      isTagFilterMode: false,
    }),
}))
