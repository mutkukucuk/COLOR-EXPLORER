import type { Hex } from '../lib/color'
import { ratio, wcag } from '../lib/contrast'
import { ColorPicker } from './ColorPicker'

interface Props {
  fg: Hex
  bg: Hex
  onChange: (patch: { fg?: Hex; bg?: Hex }) => void
}

export function ContrastChecker({ fg, bg, onChange }: Props) {
  const r = ratio(fg, bg)
  const result = wcag(r)
  const badges: [string, boolean][] = [
    ['AA', result.AA],
    ['AAA', result.AAA],
    ['AA large', result.AALarge],
    ['AAA large', result.AAALarge],
  ]

  return (
    <div>
      <div className="contrast-pickers">
        <ColorPicker label="Text" value={fg} onChange={(v) => onChange({ fg: v })} />
        <button type="button" className="swap" onClick={() => onChange({ fg: bg, bg: fg })} aria-label="Swap colors">
          ⇄
        </button>
        <ColorPicker label="Background" value={bg} onChange={(v) => onChange({ bg: v })} />
      </div>
      <div className="contrast-sample" style={{ color: fg, background: bg }}>
        <p className="sample-large">Large text sample</p>
        <p>The quick brown fox jumps over the lazy dog.</p>
      </div>
      <p className="ratio">
        <strong>{r.toFixed(2)}</strong>:1
      </p>
      <ul className="badges">
        {badges.map(([name, pass]) => (
          <li key={name} className={pass ? 'pass' : 'fail'}>
            {pass ? '✓' : '✗'} {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
