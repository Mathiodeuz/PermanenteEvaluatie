import { Select } from '@mantine/core'

interface RarityFilterProps {
  value: string | null
  onChange: (rarity: string | null) => void
}

export function RarityFilter({ value, onChange }: RarityFilterProps) {
  return (
    <Select
      label="Rarity"
      placeholder="Any rarity"
      clearable
      value={value}
      onChange={onChange}
      data={[
        { value: 'common', label: 'Common' },
        { value: 'uncommon', label: 'Uncommon' },
        { value: 'rare', label: 'Rare' },
        { value: 'mythic', label: 'Mythic' },
      ]}
    />
  )
}
