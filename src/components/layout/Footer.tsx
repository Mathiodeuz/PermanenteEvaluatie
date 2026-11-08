import { Container, Text } from '@mantine/core'


export function Footer() {
  return (
    <footer className="site-footer">
      <Container size="xl">
        <Text size="sm" c="dimmed" py="lg">Card data provided by Scryfall. Mana Atlas is an independent fan project.</Text>
      </Container>
    </footer>
  )
}
