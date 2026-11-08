import { Container } from '@mantine/core'
import { EmptyState } from '../components/common/EmptyState'

export function NotFoundPage() {
  return (
    <Container size="xl" py="xl">
      <EmptyState title="Page not found" description="The page you are looking for does not exist." actionLabel="Return home" actionTo="/" />
    </Container>
  )
}
