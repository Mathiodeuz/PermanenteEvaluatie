import type { Card, CardFace, CardImageUris, CardSearchResult } from '../types/card'

const API_URL = 'https://api.scryfall.com'

interface ApiCard {
  id: string
  name: string
  mana_cost?: string
  cmc?: number
  type_line?: string
  oracle_text?: string
  flavor_text?: string
  colors?: string[]
  rarity?: string
  set_name?: string
  artist?: string
  power?: string
  toughness?: string
  prices?: { eur?: string | null }
  image_uris?: CardImageUris
  card_faces?: Array<{
    name: string
    mana_cost?: string
    type_line?: string
    oracle_text?: string
    image_uris?: CardImageUris
  }>
}

interface ApiSearchResult {
  data: ApiCard[]
  has_more: boolean
  total_cards: number
}

function mapImageUris(uris?: CardImageUris): CardImageUris | undefined {
  if (!uris) return undefined
  return {
    small: uris.small,
    normal: uris.normal,
    art_crop: uris.art_crop,
  }
}

function mapFace(face: NonNullable<ApiCard['card_faces']>[number]): CardFace {
  return {
    name: face.name,
    mana_cost: face.mana_cost,
    type_line: face.type_line,
    oracle_text: face.oracle_text,
    image_uris: mapImageUris(face.image_uris),
  }
}

function mapCard(card: ApiCard): Card {
  return {
    id: card.id,
    name: card.name,
    mana_cost: card.mana_cost,
    cmc: card.cmc ?? 0,
    type_line: card.type_line ?? '',
    oracle_text: card.oracle_text,
    flavor_text: card.flavor_text,
    colors: card.colors ?? [],
    rarity: card.rarity ?? 'unknown',
    set_name: card.set_name ?? '',
    artist: card.artist,
    power: card.power,
    toughness: card.toughness,
    prices: { eur: card.prices?.eur },
    image_uris: mapImageUris(card.image_uris),
    card_faces: card.card_faces?.map(mapFace),
  }
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'MTGCardExplorer/1.0',
    },
  })

  if (!response.ok) {
    throw new ScryfallError(response.status, `Scryfall request failed (${response.status})`)
  }

  return response.json() as Promise<T>
}

export class ScryfallError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ScryfallError'
  }
}

export async function searchCards(query: string, page: number): Promise<CardSearchResult> {
  const params = new URLSearchParams({ q: query.trim() || 'game:paper', page: String(page) })

  try {
    const result = await request<ApiSearchResult>(`/cards/search?${params.toString()}`)
    return {
      cards: result.data.map(mapCard),
      hasMore: result.has_more,
      totalCards: result.total_cards,
    }
  } catch (error) {
    if (error instanceof ScryfallError && error.status === 404) {
      return { cards: [], hasMore: false, totalCards: 0 }
    }
    throw error
  }
}

export async function getCard(id: string): Promise<Card> {
  const card = await request<ApiCard>(`/cards/${encodeURIComponent(id)}`)
  return mapCard(card)
}
