import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { searchCards } from '../api/scryfallApi'

export function useCardSearch(query: string, page = 1) {
  return useQuery({
    queryKey: ['cards', 'search', query, page],
    queryFn: () => searchCards(query, page),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })
}
