import { SimpleGrid } from '@mantine/core'
import type { Card } from '../../types/card'
import { CardItem } from './CardItem'

interface CardGridProps {
  cards: Card[]
  isFavorite: (id: string) => boolean
  onToggleFavorite: (card: Card) => void
}

export function CardGrid({ cards, isFavorite, onToggleFavorite }: CardGridProps) {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }} spacing="md">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} isFavorite={isFavorite(card.id)} onToggleFavorite={onToggleFavorite} />
      ))}
    </SimpleGrid>
  )
}
