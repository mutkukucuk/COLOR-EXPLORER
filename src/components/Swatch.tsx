import type { Hex } from '../lib/color'
import { readableText } from '../lib/contrast'

interface Props {
  color: Hex
  onSelect?: (hex: Hex) => void
  onCopy?: (hex: Hex) => void
  copied?: boolean
  small?: boolean
}

export function Swatch({ color, onSelect, onCopy, copied, small }: Props) {
  const style = { background: color, color: readableText(color) }
  return (
    <div className={small ? 'swatch swatch-small' : 'swatch'} style={style}>
      {onSelect ? (
        <button type="button" className="swatch-main" onClick={() => onSelect(color)} title="Use as base color">
          {small ? '' : color}
        </button>
      ) : (
        !small && <span className="swatch-main">{color}</span>
      )}
      {onCopy && (
        <button type="button" className="swatch-copy" onClick={() => onCopy(color)}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
    </div>
  )
}
