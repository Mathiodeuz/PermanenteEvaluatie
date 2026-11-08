import { Button, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useCardSearch } from '../hooks/useCardSearch'
import { useFavorites } from '../context/FavoritesContext'
import { CardGrid } from '../components/cards/CardGrid'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingState } from '../components/common/LoadingState'

export function HomePage() {
  const query = useCardSearch('game:paper t:creature', 1)
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()
  const toggleFavorite = (card: Parameters<typeof addFavorite>[0]) => {
    if (isFavorite(card.id)) removeFavorite(card.id)
    else addFavorite(card)
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <section className="hero-panel">
          <Stack gap="md" maw={680}>
            <Text size="sm" fw={700} tt="uppercase" c="var(--mantine-color-blue-6)">Your collection, one spell away</Text>
            <Title order={1}>Find your next favorite card.</Title>
            <Text size="lg" c="dimmed">Explore the world of Magic: The Gathering with live card data, flexible search, and a personal favorites shelf.</Text>
            <Group>
              <Button component={Link} to="/cards" size="md">Explore cards</Button>
              <Button component={Link} to="/favorites" variant="default" size="md">Open favorites</Button>
            </Group>
          </Stack>
        </section>
        <Stack gap="md">
          <div>
            <Title order={2}>A few cards to get started</Title>
            <Text c="dimmed">A rotating selection of paper-legal creatures from Scryfall.</Text>
          </div>
          {query.isLoading && <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }}><LoadingState cards /></SimpleGrid>}
          {query.isError && <ErrorMessage message={query.error.message} onRetry={() => void query.refetch()} />}
          {query.isSuccess && query.data.cards.length > 0 && (
            <CardGrid cards={query.data.cards.slice(0, 4)} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
          )}
          {query.isSuccess && query.data.cards.length === 0 && (
            <EmptyState title="No cards to feature" description="Scryfall did not return any cards right now." />
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
