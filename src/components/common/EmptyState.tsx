import { Button, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
}

export function EmptyState({ title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <Stack align="center" py="xl" ta="center">
      <Title order={3}>{title}</Title>
      <Text c="dimmed">{description}</Text>
      {actionLabel && actionTo && <Button component={Link} to={actionTo}>{actionLabel}</Button>}
    </Stack>
  )
}
