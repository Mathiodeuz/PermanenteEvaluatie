import { Anchor, Badge, Card as MantineCard, Group, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import type { Card } from '../../types/card'
import { CardImage } from './CardImage'
import { FavoriteButton } from './FavoriteButton'
import { ManaCost } from './ManaCost'
import { RarityBadge } from './RarityBadge'

interface CardItemProps {
  card: Card
  isFavorite: boolean
  onToggleFavorite: (card: Card) => void
}

export function CardItem({ card, isFavorite, onToggleFavorite }: CardItemProps) {
  return (
    <MantineCard withBorder padding="sm" radius="md" className="card-item">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <Stack gap={2}>
            <Anchor component={Link} to={`/cards/${card.id}`} c="inherit" fw={700} lineClamp={2}>
              {card.name}
            </Anchor>
            <ManaCost cost={card.mana_cost} />
          </Stack>
          <FavoriteButton isFavorite={isFavorite} onToggle={() => onToggleFavorite(card)} />
        </Group>
        <Anchor component={Link} to={`/cards/${card.id}`} aria-label={`View ${card.name}`}>
          <CardImage card={card} size="normal" />
        </Anchor>
        <Group justify="space-between">
          <RarityBadge rarity={card.rarity} />
          <Badge variant="outline">{card.colors.length ? card.colors.join('') : 'Colorless'}</Badge>
        </Group>
        <Text size="sm" c="dimmed" lineClamp={1}>{card.type_line}</Text>
      </Stack>
    </MantineCard>
  )
}
