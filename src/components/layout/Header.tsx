import { Group, Container, Title } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from '../common/ThemeToggle'


export function Header() {
  return (
    <header className="site-header">
      <Container size="xl">
        <Group justify="space-between" py="md" wrap="wrap">
          <NavLink to="/" end className="brand-link">
            <Title order={3} className="brand-title">Mana Atlas</Title>
          </NavLink>
          <Group component="nav" gap="md" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
            <NavLink to="/cards" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Explore</NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Favorites</NavLink>
            <ThemeToggle />
          </Group>
        </Group>
      </Container>
    </header>
  )
}
