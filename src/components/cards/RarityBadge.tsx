import { Badge } from '@mantine/core'
import { formatRarity } from '../../utils/cardHelpers'

interface RarityBadgeProps {
  rarity: string
}

export function RarityBadge({ rarity }: RarityBadgeProps) {
  return <Badge variant="light" color={rarity === 'mythic' ? 'orange' : 'blue'}>{formatRarity(rarity)}</Badge>
}
