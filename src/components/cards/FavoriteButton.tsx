import { ActionIcon, Tooltip } from '@mantine/core'

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <Tooltip label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <ActionIcon
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
        onClick={onToggle}
        color={isFavorite ? 'red' : undefined}
        variant={isFavorite ? 'light' : 'default'}
        size="lg"
      >
        {isFavorite ? '♥' : '♡'}
      </ActionIcon>
    </Tooltip>
  )
}
