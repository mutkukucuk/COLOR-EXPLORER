import { useMemo, useState } from 'react'
import type { Hex } from '../lib/color'
import { generatePalette, PALETTE_MODES, type PaletteMode } from '../lib/palette'
import { useCopy } from '../hooks/useCopy'
import { Swatch } from './Swatch'

interface Props {
  base: Hex
  onSelect: (hex: Hex) => void
  onSave: (name: string, base: Hex, colors: Hex[]) => void
}

export function PaletteGenerator({ base, onSelect, onSave }: Props) {
  const [mode, setMode] = useState<PaletteMode>('analogous')
  const colors = useMemo(() => generatePalette(base, mode), [base, mode])
  const { copied, copy } = useCopy()

  return (
    <div>
      <div className="tabs" role="tablist">
        {PALETTE_MODES.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={m === mode}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="swatches">
        {colors.map((c, i) => (
          <Swatch key={`${c}-${i}`} color={c} onSelect={onSelect} onCopy={copy} copied={copied === c} />
        ))}
      </div>
      <button type="button" className="primary" onClick={() => onSave(`${mode} ${base}`, base, colors)}>
        Save palette
      </button>
    </div>
  )
}
