export interface CardImageUris {
  small?: string
  normal?: string
  art_crop?: string
}

export interface CardFace {
  name: string
  mana_cost?: string
  type_line?: string
  oracle_text?: string
  image_uris?: CardImageUris
}

export interface Card {
  id: string
  name: string
  mana_cost?: string
  cmc: number
  type_line: string
  oracle_text?: string
  flavor_text?: string
  colors: string[]
  rarity: string
  set_name: string
  artist?: string
  power?: string
  toughness?: string
  prices: {
    eur?: string | null
  }
  image_uris?: CardImageUris
  card_faces?: CardFace[]
}

export interface CardSearchResult {
  cards: Card[]
  hasMore: boolean
  totalCards: number
}
