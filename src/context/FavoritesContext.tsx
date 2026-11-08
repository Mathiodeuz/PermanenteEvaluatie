import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Card } from '../types/card'

interface FavoritesContextValue {
  favorites: Card[]
  addFavorite: (card: Card) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

interface FavoritesProviderProps {
  children: ReactNode
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

function readFavorites(): Card[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem('mtg-favorites') ?? '[]')
    return Array.isArray(stored) ? (stored as Card[]) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Card[]>(readFavorites)

  useEffect(() => {
    localStorage.setItem('mtg-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = useCallback((card: Card) => {
    setFavorites((current) => {
      if (current.some((favorite) => favorite.id === card.id)) return current
      return [...current, card]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((current) => current.filter((card) => card.id !== id))
  }, [])

  const isFavorite = useCallback((id: string) => favorites.some((card) => card.id === id), [favorites])
  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
