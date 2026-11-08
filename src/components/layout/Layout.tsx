import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'


export function Layout() {
  return (
    <AppShell header={{ height: 72 }} padding={0}>
      <AppShell.Header><Header /></AppShell.Header>
      <AppShell.Main className="app-main"><Outlet /></AppShell.Main>
      <Footer />
    </AppShell>
  )
}
