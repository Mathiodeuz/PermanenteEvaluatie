import { TextInput } from '@mantine/core'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextInput
      label="Search cards"
      placeholder="Name, e.g. lightning, or Scryfall syntax"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      aria-label="Search cards"
    />
  )
}
