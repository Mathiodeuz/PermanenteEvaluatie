import { Button, Card as MantineCard, Container, Group, Image, Stack, Text, Title } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import { CardStats } from '../components/cards/CardStats'
import { FavoriteButton } from '../components/cards/FavoriteButton'
import { ManaCost } from '../components/cards/ManaCost'
import { RarityBadge } from '../components/cards/RarityBadge'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingState } from '../components/common/LoadingState'
import { useFavorites } from '../context/FavoritesContext'
import { useCard } from '../hooks/useCard'
import { getCardImage } from '../utils/cardHelpers'

export function CardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const query = useCard(id)
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()

  if (query.isLoading) return <Container size="xl" py="xl"><LoadingState label="Loading card…" /></Container>
  if (query.isError) {
    return <Container size="xl" py="xl"><ErrorMessage message={query.error.message} onRetry={() => void query.refetch()} /></Container>
  }
  if (!query.data) return <Container size="xl" py="xl"><EmptyState title="Card unavailable" description="No card was found for this URL." actionLabel="Explore cards" actionTo="/cards" /></Container>

  const card = query.data
  const favorite = isFavorite(card.id)
  const toggleFavorite = () => favorite ? removeFavorite(card.id) : addFavorite(card)
  const image = getCardImage(card, 'normal')

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Button variant="subtle" w="fit-content" onClick={() => navigate(-1)}>← Back</Button>
        <Group align="flex-start" gap="xl" className="detail-layout">
          {image && <Image src={image} alt={card.name} radius="lg" className="detail-image" />}
          <Stack flex={1} gap="md">
            <Group justify="space-between" align="flex-start">
              <div><Title order={1}>{card.name}</Title><ManaCost cost={card.mana_cost} /></div>
              <FavoriteButton isFavorite={favorite} onToggle={toggleFavorite} />
            </Group>
            <Group><RarityBadge rarity={card.rarity} /><Text c="dimmed">{card.colors.length ? card.colors.join(' · ') : 'Colorless'}</Text></Group>
            <CardStats card={card} />
            {(card.oracle_text || card.card_faces?.some((face) => face.oracle_text)) && (
              <MantineCard withBorder padding="md">
                <Title order={3} mb="xs">Card text</Title>
                <Stack gap="md">
                  {card.card_faces?.length
                    ? card.card_faces.map((face) => (
                      <div key={face.name}>
                        {card.card_faces!.length > 1 && <Text fw={700}>{face.name}</Text>}
                        <Text style={{ whiteSpace: 'pre-line' }}>{face.oracle_text}</Text>
                      </div>
                    ))
                    : <Text style={{ whiteSpace: 'pre-line' }}>{card.oracle_text}</Text>}
                </Stack>
              </MantineCard>
            )}
            {card.flavor_text && <Text fs="italic" c="dimmed">{card.flavor_text}</Text>}
            {card.artist && <Text size="sm" c="dimmed">Illustrated by {card.artist}</Text>}
          </Stack>
        </Group>
      </Stack>
    </Container>
  )
}
