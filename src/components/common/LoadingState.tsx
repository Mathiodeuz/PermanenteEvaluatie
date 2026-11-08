import { Loader, Skeleton, Stack, Text } from '@mantine/core'

interface LoadingStateProps {
  label?: string
  cards?: boolean
}

export function LoadingState({ label = 'Loading cards…', cards = false }: LoadingStateProps) {
  if (cards) {
    return (
      <Stack aria-label={label} gap="sm">
        <Skeleton height={280} radius="md" />
        <Skeleton height={20} width="70%" />
        <Skeleton height={14} width="45%" />
      </Stack>
    )
  }
  return <Stack align="center" py="xl"><Loader /><Text c="dimmed">{label}</Text></Stack>
}
