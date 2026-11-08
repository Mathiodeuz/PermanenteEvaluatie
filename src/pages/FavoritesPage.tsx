import { Container, Stack, Text, Title } from '@mantine/core'
import { CardGrid } from '../components/cards/CardGrid'
import { EmptyState } from '../components/common/EmptyState'
import { useFavorites } from '../context/FavoritesContext'

export function FavoritesPage() {
  const { favorites, isFavorite, removeFavorite } = useFavorites()
  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div><Title order={1}>Your favorites</Title><Text c="dimmed">{favorites.length} saved cards</Text></div>
        {favorites.length
          ? <CardGrid cards={favorites} isFavorite={isFavorite} onToggleFavorite={(card) => removeFavorite(card.id)} />
          : <EmptyState title="Your shelf is empty" description="Save cards while exploring and they will show up here." actionLabel="Explore cards" actionTo="/cards" />}
      </Stack>
    </Container>
  )
}
