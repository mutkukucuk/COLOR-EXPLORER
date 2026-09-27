import { clampChroma, converter, formatHex, formatHsl, formatRgb, parse } from 'culori'

const toOklch = converter('oklch')

/** Canonical color representation across the app: lowercase `#rrggbb`. */
export type Hex = string

/** Parse any CSS color string into a canonical hex, or null if invalid. */
export function parseColor(input: string): Hex | null {
  const c = parse(input.trim())
  if (!c) return null
  return formatHex(clampChroma(c, 'oklch'))
}

export interface Formats {
  hex: string
  rgb: string
  hsl: string
  oklch: string
}

const round = (n: number, digits: number) => Number(n.toFixed(digits))

export function formatOklch(hex: Hex): string {
  const { l, c, h } = toOklch(hex)!
  return `oklch(${round(l * 100, 1)}% ${round(c, 3)} ${round(h ?? 0, 1)})`
}

export function formats(hex: Hex): Formats {
  return {
    hex,
    rgb: formatRgb(hex)!,
    hsl: formatHsl(hex)!,
    oklch: formatOklch(hex),
  }
}
