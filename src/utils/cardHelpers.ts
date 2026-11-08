import type { Card } from '../types/card'

export function getCardImage(card: Card, size: 'small' | 'normal' | 'art_crop' = 'normal'): string | undefined {
  return card.image_uris?.[size] ?? card.card_faces?.[0]?.image_uris?.[size]
}

export function formatRarity(rarity: string): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1)
}
