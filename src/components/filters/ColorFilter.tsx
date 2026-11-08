import { Chip, Group, Text } from '@mantine/core'

interface ColorFilterProps {
  value: string[]
  onChange: (colors: string[]) => void
}

const colors = [
  { code: 'W', label: 'White' },
  { code: 'U', label: 'Blue' },
  { code: 'B', label: 'Black' },
  { code: 'R', label: 'Red' },
  { code: 'G', label: 'Green' },
]

export function ColorFilter({ value, onChange }: ColorFilterProps) {
  return (
    <div>
      <Text size="sm" fw={500} mb={6}>Color</Text>
      <Chip.Group multiple value={value} onChange={onChange}>
        <Group gap="xs">
          {colors.map((color) => <Chip key={color.code} value={color.code}>{color.label}</Chip>)}
        </Group>
      </Chip.Group>
    </div>
  )
}
