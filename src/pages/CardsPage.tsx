import { useMemo, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { Alert, Container, Group, Pagination, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { CardGrid } from '../components/cards/CardGrid'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingState } from '../components/common/LoadingState'
import { ColorFilter } from '../components/filters/ColorFilter'
import { RarityFilter } from '../components/filters/RarityFilter'
import { SearchBar } from '../components/filters/SearchBar'
import { useFavorites } from '../context/FavoritesContext'
import { useCardSearch } from '../hooks/useCardSearch'
import type { Card } from '../types/card'

export function CardsPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebouncedValue(search, 400)
  const [colors, setColors] = useState<string[]>([])
  const [rarity, setRarity] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()

  const queryText = useMemo(() => {
    const terms = [debouncedSearch.trim() || 'game:paper']
    if (colors.length) terms.push(`c:${colors.join('')}`)
    if (rarity) terms.push(`r:${rarity}`)
    return terms.join(' ')
  }, [debouncedSearch, colors, rarity])
  const query = useCardSearch(queryText, page)

  const toggleFavorite = (card: Card) => {
    if (isFavorite(card.id)) removeFavorite(card.id)
    else addFavorite(card)
  }
  const updateSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }
  const updateColors = (value: string[]) => {
    setColors(value)
    setPage(1)
  }
  const updateRarity = (value: string | null) => {
    setRarity(value)
    setPage(1)
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Explore cards</Title>
          <Text c="dimmed">Search by name or Scryfall syntax, then refine by color and rarity.</Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          <SearchBar value={search} onChange={updateSearch} />
          <ColorFilter value={colors} onChange={updateColors} />
          <RarityFilter value={rarity} onChange={updateRarity} />
        </SimpleGrid>
        {query.isFetching && query.data && <Alert color="blue">Updating results…</Alert>}
        {query.isLoading && <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }}><LoadingState cards /></SimpleGrid>}
        {query.isError && <ErrorMessage message={query.error.message} onRetry={() => void query.refetch()} />}
        {query.isSuccess && query.data.cards.length === 0 && (
          <EmptyState title="No cards found" description="Try a different name or remove one of the filters." />
        )}
        {query.isSuccess && query.data.cards.length > 0 && (
          <>
            <Group justify="space-between">
              <Text c="dimmed">{query.data.totalCards.toLocaleString()} cards found</Text>
              {query.data.hasMore && <Text size="sm" c="dimmed">Page {page}</Text>}
            </Group>
            <CardGrid cards={query.data.cards} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
            {(query.data.hasMore || page > 1) && (
              <Pagination total={query.data.hasMore ? Math.max(page + 1, 2) : page} value={page} onChange={setPage} mx="auto" />
            )}
          </>
        )}
      </Stack>
    </Container>
  )
}
