import { parseColor, type Hex } from './color'

export interface ShareState {
  base: Hex
  fg: Hex
  bg: Hex
}

const strip = (hex: Hex) => hex.replace('#', '')

export function encodeState(s: ShareState): string {
  return `#c=${strip(s.base)}&fg=${strip(s.fg)}&bg=${strip(s.bg)}`
}

/** Returns only the fields present and valid in the hash. */
export function decodeState(hash: string): Partial<ShareState> {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const out: Partial<ShareState> = {}
  const read = (key: string) => {
    const v = params.get(key)
    return v && /^[0-9a-f]{6}$/i.test(v) ? parseColor(`#${v}`) : null
  }
  const base = read('c')
  const fg = read('fg')
  const bg = read('bg')
  if (base) out.base = base
  if (fg) out.fg = fg
  if (bg) out.bg = bg
  return out
}

export function shareUrl(s: ShareState): string {
  return `${location.origin}${location.pathname}${encodeState(s)}`
}
