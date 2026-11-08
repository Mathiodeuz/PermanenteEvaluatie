import { useQuery } from '@tanstack/react-query'
import { getCard } from '../api/scryfallApi'

export function useCard(id: string | undefined) {
  return useQuery({
    queryKey: ['cards', 'detail', id],
    queryFn: () => {
      if (!id) throw new Error('A card ID is required')
      return getCard(id)
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  })
}
