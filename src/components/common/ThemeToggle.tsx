import { ActionIcon, Tooltip } from '@mantine/core'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { colorScheme, toggleTheme } = useTheme()
  const nextTheme = colorScheme === 'light' ? 'dark' : 'light'
  return (
    <Tooltip label={`Switch to ${nextTheme} mode`}>
      <ActionIcon
        aria-label={`Switch to ${nextTheme} mode`}
        onClick={toggleTheme}
        variant="default"
        size="lg"
      >
        {colorScheme === 'light' ? '☾' : '☀'}
      </ActionIcon>
    </Tooltip>
  )
}
