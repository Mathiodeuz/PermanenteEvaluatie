import { Alert, Button, Stack, Text } from '@mantine/core'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Alert color="red" title="Something went wrong">
      <Stack align="flex-start" gap="xs">
        <Text>{message}</Text>
        {onRetry && <Button size="xs" variant="light" onClick={onRetry}>Try again</Button>}
      </Stack>
    </Alert>
  )
}
