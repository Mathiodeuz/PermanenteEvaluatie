import { Text } from '@mantine/core'

interface ManaCostProps {
  cost?: string
}

export function ManaCost({ cost }: ManaCostProps) {
  return <Text size="sm" c="dimmed" aria-label={cost ? `Mana cost ${cost}` : 'No mana cost'}>{cost || 'No mana cost'}</Text>
}
