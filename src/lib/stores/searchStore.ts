import { create } from 'zustand'

interface SearchState {
  query: string
  isMode: boolean
  setQuery: (query: string) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  isMode: false,
  setQuery: (query: string) =>
    set({
      query,
      isMode: query.length > 0,
    }),
  clearSearch: () =>
    set({
      query: '',
      isMode: false,
    }),
}))
