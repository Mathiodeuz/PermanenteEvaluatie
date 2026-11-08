import { Group, Text } from '@mantine/core'
import type { Card } from '../../types/card'

interface CardStatsProps {
  card: Card
}

export function CardStats({ card }: CardStatsProps) {
  const price = card.prices.eur ? `€${card.prices.eur}` : 'Unavailable'
  return (
    <Group gap="xs" wrap="wrap" className="card-stats">
      <Text size="sm">{card.type_line}</Text>
      {card.power && card.toughness && <Text size="sm" fw={600}>{card.power}/{card.toughness}</Text>}
      <Text size="sm" c="dimmed">{card.set_name}</Text>
      <Text size="sm" c="dimmed">EUR {price}</Text>
    </Group>
  )
}
