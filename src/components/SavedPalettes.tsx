import type { Hex } from '../lib/color'
import type { SavedPalette } from '../lib/storage'
import { useCopy } from '../hooks/useCopy'
import { Swatch } from './Swatch'

interface Props {
  palettes: SavedPalette[]
  onLoad: (base: Hex) => void
  onRemove: (id: string) => void
  shareLink: string
}

export function SavedPalettes({ palettes, onLoad, onRemove, shareLink }: Props) {
  const { copied, copy } = useCopy()

  return (
    <div>
      <button type="button" className="primary" onClick={() => copy(shareLink)}>
        {copied === shareLink ? 'Link copied' : 'Copy share link'}
      </button>
      {palettes.length === 0 ? (
        <p className="muted">No saved palettes yet. Save one from the palette generator.</p>
      ) : (
        <ul className="saved">
          {palettes.map((p) => (
            <li key={p.id}>
              <div className="saved-head">
                <span>{p.name}</span>
                <span className="saved-actions">
                  <button type="button" onClick={() => onLoad(p.base ?? p.colors[0])}>Load</button>
                  <button type="button" onClick={() => copy(p.colors.join(', '))}>
                    {copied === p.colors.join(', ') ? 'Copied' : 'Copy'}
                  </button>
                  <button type="button" onClick={() => onRemove(p.id)}>Delete</button>
                </span>
              </div>
              <div className="saved-swatches">
                {p.colors.map((c, i) => (
                  <Swatch key={`${c}-${i}`} color={c} small onSelect={onLoad} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
