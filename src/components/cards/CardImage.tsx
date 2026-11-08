import { Image } from '@mantine/core'
import type { Card } from '../../types/card'
import { getCardImage } from '../../utils/cardHelpers'

interface CardImageProps {
  card: Card
  size?: 'small' | 'normal' | 'art_crop'
  alt?: string
}

export function CardImage({ card, size = 'normal', alt = card.name }: CardImageProps) {
  const src = getCardImage(card, size)
  return src ? (
    <Image src={src} alt={alt} radius="md" className="card-image" />
  ) : (
    <div className="card-image-placeholder" role="img" aria-label={`${alt} image unavailable`}>Image unavailable</div>
  )
}
